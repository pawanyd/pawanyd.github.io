---
layout: post-detail
title: "System Design Fundamentals: Building Twitter from Scratch"
date: 2026-03-22
category: "System Design & Architecture"
tags: ["System Design", "Distributed Systems", "Scalability", "Architecture", "Twitter", "Real-World"]
image: "/assets/images/posts/system-design-fundamentals-hero.svg"
excerpt: "Learn every system design concept by building Twitter from scratch. From simple beginnings to 500M users - understand when and why each pattern matters."
author: "Pawan Kumar"
---

# System Design Fundamentals: Building Twitter from Scratch

You're in a system design interview. The interviewer says: "Design Twitter." 

Your mind races. Where do you even start? Do you jump straight to microservices? Talk about Kafka? Mention sharding? The problem isn't that you don't know these terms—it's that you don't know when to use them.

I've been there. Early in my career, I'd throw every buzzword I knew at system design problems. "We'll use microservices with Kafka and Redis and shard the database!" The interviewer would ask, "Why?" I had no answer.

Here's what changed everything for me: Stop memorizing solutions. Start understanding the journey.

Every massive system started simple. Twitter began as a basic web app. Instagram was just photo uploads. Netflix started by mailing DVDs. They didn't architect for a billion users on day one—they evolved as problems emerged.

In this guide, we're going to build Twitter together. We'll start with the simplest possible design, then watch it break. Each time it breaks, we'll introduce exactly one new concept to fix it. By the end, you'll understand not just what each system design pattern is, but when and why you need it.

This is how you learn system design—by seeing problems emerge and solving them, one step at a time.

---

## The Problem: Design Twitter

Let's define what we're building. Twitter lets users:
- Post tweets (280 characters)
- Follow other users
- See a timeline of tweets from people they follow
- Like and retweet

Non-functional requirements:
- Fast timeline loading (under 1 second)
- Handle millions of users
- High availability (always accessible)

Let's start building.

---

## Version 1: The Simplest Possible Design

When you're starting, always begin with the absolute simplest architecture that could work.


<svg role="img" aria-labelledby="v1-title v1-desc" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <title id="v1-title">Version 1: Simple Three-Tier Architecture</title>
  <desc id="v1-desc">Basic architecture with client, web server, and database</desc>
  
  <rect width="800" height="400" fill="#f8fafc"/>
  
  <text x="400" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Version 1: The Simplest Design</text>
  
  <!-- Client -->
  <g transform="translate(150, 200)">
    <rect x="-60" y="-40" width="120" height="80" rx="8" fill="#3b82f6"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Web</text>
    <text x="0" y="15" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Browser</text>
  </g>
  
  <!-- Web Server -->
  <g transform="translate(400, 200)">
    <rect x="-70" y="-50" width="140" height="100" rx="8" fill="#10b981"/>
    <rect x="-50" y="-25" width="100" height="10" rx="2" fill="white"/>
    <rect x="-50" y="-10" width="100" height="10" rx="2" fill="white"/>
    <rect x="-50" y="5" width="100" height="10" rx="2" fill="white"/>
    <text x="0" y="40" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Web Server</text>
  </g>
  
  <!-- Database -->
  <g transform="translate(650, 200)">
    <ellipse cx="0" cy="-30" rx="60" ry="18" fill="#f59e0b"/>
    <rect x="-60" y="-30" width="120" height="60" fill="#f59e0b"/>
    <ellipse cx="0" cy="30" rx="60" ry="18" fill="#d97706"/>
    <text x="0" y="65" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">Database</text>
  </g>
  
  <!-- Arrows -->
  <path d="M 210 200 L 330 200" stroke="#64748b" stroke-width="3" marker-end="url(#arrow1)"/>
  <path d="M 470 200 L 590 200" stroke="#64748b" stroke-width="3" marker-end="url(#arrow1)"/>
  
  <!-- Labels -->
  <text x="270" y="190" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">HTTP</text>
  <text x="530" y="190" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">SQL</text>
  
  <!-- Stats -->
  <text x="400" y="350" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Handles: ~1,000 users | Cost: $50/month</text>
  
  <defs>
    <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
</svg>

**Architecture:**
- One web server running your application code
- One database (PostgreSQL) storing everything
- Users connect directly to your server

**Database Schema:**
```
users: id, username, email, created_at
tweets: id, user_id, content, created_at
follows: follower_id, following_id
```

**How timeline works:**
When a user loads their timeline, you query:
```sql
SELECT tweets.* FROM tweets
JOIN follows ON tweets.user_id = follows.following_id
WHERE follows.follower_id = current_user_id
ORDER BY created_at DESC
LIMIT 50
```

This works! You launch. You get 1,000 users. Everything is fast. Life is good.

Then you hit 10,000 users. The server starts slowing down. Timeline queries take 3 seconds. Users complain.

**Problem #1: Single server can't handle the load.**

---

## Concept #1: Vertical Scaling

Your first instinct: make the server more powerful.

**Vertical Scaling** means upgrading your existing server—more CPU, more RAM, faster disk.

<svg role="img" aria-labelledby="vertical-title vertical-desc" viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
  <title id="vertical-title">Vertical Scaling</title>
  <desc id="vertical-desc">Upgrading a single server with more resources</desc>
  
  <rect width="800" height="350" fill="#f8fafc"/>
  
  <text x="400" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Vertical Scaling: Scale Up</text>
  
  <!-- Before -->
  <g transform="translate(200, 180)">
    <rect x="-60" y="-60" width="120" height="120" rx="8" fill="#94a3b8"/>
    <text x="0" y="-30" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Server</text>
    <text x="0" y="-10" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">2 CPU</text>
    <text x="0" y="10" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">4GB RAM</text>
    <text x="0" y="30" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">100GB Disk</text>
    <text x="0" y="90" font-family="Arial, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Before</text>
  </g>
  
  <!-- Arrow -->
  <path d="M 320 180 L 480 180" stroke="#10b981" stroke-width="4" marker-end="url(#arrow-vert)"/>
  <text x="400" y="170" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#10b981" text-anchor="middle">UPGRADE</text>
  
  <!-- After -->
  <g transform="translate(600, 180)">
    <rect x="-70" y="-70" width="140" height="140" rx="8" fill="#10b981"/>
    <text x="0" y="-35" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Server</text>
    <text x="0" y="-10" font-family="Arial, sans-serif" font-size="13" fill="white" text-anchor="middle">8 CPU</text>
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="13" fill="white" text-anchor="middle">32GB RAM</text>
    <text x="0" y="34" font-family="Arial, sans-serif" font-size="13" fill="white" text-anchor="middle">1TB SSD</text>
    <text x="0" y="100" font-family="Arial, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">After</text>
  </g>
  
  <!-- Stats -->
  <text x="400" y="320" font-family="Arial, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Handles: ~50,000 users | Cost: $400/month</text>
  
  <defs>
    <marker id="arrow-vert" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto">
      <polygon points="0 0, 12 3, 0 6" fill="#10b981"/>
    </marker>
  </defs>
</svg>

**Real-world example:** Stack Overflow ran on a single powerful server for years. They vertically scaled before needing multiple servers.

**Pros:**
- Simple—no code changes needed
- No complexity added
- Works immediately

**Cons:**
- There's a ceiling—you can't infinitely upgrade one machine
- Expensive at high end
- Single point of failure

You upgrade. Now you handle 50,000 users. But you're hitting the limits. The biggest server you can buy costs $10,000/month and you're still seeing slowdowns.

**Problem #2: One server has physical limits.**

---

## Concept #2: Horizontal Scaling & Load Balancing

Instead of one big server, use many small servers.

**Horizontal Scaling** means adding more servers. But now you need something to distribute traffic between them.

**Load Balancer** sits in front of your servers and routes each request to an available server.


<svg role="img" aria-labelledby="horizontal-title horizontal-desc" viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
  <title id="horizontal-title">Horizontal Scaling with Load Balancer</title>
  <desc id="horizontal-desc">Multiple servers behind a load balancer distributing traffic</desc>
  
  <rect width="900" height="500" fill="#f8fafc"/>
  
  <text x="450" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Horizontal Scaling: Scale Out</text>
  
  <!-- Clients -->
  <g transform="translate(100, 150)">
    <circle cx="0" cy="0" r="25" fill="#3b82f6"/>
    <text x="0" y="50" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">User 1</text>
  </g>
  <g transform="translate(100, 250)">
    <circle cx="0" cy="0" r="25" fill="#3b82f6"/>
    <text x="0" y="50" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">User 2</text>
  </g>
  <g transform="translate(100, 350)">
    <circle cx="0" cy="0" r="25" fill="#3b82f6"/>
    <text x="0" y="50" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">User 3</text>
  </g>
  
  <!-- Load Balancer -->
  <g transform="translate(300, 250)">
    <rect x="-60" y="-70" width="120" height="140" rx="8" fill="#7c3aed"/>
    <circle cx="0" cy="-35" r="12" fill="white"/>
    <circle cx="-25" cy="10" r="12" fill="white"/>
    <circle cx="25" cy="10" r="12" fill="white"/>
    <line x1="0" y1="-23" x2="-25" y2="-2" stroke="white" stroke-width="3"/>
    <line x1="0" y1="-23" x2="25" y2="-2" stroke="white" stroke-width="3"/>
    <text x="0" y="95" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Load Balancer</text>
  </g>
  
  <!-- Servers -->
  <g transform="translate(550, 120)">
    <rect x="-50" y="-40" width="100" height="80" rx="6" fill="#10b981"/>
    <rect x="-35" y="-20" width="70" height="8" rx="2" fill="white"/>
    <rect x="-35" y="-5" width="70" height="8" rx="2" fill="white"/>
    <rect x="-35" y="10" width="70" height="8" rx="2" fill="white"/>
    <text x="0" y="60" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">Server 1</text>
  </g>
  
  <g transform="translate(550, 250)">
    <rect x="-50" y="-40" width="100" height="80" rx="6" fill="#10b981"/>
    <rect x="-35" y="-20" width="70" height="8" rx="2" fill="white"/>
    <rect x="-35" y="-5" width="70" height="8" rx="2" fill="white"/>
    <rect x="-35" y="10" width="70" height="8" rx="2" fill="white"/>
    <text x="0" y="60" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">Server 2</text>
  </g>
  
  <g transform="translate(550, 380)">
    <rect x="-50" y="-40" width="100" height="80" rx="6" fill="#10b981"/>
    <rect x="-35" y="-20" width="70" height="8" rx="2" fill="white"/>
    <rect x="-35" y="-5" width="70" height="8" rx="2" fill="white"/>
    <rect x="-35" y="10" width="70" height="8" rx="2" fill="white"/>
    <text x="0" y="60" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">Server 3</text>
  </g>
  
  <!-- Database -->
  <g transform="translate(750, 250)">
    <ellipse cx="0" cy="-25" rx="50" ry="15" fill="#f59e0b"/>
    <rect x="-50" y="-25" width="100" height="50" fill="#f59e0b"/>
    <ellipse cx="0" cy="25" rx="50" ry="15" fill="#d97706"/>
    <text x="0" y="55" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">Database</text>
  </g>
  
  <!-- Arrows: Users to LB -->
  <path d="M 130 150 L 235 210" stroke="#64748b" stroke-width="2" marker-end="url(#arrow-h)"/>
  <path d="M 130 250 L 235 250" stroke="#64748b" stroke-width="2" marker-end="url(#arrow-h)"/>
  <path d="M 130 350 L 235 290" stroke="#64748b" stroke-width="2" marker-end="url(#arrow-h)"/>
  
  <!-- Arrows: LB to Servers -->
  <path d="M 365 210 L 495 140" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-h)"/>
  <path d="M 365 250 L 495 250" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-h)"/>
  <path d="M 365 290 L 495 360" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-h)"/>
  
  <!-- Arrows: Servers to DB -->
  <path d="M 605 120 L 695 225" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 605 250 L 695 250" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 605 380 L 695 275" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  
  <!-- Stats -->
  <text x="450" y="480" font-family="Arial, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Handles: ~500,000 users | Can add more servers as needed</text>
  
  <defs>
    <marker id="arrow-h" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
</svg>

**Load Balancing Algorithms:**

1. **Round Robin:** Send request 1 to server A, request 2 to server B, request 3 to server C, repeat
2. **Least Connections:** Send to server with fewest active connections
3. **IP Hash:** Same user always goes to same server (useful for sessions)

**Real-world example:** Netflix uses Elastic Load Balancing (AWS) to distribute traffic across thousands of servers. During peak hours, they automatically add more servers.

**Pros:**
- Nearly unlimited scaling—just add more servers
- Redundancy—if one server dies, others keep working
- Cost-effective—use many cheap servers instead of one expensive one

**Cons:**
- More complex—need to manage multiple servers
- Stateless servers required (we'll fix this)

You now have 3 servers behind a load balancer. You handle 500,000 users. But there's a problem: users keep getting logged out randomly.

**Problem #3: User sessions are lost when load balancer sends them to different servers.**

---

## Concept #3: Stateless Servers & Session Storage

Your servers are **stateful**—they store user session data in memory. When a user logs in on Server 1, their session is stored there. If their next request goes to Server 2, they appear logged out.

**Solution:** Make servers **stateless**. Store session data externally where all servers can access it.

**Session Store** is a fast database (usually Redis or Memcached) that stores temporary data like user sessions.

<svg role="img" aria-labelledby="session-title session-desc" viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
  <title id="session-title">Stateless Servers with Session Store</title>
  <desc id="session-desc">Servers storing session data in external Redis cache</desc>
  
  <rect width="900" height="450" fill="#f8fafc"/>
  
  <text x="450" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Stateless Architecture with Session Store</text>
  
  <!-- Load Balancer -->
  <g transform="translate(150, 225)">
    <rect x="-50" y="-50" width="100" height="100" rx="8" fill="#7c3aed"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Load</text>
    <text x="0" y="22" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Balancer</text>
  </g>
  
  <!-- Servers -->
  <g transform="translate(350, 120)">
    <rect x="-45" y="-35" width="90" height="70" rx="6" fill="#10b981"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Server 1</text>
    <text x="0" y="55" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Stateless</text>
  </g>
  
  <g transform="translate(350, 225)">
    <rect x="-45" y="-35" width="90" height="70" rx="6" fill="#10b981"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Server 2</text>
    <text x="0" y="55" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Stateless</text>
  </g>
  
  <g transform="translate(350, 330)">
    <rect x="-45" y="-35" width="90" height="70" rx="6" fill="#10b981"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Server 3</text>
    <text x="0" y="55" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Stateless</text>
  </g>
  
  <!-- Redis Session Store -->
  <g transform="translate(550, 225)">
    <rect x="-70" y="-50" width="140" height="100" rx="8" fill="#ef4444"/>
    <circle cx="-30" cy="-15" r="10" fill="white"/>
    <circle cx="0" cy="-15" r="10" fill="white"/>
    <circle cx="30" cy="-15" r="10" fill="white"/>
    <circle cx="-30" cy="15" r="10" fill="white"/>
    <circle cx="0" cy="15" r="10" fill="white"/>
    <circle cx="30" cy="15" r="10" fill="white"/>
    <text x="0" y="70" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Redis</text>
    <text x="0" y="88" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Session Store</text>
  </g>
  
  <!-- Database -->
  <g transform="translate(750, 225)">
    <ellipse cx="0" cy="-25" rx="50" ry="15" fill="#f59e0b"/>
    <rect x="-50" y="-25" width="100" height="50" fill="#f59e0b"/>
    <ellipse cx="0" cy="25" rx="50" ry="15" fill="#d97706"/>
    <text x="0" y="55" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">Database</text>
  </g>
  
  <!-- Arrows -->
  <path d="M 200 225 L 300 140" stroke="#64748b" stroke-width="2" marker-end="url(#arrow-s)"/>
  <path d="M 200 225 L 300 225" stroke="#64748b" stroke-width="2" marker-end="url(#arrow-s)"/>
  <path d="M 200 225 L 300 310" stroke="#64748b" stroke-width="2" marker-end="url(#arrow-s)"/>
  
  <path d="M 395 120 L 475 190" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 395 225 L 475 225" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 395 330 L 475 260" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
  
  <path d="M 620 225 L 695 225" stroke="#64748b" stroke-width="2"/>
  
  <!-- Labels -->
  <text x="550" y="140" font-family="Arial, sans-serif" font-size="11" fill="#ef4444" text-anchor="middle">Read/Write</text>
  <text x="550" y="155" font-family="Arial, sans-serif" font-size="11" fill="#ef4444" text-anchor="middle">Sessions</text>
  
  <defs>
    <marker id="arrow-s" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
</svg>

**How it works:**
1. User logs in on Server 1
2. Server 1 stores session in Redis with a key (session ID)
3. Server 1 sends session ID to user as a cookie
4. User's next request goes to Server 2
5. Server 2 reads session from Redis using the session ID
6. User stays logged in!

**Real-world example:** Instagram uses Redis for session storage. With millions of concurrent users, any server can handle any request because sessions are centralized.

**Why Redis?**
- In-memory = extremely fast (microseconds)
- Built-in expiration (sessions auto-delete after timeout)
- Simple key-value storage

You're now handling 1 million users. Timelines load fast. But you notice the database is struggling. Queries are slow.

**Problem #4: Database is the bottleneck.**

---

## Concept #4: Database Indexing

Your timeline query scans millions of tweets to find the right ones. That's slow.

**Database Index** is like a book's index—instead of reading every page to find "Redis," you look it up in the index and jump to the right page.


<svg role="img" aria-labelledby="index-title index-desc" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <title id="index-title">Database Indexing</title>
  <desc id="index-desc">How database indexes speed up queries by creating lookup structures</desc>
  
  <rect width="800" height="500" fill="#f8fafc"/>
  
  <text x="400" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Database Indexing</text>
  
  <!-- Without Index -->
  <g transform="translate(200, 100)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#ef4444" text-anchor="middle">Without Index</text>
    <text x="0" y="25" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Full Table Scan</text>
    
    <!-- Table rows -->
    <rect x="-80" y="50" width="160" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
    <text x="0" y="70" font-family="monospace" font-size="11" fill="#1e293b" text-anchor="middle">user_id: 1 | tweet...</text>
    
    <rect x="-80" y="85" width="160" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
    <text x="0" y="105" font-family="monospace" font-size="11" fill="#1e293b" text-anchor="middle">user_id: 2 | tweet...</text>
    
    <rect x="-80" y="120" width="160" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
    <text x="0" y="140" font-family="monospace" font-size="11" fill="#1e293b" text-anchor="middle">user_id: 3 | tweet...</text>
    
    <rect x="-80" y="155" width="160" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
    <text x="0" y="175" font-family="monospace" font-size="11" fill="#1e293b" text-anchor="middle">user_id: 4 | tweet...</text>
    
    <text x="0" y="205" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">...</text>
    
    <rect x="-80" y="220" width="160" height="30" fill="#dcfce7" stroke="#10b981" stroke-width="3"/>
    <text x="0" y="240" font-family="monospace" font-size="11" fill="#1e293b" text-anchor="middle">user_id: 999 | tweet</text>
    
    <text x="0" y="280" font-family="Arial, sans-serif" font-size="13" fill="#ef4444" text-anchor="middle">Scans 1M rows</text>
    <text x="0" y="300" font-family="Arial, sans-serif" font-size="13" fill="#ef4444" text-anchor="middle">Time: 2000ms</text>
  </g>
  
  <!-- With Index -->
  <g transform="translate(600, 100)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#10b981" text-anchor="middle">With Index</text>
    <text x="0" y="25" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">B-Tree Lookup</text>
    
    <!-- B-Tree structure -->
    <circle cx="0" cy="80" r="25" fill="#10b981"/>
    <text x="0" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">500</text>
    
    <circle cx="-50" cy="150" r="20" fill="#10b981"/>
    <text x="-50" y="155" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white" text-anchor="middle">250</text>
    
    <circle cx="50" cy="150" r="20" fill="#10b981"/>
    <text x="50" y="155" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white" text-anchor="middle">750</text>
    
    <circle cx="-80" cy="210" r="18" fill="#10b981"/>
    <text x="-80" y="215" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">100</text>
    
    <circle cx="-20" cy="210" r="18" fill="#dcfce7" stroke="#10b981" stroke-width="3"/>
    <text x="-20" y="215" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#10b981" text-anchor="middle">999</text>
    
    <circle cx="20" cy="210" r="18" fill="#10b981"/>
    <text x="20" y="215" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">600</text>
    
    <circle cx="80" cy="210" r="18" fill="#10b981"/>
    <text x="80" y="215" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">900</text>
    
    <!-- Lines -->
    <line x1="0" y1="105" x2="-50" y2="130" stroke="#10b981" stroke-width="2"/>
    <line x1="0" y1="105" x2="50" y2="130" stroke="#10b981" stroke-width="2"/>
    <line x1="-50" y1="170" x2="-80" y2="192" stroke="#10b981" stroke-width="2"/>
    <line x1="-50" y1="170" x2="-20" y2="192" stroke="#10b981" stroke-width="2"/>
    <line x1="50" y1="170" x2="20" y2="192" stroke="#10b981" stroke-width="2"/>
    <line x1="50" y1="170" x2="80" y2="192" stroke="#10b981" stroke-width="2"/>
    
    <text x="0" y="260" font-family="Arial, sans-serif" font-size="13" fill="#10b981" text-anchor="middle">3 lookups</text>
    <text x="0" y="280" font-family="Arial, sans-serif" font-size="13" fill="#10b981" text-anchor="middle">Time: 5ms</text>
    <text x="0" y="300" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#10b981" text-anchor="middle">400x faster!</text>
  </g>
  
  <!-- Query example -->
  <rect x="50" y="380" width="700" height="80" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
  <text x="400" y="405" font-family="monospace" font-size="13" fill="#1e293b" text-anchor="middle">CREATE INDEX idx_user_id ON tweets(user_id);</text>
  <text x="400" y="430" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Now queries filtering by user_id are instant</text>
</svg>

**Indexes to create for Twitter:**
```sql
CREATE INDEX idx_tweets_user_id ON tweets(user_id);
CREATE INDEX idx_tweets_created_at ON tweets(created_at);
CREATE INDEX idx_follows_follower ON follows(follower_id);
```

**Real-world example:** LinkedIn indexes user profiles by name, company, location, skills. Without indexes, searching "software engineer at Google" would scan 800 million profiles. With indexes, it's instant.

**Trade-offs:**
- Faster reads (queries)
- Slower writes (must update index)
- More storage space

Indexes help, but you're still hitting the database for every timeline request. With 10 million users, that's millions of database queries per minute.

**Problem #5: Database can't handle read traffic.**

---

## Concept #5: Caching

Most users see the same tweets repeatedly. Why query the database every time?

**Cache** stores frequently accessed data in memory (RAM) for instant retrieval.

<svg role="img" aria-labelledby="cache-title cache-desc" viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
  <title id="cache-title">Caching Layer</title>
  <desc id="cache-desc">Cache sits between application and database to serve frequent requests</desc>
  
  <rect width="900" height="500" fill="#f8fafc"/>
  
  <text x="450" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Caching Layer</text>
  
  <!-- Server -->
  <g transform="translate(200, 250)">
    <rect x="-60" y="-50" width="120" height="100" rx="8" fill="#10b981"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Web</text>
    <text x="0" y="18" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Server</text>
  </g>
  
  <!-- Cache -->
  <g transform="translate(450, 250)">
    <rect x="-80" y="-60" width="160" height="120" rx="8" fill="#ef4444"/>
    <circle cx="-35" cy="-20" r="12" fill="white"/>
    <circle cx="0" cy="-20" r="12" fill="white"/>
    <circle cx="35" cy="-20" r="12" fill="white"/>
    <circle cx="-35" cy="15" r="12" fill="white"/>
    <circle cx="0" cy="15" r="12" fill="white"/>
    <circle cx="35" cy="15" r="12" fill="white"/>
    <text x="0" y="80" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">Redis Cache</text>
    <text x="0" y="100" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">In-Memory</text>
  </g>
  
  <!-- Database -->
  <g transform="translate(700, 250)">
    <ellipse cx="0" cy="-30" rx="60" ry="18" fill="#f59e0b"/>
    <rect x="-60" y="-30" width="120" height="60" fill="#f59e0b"/>
    <ellipse cx="0" cy="30" rx="60" ry="18" fill="#d97706"/>
    <text x="0" y="70" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">Database</text>
    <text x="0" y="90" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">On-Disk</text>
  </g>
  
  <!-- Flow arrows -->
  <path d="M 260 250 L 365 250" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-c)"/>
  <text x="312" y="240" font-family="Arial, sans-serif" font-size="12" fill="#2563eb" text-anchor="middle">1. Check cache</text>
  
  <path d="M 535 250 L 635 250" stroke="#64748b" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrow-c)"/>
  <text x="585" y="240" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">2. If miss</text>
  
  <path d="M 635 270 L 535 270" stroke="#10b981" stroke-width="3" marker-end="url(#arrow-c)"/>
  <text x="585" y="290" font-family="Arial, sans-serif" font-size="12" fill="#10b981" text-anchor="middle">3. Store in cache</text>
  
  <path d="M 365 270 L 260 270" stroke="#10b981" stroke-width="3" marker-end="url(#arrow-c)"/>
  <text x="312" y="290" font-family="Arial, sans-serif" font-size="12" fill="#10b981" text-anchor="middle">4. Return data</text>
  
  <!-- Performance comparison -->
  <g transform="translate(150, 400)">
    <rect x="0" y="0" width="250" height="60" rx="6" fill="#dcfce7" stroke="#10b981" stroke-width="2"/>
    <text x="125" y="25" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#10b981" text-anchor="middle">Cache Hit</text>
    <text x="125" y="45" font-family="Arial, sans-serif" font-size="13" fill="#1e293b" text-anchor="middle">Response: 1ms</text>
  </g>
  
  <g transform="translate(500, 400)">
    <rect x="0" y="0" width="250" height="60" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
    <text x="125" y="25" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ef4444" text-anchor="middle">Cache Miss</text>
    <text x="125" y="45" font-family="Arial, sans-serif" font-size="13" fill="#1e293b" text-anchor="middle">Response: 100ms</text>
  </g>
  
  <defs>
    <marker id="arrow-c" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
</svg>

**Caching Strategy for Twitter:**

1. **Cache user timelines:** Key = `timeline:user_123`, Value = list of tweet IDs
2. **Cache tweet content:** Key = `tweet:456`, Value = tweet data
3. **Set expiration:** Timelines expire after 5 minutes

**Cache Hit Ratio:** Percentage of requests served from cache. Aim for 80%+.

**Real-world example:** Reddit caches the front page in Redis. Instead of querying the database for every visitor, they serve cached results. This handles millions of requests per minute with just a few database queries.

**Cache Invalidation** (the hard part):
- When user posts a tweet, invalidate their followers' timeline caches
- When tweet is deleted, remove from cache
- Use TTL (time-to-live) to auto-expire stale data

You're now handling 50 million users. But you notice writes are slow. Every new tweet takes 500ms to save.

**Problem #6: Single database can't handle write traffic.**

---

## Concept #6: Database Replication

Your database is doing two things: handling reads (timeline queries) and writes (new tweets). Reads are 100x more frequent than writes.

**Database Replication** creates copies of your database. One primary handles writes, multiple replicas handle reads.


<svg role="img" aria-labelledby="replication-title replication-desc" viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
  <title id="replication-title">Database Replication</title>
  <desc id="replication-desc">Primary database for writes, multiple read replicas for queries</desc>
  
  <rect width="900" height="550" fill="#f8fafc"/>
  
  <text x="450" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Database Replication: Primary-Replica</text>
  
  <!-- Application Servers -->
  <g transform="translate(150, 150)">
    <rect x="-50" y="-40" width="100" height="80" rx="6" fill="#10b981"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">App</text>
    <text x="0" y="17" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Server 1</text>
  </g>
  
  <g transform="translate(150, 280)">
    <rect x="-50" y="-40" width="100" height="80" rx="6" fill="#10b981"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">App</text>
    <text x="0" y="17" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Server 2</text>
  </g>
  
  <g transform="translate(150, 410)">
    <rect x="-50" y="-40" width="100" height="80" rx="6" fill="#10b981"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">App</text>
    <text x="0" y="17" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Server 3</text>
  </g>
  
  <!-- Primary Database -->
  <g transform="translate(450, 150)">
    <ellipse cx="0" cy="-30" rx="70" ry="20" fill="#ef4444"/>
    <rect x="-70" y="-30" width="140" height="60" fill="#ef4444"/>
    <ellipse cx="0" cy="30" rx="70" ry="20" fill="#dc2626"/>
    <text x="0" y="10" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">PRIMARY</text>
    <text x="0" y="70" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Write Database</text>
    <text x="0" y="88" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Handles all writes</text>
  </g>
  
  <!-- Read Replicas -->
  <g transform="translate(700, 150)">
    <ellipse cx="0" cy="-25" rx="60" ry="18" fill="#3b82f6"/>
    <rect x="-60" y="-25" width="120" height="50" fill="#3b82f6"/>
    <ellipse cx="0" cy="25" rx="60" ry="18" fill="#2563eb"/>
    <text x="0" y="8" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">REPLICA 1</text>
    <text x="0" y="60" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Read Only</text>
  </g>
  
  <g transform="translate(700, 280)">
    <ellipse cx="0" cy="-25" rx="60" ry="18" fill="#3b82f6"/>
    <rect x="-60" y="-25" width="120" height="50" fill="#3b82f6"/>
    <ellipse cx="0" cy="25" rx="60" ry="18" fill="#2563eb"/>
    <text x="0" y="8" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">REPLICA 2</text>
    <text x="0" y="60" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Read Only</text>
  </g>
  
  <g transform="translate(700, 410)">
    <ellipse cx="0" cy="-25" rx="60" ry="18" fill="#3b82f6"/>
    <rect x="-60" y="-25" width="120" height="50" fill="#3b82f6"/>
    <ellipse cx="0" cy="25" rx="60" ry="18" fill="#2563eb"/>
    <text x="0" y="8" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">REPLICA 3</text>
    <text x="0" y="60" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Read Only</text>
  </g>
  
  <!-- Write arrows (red) -->
  <path d="M 200 150 L 375 150" stroke="#ef4444" stroke-width="3" marker-end="url(#arrow-rep)"/>
  <path d="M 200 280 L 375 165" stroke="#ef4444" stroke-width="3" marker-end="url(#arrow-rep)"/>
  <path d="M 200 410 L 375 180" stroke="#ef4444" stroke-width="3" marker-end="url(#arrow-rep)"/>
  <text x="285" y="140" font-family="Arial, sans-serif" font-size="11" fill="#ef4444" text-anchor="middle">WRITE</text>
  
  <!-- Replication arrows (purple) -->
  <path d="M 525 150 L 635 150" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow-rep)"/>
  <path d="M 525 150 L 635 280" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow-rep)"/>
  <path d="M 525 150 L 635 410" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow-rep)"/>
  <text x="575" y="140" font-family="Arial, sans-serif" font-size="11" fill="#7c3aed" text-anchor="middle">Replicate</text>
  
  <!-- Read arrows (blue) -->
  <path d="M 640 150 L 200 165" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-rep)"/>
  <path d="M 640 280 L 200 280" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-rep)"/>
  <path d="M 640 410 L 200 395" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-rep)"/>
  <text x="420" y="270" font-family="Arial, sans-serif" font-size="11" fill="#3b82f6" text-anchor="middle">READ</text>
  
  <!-- Stats -->
  <text x="450" y="530" font-family="Arial, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Writes: 1 DB | Reads: 3 DBs = 3x read capacity</text>
  
  <defs>
    <marker id="arrow-rep" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
</svg>

**How it works:**
1. All writes go to primary database
2. Primary replicates changes to replicas (usually async)
3. All reads go to replicas
4. If primary fails, promote a replica to primary

**Real-world example:** YouTube uses primary-replica replication. Video metadata writes go to primary. Billions of video views query replicas. This separates write and read traffic.

**Replication Lag:** Replicas might be slightly behind primary (milliseconds to seconds). This is **eventual consistency**—data will be consistent eventually, but might be temporarily out of sync.

**Trade-offs:**
- Scales reads horizontally (add more replicas)
- Doesn't scale writes (still one primary)
- Introduces consistency challenges

You're now at 100 million users. But you hit another wall: the primary database can't handle write traffic. You need to split the data.

**Problem #7: Single primary database can't handle all writes.**

---

## Concept #7: Database Sharding

**Sharding** splits your database across multiple machines. Each shard holds a subset of data.

<svg role="img" aria-labelledby="sharding-title sharding-desc" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
  <title id="sharding-title">Database Sharding</title>
  <desc id="sharding-desc">Splitting data across multiple database shards based on user ID</desc>
  
  <rect width="1000" height="600" fill="#f8fafc"/>
  
  <text x="500" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Database Sharding by User ID</text>
  
  <!-- Application Layer -->
  <g transform="translate(500, 120)">
    <rect x="-100" y="-40" width="200" height="80" rx="8" fill="#10b981"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Application</text>
    <text x="0" y="15" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">Sharding Logic</text>
  </g>
  
  <!-- Shard 1 -->
  <g transform="translate(200, 350)">
    <ellipse cx="0" cy="-30" rx="70" ry="20" fill="#3b82f6"/>
    <rect x="-70" y="-30" width="140" height="60" fill="#3b82f6"/>
    <ellipse cx="0" cy="30" rx="70" ry="20" fill="#2563eb"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">SHARD 1</text>
    <text x="0" y="70" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Users 0-99M</text>
    <text x="0" y="90" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">user_id % 4 == 0</text>
  </g>
  
  <!-- Shard 2 -->
  <g transform="translate(420, 350)">
    <ellipse cx="0" cy="-30" rx="70" ry="20" fill="#7c3aed"/>
    <rect x="-70" y="-30" width="140" height="60" fill="#7c3aed"/>
    <ellipse cx="0" cy="30" rx="70" ry="20" fill="#6d28d9"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">SHARD 2</text>
    <text x="0" y="70" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Users 100-199M</text>
    <text x="0" y="90" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">user_id % 4 == 1</text>
  </g>
  
  <!-- Shard 3 -->
  <g transform="translate(640, 350)">
    <ellipse cx="0" cy="-30" rx="70" ry="20" fill="#f59e0b"/>
    <rect x="-70" y="-30" width="140" height="60" fill="#f59e0b"/>
    <ellipse cx="0" cy="30" rx="70" ry="20" fill="#d97706"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">SHARD 3</text>
    <text x="0" y="70" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Users 200-299M</text>
    <text x="0" y="90" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">user_id % 4 == 2</text>
  </g>
  
  <!-- Shard 4 -->
  <g transform="translate(860, 350)">
    <ellipse cx="0" cy="-30" rx="70" ry="20" fill="#ef4444"/>
    <rect x="-70" y="-30" width="140" height="60" fill="#ef4444"/>
    <ellipse cx="0" cy="30" rx="70" ry="20" fill="#dc2626"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">SHARD 4</text>
    <text x="0" y="70" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Users 300-399M</text>
    <text x="0" y="90" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">user_id % 4 == 3</text>
  </g>
  
  <!-- Arrows -->
  <path d="M 450 160 L 250 300" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrow-sh)"/>
  <path d="M 480 160 L 420 300" stroke="#7c3aed" stroke-width="3" marker-end="url(#arrow-sh)"/>
  <path d="M 520 160 L 640 300" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow-sh)"/>
  <path d="M 550 160 L 810 300" stroke="#ef4444" stroke-width="3" marker-end="url(#arrow-sh)"/>
  
  <!-- Example -->
  <rect x="50" y="480" width="900" height="90" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
  <text x="500" y="510" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">Example: User 12345 posts a tweet</text>
  <text x="500" y="535" font-family="monospace" font-size="12" fill="#64748b" text-anchor="middle">shard = 12345 % 4 = 1 → Route to SHARD 2</text>
  <text x="500" y="555" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Each shard handles 25% of users = 4x write capacity</text>
  
  <defs>
    <marker id="arrow-sh" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
</svg>

**Sharding Strategies:**

1. **Hash-based:** `shard = user_id % num_shards` (what we're using)
2. **Range-based:** Users 0-100M on shard 1, 100-200M on shard 2
3. **Geographic:** US users on US shard, EU users on EU shard

**Real-world example:** Instagram shards by user ID. Each shard stores photos for a subset of users. This lets them scale writes horizontally—more shards = more write capacity.

**Challenges:**
- Cross-shard queries are expensive (avoid if possible)
- Rebalancing shards is complex
- Hotspots if data isn't evenly distributed

**Problem #8: Users want to see tweets from people they follow, but those users might be on different shards.**

This is where things get interesting. You can't efficiently query across shards. You need a different approach.

---

## Concept #8: Denormalization & Fan-out

Instead of querying for timeline on-demand, pre-compute it.

**Fan-out on Write:** When user posts a tweet, immediately push it to all followers' timelines.

<svg role="img" aria-labelledby="fanout-title fanout-desc" viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
  <title id="fanout-title">Fan-out on Write</title>
  <desc id="fanout-desc">When a user posts, tweet is pushed to all followers' timelines</desc>
  
  <rect width="900" height="550" fill="#f8fafc"/>
  
  <text x="450" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Fan-out on Write Strategy</text>
  
  <!-- User posts tweet -->
  <g transform="translate(150, 150)">
    <circle cx="0" cy="0" r="40" fill="#3b82f6"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">User A</text>
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">posts</text>
    <text x="0" y="70" font-family="Arial, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">1M followers</text>
  </g>
  
  <!-- Tweet -->
  <g transform="translate(350, 150)">
    <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#10b981"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">New Tweet</text>
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="11" fill="white" text-anchor="middle">"Hello World!"</text>
  </g>
  
  <!-- Fan-out service -->
  <g transform="translate(550, 150)">
    <rect x="-70" y="-40" width="140" height="80" rx="8" fill="#7c3aed"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Fan-out</text>
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Service</text>
  </g>
  
  <!-- Follower timelines -->
  <g transform="translate(750, 80)">
    <rect x="-60" y="-25" width="120" height="50" rx="6" fill="#ef4444"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Timeline B</text>
  </g>
  
  <g transform="translate(750, 170)">
    <rect x="-60" y="-25" width="120" height="50" rx="6" fill="#ef4444"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Timeline C</text>
  </g>
  
  <g transform="translate(750, 260)">
    <rect x="-60" y="-25" width="120" height="50" rx="6" fill="#ef4444"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Timeline D</text>
  </g>
  
  <text x="750" y="320" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">... 1M timelines</text>
  
  <!-- Arrows -->
  <path d="M 190 150 L 285 150" stroke="#64748b" stroke-width="3" marker-end="url(#arrow-fo)"/>
  <path d="M 410 150 L 475 150" stroke="#64748b" stroke-width="3" marker-end="url(#arrow-fo)"/>
  
  <path d="M 625 130 L 685 90" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-fo)"/>
  <path d="M 625 150 L 685 170" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-fo)"/>
  <path d="M 625 170 L 685 250" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-fo)"/>
  
  <text x="655" y="120" font-family="Arial, sans-serif" font-size="11" fill="#ef4444" text-anchor="middle">Push to</text>
  <text x="655" y="135" font-family="Arial, sans-serif" font-size="11" fill="#ef4444" text-anchor="middle">all followers</text>
  
  <!-- Comparison -->
  <g transform="translate(100, 400)">
    <rect x="0" y="0" width="350" height="120" rx="8" fill="#dcfce7" stroke="#10b981" stroke-width="2"/>
    <text x="175" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#10b981" text-anchor="middle">Fan-out on Write (Twitter)</text>
    <text x="20" y="55" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">✓ Fast reads (pre-computed)</text>
    <text x="20" y="75" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">✓ Timeline loads instantly</text>
    <text x="20" y="95" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">✗ Slow writes (1M updates)</text>
    <text x="20" y="115" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">✗ Storage intensive</text>
  </g>
  
  <g transform="translate(500, 400)">
    <rect x="0" y="0" width="350" height="120" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text x="175" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#f59e0b" text-anchor="middle">Fan-out on Read (Instagram)</text>
    <text x="20" y="55" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">✓ Fast writes (just store tweet)</text>
    <text x="20" y="75" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">✓ Less storage</text>
    <text x="20" y="95" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">✗ Slow reads (query on demand)</text>
    <text x="20" y="115" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">✗ Complex queries</text>
  </g>
  
  <defs>
    <marker id="arrow-fo" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
</svg>

**Real-world example:** Twitter uses fan-out on write for most users. When you tweet, it's pushed to your followers' timelines. When they load Twitter, their timeline is already computed—instant load.

**Celebrity Problem:** What if you have 100 million followers? Fan-out would take forever. Twitter uses hybrid: fan-out for normal users, on-demand for celebrities.

You're now at 200 million users. System is working well. But you notice: when a server crashes, some requests fail.

**Problem #9: System isn't fault-tolerant.**

---

## Concept #9: Redundancy & Failover

**Redundancy** means having backup components. **Failover** means automatically switching to backups when primary fails.


**Health Checks:** Load balancer pings each server every few seconds. If a server doesn't respond, it's removed from rotation.

**Database Failover:** If primary database fails, automatically promote a replica to primary.

**Real-world example:** Netflix's Chaos Monkey randomly kills servers in production to test failover. This ensures their system can handle failures gracefully.

---

## Concept #10: Content Delivery Network (CDN)

Users are global. A user in Tokyo shouldn't wait for data to travel from a US server.

**CDN** caches static content (images, videos, CSS) on servers worldwide.

<svg role="img" aria-labelledby="cdn-title cdn-desc" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
  <title id="cdn-title">Content Delivery Network</title>
  <desc id="cdn-desc">CDN servers distributed globally serving content from nearest location</desc>
  
  <rect width="1000" height="600" fill="#f8fafc"/>
  
  <text x="500" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Content Delivery Network (CDN)</text>
  
  <!-- Origin Server (center) -->
  <g transform="translate(500, 300)">
    <rect x="-60" y="-50" width="120" height="100" rx="8" fill="#ef4444"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Origin</text>
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Server</text>
    <text x="0" y="70" font-family="Arial, sans-serif" font-size="11" fill="#1e293b" text-anchor="middle">US East</text>
  </g>
  
  <!-- CDN Edge Servers -->
  <g transform="translate(200, 150)">
    <circle cx="0" cy="0" r="45" fill="#3b82f6"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">CDN</text>
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Edge</text>
    <text x="0" y="65" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">London</text>
  </g>
  
  <g transform="translate(800, 150)">
    <circle cx="0" cy="0" r="45" fill="#3b82f6"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">CDN</text>
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Edge</text>
    <text x="0" y="65" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Tokyo</text>
  </g>
  
  <g transform="translate(200, 450)">
    <circle cx="0" cy="0" r="45" fill="#3b82f6"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">CDN</text>
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Edge</text>
    <text x="0" y="65" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Sydney</text>
  </g>
  
  <g transform="translate(800, 450)">
    <circle cx="0" cy="0" r="45" fill="#3b82f6"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">CDN</text>
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Edge</text>
    <text x="0" y="65" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Mumbai</text>
  </g>
  
  <!-- Users -->
  <circle cx="150" cy="150" r="15" fill="#10b981"/>
  <circle cx="850" cy="150" r="15" fill="#10b981"/>
  <circle cx="150" cy="450" r="15" fill="#10b981"/>
  <circle cx="850" cy="450" r="15" fill="#10b981"/>
  
  <!-- Arrows from origin to CDN -->
  <path d="M 460 270 L 240 180" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,5"/>
  <path d="M 540 270 L 760 180" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,5"/>
  <path d="M 460 330 L 240 420" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,5"/>
  <path d="M 540 330 L 760 420" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,5"/>
  
  <text x="350" y="220" font-family="Arial, sans-serif" font-size="11" fill="#7c3aed" text-anchor="middle">Sync</text>
  
  <!-- Arrows from users to CDN -->
  <path d="M 170 150 L 185 150" stroke="#10b981" stroke-width="2"/>
  <path d="M 835" y1="150" x2="820" y2="150" stroke="#10b981" stroke-width="2"/>
  
  <!-- Stats -->
  <rect x="100" y="530" width="800" height="50" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
  <text x="500" y="555" font-family="Arial, sans-serif" font-size="13" fill="#1e293b" text-anchor="middle">User in Tokyo: 20ms from CDN vs 200ms from US origin = 10x faster</text>
</svg>

**Real-world example:** Netflix stores popular shows on CDN servers in every major city. When you watch Stranger Things, you're streaming from a server 20 miles away, not from Netflix's data center.

**CDN for Twitter:**
- Profile pictures
- Tweet images/videos
- Static assets (CSS, JavaScript)

---

## Concept #11: Asynchronous Processing & Message Queues

Some tasks don't need to happen immediately. When a user posts a tweet, you need to:
- Save tweet to database (immediate)
- Fan-out to followers (can be async)
- Send notifications (can be async)
- Update analytics (can be async)

**Message Queue** buffers tasks for background processing.

<svg role="img" aria-labelledby="queue-title queue-desc" viewBox="0 0 1000 450" xmlns="http://www.w3.org/2000/svg">
  <title id="queue-title">Message Queue for Async Processing</title>
  <desc id="queue-desc">Tasks are queued and processed by worker servers asynchronously</desc>
  
  <rect width="1000" height="450" fill="#f8fafc"/>
  
  <text x="500" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b" text-anchor="middle">Asynchronous Processing with Message Queue</text>
  
  <!-- Web Server -->
  <g transform="translate(150, 225)">
    <rect x="-60" y="-50" width="120" height="100" rx="8" fill="#10b981"/>
    <text x="0" y="-5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Web</text>
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Server</text>
  </g>
  
  <!-- Message Queue -->
  <g transform="translate(400, 225)">
    <rect x="-100" y="-60" width="200" height="120" rx="8" fill="#7c3aed"/>
    <rect x="-80" y="-30" width="30" height="60" fill="white" opacity="0.9"/>
    <rect x="-40" y="-30" width="30" height="60" fill="white" opacity="0.9"/>
    <rect x="0" y="-30" width="30" height="60" fill="white" opacity="0.9"/>
    <rect x="40" y="-30" width="30" height="60" fill="white" opacity="0.9"/>
    <text x="0" y="80" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">Message Queue</text>
    <text x="0" y="100" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">(Kafka / RabbitMQ)</text>
  </g>
  
  <!-- Workers -->
  <g transform="translate(700, 120)">
    <rect x="-55" y="-35" width="110" height="70" rx="6" fill="#f59e0b"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Worker 1</text>
    <text x="0" y="55" font-family="Arial, sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Fan-out</text>
  </g>
  
  <g transform="translate(700, 225)">
    <rect x="-55" y="-35" width="110" height="70" rx="6" fill="#f59e0b"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Worker 2</text>
    <text x="0" y="55" font-family="Arial, sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Notifications</text>
  </g>
  
  <g transform="translate(700, 330)">
    <rect x="-55" y="-35" width="110" height="70" rx="6" fill="#f59e0b"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Worker 3</text>
    <text x="0" y="55" font-family="Arial, sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Analytics</text>
  </g>
  
  <!-- Database -->
  <g transform="translate(900, 225)">
    <ellipse cx="0" cy="-25" rx="50" ry="15" fill="#ef4444"/>
    <rect x="-50" y="-25" width="100" height="50" fill="#ef4444"/>
    <ellipse cx="0" cy="25" rx="50" ry="15" fill="#dc2626"/>
    <text x="0" y="55" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Database</text>
  </g>
  
  <!-- Arrows -->
  <path d="M 210 225 L 295 225" stroke="#64748b" stroke-width="3" marker-end="url(#arrow-q)"/>
  <text x="252" y="215" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Enqueue</text>
  
  <path d="M 505 195 L 640 135" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow-q)"/>
  <path d="M 505 225 L 640 225" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow-q)"/>
  <path d="M 505 255 L 640 315" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow-q)"/>
  <text x="570" y="180" font-family="Arial, sans-serif" font-size="11" fill="#f59e0b" text-anchor="middle">Dequeue</text>
  
  <path d="M 760 225 L 845 225" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  
  <!-- Flow -->
  <rect x="50" y="370" width="900" height="60" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
  <text x="500" y="395" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Flow: User posts → Server saves to DB → Enqueues tasks → Returns immediately</text>
  <text x="500" y="415" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Workers process tasks in background (fan-out, notifications, analytics)</text>
  
  <defs>
    <marker id="arrow-q" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
</svg>

**Real-world example:** When you upload a video to YouTube, it returns immediately. Video processing (transcoding, thumbnail generation) happens asynchronously via message queues.

**Benefits:**
- Fast user-facing responses
- Decouples services
- Handles traffic spikes (queue buffers requests)
- Retry failed tasks automatically

---

## The Final Architecture

Let's see how all these concepts come together for Twitter at scale.

<svg role="img" aria-labelledby="final-title final-desc" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <title id="final-title">Twitter Final Architecture</title>
  <desc id="final-desc">Complete system architecture showing all components working together</desc>
  
  <rect width="1200" height="800" fill="#f8fafc"/>
  
  <text x="600" y="30" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#1e293b" text-anchor="middle">Twitter: Complete Architecture</text>
  <text x="600" y="55" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Handling 500M users, 6000 tweets/sec</text>
  
  <!-- CDN -->
  <g transform="translate(600, 120)">
    <ellipse cx="0" cy="0" rx="120" ry="40" fill="#3b82f6" opacity="0.9"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="white" text-anchor="middle">CDN (CloudFront)</text>
    <text x="0" y="50" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Images, Videos, Static Assets</text>
  </g>
  
  <!-- Load Balancer -->
  <g transform="translate(600, 220)">
    <rect x="-80" y="-30" width="160" height="60" rx="8" fill="#7c3aed"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Load Balancer</text>
  </g>
  
  <!-- Web Servers -->
  <g transform="translate(300, 340)">
    <rect x="-50" y="-30" width="100" height="60" rx="6" fill="#10b981"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Server 1</text>
  </g>
  <g transform="translate(500, 340)">
    <rect x="-50" y="-30" width="100" height="60" rx="6" fill="#10b981"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Server 2</text>
  </g>
  <g transform="translate(700, 340)">
    <rect x="-50" y="-30" width="100" height="60" rx="6" fill="#10b981"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Server 3</text>
  </g>
  <g transform="translate(900, 340)">
    <rect x="-50" y="-30" width="100" height="60" rx="6" fill="#10b981"/>
    <text x="0" y="5" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Server N</text>
  </g>
  
  <!-- Redis Cache -->
  <g transform="translate(200, 480)">
    <rect x="-70" y="-35" width="140" height="70" rx="8" fill="#ef4444"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Redis Cache</text>
    <text x="0" y="17" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">Timelines, Sessions</text>
  </g>
  
  <!-- Message Queue -->
  <g transform="translate(500, 480)">
    <rect x="-70" y="-35" width="140" height="70" rx="8" fill="#7c3aed"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white" text-anchor="middle">Kafka Queue</text>
    <text x="0" y="17" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">Async Tasks</text>
  </g>
  
  <!-- Database Shards -->
  <g transform="translate(250, 640)">
    <ellipse cx="0" cy="-20" rx="50" ry="15" fill="#f59e0b"/>
    <rect x="-50" y="-20" width="100" height="40" fill="#f59e0b"/>
    <ellipse cx="0" cy="20" rx="50" ry="15" fill="#d97706"/>
    <text x="0" y="50" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Shard 1</text>
  </g>
  <g transform="translate(450, 640)">
    <ellipse cx="0" cy="-20" rx="50" ry="15" fill="#f59e0b"/>
    <rect x="-50" y="-20" width="100" height="40" fill="#f59e0b"/>
    <ellipse cx="0" cy="20" rx="50" ry="15" fill="#d97706"/>
    <text x="0" y="50" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Shard 2</text>
  </g>
  <g transform="translate(650, 640)">
    <ellipse cx="0" cy="-20" rx="50" ry="15" fill="#f59e0b"/>
    <rect x="-50" y="-20" width="100" height="40" fill="#f59e0b"/>
    <ellipse cx="0" cy="20" rx="50" ry="15" fill="#d97706"/>
    <text x="0" y="50" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Shard 3</text>
  </g>
  <g transform="translate(850, 640)">
    <ellipse cx="0" cy="-20" rx="50" ry="15" fill="#f59e0b"/>
    <rect x="-50" y="-20" width="100" height="40" fill="#f59e0b"/>
    <ellipse cx="0" cy="20" rx="50" ry="15" fill="#d97706"/>
    <text x="0" y="50" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Shard N</text>
  </g>
  
  <!-- Workers -->
  <g transform="translate(1000, 480)">
    <rect x="-60" y="-35" width="120" height="70" rx="6" fill="#f59e0b"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Workers</text>
    <text x="0" y="17" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">Fan-out, Notify</text>
  </g>
  
  <!-- Arrows -->
  <path d="M 600 160 L 600 190" stroke="#64748b" stroke-width="2"/>
  <path d="M 560 250 L 340 310" stroke="#64748b" stroke-width="2"/>
  <path d="M 580 250 L 500 310" stroke="#64748b" stroke-width="2"/>
  <path d="M 620 250 L 700 310" stroke="#64748b" stroke-width="2"/>
  <path d="M 640 250 L 860 310" stroke="#64748b" stroke-width="2"/>
  
  <path d="M 300 370 L 230 445" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 500 370 L 500 445" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 700 370 L 570 445" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 900 370 L 940 445" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  
  <path d="M 300 370 L 300 600" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 500 370 L 450 600" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 700 370 L 650 600" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 900 370 L 850 600" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
  
  <!-- Stats -->
  <rect x="50" y="730" width="1100" height="50" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
  <text x="600" y="755" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Capacity: 500M users | 6000 tweets/sec | 300K reads/sec | 99.99% uptime</text>
</svg>

**What we built:**
1. **CDN** - Fast global content delivery
2. **Load Balancer** - Distributes traffic
3. **Stateless Servers** - Horizontally scalable
4. **Redis Cache** - Fast timeline reads
5. **Message Queue** - Async processing
6. **Database Shards** - Horizontal write scaling
7. **Replication** - Read scaling + redundancy
8. **Workers** - Background task processing

---

## Key Takeaways

**Start Simple:** Every system starts with one server and one database. Add complexity only when you have a specific problem to solve.

**Scale Incrementally:** Don't architect for a billion users on day one. Scale as problems emerge.

**Understand Trade-offs:** Every decision has pros and cons. Caching speeds up reads but complicates invalidation. Sharding scales writes but makes cross-shard queries expensive.

**Real Problems Drive Solutions:** We didn't add load balancing because it's cool—we added it because one server couldn't handle the load. Each concept solved a specific problem.

**Patterns Repeat:** The patterns you learned here (caching, sharding, replication, queues) apply to almost every large-scale system. Instagram, Uber, Netflix—they all use these same building blocks.

---

## What's Next?

This guide covered the fundamentals, but each concept deserves deep exploration. In upcoming posts, we'll dive into:

- **Caching Strategies:** Cache invalidation, eviction policies, distributed caching
- **Database Sharding:** Consistent hashing, rebalancing, handling hotspots
- **Message Queues:** Kafka vs RabbitMQ, exactly-once delivery, dead letter queues
- **Microservices:** Service discovery, API gateways, distributed tracing
- **Real-Time Systems:** WebSockets, server-sent events, long polling

The best way to learn is to practice. Pick a system you use daily—YouTube, Spotify, Airbnb—and try designing it. Start simple, identify bottlenecks, add complexity one piece at a time.

---

## Let's Connect

System design is a journey. I'm constantly learning from real-world systems and sharing what I discover.

Have questions about specific concepts? Designing a system and want feedback? [Reach out](/contact.html)—I love discussing architecture and trade-offs.

Remember: every massive system started as a simple idea. Twitter began as a basic web app. Instagram was just photo uploads. They evolved by solving one problem at a time.

You now have the vocabulary and mental models to design scalable systems. Start simple, solve real problems, and scale incrementally.

Happy designing!
