---
layout: post-detail
title: "Designing a URL Shortener: From Bit.ly to Production Scale"
date: 2025-04-14
category: "System Design & Architecture"
tags: ["System Design", "URL Shortener", "Scalability", "Distributed Systems", "API Design", "Hashing"]
image: "/assets/images/posts/url-shortener-hero.svg"
excerpt: "Ever wondered how Bit.ly and TinyURL handle billions of redirects? Learn how to design a production-ready URL shortener from scratch, covering hash generation, collision handling, analytics, and scaling to millions of requests per second."
---

# Designing a URL Shortener: From Bit.ly to Production Scale

You're sharing a link on Twitter. It's 247 characters long. Twitter's limit? 280 characters. You've got 33 characters left for your brilliant commentary. This is where URL shorteners save the day.

But here's the thing: building a URL shortener sounds simple—take a long URL, generate a short code, store the mapping, redirect users. Easy, right? Then you realize Bit.ly handles billions of redirects per month, TinyURL has been running since 2002, and your "simple" service needs to be fast, reliable, and scalable.

I've built URL shorteners for marketing campaigns tracking millions of clicks. The devil is in the details—hash collisions, database design, caching strategies, and analytics at scale. Let's design one that actually works in production.

---

## What We're Building

A URL shortener that:
- Converts long URLs into short, memorable links
- Redirects users instantly (sub-100ms latency)
- Tracks clicks and analytics
- Handles millions of requests per second
- Never loses data
- Prevents abuse and spam

Think Bit.ly, but we'll understand every design decision and trade-off.


## The Core Problem

Say you have `https://www.example.com/articles/2024/03/how-to-design-scalable-systems-with-microservices-architecture?utm_source=twitter&utm_medium=social&utm_campaign=spring2024`

You need to convert it to something like `https://short.url/aB3xY9`

The short code (`aB3xY9`) needs to be:
- Unique (no collisions)
- Short (ideally 6-7 characters)
- Random-looking (not sequential for security)
- Fast to generate (can't take seconds)

And the system needs to:
- Store billions of mappings
- Redirect in milliseconds
- Track analytics without slowing down redirects
- Handle traffic spikes (viral links)

---

## Let's Talk Numbers

Before we design anything, let's understand the scale:

**Assumptions:**
- 100 million new URLs shortened per month
- 10 billion redirects per month (100:1 read-to-write ratio)
- Average URL length: 100 characters
- Short code length: 7 characters
- Data retention: 10 years

**Storage calculations:**
```
URLs per year: 100M × 12 = 1.2 billion
URLs in 10 years: 12 billion

Storage per URL:
- Original URL: 100 bytes
- Short code: 7 bytes
- Metadata: 50 bytes
- Total: ~160 bytes

Total storage: 12B × 160 bytes = 1.9 TB
```

**Traffic calculations:**
```
Writes: 100M / month = ~40 writes/second
Reads: 10B / month = ~4,000 reads/second
Peak traffic (5x average): 20,000 reads/second
```

So we need to handle 20K reads/second at peak with sub-100ms latency. Totally doable, but we need to design carefully.

---

## The Short Code: How Do We Generate It?

This is the heart of the system. We need a way to generate unique, short codes. There are two main approaches:

### Approach 1: Hash + Encode

Take the long URL, hash it, encode the hash to base62 (a-z, A-Z, 0-9), take the first 7 characters.


Here's how it works: Hash the URL with MD5 or SHA-256, convert the hash to base62, take the first 7 characters. Done.

**Pros:**
- ✓ Fast generation (hashing is quick)
- ✓ Same URL always gets same short code (idempotent)
- ✓ No database lookup needed during generation

**Cons:**
- ✗ Collision risk (two different URLs might hash to same 7 characters)
- ✗ Need collision detection and handling
- ✗ Predictable (someone could guess short codes)

The collision problem is real. With 7 characters in base62, we have 62^7 = 3.5 trillion possible codes. Sounds like a lot, but with the birthday paradox, collisions start happening way sooner than you'd think.

### Approach 2: Auto-Incrementing ID + Base62

Use a database auto-incrementing ID, convert it to base62. ID 1 becomes "b", ID 62 becomes "10", ID 125 becomes "1Z".

**Pros:**
- ✓ No collisions (IDs are unique by definition)
- ✓ Simple to implement
- ✓ Predictable storage needs

**Cons:**
- ✗ Sequential codes (security issue—people can guess next URL)
- ✗ Reveals how many URLs you've shortened
- ✗ Single point of failure (the ID generator)

### Approach 3: Random Generation + Collision Check

Generate a random 7-character base62 string, check if it exists in database, if not use it, if yes try again.

**Pros:**
- ✓ No collisions (we check before using)
- ✓ Random codes (better security)
- ✓ Simple logic

**Cons:**
- ✗ Database lookup on every generation
- ✗ Retry logic needed for collisions
- ✗ Performance degrades as database fills up

### The Winner: Distributed ID Generator

Here's what works in production: use a distributed ID generator (like Twitter's Snowflake) that generates unique IDs across multiple servers, then convert to base62.

Each server gets a unique ID range. Server 1 generates IDs 1-1000, Server 2 generates 1001-2000, etc. No coordination needed, no collisions possible, blazing fast.

We'll use this approach. It's what Bit.ly and TinyURL use under the hood.

---

## Database Design: Keep It Simple

For storing URL mappings, we need a simple schema:

**urls table:**
- id (bigint, primary key, auto-increment)
- short_code (varchar(7), unique index)
- original_url (text)
- created_at (timestamp)
- expires_at (timestamp, nullable)
- user_id (bigint, nullable, for authenticated users)

**Why this works:**
- Primary key on id for fast inserts
- Unique index on short_code for fast lookups during redirects
- original_url as text to handle any length
- expires_at for temporary links (optional feature)

For 12 billion URLs over 10 years, this table will be about 2 TB. Totally manageable with modern databases.

But here's the thing: we'll rarely query this table directly. More on that in the caching section.

---

## The API: Two Simple Endpoints

### POST /shorten - Create Short URL

Request:
```json
{
  "url": "https://example.com/very/long/url",
  "custom_alias": "my-link",  // optional
  "expires_in": 86400  // optional, seconds
}
```

Response:
```json
{
  "short_url": "https://short.url/aB3xY9",
  "short_code": "aB3xY9",
  "original_url": "https://example.com/very/long/url",
  "created_at": "2026-03-12T10:30:00Z",
  "expires_at": "2026-03-13T10:30:00Z"
}
```

### GET /{short_code} - Redirect

User visits `https://short.url/aB3xY9`, we look up the original URL, return 301 redirect.

Response:
```
HTTP/1.1 301 Moved Permanently
Location: https://example.com/very/long/url
```

That's it. Two endpoints. Keep it simple.

---

## Caching: The Secret Sauce

Here's the reality: 80% of redirects are for 20% of URLs. Popular links get clicked thousands of times. We can't hit the database for every redirect—that's suicide at scale.

Enter Redis. We cache every URL mapping in Redis with a reasonable TTL (say, 24 hours). When a redirect request comes in:

1. Check Redis first
2. If hit, redirect immediately (sub-10ms)
3. If miss, query database, cache result, redirect

With this approach, 95%+ of redirects never touch the database. Response time drops from 50ms to 5ms.

**Cache key structure:**
```
url:short_code:{short_code} -> original_url
```

**Cache warming:**
When a new URL is shortened, immediately cache it. No cold start penalty.

**Cache invalidation:**
If a URL is deleted or expires, remove from cache. Simple.

The result? We can handle 20K redirects/second with a modest Redis cluster. Database barely breaks a sweat.



---

## Analytics: Track Everything Without Slowing Down

Users want to know: How many clicks? Where are they from? What devices? When?

But here's the problem: if we write analytics to the database on every redirect, we're back to database hell. 20K writes/second will crush any database.

The solution? Asynchronous analytics pipeline.

**On redirect:**
1. Look up URL in cache
2. Return redirect immediately (don't wait for analytics)
3. Fire-and-forget analytics event to message queue (Kafka/RabbitMQ)

**Analytics worker:**
1. Consume events from queue
2. Batch writes to analytics database (ClickHouse/BigQuery)
3. Process in background

This way, redirects stay fast (sub-100ms), and analytics happen eventually. Users don't care if their click count updates in 5 seconds instead of instantly.

**What we track:**
- Timestamp
- Short code
- IP address (anonymized for privacy)
- User agent (browser, device, OS)
- Referrer
- Geographic location (from IP)

**Analytics schema:**
```
clicks table:
- id (bigint)
- short_code (varchar(7), indexed)
- clicked_at (timestamp)
- ip_hash (varchar(64))  // anonymized
- country (varchar(2))
- device_type (enum: mobile, desktop, tablet)
- browser (varchar(50))
- referrer (text)
```

With time-series partitioning (partition by day/week), we can query billions of clicks efficiently.

---

## Handling Scale: The Architecture

Here's what the complete system looks like:

![URL Shortener Architecture](/assets/images/posts/url-shortener-architecture.svg)

**Load Balancer:** Distributes traffic across multiple API servers. Health checks ensure only healthy servers receive traffic.

**API Servers:** Stateless application servers handling /shorten and /{short_code} requests. Scale horizontally by adding more servers.

**Redis Cluster:** Distributed cache for URL mappings. Handles 95%+ of redirect requests. Replicated for high availability.

**Database (PostgreSQL):** Stores URL mappings. Sharded by short_code for horizontal scaling. Read replicas for redundancy.

**Message Queue (Kafka):** Buffers analytics events. Decouples redirects from analytics processing.

**Analytics Workers:** Consume events from queue, batch write to analytics database. Scale based on queue depth.

**Analytics Database (ClickHouse):** Column-oriented database optimized for analytics queries. Handles billions of rows efficiently.

**CDN (Cloudflare):** Caches redirect responses at edge locations. Reduces latency for global users.

The beauty of this architecture? Each component scales independently. Need more redirect capacity? Add API servers. Analytics backing up? Add workers. Database struggling? Add shards.

---

## Custom Aliases: Let Users Choose

Some users want custom short codes: `short.url/my-product` instead of `short.url/aB3xY9`.

This is tricky because:
- Custom aliases might conflict with generated codes
- Users might try to squat on popular names
- Need to validate aliases (no profanity, no reserved words)

**Our approach:**

Reserve a namespace for custom aliases. Generated codes use only alphanumeric characters. Custom aliases can include hyphens and underscores.

Generated: `aB3xY9` (only a-z, A-Z, 0-9)
Custom: `my-product` (can include -, _)

This way, they never conflict. Simple and effective.

**Validation rules:**
- 3-30 characters
- Alphanumeric, hyphens, underscores only
- No profanity (check against blocklist)
- Not reserved (admin, api, www, etc.)
- Check availability before creating

---

## Security: Prevent Abuse

URL shorteners are magnets for abuse. Spam, phishing, malware—you name it. We need defenses.

**Rate Limiting:**
Limit URL creation to 10 per hour per IP address. Authenticated users get higher limits based on their tier.

**URL Validation:**
Check URLs against known malware/phishing databases (Google Safe Browsing API). Reject suspicious URLs.

**Expiration:**
Allow users to set expiration dates. Temporary links auto-delete after expiration. Reduces spam accumulation.

**Reporting:**
Let users report malicious links. Flag for review, disable if confirmed malicious.

**CAPTCHA:**
For anonymous users, require CAPTCHA after 3 URLs per hour. Stops automated abuse.

**Blocklist:**
Maintain blocklist of domains known for spam. Reject URLs from these domains.

These measures won't stop all abuse, but they'll stop 99% of it. The remaining 1% requires human review.

---

## The Complete Flow

Let's walk through both operations:

![URL Shortener Flow](/assets/images/posts/url-shortener-flow.svg)

**Creating a short URL:**
1. User sends POST /shorten with long URL
2. API server validates URL (format, not malicious)
3. Generate unique ID from distributed ID generator
4. Convert ID to base62 short code
5. Store mapping in database
6. Cache mapping in Redis
7. Return short URL to user

Total time: 50-100ms

**Redirecting:**
1. User visits short URL
2. Load balancer routes to API server
3. API server checks Redis cache
4. If hit: return 301 redirect (5ms)
5. If miss: query database, cache result, return redirect (50ms)
6. Fire analytics event to message queue (async, no wait)
7. Analytics worker processes event in background

Total time: 5-50ms (95% are 5ms cache hits)

---

## Database Sharding: When You Outgrow One Database

Eventually, even with caching, one database can't handle the load. Time to shard.

**Sharding strategy:** Hash short_code to determine shard.

With 4 shards:
- Shard 0: short_codes where hash(short_code) % 4 == 0
- Shard 1: short_codes where hash(short_code) % 4 == 1
- Shard 2: short_codes where hash(short_code) % 4 == 2
- Shard 3: short_codes where hash(short_code) % 4 == 3

Each shard handles 25% of traffic. Need more capacity? Add more shards.

The application layer handles routing. Given a short_code, hash it, determine shard, query that shard. Simple and effective.

---

## CDN: Global Performance

For global users, network latency kills performance. A user in Australia connecting to a US server faces 200ms+ latency just for the network round trip.

CDN solves this. Cache redirect responses at edge locations worldwide. User in Australia connects to Australian CDN server, gets redirected in 20ms instead of 200ms.

**CDN configuration:**
- Cache 301 redirects for 1 hour
- Respect cache headers
- Invalidate on URL deletion

With CDN, 90% of redirects never hit our origin servers. Massive cost savings and performance improvement.



---

## The Big Lessons

**Keep the core simple.** URL shortening is fundamentally simple—don't overcomplicate it. Two endpoints, one table, straightforward logic.

**Cache aggressively.** 95% of redirects should never touch your database. Redis is your best friend. Sub-10ms redirects are totally achievable.

**Decouple analytics.** Don't let analytics slow down redirects. Fire-and-forget to a message queue, process asynchronously. Users don't need real-time analytics.

**Plan for abuse.** URL shorteners attract spam and malware. Rate limiting, validation, and blocklists aren't optional—they're essential.

**Scale horizontally.** Every component should scale by adding more instances. Stateless API servers, sharded databases, distributed caches.

**Use the right tool for the job.** PostgreSQL for URL storage, Redis for caching, ClickHouse for analytics, Kafka for event streaming. Don't try to make one database do everything.

---

## Common Pitfalls to Avoid

**Sequential IDs:** Don't use simple auto-increment IDs. They're predictable and reveal your scale. Use distributed ID generation.

**Synchronous analytics:** Don't write analytics on the redirect path. It'll kill your performance. Always async.

**No expiration:** URLs accumulate forever, wasting storage. Implement expiration for temporary links.

**Ignoring security:** Malicious URLs will destroy your reputation. Validate everything, implement rate limiting, maintain blocklists.

**Single database:** One database won't scale to billions of URLs. Plan for sharding from day one.

**No monitoring:** You need visibility into redirect latency, cache hit rates, error rates, and abuse patterns. Monitor everything.

---

## Advanced Features

Once the basics work, consider these enhancements:

**QR Codes:** Generate QR codes for short URLs. Great for print materials and offline-to-online conversion.

**Link Preview:** Show preview of destination before redirecting. Builds trust, reduces phishing concerns.

**A/B Testing:** Support multiple destination URLs, randomly redirect to test variations.

**Geographic Routing:** Redirect to different URLs based on user location. Great for localized content.

**Device Targeting:** Redirect mobile users to app stores, desktop users to websites.

**Password Protection:** Require password before redirecting. Useful for private content.

**Branded Domains:** Let users use custom domains (links.company.com instead of short.url).

These features differentiate premium URL shorteners from basic ones. But get the core right first.

---

## The Bottom Line

Building a URL shortener is a fantastic system design exercise. It seems simple but touches on distributed systems, caching, databases, analytics, security, and scale.

The key insights:
- Use distributed ID generation to avoid collisions
- Cache everything in Redis for sub-10ms redirects
- Decouple analytics with message queues
- Shard your database for horizontal scaling
- Use CDN for global performance
- Implement security measures from day one

Start simple with a single server and database. Add caching when you hit 100 requests/second. Add sharding when you hit 1 billion URLs. Add CDN when you go global. Each optimization solves a real problem at the right time.

And remember: the best URL shortener is one that's fast, reliable, and doesn't lose data. Everything else is nice-to-have.

---

*Building a URL shortener or need help with system design? [Let's talk](/contact.html) about your specific challenges.*
