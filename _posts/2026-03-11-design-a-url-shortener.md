---
layout: post-detail
title: "Design A URL Shortener"
date: 2026-03-11
category: "System Design & Architecture"
tags: ["System Design", "Architecture", "Scalability", "Base62", "Database Design", "Caching"]
image: "/assets/images/posts/url-shortener-hero.svg"
excerpt: "Learn how to build a scalable URL shortener like tinyurl, mapping long URLs to short aliases while handling 365 billion records."
---

# Design A URL Shortener

In this chapter, we will tackle an interesting and classic system design interview question: designing a URL shortening service like tinyurl.

## Step 1 - Understand the problem and establish design scope

System design interview questions are intentionally left open-ended. To design a well-crafted system, it is critical to ask clarification questions.

**Candidate:** Can you give an example of how a URL shortener works?  
**Interviewer:** Assume URL `https://www.systeminterview.com/q=chatsystem&c=loggedin&v=v3&l=long` is the original URL. Your service creates an alias with a shorter length: `https://tinyurl.com/y7keocwj`. If you click the alias, it redirects you to the original URL.

**Candidate:** What is the traffic volume?  
**Interviewer:** 100 million URLs are generated per day.

**Candidate:** How long is the shortened URL?  
**Interviewer:** As short as possible.

**Candidate:** What characters are allowed in the shortened URL?  
**Interviewer:** Shortened URLs can be a combination of numbers (0-9) and characters (a-z, A-Z).

**Candidate:** Can shortened URLs be deleted or updated?  
**Interviewer:** For simplicity, let us assume shortened URLs cannot be deleted or updated.

Here are the basic use cases:
- **URL shortening:** given a long URL => return a much shorter URL
- **URL redirecting:** given a shorter URL => redirect to the original URL
- High availability, scalability, and fault tolerance considerations

### Back of the envelope estimation

- **Write operation:** 100 million URLs are generated per day.
- **Write operation per second:** 100 million / 24 / 3600 = 1,160
- **Read operation:** Assuming ratio of read operations to write operations is 10:1, read operations per second: 1,160 * 10 = 11,600
- **Storage:** Assuming the URL shortener service will run for 10 years, this means we must support 100 million * 365 * 10 = 365 billion records.
- Assume average URL length is 100 bytes.
- **Storage requirement over 10 years:** 365 billion * 100 bytes = 36.5 TB

It is important for you to walk through the assumptions and calculations with your interviewer so that both of you are on the same page.

---

## Step 2 - Propose high-level design and get buy-in

In this section, we discuss the API endpoints, URL redirecting, and URL shortening flows.

### API Endpoints

API endpoints facilitate the communication between clients and servers. A URL shortener primarily needs two API endpoints.

**1. URL shortening.** To create a new short URL, a client sends a POST request containing the original long URL. 

`POST api/v1/data/shorten`
- request parameter: `longUrl` string
- return: `shortURL`

**2. URL redirecting.** To redirect a short URL to the corresponding long URL, a client sends a GET request.

`GET api/v1/shortUrl`
- return: `longURL` for HTTP redirection

### URL Redirecting

What happens when you enter a tinyurl into the browser? Once the server receives a tinyurl request, it changes the short URL to the long URL with a 301 redirect. 

![URL Redirect Flow](/assets/images/posts/url-shortener-architecture.svg)

One thing worth discussing here is **301 redirect vs 302 redirect**.

- **301 redirect:** Shows that the requested URL is "permanently" moved. Since it is permanently redirected, the browser caches the response. Subsequent requests for the same URL will not hit our servers; they happily skip us and go directly to the long URL server.
- **302 redirect:** Means the URL is "temporarily" moved. Subsequent requests will always hit our URL shortening service first before being redirected.

If your priority is reducing server load, 301 makes sense. If analytics and tracking every single click is important, 302 is the better choice.

The most intuitive way to implement redirecting is with hash tables (or a database mapping table). Assuming the database stores `<shortURL, longURL>` pairs:
Get longURL: `longURL = database.get(shortURL)`
Once you get the longURL, simply perform the HTTP redirect.

### URL Shortening

To support shortening, we must map a long URL to a `hashValue`. The hash function must satisfy two requirements:
1. Each longURL must be hashed to one hashValue.
2. Each hashValue can be mapped back to the longURL.

---

## Step 3 - Design deep dive

Up until now, we have discussed the high-level design. Let's dive deep into the data model and the hash function.

### Data Model

In the high-level design, we mentally stored everything in a hash table. While this is a good starting point to explain the concept to an interviewer, storing 36.5 TB in memory isn't feasible. 

A better approach is storing the `<shortURL, longURL>` mapping in a relational database or a NoSQL database built for scale. 

### Hash Function

The hash function hashes a long URL to a short `hashValue` consisting of characters from `[0-9, a-z, A-Z]`. Since that gives us 62 possible characters, we need to figure out the length of the string to support 365 billion URLs.

If we use 7 characters (62^7), that gives us ~3.5 trillion possible variations. This is more than enough for our 365 billion goal, so our `hashValue` length is 7 characters.

We will explore two types of hash functions: "Hash + collision resolution" and "Base 62 conversion." 

### Approach A: Hash + collision resolution

A straightforward solution is to use well-known cryptographic hash functions like CRC32, MD5, or SHA-1 on the original URL. However, an MD5 hash returns a 32-character string. That's too long!

![Hashing Collision Problem](/assets/images/posts/url-shortener-hashing.svg)

To make it shorter, we take just the first 7 characters. However, truncating a hash dramatically increases the chance of collisions (where two different URLs generate the exact same 7-character string).

To resolve hash collisions, we recursively append a new predefined string (like a timestamp) to the original URL and re-hash it until we find a unique string. This eliminates collisions but it is painfully slow, requiring a database query to check for existence every single time we hash. 

### Approach B: Base 62 conversion

Base conversion helps convert a number between different representation systems. Base 62 is used because we have 62 potential characters. 

Instead of hashing the URL, imagine a centralized uniqueness generator that simply hands out sequential IDs. First URL gets ID `1`, next is `2`, all the way up to `11157`.

We then convert that numeric ID into Base 62. The number `11157` mathematically converts into `2TX` in Base 62. Thus, the short URL becomes `https://tinyurl.com/2TX`.

![Base62 Conversion](/assets/images/posts/url-shortener-base62.svg)

**Comparing the two:**
- **Hash + Collision:** Fixed URL length. Doesn't require a master ID generator. Collisions are painful and require resolution.
- **Base 62:** Predictable length that grows over time. Requires a unique ID generator. Mathematically impossible to have collisions.

For a URL shortener, Base 62 conversion using a dedicated distributed unique ID generator is the industry standard.

### URL Shortening Deep Dive

Let's walk through the full flow using Base 62:

1. System receives `longURL`.
2. Check if the `longURL` is already in the database. If yes, return the existing `shortURL`.
3. If new, ask our highly-available Unique ID Generator for a brand new sequential ID (e.g., `2009215674938`).
4. Convert that massive ID to a Base 62 short URL (e.g., `zn9edcu`).
5. Save the ID, `shortURL`, and `longURL` to the database.

### URL Redirecting Deep Dive

Since there are 10 times more reads than writes, hitting the database for every single click will overwhelm the system. The mapping must definitely be stored in a high-speed cache like Redis.

1. A user clicks `https://tinyurl.com/zn9edcu`.
2. The load balancer forwards the request to the web server.
3. If the cache contains the short URL, return the long URL instantly (sub-millisecond latency).
4. If it's a cache miss, fetch the mapping from the database and write it back to the cache for the next person before returning the result.

---

## Step 4 - Wrap up

In this chapter, we talked about the API design, data model, hash function, URL shortening, and URL redirecting. If there is extra time at the end of the interview, here are a few additional talking points over coffee:

- **Rate limiter:** Malicious users could send overwhelming numbers of URL shortening requests to take down the ID generator. A rate limiter filters these out by IP.
- **Web server scaling:** Since the web tier is entirely stateless, we can effortlessly scale out by throwing more API servers behind our load balancer.
- **Database scaling:** Remember that 36.5 TB of data? We'd likely need database replication and sharding, utilizing a NoSQL key-value store to handle that payload easily across distributed nodes.
- **Analytics:** Data is critical for business success. Integrating an analytics system (perhaps utilizing a message queue and asynchronous worker) to track click rates and locations adds immense value.

Congratulations on getting this far! Now give yourself a pat on the back. Good job!
