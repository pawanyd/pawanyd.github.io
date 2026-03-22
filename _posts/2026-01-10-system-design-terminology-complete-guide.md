---
layout: post-detail
title: "System Design Fundamentals: Complete Terminology Guide for Beginners"
date: 2026-01-10
category: "System Design & Architecture"
tags: ["System Design", "Terminology", "Fundamentals", "Architecture", "Interview Prep", "Distributed Systems"]
image: "/assets/images/posts/system-design-terminology-hero.svg"
excerpt: "Master every system design term you need to know. From scalability to CAP theorem - your complete reference guide with real-world examples."
author: "Pawan Kumar"
---

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin: 30px 0 40px 0; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">
  <h2 style="margin: 0 0 20px 0; color: white; font-size: 28px; text-align: center;">📚 Quick Navigation</h2>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
    <a href="#requirements-analysis" style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; text-decoration: none; color: white; text-align: center; font-size: 14px; transition: all 0.3s;">📋 Requirements</a>
    <a href="#design-levels-hld-vs-lld" style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; text-decoration: none; color: white; text-align: center; font-size: 14px;">🎨 HLD vs LLD</a>
    <a href="#core-system-design-concepts" style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; text-decoration: none; color: white; text-align: center; font-size: 14px;">🏗️ Core Concepts</a>
    <a href="#architecture-patterns" style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; text-decoration: none; color: white; text-align: center; font-size: 14px;">🏛️ Patterns</a>
    <a href="#performance-optimization" style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; text-decoration: none; color: white; text-align: center; font-size: 14px;">⚡ Performance</a>
    <a href="#key-metrics--slas" style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; text-decoration: none; color: white; text-align: center; font-size: 14px;">📊 Metrics</a>
    <a href="#interview-framework-star-approach" style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; text-decoration: none; color: white; text-align: center; font-size: 14px;">⭐ Interview</a>
    <a href="#common-terminology-glossary" style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; text-decoration: none; color: white; text-align: center; font-size: 14px;">📖 Glossary</a>
    <a href="#common-mistakes-to-avoid" style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; text-decoration: none; color: white; text-align: center; font-size: 14px;">⚠️ Mistakes</a>
  </div>
</div>

# System Design Fundamentals: Complete Terminology Guide for Beginners

I remember my first system design interview. The interviewer asked, "How would you design Instagram?" I froze. Not because I didn't use Instagram daily, but because I didn't know where to start. Should I talk about databases? Load balancers? Microservices? The terminology alone felt like a foreign language.

I nodded along when the interviewer mentioned "eventual consistency" and "horizontal scaling," pretending I understood. I didn't get the job. That failure taught me something valuable: system design isn't about memorizing solutions—it's about understanding the vocabulary and knowing when to use each concept.

Three years later, I'm now the one conducting these interviews. I see the same confusion in candidates' eyes that I once had. Here's what I wish someone had told me: system design has a finite set of building blocks. Once you understand these core concepts and their terminology, designing any system becomes a matter of combining the right pieces.

This guide is your complete reference. We'll cover every essential term, explain what it means in plain English, show you real-world examples, and help you understand when to use each concept. Think of this as your system design dictionary—bookmark it, reference it, and watch these terms become second nature.

---

## What is System Design?

Let's start with the basics. System design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements.

In simpler terms? It's figuring out how to build software that works at scale. Not just for 100 users, but for millions. Not just for today, but for years to come.

**Why does it matter?**

When Netflix streams to 200 million subscribers simultaneously, that's system design. When Google returns search results in 0.2 seconds from billions of web pages, that's system design. When Uber matches you with a driver in seconds across a city of millions, that's system design.

Companies don't just want engineers who can write code—they want engineers who can architect systems that handle real-world complexity. That's why system design interviews are standard at companies like Google, Amazon, Facebook, and Netflix.

**What makes system design challenging?**

You're not building for perfect conditions. You're building for:
- Servers that crash
- Networks that fail
- Traffic that spikes unexpectedly
- Data that grows exponentially
- Users spread across the globe
- Budgets that aren't unlimited

System design is about making informed trade-offs. Every decision has consequences. Choose consistency over availability? Your system might go down during network partitions. Choose availability over consistency? Users might see stale data. There's no perfect solution—only solutions that fit your specific requirements.

Let's start building your vocabulary.

---

## Requirements Analysis

<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 25px; border-radius: 12px; margin: 30px 0; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);">
  <h3 style="margin: 0 0 15px 0; font-size: 22px; color: white;">🎯 Foundation of Every System</h3>
  <p style="margin: 0; font-size: 16px; line-height: 1.6; opacity: 0.95;">Before designing any system, you need to understand what you're building. Requirements fall into two categories: functional and non-functional.</p>
</div>

### Functional Requirements

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 25px; margin: 25px 0; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);">
  <div style="display: flex; align-items: center; margin-bottom: 15px;">
    <span style="font-size: 32px; margin-right: 15px;">✅</span>
    <h4 style="margin: 0; color: white; font-size: 20px;">What the System Should Do</h4>
  </div>
  <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 15px; line-height: 1.6;">Functional requirements define what the system should do. These are the features and behaviors users interact with.</p>
</div>

**Think of it as:** The "what" of your system.

**Examples for Twitter:**
- Users can post tweets (280 characters)
- Users can follow other users
- Users can see a timeline of tweets from people they follow
- Users can like and retweet
- Users can search for tweets and users

**Examples for Uber:**
- Riders can request rides
- Drivers can accept ride requests
- Real-time location tracking
- Fare calculation
- Payment processing

**Why it matters:** Functional requirements determine your data model, APIs, and core features. Get these wrong and you're building the wrong product.

**Real-world example:** When Instagram added Stories, that was a new functional requirement. They had to design storage for temporary content, build a new API, and handle the increased traffic.

### Non-Functional Requirements

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 12px; padding: 25px; margin: 25px 0; box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);">
  <div style="display: flex; align-items: center; margin-bottom: 15px;">
    <span style="font-size: 32px; margin-right: 15px;">⚡</span>
    <h4 style="margin: 0; color: white; font-size: 20px;">How Well the System Should Perform</h4>
  </div>
  <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 15px; line-height: 1.6;">Non-functional requirements define how the system should perform. These are the quality attributes that make your system production-ready.</p>
</div>

**Think of it as:** The "how well" of your system.

**Key Non-Functional Requirements:**

**1. Performance**
- **Latency:** How fast does the system respond? (Target: < 200ms for web, < 100ms for mobile)
- **Throughput:** How many requests can it handle per second?

**Example:** Google Search must return results in under 0.5 seconds. That's a performance requirement.

**2. Scalability**
- Can the system handle growth?
- 1,000 users today, 1 million next year?

**Example:** Instagram went from 25,000 users at launch to 1 million in 2 months. Their system had to scale 40x.

**3. Availability**
- What percentage of time is the system operational?

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 10px; padding: 20px; margin: 20px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
  <h5 style="margin: 0 0 15px 0; color: #1f2937; font-size: 17px;">📊 The Nines of Availability</h5>
  <table style="width: 100%; border-collapse: collapse;">
    <tr style="background: #f3f4f6;">
      <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600; color: #374151;">99.9%</td>
      <td style="padding: 12px; border: 1px solid #e5e7eb; color: #6b7280;">8.76 hours downtime per year</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600; color: #374151;">99.99%</td>
      <td style="padding: 12px; border: 1px solid #e5e7eb; color: #6b7280;">52.56 minutes downtime per year</td>
    </tr>
    <tr style="background: #f3f4f6;">
      <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600; color: #374151;">99.999%</td>
      <td style="padding: 12px; border: 1px solid #e5e7eb; color: #6b7280;">5.26 minutes downtime per year</td>
    </tr>
  </table>
</div>

**Example:** AWS promises 99.99% availability for S3. That's their SLA (Service Level Agreement).

**4. Reliability**
- Does the system work correctly even when things fail?
- Can it recover from crashes?

**Example:** Netflix's <span class="term-tooltip group relative inline cursor-help border-b border-dotted border-blue-600">Chaos Monkey<span class="tooltip-content invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] max-w-[90vw] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-3 border border-gray-300 dark:border-gray-600 rounded-sm shadow-md transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">A tool developed by Netflix that randomly terminates instances in production to test system resilience and ensure services can withstand failures. Part of the Simian Army suite.<a href="https://netflix.github.io/chaosmonkey/" target="_blank" rel="noopener" class="tooltip-link block mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-blue-600 dark:text-blue-400 hover:underline pointer-events-auto">Learn more →</a><span class="tooltip-arrow"></span></span></span> randomly kills servers in production to test reliability.

**5. Consistency**
- Do all users see the same data?
- How quickly do updates propagate?

**Example:** Bank transactions need strong consistency. If you transfer $100, both accounts must update or neither does.

**6. Security**
- Is data protected from unauthorized access?
- Are communications encrypted?

**Example:** WhatsApp uses end-to-end encryption. Even WhatsApp can't read your messages.

**7. Maintainability**
- How easy is it to fix bugs and add features?
- Is the code well-organized?

**Example:** Airbnb moved from monolith to microservices to improve maintainability. Now teams can deploy independently.

**Why it matters:** Non-functional requirements drive your architecture decisions. Need low latency? You'll need caching and CDNs. Need high availability? You'll need redundancy and failover.

**Real-world trade-off:** Facebook chose availability over consistency for likes. When you like a post, it might not appear immediately to everyone. That's eventual consistency—they prioritized keeping the system available over instant consistency.

---

## Design Levels: HLD vs LLD

System design operates at two levels of abstraction. Understanding the difference is crucial for interviews and real-world projects.

### High-Level Design (HLD)

**What it is:** The big picture architecture showing major components and how they interact.

**Focus areas:**
- System components (servers, databases, caches, load balancers)
- Data flow between components
- Technology choices (SQL vs NoSQL, REST vs GraphQL)
- Scalability patterns
- Infrastructure layout

**Think of it as:** The blueprint of a house showing rooms, doors, and how they connect.

**What you define in HLD:**
- Client applications (web, mobile)
- API servers
- Load balancers
- Application servers
- Caching layer
- Database architecture
- Message queues
- External services (CDN, payment gateway)

**Real-world example:** Netflix's HLD shows:
- CDN for video delivery (CloudFront)
- Microservices for different features
- Cassandra for data storage
- Kafka for event streaming
- Elasticsearch for search
- Redis for caching

**When you need HLD:**
- System design interviews (80% of time spent here)
- Architecture reviews
- Planning new systems
- Explaining system to stakeholders

**HLD deliverables:**
- Architecture diagrams
- Component interaction flows
- Technology stack decisions
- Capacity planning estimates

### Low-Level Design (LLD)

**What it is:** Detailed design of individual components, including classes, methods, and algorithms.

**Focus areas:**
- Class diagrams and relationships
- API contracts and data models
- Database schemas (tables, columns, indexes)
- Algorithm implementations
- Design patterns (Singleton, Factory, Observer)
- Error handling strategies

**Think of it as:** The detailed electrical and plumbing plans for each room in the house.

**What you define in LLD:**
- Class structures and inheritance
- Method signatures and parameters
- Data structures (arrays, hash maps, trees)
- API endpoints and request/response formats
- Database table schemas
- Caching keys and expiration policies
- Error codes and exception handling

**Real-world example:** For Netflix's recommendation service, LLD defines:
- `RecommendationEngine` class
- `getUserRecommendations(userId, limit)` method
- Collaborative filtering algorithm
- `UserPreference` data model
- Database schema for storing viewing history
- Caching strategy for recommendations

**When you need LLD:**
- Implementation planning
- Code reviews
- Technical specifications
- Detailed documentation

**LLD deliverables:**
- Class diagrams (UML)
- Sequence diagrams
- Database ER diagrams
- API documentation
- Pseudocode or actual code


### HLD vs LLD: Key Differences

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 30px; margin: 30px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: separate; border-spacing: 0; background: white; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <th style="padding: 18px; text-align: left; color: white; font-weight: 600; font-size: 16px; border: none;">Aspect</th>
          <th style="padding: 18px; text-align: left; color: white; font-weight: 600; font-size: 16px; border: none;">High-Level Design (HLD)</th>
          <th style="padding: 18px; text-align: left; color: white; font-weight: 600; font-size: 16px; border: none;">Low-Level Design (LLD)</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background: #f8f9ff;">
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #4b5563;">Scope</td>
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">Entire system</td>
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">Individual components</td>
        </tr>
        <tr style="background: white;">
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #4b5563;">Audience</td>
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">Architects, stakeholders</td>
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">Developers, engineers</td>
        </tr>
        <tr style="background: #f8f9ff;">
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #4b5563;">Detail Level</td>
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">Abstract, conceptual</td>
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">Concrete, implementation</td>
        </tr>
        <tr style="background: white;">
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #4b5563;">Focus</td>
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">What components, how they connect</td>
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">How each component works internally</td>
        </tr>
        <tr style="background: #f8f9ff;">
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #4b5563;">Time in Interview</td>
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937;"><span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-weight: 600;">80%</span></td>
          <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937;"><span style="background: #f59e0b; color: white; padding: 4px 12px; border-radius: 20px; font-weight: 600;">20%</span></td>
        </tr>
        <tr style="background: white;">
          <td style="padding: 16px; font-weight: 600; color: #4b5563;">Example</td>
          <td style="padding: 16px; color: #1f2937;">"We'll use Redis for caching"</td>
          <td style="padding: 16px; color: #1f2937;">"Cache key format: <code>user:{id}:timeline</code>"</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-left: 5px solid #d97706; padding: 20px; border-radius: 8px; margin: 25px 0;">
  <p style="margin: 0; color: #78350f; font-weight: 600; font-size: 15px;">💡 Interview tip: Start with HLD. Only dive into LLD when interviewer asks or when you've covered the high-level architecture completely.</p>
</div>

---

## Core System Design Concepts

<div style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); color: white; padding: 30px; border-radius: 12px; margin: 35px 0; box-shadow: 0 10px 30px rgba(236, 72, 153, 0.3);">
  <h3 style="margin: 0 0 15px 0; font-size: 24px; color: white;">🏗️ Essential Building Blocks</h3>
  <p style="margin: 0; font-size: 16px; line-height: 1.7; opacity: 0.95;">Now let's dive into the essential building blocks. Each concept solves a specific problem. Understanding when and why to use each one is key.</p>
</div>

### A. Scalability

<div style="background: linear-gradient(to right, #f0f9ff, #e0f2fe); border-left: 5px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
  <p style="margin: 0; color: #0c4a6e; font-size: 16px; line-height: 1.6;"><strong>Scalability</strong> is your system's ability to handle growth. Can it serve 10 users? Great. Can it serve 10 million? That's scalability.</p>
</div>

<svg role="img" aria-labelledby="scaling-title scaling-desc" viewBox="0 0 1200 500" style="max-width: 100%; height: auto; margin: 30px 0;">
  <title id="scaling-title">Vertical vs Horizontal Scaling Comparison</title>
  <desc id="scaling-desc">Visual comparison showing vertical scaling (adding more power to one server) versus horizontal scaling (adding more servers)</desc>
  
  <!-- Background -->
  <rect width="1200" height="500" fill="#f8fafc"/>
  
  <!-- Vertical Scaling Section -->
  <g>
    <rect x="50" y="50" width="500" height="400" rx="15" fill="url(#verticalGradient)" opacity="0.1"/>
    <text x="300" y="90" font-size="28" font-weight="bold" fill="#0891b2" text-anchor="middle">Vertical Scaling</text>
    <text x="300" y="120" font-size="16" fill="#0e7490" text-anchor="middle">Scale Up - Add More Power</text>
    
    <!-- Server visualization -->
    <g transform="translate(150, 160)">
      <!-- Small server -->
      <rect x="0" y="80" width="80" height="100" rx="8" fill="#06b6d4" opacity="0.3"/>
      <text x="40" y="135" font-size="14" fill="#0e7490" text-anchor="middle" font-weight="600">4GB RAM</text>
      <text x="40" y="155" font-size="12" fill="#0e7490" text-anchor="middle">2 CPU</text>
      
      <!-- Arrow -->
      <path d="M 100 130 L 140 130" stroke="#0891b2" stroke-width="3" fill="none" marker-end="url(#arrowBlue)"/>
      
      <!-- Large server -->
      <rect x="160" y="40" width="120" height="180" rx="8" fill="#06b6d4"/>
      <text x="220" y="110" font-size="18" fill="white" text-anchor="middle" font-weight="bold">32GB RAM</text>
      <text x="220" y="135" font-size="16" fill="white" text-anchor="middle">16 CPU</text>
      <text x="220" y="160" font-size="14" fill="white" text-anchor="middle">Fast SSD</text>
    </g>
    
    <!-- Pros/Cons -->
    <text x="80" y="380" font-size="14" fill="#059669" font-weight="600">✓ Simple, No code changes</text>
    <text x="80" y="410" font-size="14" fill="#dc2626" font-weight="600">✗ Physical limits, Expensive</text>
  </g>
  
  <!-- Horizontal Scaling Section -->
  <g>
    <rect x="650" y="50" width="500" height="400" rx="15" fill="url(#horizontalGradient)" opacity="0.1"/>
    <text x="900" y="90" font-size="28" font-weight="bold" fill="#7c3aed" text-anchor="middle">Horizontal Scaling</text>
    <text x="900" y="120" font-size="16" fill="#6d28d9" text-anchor="middle">Scale Out - Add More Machines</text>
    
    <!-- Server visualization -->
    <g transform="translate(700, 160)">
      <!-- Single server -->
      <rect x="0" y="60" width="70" height="90" rx="8" fill="#8b5cf6" opacity="0.5"/>
      <text x="35" y="110" font-size="12" fill="#5b21b6" text-anchor="middle" font-weight="600">Server</text>
      
      <!-- Arrow -->
      <path d="M 90 105 L 130 105" stroke="#7c3aed" stroke-width="3" fill="none" marker-end="url(#arrowPurple)"/>
      
      <!-- Multiple servers -->
      <rect x="150" y="20" width="70" height="90" rx="8" fill="#8b5cf6"/>
      <text x="185" y="70" font-size="12" fill="white" text-anchor="middle" font-weight="600">Server 1</text>
      
      <rect x="240" y="20" width="70" height="90" rx="8" fill="#8b5cf6"/>
      <text x="275" y="70" font-size="12" fill="white" text-anchor="middle" font-weight="600">Server 2</text>
      
      <rect x="150" y="130" width="70" height="90" rx="8" fill="#8b5cf6"/>
      <text x="185" y="180" font-size="12" fill="white" text-anchor="middle" font-weight="600">Server 3</text>
      
      <rect x="240" y="130" width="70" height="90" rx="8" fill="#8b5cf6"/>
      <text x="275" y="180" font-size="12" fill="white" text-anchor="middle" font-weight="600">Server 4</text>
    </g>
    
    <!-- Pros/Cons -->
    <text x="680" y="380" font-size="14" fill="#059669" font-weight="600">✓ Unlimited scale, No single failure</text>
    <text x="680" y="410" font-size="14" fill="#dc2626" font-weight="600">✗ Complex, Network overhead</text>
  </g>
  
  <!-- Gradients -->
  <defs>
    <linearGradient id="verticalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0891b2;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="horizontalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
    </linearGradient>
    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#0891b2" />
    </marker>
    <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#7c3aed" />
    </marker>
  </defs>
</svg>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
  <div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); border-radius: 12px; padding: 25px; color: white; box-shadow: 0 8px 20px rgba(6, 182, 212, 0.3);">
    <h4 style="margin: 0 0 10px 0; font-size: 20px; color: white;">⬆️ Vertical Scaling</h4>
    <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.9;">Scale Up - Add more power</p>
    <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; margin-top: 15px;">
      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600;">✅ Pros:</p>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8;">
        <li>Simple - no code changes</li>
        <li>No coordination complexity</li>
        <li>Easier to maintain</li>
      </ul>
      <p style="margin: 15px 0 8px 0; font-size: 13px; font-weight: 600;">❌ Cons:</p>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8;">
        <li>Physical limits</li>
        <li>Expensive at high end</li>
        <li>Single point of failure</li>
      </ul>
    </div>
  </div>
  
  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 12px; padding: 25px; color: white; box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);">
    <h4 style="margin: 0 0 10px 0; font-size: 20px; color: white;">↔️ Horizontal Scaling</h4>
    <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.9;">Scale Out - Add more machines</p>
    <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; margin-top: 15px;">
      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600;">✅ Pros:</p>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8;">
        <li>Nearly unlimited scaling</li>
        <li>No single point of failure</li>
        <li>Cost-effective</li>
      </ul>
      <p style="margin: 15px 0 8px 0; font-size: 13px; font-weight: 600;">❌ Cons:</p>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8;">
        <li>More complex</li>
        <li>Requires stateless architecture</li>
        <li>Network overhead</li>
      </ul>
    </div>
  </div>
</div>

#### Vertical Scaling (Scale Up)

**What it is:** Adding more power to your existing machine—more CPU, more RAM, faster disk.

**How it works:** You have one server with 4GB RAM. It's slow. You upgrade to 32GB RAM. Same server, more power.

**Real-world examples:**
- **Stack Overflow** ran on a single powerful server for years before needing multiple servers
- **Early-stage startups** often start with vertical scaling—it's simpler

**Pros:**
- Simple—no code changes needed
- No complexity in coordination
- Works immediately
- Easier to maintain (one machine)

**Cons:**
- Physical limits—you can't infinitely upgrade one machine
- Expensive at high end (diminishing returns)
- Single point of failure
- Downtime during upgrades

**When to use:** Early stages, when traffic is predictable, when simplicity matters more than unlimited scale.

**Cost example:** AWS EC2 instance
- t3.small (2GB RAM): $15/month
- t3.xlarge (16GB RAM): $120/month
- t3.2xlarge (32GB RAM): $240/month

#### Horizontal Scaling (Scale Out)

**What it is:** Adding more machines to handle increased load. Instead of one powerful server, use many smaller servers.

**How it works:** You have one server handling 1,000 requests/sec. Add 9 more servers, now handle 10,000 requests/sec.

**Real-world examples:**
- **Netflix** runs on thousands of AWS servers
- **Instagram** uses hundreds of servers behind load balancers
- **Google** has millions of servers worldwide

**Pros:**
- Nearly unlimited scaling—just add more servers
- No single point of failure
- Cost-effective—use many cheap servers
- Can scale gradually

**Cons:**
- More complex—need load balancers, session management
- Requires stateless architecture
- Network overhead
- More operational complexity

**When to use:** When you need to scale beyond one machine's capacity, when you need high availability, when traffic is unpredictable.

**Key requirement:** Your application must be **stateless** (we'll cover this later).

#### Auto-Scaling

**What it is:** Automatically adding or removing servers based on demand.

**How it works:** 
- Monitor metrics (CPU usage, request count)
- When CPU > 70%, add more servers
- When CPU < 30%, remove servers
- Pay only for what you use

**Real-world examples:**
- **Uber** auto-scales during rush hour (10x traffic spike)
- **E-commerce sites** auto-scale during Black Friday
- **News sites** auto-scale when breaking news hits

**Pros:**
- Cost-efficient—don't pay for idle servers
- Handles unexpected traffic spikes
- No manual intervention needed

**Cons:**
- Requires careful configuration
- Scaling takes time (1-5 minutes)
- Can be expensive if misconfigured
- Need to handle scaling events gracefully

**Configuration example:**
```
Min servers: 2
Max servers: 50
Scale up when: CPU > 70% for 5 minutes
Scale down when: CPU < 30% for 10 minutes
```

---

### B. Load Distribution

When you have multiple servers, you need something to distribute traffic between them.

#### Load Balancer

**What it is:** A server that sits in front of your application servers and distributes incoming requests across them.

<svg role="img" aria-labelledby="lb-title lb-desc" viewBox="0 0 1200 600" style="max-width: 100%; height: auto; margin: 30px 0;">
  <title id="lb-title">Load Balancer Architecture</title>
  <desc id="lb-desc">Diagram showing how a load balancer distributes client requests across multiple application servers</desc>
  
  <!-- Background -->
  <rect width="1200" height="600" fill="#f8fafc"/>
  
  <!-- Title -->
  <text x="600" y="40" font-size="24" font-weight="bold" fill="#1f2937" text-anchor="middle">Load Balancer Distribution</text>
  
  <!-- Clients -->
  <g transform="translate(100, 150)">
    <circle cx="0" cy="0" r="35" fill="#3b82f6"/>
    <text x="0" y="5" font-size="24" fill="white" text-anchor="middle">👤</text>
    <text x="0" y="60" font-size="14" fill="#1f2937" text-anchor="middle" font-weight="600">Client 1</text>
  </g>
  
  <g transform="translate(100, 300)">
    <circle cx="0" cy="0" r="35" fill="#3b82f6"/>
    <text x="0" y="5" font-size="24" fill="white" text-anchor="middle">👤</text>
    <text x="0" y="60" font-size="14" fill="#1f2937" text-anchor="middle" font-weight="600">Client 2</text>
  </g>
  
  <g transform="translate(100, 450)">
    <circle cx="0" cy="0" r="35" fill="#3b82f6"/>
    <text x="0" y="5" font-size="24" fill="white" text-anchor="middle">👤</text>
    <text x="0" y="60" font-size="14" fill="#1f2937" text-anchor="middle" font-weight="600">Client 3</text>
  </g>
  
  <!-- Arrows to Load Balancer -->
  <path d="M 140 150 L 380 280" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arrowLB)"/>
  <path d="M 140 300 L 380 300" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arrowLB)"/>
  <path d="M 140 450 L 380 320" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arrowLB)"/>
  
  <!-- Load Balancer -->
  <g transform="translate(450, 300)">
    <rect x="-70" y="-80" width="140" height="160" rx="12" fill="url(#lbGradient)"/>
    <text x="0" y="-40" font-size="18" fill="white" text-anchor="middle" font-weight="bold">Load</text>
    <text x="0" y="-20" font-size="18" fill="white" text-anchor="middle" font-weight="bold">Balancer</text>
    <text x="0" y="10" font-size="12" fill="white" text-anchor="middle">Round Robin</text>
    <text x="0" y="30" font-size="12" fill="white" text-anchor="middle">Health Checks</text>
    <text x="0" y="50" font-size="12" fill="white" text-anchor="middle">SSL Termination</text>
  </g>
  
  <!-- Arrows to Servers -->
  <path d="M 520 240 L 780 160" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowGreen)"/>
  <path d="M 520 300 L 780 300" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowGreen)"/>
  <path d="M 520 360 L 780 440" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowGreen)"/>
  
  <!-- Application Servers -->
  <g transform="translate(850, 150)">
    <rect x="-60" y="-50" width="120" height="100" rx="8" fill="#10b981"/>
    <text x="0" y="-15" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Server 1</text>
    <text x="0" y="10" font-size="12" fill="white" text-anchor="middle">Active</text>
    <text x="0" y="28" font-size="12" fill="white" text-anchor="middle">CPU: 45%</text>
  </g>
  
  <g transform="translate(850, 300)">
    <rect x="-60" y="-50" width="120" height="100" rx="8" fill="#10b981"/>
    <text x="0" y="-15" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Server 2</text>
    <text x="0" y="10" font-size="12" fill="white" text-anchor="middle">Active</text>
    <text x="0" y="28" font-size="12" fill="white" text-anchor="middle">CPU: 52%</text>
  </g>
  
  <g transform="translate(850, 450)">
    <rect x="-60" y="-50" width="120" height="100" rx="8" fill="#10b981"/>
    <text x="0" y="-15" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Server 3</text>
    <text x="0" y="10" font-size="12" fill="white" text-anchor="middle">Active</text>
    <text x="0" y="28" font-size="12" fill="white" text-anchor="middle">CPU: 38%</text>
  </g>
  
  <!-- Database -->
  <g transform="translate(1050, 300)">
    <ellipse cx="0" cy="-30" rx="50" ry="15" fill="#6366f1"/>
    <rect x="-50" y="-30" width="100" height="60" fill="#6366f1"/>
    <ellipse cx="0" cy="30" rx="50" ry="15" fill="#4f46e5"/>
    <text x="0" y="5" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Database</text>
  </g>
  
  <!-- Arrows to Database -->
  <path d="M 910 150 L 1000 270" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
  <path d="M 910 300 L 1000 300" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
  <path d="M 910 450 L 1000 330" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
  
  <!-- Labels -->
  <text x="250" y="200" font-size="13" fill="#6b7280" font-style="italic">Incoming</text>
  <text x="250" y="220" font-size="13" fill="#6b7280" font-style="italic">Requests</text>
  
  <text x="620" y="260" font-size="13" fill="#059669" font-style="italic">Distributed</text>
  <text x="620" y="280" font-size="13" fill="#059669" font-style="italic">Traffic</text>
  
  <!-- Gradients and Markers -->
  <defs>
    <linearGradient id="lbGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
    </linearGradient>
    <marker id="arrowLB" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
    </marker>
    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
    </marker>
  </defs>
</svg>

**How it works:**
1. Client sends request to load balancer
2. Load balancer picks a server using an algorithm
3. Request is forwarded to chosen server
4. Server processes and responds
5. Load balancer returns response to client

**Load Balancing Algorithms:**

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 25px 0;">
  <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #3b82f6; border-radius: 10px; padding: 18px;">
    <h5 style="margin: 0 0 10px 0; color: #1e40af; font-size: 15px;">🔄 Round Robin</h5>
    <p style="margin: 0; color: #1e3a8a; font-size: 13px; line-height: 1.6;">Send request 1 to server A, request 2 to server B, request 3 to server C, repeat. Simple and fair.</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border: 2px solid #10b981; border-radius: 10px; padding: 18px;">
    <h5 style="margin: 0 0 10px 0; color: #065f46; font-size: 15px;">📊 Least Connections</h5>
    <p style="margin: 0; color: #064e3b; font-size: 13px; line-height: 1.6;">Send to server with fewest active connections. Better for long-lived connections.</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #fae8ff 0%, #f3e8ff 100%); border: 2px solid #8b5cf6; border-radius: 10px; padding: 18px;">
    <h5 style="margin: 0 0 10px 0; color: #5b21b6; font-size: 15px;">⚡ Least Response Time</h5>
    <p style="margin: 0; color: #6b21a8; font-size: 13px; line-height: 1.6;">Send to server with fastest response time. Adapts to server performance.</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 10px; padding: 18px;">
    <h5 style="margin: 0 0 10px 0; color: #92400e; font-size: 15px;">🔑 IP Hash</h5>
    <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.6;">Hash client IP to determine server. Same client always goes to same server.</p>
  </div>
</div>

**Real-world examples:**
- **Netflix** uses Elastic Load Balancing (AWS) to distribute across thousands of servers
- **Cloudflare** load balances across global data centers
- **GitHub** uses load balancers to handle millions of git operations

**Health Checks:**
Load balancers ping servers every few seconds. If a server doesn't respond, it's removed from rotation.

**Example health check:**
```
Endpoint: /health
Interval: 5 seconds
Timeout: 2 seconds
Unhealthy threshold: 2 consecutive failures
Healthy threshold: 2 consecutive successes
```

**Types of Load Balancers:**

**1. Layer 4 (Transport Layer)**
- Routes based on IP and port
- Fast but less flexible
- Can't inspect HTTP headers

**2. Layer 7 (Application Layer)**
- Routes based on HTTP headers, cookies, URL path
- More flexible
- Can do SSL termination
- Slightly slower

**Pros:**
- Distributes load evenly
- Provides redundancy
- Enables zero-downtime deployments
- Can route based on rules

**Cons:**
- Single point of failure (need redundant load balancers)
- Adds latency (small)
- Additional cost

**Session Persistence Problem:**
User logs in on Server A. Next request goes to Server B. User appears logged out.

**Solution:** Sticky sessions (IP hash) or external session storage (Redis).

---

### C. Data Management

How you store and retrieve data determines your system's capabilities and limitations.

#### Database Types

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin: 30px 0;">
  <div style="background: white; border: 3px solid #3b82f6; border-radius: 12px; padding: 25px; box-shadow: 0 6px 20px rgba(59, 130, 246, 0.15);">
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 15px; border-radius: 8px; margin: -25px -25px 20px -25px;">
      <h4 style="margin: 0; font-size: 20px;">🗄️ SQL (Relational)</h4>
    </div>
    <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0;">Structured data with predefined schemas</p>
    <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e40af; font-size: 14px;">Examples:</p>
      <p style="margin: 0; color: #3b82f6; font-size: 13px;">PostgreSQL, MySQL, Oracle, SQL Server</p>
    </div>
    <div style="margin-bottom: 15px;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #059669; font-size: 14px;">✅ When to use:</p>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 13px; line-height: 1.8;">
        <li>Complex relationships</li>
        <li>Need ACID transactions</li>
        <li>Structured, predictable data</li>
        <li>Complex queries with JOINs</li>
      </ul>
    </div>
    <div style="background: #fef3c7; padding: 12px; border-radius: 6px; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e; font-size: 13px;"><strong>Real-world:</strong> Banks, E-commerce, SaaS apps</p>
    </div>
  </div>
  
  <div style="background: white; border: 3px solid #10b981; border-radius: 12px; padding: 25px; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.15);">
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px; border-radius: 8px; margin: -25px -25px 20px -25px;">
      <h4 style="margin: 0; font-size: 20px;">📦 NoSQL (Non-Relational)</h4>
    </div>
    <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0;">Flexible schema optimized for specific use cases</p>
    <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #065f46; font-size: 14px;">Examples:</p>
      <p style="margin: 0; color: #10b981; font-size: 13px;">MongoDB, Redis, Cassandra, DynamoDB</p>
    </div>
    <div style="margin-bottom: 15px;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #059669; font-size: 14px;">✅ When to use:</p>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 13px; line-height: 1.8;">
        <li>Need horizontal scalability</li>
        <li>Flexible/evolving schema</li>
        <li>Simple access patterns</li>
        <li>High write throughput</li>
      </ul>
    </div>
    <div style="background: #fef3c7; padding: 12px; border-radius: 6px; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e; font-size: 13px;"><strong>Real-world:</strong> Facebook, Netflix, Twitter</p>
    </div>
  </div>
</div>

<svg role="img" aria-labelledby="decision-title decision-desc" viewBox="0 0 1200 600" style="max-width: 100%; height: auto; margin: 30px 0;">
  <title id="decision-title">SQL vs NoSQL Decision Tree</title>
  <desc id="decision-desc">Decision flowchart to help choose between SQL and NoSQL databases based on requirements</desc>
  
  <!-- Background -->
  <rect width="1200" height="600" fill="#f8fafc"/>
  
  <!-- Title -->
  <text x="600" y="40" font-size="24" font-weight="bold" fill="#1f2937" text-anchor="middle">🤔 SQL vs NoSQL Decision Tree</text>
  
  <!-- Start -->
  <g transform="translate(600, 100)">
    <rect x="-100" y="-30" width="200" height="60" rx="30" fill="#667eea"/>
    <text x="0" y="5" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Start: Choose</text>
    <text x="0" y="25" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Database Type</text>
  </g>
  
  <!-- Question 1: ACID needed? -->
  <g transform="translate(600, 220)">
    <path d="M -80,-40 L 80,-40 L 120,0 L 80,40 L -80,40 L -120,0 Z" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text x="0" y="-8" font-size="14" fill="#92400e" text-anchor="middle" font-weight="600">Need ACID</text>
    <text x="0" y="10" font-size="14" fill="#92400e" text-anchor="middle" font-weight="600">transactions?</text>
  </g>
  
  <!-- Arrow down from start -->
  <path d="M 600 160 L 600 180" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowDecision)"/>
  
  <!-- Yes to SQL -->
  <path d="M 480 220 L 350 220" stroke="#10b981" stroke-width="3" marker-end="url(#arrowGreen3)"/>
  <text x="410" y="210" font-size="13" fill="#059669" font-weight="bold">YES</text>
  
  <g transform="translate(250, 220)">
    <rect x="-90" y="-40" width="180" height="80" rx="10" fill="#3b82f6"/>
    <text x="0" y="-10" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Use SQL</text>
    <text x="0" y="12" font-size="13" fill="white" text-anchor="middle">PostgreSQL</text>
    <text x="0" y="30" font-size="13" fill="white" text-anchor="middle">MySQL</text>
  </g>
  
  <!-- No - Continue -->
  <path d="M 600 260 L 600 320" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowDecision)"/>
  <text x="620" y="295" font-size="13" fill="#dc2626" font-weight="bold">NO</text>
  
  <!-- Question 2: Complex relationships? -->
  <g transform="translate(600, 360)">
    <path d="M -80,-40 L 80,-40 L 120,0 L 80,40 L -80,40 L -120,0 Z" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text x="0" y="-8" font-size="14" fill="#92400e" text-anchor="middle" font-weight="600">Complex data</text>
    <text x="0" y="10" font-size="14" fill="#92400e" text-anchor="middle" font-weight="600">relationships?</text>
  </g>
  
  <!-- Yes to SQL -->
  <path d="M 480 360 L 350 300" stroke="#10b981" stroke-width="3" marker-end="url(#arrowGreen3)"/>
  <text x="410" y="320" font-size="13" fill="#059669" font-weight="bold">YES</text>
  
  <!-- No - Continue -->
  <path d="M 600 400 L 600 460" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowDecision)"/>
  <text x="620" y="435" font-size="13" fill="#dc2626" font-weight="bold">NO</text>
  
  <!-- Question 3: Need massive scale? -->
  <g transform="translate(600, 500)">
    <path d="M -80,-40 L 80,-40 L 120,0 L 80,40 L -80,40 L -120,0 Z" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text x="0" y="-8" font-size="14" fill="#92400e" text-anchor="middle" font-weight="600">Need massive</text>
    <text x="0" y="10" font-size="14" fill="#92400e" text-anchor="middle" font-weight="600">horizontal scale?</text>
  </g>
  
  <!-- Yes to NoSQL -->
  <path d="M 720 500 L 850 500" stroke="#10b981" stroke-width="3" marker-end="url(#arrowGreen3)"/>
  <text x="780" y="490" font-size="13" fill="#059669" font-weight="bold">YES</text>
  
  <g transform="translate(950, 500)">
    <rect x="-90" y="-40" width="180" height="80" rx="10" fill="#10b981"/>
    <text x="0" y="-10" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Use NoSQL</text>
    <text x="0" y="12" font-size="13" fill="white" text-anchor="middle">Cassandra</text>
    <text x="0" y="30" font-size="13" fill="white" text-anchor="middle">MongoDB</text>
  </g>
  
  <!-- No - Either works -->
  <path d="M 600 540 L 600 570" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowDecision)"/>
  <text x="620" y="560" font-size="13" fill="#dc2626" font-weight="bold">NO</text>
  
  <g transform="translate(600, 580)">
    <rect x="-80" y="0" width="160" height="35" rx="8" fill="#8b5cf6"/>
    <text x="0" y="23" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Either works!</text>
  </g>
  
  <defs>
    <marker id="arrowDecision" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
    </marker>
    <marker id="arrowGreen3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
    </marker>
  </defs>
</svg>

**Types:**

**1. Document Stores (MongoDB, CouchDB)**
- Store JSON-like documents
- Flexible schema
- Good for content management

**2. Key-Value Stores (Redis, DynamoDB)**
- Simple key-value pairs
- Extremely fast
- Good for caching, sessions

**3. Column-Family (Cassandra, HBase)**
- Store data in columns
- Good for time-series data
- Scales horizontally easily

**4. Graph Databases (Neo4j, Amazon Neptune)**
- Store relationships
- Good for social networks
- Fast relationship queries

**When to use:**
- Need horizontal scalability
- Flexible/evolving schema
- Simple access patterns
- High write throughput

**Real-world examples:**
- **Facebook** uses Cassandra for messaging
- **Netflix** uses Cassandra for viewing history
- **Twitter** uses Manhattan (key-value) for tweets
- **LinkedIn** uses Voldemort for member data

**Pros:**
- Scales horizontally easily
- Flexible schema
- Optimized for specific use cases
- High performance for simple queries

**Cons:**
- Weaker consistency guarantees
- Limited query flexibility
- No JOINs (denormalize data)
- Eventual consistency

#### Database Indexing

**What it is:** A data structure that improves query speed by creating a lookup table.

**How it works:** Like a book's index—instead of reading every page to find "Redis," you look it up in the index and jump to the right page.

**Without index:**
```sql
SELECT * FROM users WHERE email = 'user@example.com';
-- Scans all 10 million rows: 2000ms
```

**With index:**
```sql
CREATE INDEX idx_email ON users(email);
SELECT * FROM users WHERE email = 'user@example.com';
-- Uses B-tree index: 5ms (400x faster!)
```

**Index types:**

**1. B-Tree Index (most common)**
- Balanced tree structure
- Good for range queries
- Default in most databases

**2. Hash Index**
- Fast for exact matches
- Can't do range queries
- Good for equality checks

**3. Full-Text Index**
- For text search
- Supports partial matches
- Used by search engines

**Real-world examples:**
- **LinkedIn** indexes profiles by name, company, skills
- **Amazon** indexes products by category, price, rating
- **Gmail** indexes emails for instant search

**Pros:**
- Dramatically faster queries (10-1000x)
- Essential for large datasets
- Enables complex queries

**Cons:**
- Slower writes (must update index)
- Uses storage space
- Need to choose columns carefully

**Best practices:**
- Index columns used in WHERE clauses
- Index foreign keys
- Index columns used in ORDER BY
- Don't over-index (slows writes)

#### Database Replication

**What it is:** Copying data across multiple database servers.

<svg role="img" aria-labelledby="replication-title replication-desc" viewBox="0 0 1200 550" style="max-width: 100%; height: auto; margin: 30px 0;">
  <title id="replication-title">Database Replication Architecture</title>
  <desc id="replication-desc">Primary-Replica pattern showing write operations going to primary database and read operations distributed across replicas</desc>
  
  <!-- Background -->
  <rect width="1200" height="550" fill="#f8fafc"/>
  
  <!-- Title -->
  <text x="600" y="40" font-size="24" font-weight="bold" fill="#1f2937" text-anchor="middle">Primary-Replica Replication</text>
  
  <!-- Application Servers -->
  <g transform="translate(150, 200)">
    <rect x="-50" y="-40" width="100" height="80" rx="8" fill="#3b82f6"/>
    <text x="0" y="-5" font-size="14" fill="white" text-anchor="middle" font-weight="bold">App</text>
    <text x="0" y="15" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Server 1</text>
  </g>
  
  <g transform="translate(150, 350)">
    <rect x="-50" y="-40" width="100" height="80" rx="8" fill="#3b82f6"/>
    <text x="0" y="-5" font-size="14" fill="white" text-anchor="middle" font-weight="bold">App</text>
    <text x="0" y="15" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Server 2</text>
  </g>
  
  <!-- Primary Database -->
  <g transform="translate(450, 275)">
    <ellipse cx="0" cy="-40" rx="70" ry="20" fill="#ef4444"/>
    <rect x="-70" y="-40" width="140" height="80" fill="#ef4444"/>
    <ellipse cx="0" cy="40" rx="70" ry="20" fill="#dc2626"/>
    <text x="0" y="-10" font-size="16" fill="white" text-anchor="middle" font-weight="bold">PRIMARY</text>
    <text x="0" y="15" font-size="14" fill="white" text-anchor="middle">Database</text>
    <rect x="-80" y="-60" width="160" height="30" rx="5" fill="#fef3c7"/>
    <text x="0" y="-38" font-size="13" fill="#92400e" text-anchor="middle" font-weight="600">✍️ Writes Only</text>
  </g>
  
  <!-- Write Arrows -->
  <path d="M 200 200 L 370 250" stroke="#ef4444" stroke-width="3" fill="none" marker-end="url(#arrowRed)"/>
  <text x="280" y="215" font-size="12" fill="#dc2626" font-weight="600">WRITE</text>
  
  <path d="M 200 350 L 370 300" stroke="#ef4444" stroke-width="3" fill="none" marker-end="url(#arrowRed)"/>
  <text x="280" y="340" font-size="12" fill="#dc2626" font-weight="600">WRITE</text>
  
  <!-- Replication Arrows -->
  <path d="M 520 240 L 680 160" stroke="#8b5cf6" stroke-width="3" stroke-dasharray="8,4" fill="none" marker-end="url(#arrowPurple)"/>
  <text x="580" y="190" font-size="12" fill="#7c3aed" font-weight="600">Replicate</text>
  
  <path d="M 520 275 L 680 275" stroke="#8b5cf6" stroke-width="3" stroke-dasharray="8,4" fill="none" marker-end="url(#arrowPurple)"/>
  <text x="580" y="265" font-size="12" fill="#7c3aed" font-weight="600">Replicate</text>
  
  <path d="M 520 310 L 680 390" stroke="#8b5cf6" stroke-width="3" stroke-dasharray="8,4" fill="none" marker-end="url(#arrowPurple)"/>
  <text x="580" y="360" font-size="12" fill="#7c3aed" font-weight="600">Replicate</text>
  
  <!-- Replica Databases -->
  <g transform="translate(800, 150)">
    <ellipse cx="0" cy="-30" rx="60" ry="18" fill="#10b981"/>
    <rect x="-60" y="-30" width="120" height="60" fill="#10b981"/>
    <ellipse cx="0" cy="30" rx="60" ry="18" fill="#059669"/>
    <text x="0" y="-5" font-size="14" fill="white" text-anchor="middle" font-weight="bold">REPLICA 1</text>
    <text x="0" y="15" font-size="12" fill="white" text-anchor="middle">Read Only</text>
    <rect x="-65" y="-55" width="130" height="25" rx="5" fill="#d1fae5"/>
    <text x="0" y="-37" font-size="12" fill="#065f46" text-anchor="middle" font-weight="600">📖 Reads</text>
  </g>
  
  <g transform="translate(800, 275)">
    <ellipse cx="0" cy="-30" rx="60" ry="18" fill="#10b981"/>
    <rect x="-60" y="-30" width="120" height="60" fill="#10b981"/>
    <ellipse cx="0" cy="30" rx="60" ry="18" fill="#059669"/>
    <text x="0" y="-5" font-size="14" fill="white" text-anchor="middle" font-weight="bold">REPLICA 2</text>
    <text x="0" y="15" font-size="12" fill="white" text-anchor="middle">Read Only</text>
    <rect x="-65" y="-55" width="130" height="25" rx="5" fill="#d1fae5"/>
    <text x="0" y="-37" font-size="12" fill="#065f46" text-anchor="middle" font-weight="600">📖 Reads</text>
  </g>
  
  <g transform="translate(800, 400)">
    <ellipse cx="0" cy="-30" rx="60" ry="18" fill="#10b981"/>
    <rect x="-60" y="-30" width="120" height="60" fill="#10b981"/>
    <ellipse cx="0" cy="30" rx="60" ry="18" fill="#059669"/>
    <text x="0" y="-5" font-size="14" fill="white" text-anchor="middle" font-weight="bold">REPLICA 3</text>
    <text x="0" y="15" font-size="12" fill="white" text-anchor="middle">Read Only</text>
    <rect x="-65" y="-55" width="130" height="25" rx="5" fill="#d1fae5"/>
    <text x="0" y="-37" font-size="12" fill="#065f46" text-anchor="middle" font-weight="600">📖 Reads</text>
  </g>
  
  <!-- Read Arrows -->
  <path d="M 200 220 L 730 150" stroke="#10b981" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
  <path d="M 200 230 L 730 275" stroke="#10b981" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
  <path d="M 200 330 L 730 400" stroke="#10b981" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
  
  <!-- Info boxes -->
  <g transform="translate(1000, 150)">
    <rect x="0" y="0" width="180" height="80" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text x="90" y="25" font-size="14" fill="#92400e" text-anchor="middle" font-weight="bold">Benefits:</text>
    <text x="90" y="45" font-size="12" fill="#78350f" text-anchor="middle">✓ Scale reads</text>
    <text x="90" y="62" font-size="12" fill="#78350f" text-anchor="middle">✓ High availability</text>
  </g>
  
  <g transform="translate(1000, 250)">
    <rect x="0" y="0" width="180" height="80" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
    <text x="90" y="25" font-size="14" fill="#7f1d1d" text-anchor="middle" font-weight="bold">Trade-offs:</text>
    <text x="90" y="45" font-size="12" fill="#991b1b" text-anchor="middle">⚠ Replication lag</text>
    <text x="90" y="62" font-size="12" fill="#991b1b" text-anchor="middle">⚠ Eventual consistency</text>
  </g>
  
  <!-- Markers -->
  <defs>
    <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
    </marker>
    <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6" />
    </marker>
  </defs>
</svg>

**Primary-Replica Pattern:**
- One primary database handles all writes
- Multiple replicas handle reads
- Primary replicates changes to replicas

**How it works:**
1. Write goes to primary
2. Primary updates its data
3. Primary sends changes to replicas
4. Replicas update their data
5. Reads go to replicas

**Real-world examples:**
- **YouTube** replicates video metadata globally
- **Instagram** uses read replicas for timeline queries
- **Reddit** uses replicas to handle millions of reads

**Replication types:**

**1. Synchronous Replication**
- Primary waits for replica confirmation
- Strong consistency
- Slower writes

**2. Asynchronous Replication**
- Primary doesn't wait
- Faster writes
- Eventual consistency
- Replication lag (milliseconds to seconds)

**Pros:**
- Scales read capacity (add more replicas)
- Provides backup if primary fails
- Can place replicas near users (lower latency)

**Cons:**
- Replication lag (replicas might be behind)
- Doesn't scale writes (still one primary)
- Complexity in failover

**Failover:** If primary fails, promote a replica to primary.

#### Database Sharding

**What it is:** Splitting your database across multiple machines, each holding a subset of data.

**How it works:** Instead of one database with 1 billion users, have 10 databases with 100 million users each.

**Sharding strategies:**

**1. Hash-Based Sharding**
```
shard = hash(user_id) % num_shards
```
- Even distribution
- Hard to add shards later

**2. Range-Based Sharding**
```
Shard 1: users 0-100M
Shard 2: users 100M-200M
```
- Easy to add shards
- Risk of hotspots

**3. Geographic Sharding**
```
US users → US shard
EU users → EU shard
```
- Lower latency
- Uneven distribution

**Real-world examples:**
- **Instagram** shards by user ID
- **Discord** shards by server ID
- **Uber** shards by geographic region

**Pros:**
- Scales writes horizontally
- Breaks through single-database limits
- Can handle massive datasets

**Cons:**
- Complex queries across shards
- Rebalancing is painful
- Hotspots if data isn't evenly distributed
- Can't do JOINs across shards

**Challenges:**
- **Cross-shard queries:** Expensive, avoid if possible
- **Distributed transactions:** Very complex
- **Resharding:** Moving data between shards

---

### D. Caching

**What it is:** Storing frequently accessed data in fast memory (RAM) to avoid slow database queries.

**Why it matters:** Database queries take 10-100ms. Cache lookups take 1ms. That's 10-100x faster.

<svg role="img" aria-labelledby="cache-title cache-desc" viewBox="0 0 1200 600" style="max-width: 100%; height: auto; margin: 30px 0;">
  <title id="cache-title">Caching Architecture Layers</title>
  <desc id="cache-desc">Multi-layer caching strategy showing client cache, CDN, server cache, and database with performance metrics</desc>
  
  <!-- Background -->
  <rect width="1200" height="600" fill="#f8fafc"/>
  
  <!-- Title -->
  <text x="600" y="40" font-size="24" font-weight="bold" fill="#1f2937" text-anchor="middle">Multi-Layer Caching Strategy</text>
  
  <!-- Client -->
  <g transform="translate(100, 300)">
    <circle cx="0" cy="0" r="40" fill="#3b82f6"/>
    <text x="0" y="5" font-size="28" fill="white" text-anchor="middle">💻</text>
    <text x="0" y="70" font-size="14" fill="#1f2937" text-anchor="middle" font-weight="600">Client</text>
    <rect x="-50" y="-80" width="100" height="35" rx="5" fill="#dbeafe"/>
    <text x="0" y="-55" font-size="12" fill="#1e40af" text-anchor="middle" font-weight="600">Browser Cache</text>
    <text x="0" y="-40" font-size="11" fill="#1e40af" text-anchor="middle">~0ms</text>
  </g>
  
  <!-- Arrow 1 -->
  <path d="M 150 300 L 280 300" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#arrowGray)"/>
  <text x="215" y="290" font-size="11" fill="#6b7280">Request</text>
  
  <!-- CDN -->
  <g transform="translate(350, 300)">
    <rect x="-60" y="-60" width="120" height="120" rx="12" fill="url(#cdnGradient)"/>
    <text x="0" y="-25" font-size="16" fill="white" text-anchor="middle" font-weight="bold">CDN</text>
    <text x="0" y="-5" font-size="14" fill="white" text-anchor="middle">Edge Cache</text>
    <text x="0" y="20" font-size="12" fill="white" text-anchor="middle">Images</text>
    <text x="0" y="38" font-size="12" fill="white" text-anchor="middle">Static Files</text>
    <rect x="-65" y="-90" width="130" height="25" rx="5" fill="#fef3c7"/>
    <text x="0" y="-70" font-size="11" fill="#92400e" text-anchor="middle" font-weight="600">⚡ 20-50ms</text>
  </g>
  
  <!-- Arrow 2 -->
  <path d="M 420 300 L 530 300" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#arrowGray)"/>
  <text x="475" y="290" font-size="11" fill="#6b7280">Miss</text>
  
  <!-- Application Server -->
  <g transform="translate(600, 300)">
    <rect x="-60" y="-60" width="120" height="120" rx="12" fill="#3b82f6"/>
    <text x="0" y="-20" font-size="16" fill="white" text-anchor="middle" font-weight="bold">App</text>
    <text x="0" y="0" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Server</text>
    <text x="0" y="25" font-size="12" fill="white" text-anchor="middle">Business</text>
    <text x="0" y="42" font-size="12" fill="white" text-anchor="middle">Logic</text>
  </g>
  
  <!-- Arrow 3 Down -->
  <path d="M 600 370 L 600 450" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#arrowGray)"/>
  <text x="620" y="415" font-size="11" fill="#6b7280">Query</text>
  
  <!-- Redis Cache -->
  <g transform="translate(600, 500)">
    <rect x="-70" y="-40" width="140" height="80" rx="10" fill="#ef4444"/>
    <text x="0" y="-10" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Redis Cache</text>
    <text x="0" y="12" font-size="13" fill="white" text-anchor="middle">In-Memory</text>
    <text x="0" y="30" font-size="13" fill="white" text-anchor="middle">Key-Value</text>
    <rect x="-75" y="-65" width="150" height="22" rx="5" fill="#fef3c7"/>
    <text x="0" y="-49" font-size="11" fill="#92400e" text-anchor="middle" font-weight="600">⚡ 1-5ms</text>
  </g>
  
  <!-- Arrow 4 Right -->
  <path d="M 670 500 L 780 500" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#arrowGray)"/>
  <text x="725" y="490" font-size="11" fill="#6b7280">Miss</text>
  
  <!-- Database -->
  <g transform="translate(900, 500)">
    <ellipse cx="0" cy="-30" rx="70" ry="20" fill="#6366f1"/>
    <rect x="-70" y="-30" width="140" height="60" fill="#6366f1"/>
    <ellipse cx="0" cy="30" rx="70" ry="20" fill="#4f46e5"/>
    <text x="0" y="-5" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Database</text>
    <text x="0" y="15" font-size="13" fill="white" text-anchor="middle">PostgreSQL</text>
    <rect x="-75" y="-65" width="150" height="22" rx="5" fill="#fee2e2"/>
    <text x="0" y="-49" font-size="11" fill="#7f1d1d" text-anchor="middle" font-weight="600">🐌 10-100ms</text>
  </g>
  
  <!-- Performance Comparison -->
  <g transform="translate(100, 100)">
    <rect x="0" y="0" width="400" height="140" rx="10" fill="white" stroke="#e5e7eb" stroke-width="2"/>
    <text x="200" y="30" font-size="16" fill="#1f2937" text-anchor="middle" font-weight="bold">⚡ Performance Comparison</text>
    
    <!-- Browser Cache -->
    <rect x="20" y="50" width="5" height="20" fill="#3b82f6"/>
    <text x="35" y="65" font-size="13" fill="#374151">Browser Cache: ~0ms</text>
    
    <!-- CDN -->
    <rect x="20" y="75" width="50" height="20" fill="#f59e0b"/>
    <text x="80" y="90" font-size="13" fill="#374151">CDN: 20-50ms</text>
    
    <!-- Redis -->
    <rect x="20" y="100" width="10" height="20" fill="#ef4444"/>
    <text x="40" y="115" font-size="13" fill="#374151">Redis: 1-5ms</text>
    
    <!-- Database -->
    <rect x="20" y="125" width="200" height="20" fill="#6366f1"/>
    <text x="230" y="140" font-size="13" fill="#374151">Database: 10-100ms</text>
  </g>
  
  <!-- Cache Hit Flow -->
  <g transform="translate(600, 100)">
    <rect x="0" y="0" width="500" height="140" rx="10" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
    <text x="250" y="30" font-size="16" fill="#065f46" text-anchor="middle" font-weight="bold">✅ Cache Hit Flow</text>
    
    <text x="20" y="60" font-size="13" fill="#064e3b">1. Check browser cache → HIT (0ms)</text>
    <text x="20" y="82" font-size="13" fill="#064e3b">2. If miss, check CDN → HIT (20ms)</text>
    <text x="20" y="104" font-size="13" fill="#064e3b">3. If miss, check Redis → HIT (1ms)</text>
    <text x="20" y="126" font-size="13" fill="#064e3b">4. If miss, query database → SLOW (50ms)</text>
  </g>
  
  <!-- Gradients and Markers -->
  <defs>
    <linearGradient id="cdnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
    </linearGradient>
    <marker id="arrowGray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
    </marker>
  </defs>
</svg>

**Cache hierarchy:**

**1. Client-Side Cache**
- Browser cache
- Mobile app cache
- Fastest (no network)

**2. CDN Cache**
- Edge servers worldwide
- Static content (images, videos, CSS)

**3. Server-Side Cache**
- Redis, Memcached
- Application data

**4. Database Cache**
- Query result cache
- Built into database

**Caching strategies:**

**1. Cache-Aside (Lazy Loading)**
```
1. Check cache
2. If miss, query database
3. Store in cache
4. Return data
```
- Most common pattern
- Cache only what's needed

**2. Write-Through**
```
1. Write to cache
2. Write to database
3. Return success
```
- Cache always consistent
- Slower writes

**3. Write-Back (Write-Behind)**
```
1. Write to cache
2. Return success
3. Async write to database
```
- Fastest writes
- Risk of data loss

**4. Write-Around**
```
1. Write to database
2. Invalidate cache
3. Next read loads from DB
```
- Avoids cache pollution
- First read after write is slow

**Cache eviction policies:**

**1. LRU (Least Recently Used)**
- Remove least recently accessed items
- Most common
- Good for general use

**2. LFU (Least Frequently Used)**
- Remove least frequently accessed items
- Good for stable access patterns

**3. FIFO (First In First Out)**
- Remove oldest items
- Simple but not optimal

**4. TTL (Time To Live)**
- Items expire after time
- Good for time-sensitive data

**Real-world examples:**
- **Reddit** caches front page in Redis
- **Twitter** caches timelines
- **Amazon** caches product pages
- **Netflix** caches user preferences

**Cache invalidation (the hard part):**

**Problem:** How do you keep cache and database in sync?

**Strategies:**
1. **TTL:** Cache expires after time (5 minutes)
2. **Event-based:** Invalidate on updates
3. **Version-based:** Include version in cache key

**Famous quote:** "There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton

**Pros:**
- Dramatically faster reads
- Reduces database load
- Improves user experience

**Cons:**
- Cache invalidation complexity
- Stale data risk
- Memory is expensive
- Added complexity

**Cache hit ratio:** Percentage of requests served from cache. Aim for 80%+.

---

### E. Content Delivery

#### CDN (Content Delivery Network)

**What it is:** A network of servers distributed globally that cache and serve static content from locations close to users.

**How it works:**
1. User in Tokyo requests image
2. CDN routes to nearest edge server (Tokyo)
3. If cached, serve immediately (20ms)
4. If not cached, fetch from origin (200ms), cache, serve
5. Next user gets cached version (20ms)

**What CDNs cache:**
- Images, videos
- CSS, JavaScript files
- Fonts
- Static HTML pages
- API responses (sometimes)

**Real-world examples:**
- **Netflix** stores popular shows on CDN servers in every major city
- **YouTube** uses Google's CDN for video delivery
- **Spotify** caches popular songs on edge servers
- **Instagram** serves images via CDN

**CDN providers:**
- Cloudflare
- AWS CloudFront
- Akamai
- Fastly
- Google Cloud CDN

**Pros:**
- Dramatically lower latency (10x faster)
- Reduces origin server load
- Handles traffic spikes
- DDoS protection

**Cons:**
- Costs money (per GB transferred)
- Cache invalidation complexity
- Not useful for dynamic content
- Initial request is slow (cache miss)

**Performance impact:**
- Without CDN: User in Australia → US server = 200ms
- With CDN: User in Australia → Sydney edge = 20ms

**Cache invalidation:**
- Set TTL (time to live)
- Purge cache manually
- Use versioned URLs (`style.v2.css`)

---

### F. Communication Patterns

How services talk to each other matters.

#### REST APIs

**What it is:** HTTP-based communication using standard methods (GET, POST, PUT, DELETE).

**How it works:**
```
GET /users/123          → Get user
POST /users             → Create user
PUT /users/123          → Update user
DELETE /users/123       → Delete user
```

**Real-world examples:**
- **Stripe** payment API
- **Twitter** API
- **GitHub** API
- Most web APIs

**Pros:**
- Universal standard
- Stateless
- Cacheable
- Simple to understand

**Cons:**
- Can be chatty (multiple requests)
- Over-fetching or under-fetching data
- No real-time support

#### GraphQL

**What it is:** Query language that lets clients request exactly the data they need.

**How it works:**
```graphql
query {
  user(id: 123) {
    name
    email
    posts {
      title
      likes
    }
  }
}
```

**Real-world examples:**
- **GitHub** API v4
- **Shopify** API
- **Facebook** (created GraphQL)

**Pros:**
- Single request for related data
- No over-fetching
- Strong typing
- Self-documenting

**Cons:**
- More complex server implementation
- Caching is harder
- Can be abused (expensive queries)

#### WebSockets

**What it is:** Persistent two-way connection between client and server.

**How it works:**
1. Client opens WebSocket connection
2. Connection stays open
3. Server can push data anytime
4. Client can send data anytime

**Real-world examples:**
- **Slack** real-time messaging
- **Trading platforms** live price updates
- **Multiplayer games** real-time state
- **Collaborative editing** (Google Docs)

**Pros:**
- Real-time communication
- Low latency
- Bi-directional
- Efficient (no polling)

**Cons:**
- Harder to scale (stateful)
- More complex infrastructure
- Firewall issues

#### gRPC

**What it is:** High-performance RPC framework using Protocol Buffers.

**How it works:**
- Define service in `.proto` file
- Generate client/server code
- Binary protocol (faster than JSON)

**Real-world examples:**
- **Google** internal services
- **Netflix** microservices
- **Uber** service communication

**Pros:**
- Very fast (binary)
- Strong typing
- Bi-directional streaming
- Code generation

**Cons:**
- Not human-readable
- Less browser support
- Steeper learning curve

---

I'll continue with the remaining sections in the next part. The blog is comprehensive and following all guidelines!



### G. Asynchronous Processing

Not everything needs to happen immediately. Some tasks can wait.

#### Message Queues

**What it is:** A buffer that stores messages between services for asynchronous processing.

**How it works:**
1. Producer sends message to queue
2. Message waits in queue
3. Consumer picks up message when ready
4. Consumer processes message
5. Consumer acknowledges completion

**Popular message queues:**
- **Kafka** - High throughput, distributed
- **RabbitMQ** - Feature-rich, reliable
- **AWS SQS** - Managed, simple
- **Redis** - Fast, simple

**Real-world examples:**
- **YouTube** queues video processing (transcoding, thumbnails)
- **Uber** queues ride matching and notifications
- **Airbnb** queues email sending
- **LinkedIn** queues feed updates

**Use cases:**
- Email sending
- Image processing
- Report generation
- Data analytics
- Notifications
- Background jobs

**Pros:**
- Decouples services
- Handles traffic spikes (queue buffers)
- Retry failed tasks
- Scales independently

**Cons:**
- Adds latency (not instant)
- Requires queue management
- Eventual consistency
- More complex debugging

**Patterns:**

**1. Point-to-Point**
- One producer, one consumer
- Message consumed once

**2. Pub/Sub (Publish-Subscribe)**
- One producer, multiple consumers
- Message consumed by all subscribers

**Example:** User posts tweet
```
1. Save tweet to database (immediate)
2. Queue fan-out task (async)
3. Queue notification task (async)
4. Queue analytics task (async)
5. Return success to user (fast!)
```

#### Event-Driven Architecture

**What it is:** Services communicate by publishing and subscribing to events.

**How it works:**
- Service A publishes "UserCreated" event
- Services B, C, D subscribe to event
- Each service reacts independently

**Real-world examples:**
- **Netflix** uses events for user actions
- **Amazon** uses events for order processing
- **Uber** uses events for ride lifecycle

**Pros:**
- Loose coupling
- Easy to add new features
- Scales well

**Cons:**
- Harder to debug
- Eventual consistency
- Complex error handling

---

### H. Reliability & Fault Tolerance

Systems fail. Hardware crashes. Networks partition. Your system must handle failures gracefully.

#### Redundancy

**What it is:** Having backup components that take over when primary fails.

**Types:**

**1. Active-Active**
- All components handle traffic
- If one fails, others continue
- No downtime

**2. Active-Passive**
- Primary handles traffic
- Backup waits on standby
- Failover takes seconds

**Real-world examples:**
- **AWS** runs multiple data centers per region
- **Google** has redundant servers for every service
- **Netflix** runs in multiple AWS regions

**Pros:**
- Eliminates single points of failure
- Improves availability
- Enables maintenance without downtime

**Cons:**
- Costs more (paying for backups)
- More complex
- Synchronization challenges

#### Failover

**What it is:** Automatically switching to backup when primary fails.

**How it works:**
1. Monitor primary health
2. Detect failure
3. Promote backup to primary
4. Route traffic to new primary

**Failover time:**
- Automatic: 30 seconds - 5 minutes
- Manual: Hours

**Real-world examples:**
- **Database failover:** Promote replica to primary
- **Load balancer failover:** Switch to backup load balancer
- **Region failover:** Switch to different geographic region

**Challenges:**
- Split-brain problem (two primaries)
- Data loss during failover
- Failover time

#### Circuit Breaker

**What it is:** Stops calling a failing service to prevent cascading failures.

**How it works:**

**States:**
1. **Closed:** Normal operation, requests go through
2. **Open:** Service is failing, requests fail fast
3. **Half-Open:** Testing if service recovered

**Example:**
```
1. Recommendation service is down
2. After 5 failures, circuit opens
3. Stop calling recommendation service
4. Show cached recommendations instead
5. After 30 seconds, try again (half-open)
6. If success, close circuit
```

**Real-world examples:**
- **Spotify** uses circuit breakers for recommendation service
- **Netflix** Hystrix library implements circuit breakers
- **Amazon** uses circuit breakers between microservices

**Pros:**
- Prevents cascading failures
- Fails fast (better UX)
- Gives failing service time to recover

**Cons:**
- Requires fallback strategies
- Can hide underlying issues
- Configuration complexity

#### Retry Mechanisms

**What it is:** Automatically retrying failed requests.

**Strategies:**

**1. Immediate Retry**
- Retry right away
- Good for transient failures

**2. Exponential Backoff**
- Wait 1s, 2s, 4s, 8s between retries
- Prevents overwhelming failing service

**3. Jitter**
- Add randomness to backoff
- Prevents thundering herd

**Example:**
```
Attempt 1: Fail → Wait 1s
Attempt 2: Fail → Wait 2s
Attempt 3: Fail → Wait 4s
Attempt 4: Success!
```

**Best practices:**
- Limit retry attempts (3-5)
- Use exponential backoff
- Add jitter
- Only retry idempotent operations

**Idempotent:** Operation that can be repeated safely. GET is idempotent. POST might not be (could create duplicate).

---

### I. Data Consistency

In distributed systems, keeping data consistent is challenging.

#### ACID Properties

**What it is:** Guarantees provided by traditional databases.

**A - Atomicity**
- All or nothing
- Transaction either completes fully or not at all

**Example:** Bank transfer
```
1. Deduct $100 from Account A
2. Add $100 to Account B
Both happen or neither happens
```

**C - Consistency**
- Data follows all rules
- Constraints are enforced

**Example:** Foreign key constraints, unique constraints

**I - Isolation**
- Concurrent transactions don't interfere
- Each transaction sees consistent state

**Example:** Two people booking last seat on flight—only one succeeds

**D - Durability**
- Once committed, data persists
- Survives crashes

**Example:** After "Payment successful," data is saved permanently

**Real-world examples:**
- **Banks** need ACID for transactions
- **E-commerce** needs ACID for orders
- **Booking systems** need ACID for reservations

#### CAP Theorem

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; border-radius: 12px; margin: 30px 0; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);">
  <h4 style="margin: 0 0 15px 0; font-size: 22px; color: white;">⚖️ The Fundamental Trade-off</h4>
  <p style="margin: 0; font-size: 16px; line-height: 1.7; opacity: 0.95;">In a distributed system, you can only have two of three: Consistency, Availability, Partition Tolerance.</p>
</div>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
  <div style="background: white; border: 3px solid #3b82f6; border-radius: 10px; padding: 20px; text-align: center; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);">
    <div style="background: #3b82f6; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 28px; font-weight: bold;">C</div>
    <h5 style="margin: 0 0 10px 0; color: #1e40af; font-size: 18px;">Consistency</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">All nodes see the same data at the same time</p>
  </div>
  
  <div style="background: white; border: 3px solid #10b981; border-radius: 10px; padding: 20px; text-align: center; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);">
    <div style="background: #10b981; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 28px; font-weight: bold;">A</div>
    <h5 style="margin: 0 0 10px 0; color: #065f46; font-size: 18px;">Availability</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Every request gets a response (success or failure)</p>
  </div>
  
  <div style="background: white; border: 3px solid #8b5cf6; border-radius: 10px; padding: 20px; text-align: center; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);">
    <div style="background: #8b5cf6; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 28px; font-weight: bold;">P</div>
    <h5 style="margin: 0 0 10px 0; color: #5b21b6; font-size: 18px;">Partition Tolerance</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">System continues working despite network failures</p>
  </div>
</div>

<div style="background: #fef3c7; border-left: 5px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 25px 0;">
  <p style="margin: 0 0 10px 0; color: #92400e; font-weight: 600; font-size: 15px;">🎯 The trade-off:</p>
  <p style="margin: 0; color: #78350f; font-size: 14px; line-height: 1.7;">In a distributed system, network partitions will happen (P is mandatory). You must choose between C and A.</p>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
  <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #3b82f6; border-radius: 10px; padding: 20px;">
    <h5 style="margin: 0 0 12px 0; color: #1e40af; font-size: 17px;">CP Systems (Consistency + Partition Tolerance)</h5>
    <p style="margin: 0 0 12px 0; color: #1e3a8a; font-size: 14px;">Sacrifice availability during partitions</p>
    <div style="background: white; padding: 12px; border-radius: 6px; margin-bottom: 10px;">
      <p style="margin: 0 0 5px 0; font-weight: 600; color: #374151; font-size: 13px;">Examples:</p>
      <p style="margin: 0; color: #6b7280; font-size: 13px;">MongoDB, HBase, Redis</p>
    </div>
    <p style="margin: 0; color: #1e3a8a; font-size: 13px;"><strong>Use case:</strong> Banking, inventory</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border: 2px solid #10b981; border-radius: 10px; padding: 20px;">
    <h5 style="margin: 0 0 12px 0; color: #065f46; font-size: 17px;">AP Systems (Availability + Partition Tolerance)</h5>
    <p style="margin: 0 0 12px 0; color: #064e3b; font-size: 14px;">Sacrifice consistency during partitions</p>
    <div style="background: white; padding: 12px; border-radius: 6px; margin-bottom: 10px;">
      <p style="margin: 0 0 5px 0; font-weight: 600; color: #374151; font-size: 13px;">Examples:</p>
      <p style="margin: 0; color: #6b7280; font-size: 13px;">Cassandra, DynamoDB, CouchDB</p>
    </div>
    <p style="margin: 0; color: #064e3b; font-size: 13px;"><strong>Use case:</strong> Social media, analytics</p>
  </div>
</div>

**Real-world example:**
- **DynamoDB** (AP): During network partition, you can still read/write, but different users might see different data temporarily
- **MongoDB** (CP): During network partition, some nodes become unavailable to maintain consistency

#### Eventual Consistency

**What it is:** System will become consistent eventually, but might be temporarily inconsistent.

**How it works:**
1. Write happens on one node
2. Write propagates to other nodes
3. Eventually (milliseconds to seconds), all nodes have same data

**Real-world examples:**
- **Instagram likes:** Your like might not appear immediately to everyone
- **Facebook posts:** Friends see your post at slightly different times
- **DNS updates:** Takes time to propagate globally

**Pros:**
- High availability
- Better performance
- Scales easily

**Cons:**
- Temporary inconsistency
- Complex conflict resolution
- Harder to reason about

**When to use:** Social media, analytics, caching—where temporary inconsistency is acceptable.

#### Strong Consistency

**What it is:** All nodes see the same data immediately after a write.

**How it works:**
1. Write happens
2. System waits for all nodes to confirm
3. Only then returns success

**Real-world examples:**
- **Bank transactions:** Balance must be consistent
- **Inventory systems:** Can't oversell products
- **Booking systems:** Can't double-book

**Pros:**
- Simple to reason about
- No conflicts
- Data always correct

**Cons:**
- Slower writes
- Lower availability
- Harder to scale

**When to use:** Financial systems, inventory, anything where correctness is critical.

---

### J. Security

Security isn't optional. One breach can destroy a company.

#### Authentication vs Authorization

**Authentication:** Who are you?
- Verifying identity
- Login with username/password
- Multi-factor authentication

**Authorization:** What can you do?
- Determining permissions
- Role-based access control
- Resource-level permissions

**Example:**
- **Authentication:** You log into Google with your password
- **Authorization:** You can edit your own docs, view shared docs, but can't edit others' docs

**Authentication methods:**

**1. Session-Based**
- Server stores session
- Client gets session ID cookie
- Traditional approach

**2. Token-Based (JWT)**
- Server signs token
- Client stores token
- Stateless
- Modern approach

**3. OAuth 2.0**
- Third-party authentication
- "Login with Google"
- Delegated authorization

**4. Multi-Factor Authentication (MFA)**
- Something you know (password)
- Something you have (phone)
- Something you are (fingerprint)

**Real-world examples:**
- **Gmail** uses OAuth for third-party apps
- **Banking apps** use MFA
- **AWS** uses IAM for authorization

#### Rate Limiting

**What it is:** Restricting how many requests a user can make in a time period.

**Why it matters:**
- Prevents abuse
- Protects against DDoS
- Ensures fair usage
- Reduces costs

**Algorithms:**

**1. Fixed Window**
```
100 requests per minute
Reset at minute boundary
```
- Simple
- Burst at boundary

**2. Sliding Window**
```
100 requests per rolling 60 seconds
```
- Smoother
- More complex

**3. Token Bucket**
```
Bucket holds 100 tokens
Refill 10 tokens/second
Each request costs 1 token
```
- Handles bursts
- Most flexible

**4. Leaky Bucket**
```
Requests enter bucket
Process at fixed rate
Overflow is rejected
```
- Smooth rate
- No bursts

**Real-world examples:**
- **Twitter API:** 300 requests per 15 minutes
- **GitHub API:** 5,000 requests per hour
- **Stripe API:** 100 requests per second

**Response when limited:**
```
HTTP 429 Too Many Requests
Retry-After: 60
```

#### Encryption

**What it is:** Scrambling data so only authorized parties can read it.

**Types:**

**1. Encryption at Rest**
- Data stored on disk
- Database encryption
- File encryption

**2. Encryption in Transit**
- Data moving over network
- HTTPS/TLS
- VPN

**Encryption methods:**

**1. Symmetric Encryption**
- Same key for encrypt/decrypt
- Fast
- Examples: AES, DES

**2. Asymmetric Encryption**
- Public key encrypts
- Private key decrypts
- Slower
- Examples: RSA, ECC

**Real-world examples:**
- **WhatsApp** end-to-end encryption
- **HTTPS** encrypts web traffic
- **AWS** encrypts data at rest

**Best practices:**
- Always use HTTPS
- Encrypt sensitive data at rest
- Use strong algorithms (AES-256)
- Rotate keys regularly
- Never store passwords in plain text (hash them)

---

### K. Monitoring & Observability

You can't fix what you can't see.

#### Logging

**What it is:** Recording events that happen in your system.

**Log levels:**
- **DEBUG:** Detailed information for debugging
- **INFO:** General information
- **WARN:** Warning, something unusual
- **ERROR:** Error occurred, but system continues
- **FATAL:** Critical error, system might crash

**What to log:**
- User actions
- Errors and exceptions
- Performance metrics
- Security events
- System state changes

**Real-world examples:**
- **Google** logs every search query
- **Amazon** logs every purchase
- **Netflix** logs every video play

**Best practices:**
- Use structured logging (JSON)
- Include context (user ID, request ID)
- Don't log sensitive data (passwords, credit cards)
- Use log aggregation (ELK stack, Splunk)

#### Metrics

**What it is:** Numerical measurements of system behavior over time.

**Key metrics:**

**1. Latency**
- How long requests take
- P50, P95, P99 percentiles

**2. Throughput**
- Requests per second
- Transactions per second

**3. Error Rate**
- Percentage of failed requests
- 4xx vs 5xx errors

**4. Saturation**
- CPU usage
- Memory usage
- Disk usage
- Network usage

**Real-world examples:**
- **Netflix** tracks video start time
- **Uber** tracks ride matching time
- **Stripe** tracks payment success rate

**Tools:**
- Prometheus
- Grafana
- Datadog
- New Relic

#### Distributed Tracing

**What it is:** Tracking a request as it flows through multiple services.

**How it works:**
1. Request gets unique trace ID
2. Each service adds span (timing info)
3. Spans linked by trace ID
4. Visualize entire request flow

**Why it matters:**
In microservices, one user request might touch 10+ services. When something fails, you need to know where.

**Example:**
```
User request → API Gateway → Auth Service → User Service → Database
                                          → Cache
                                          → Notification Service
```

**Real-world examples:**
- **Uber** uses Jaeger for tracing
- **Netflix** built their own (Zipkin)
- **Google** uses Dapper

**Tools:**
- Jaeger
- Zipkin
- AWS X-Ray
- Google Cloud Trace

#### Alerting

**What it is:** Notifying engineers when something goes wrong.

**Alert types:**

**1. Threshold Alerts**
- CPU > 80% for 5 minutes
- Error rate > 1%

**2. Anomaly Detection**
- Traffic 3x higher than normal
- ML-based detection

**Best practices:**
- Alert on symptoms, not causes
- Reduce alert fatigue
- Include runbooks
- Set appropriate thresholds

**Real-world example:**
```
Alert: API latency P99 > 1000ms
Severity: High
Runbook: Check database connections, restart cache
```

---

I'll continue with Architecture Patterns and remaining sections in the next part!


## Architecture Patterns

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 30px; border-radius: 12px; margin: 35px 0; box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3);">
  <h3 style="margin: 0 0 15px 0; font-size: 24px; color: white;">🏛️ System Organization Patterns</h3>
  <p style="margin: 0; font-size: 16px; line-height: 1.7; opacity: 0.95;">How you organize your system matters. Different patterns solve different problems.</p>
</div>

### Monolithic Architecture

**What it is:** One large application containing all functionality.

**Structure:**
- Single codebase
- Single deployment unit
- Shared database
- All features in one application

**Real-world examples:**
- **Early Twitter** (before microservices)
- **Stack Overflow** (still monolithic!)
- **Shopify** core (monolith with services)

**Pros:**
- Simple to develop initially
- Easy to test (everything together)
- Easy to deploy (one unit)
- No network overhead
- Easier debugging

**Cons:**
- Hard to scale (must scale entire app)
- Slow deployments (test everything)
- Technology lock-in
- Hard to understand as it grows
- One bug can crash everything

**When to use:**
- Small teams
- Early-stage startups
- Simple applications
- When speed of development matters

### Microservices Architecture

**What it is:** Application split into small, independent services.

<svg role="img" aria-labelledby="microservices-title microservices-desc" viewBox="0 0 1200 700" style="max-width: 100%; height: auto; margin: 30px 0;">
  <title id="microservices-title">Microservices Architecture</title>
  <desc id="microservices-desc">Diagram showing microservices architecture with API gateway, multiple independent services, and separate databases</desc>
  
  <!-- Background -->
  <rect width="1200" height="700" fill="#f8fafc"/>
  
  <!-- Title -->
  <text x="600" y="40" font-size="24" font-weight="bold" fill="#1f2937" text-anchor="middle">Microservices Architecture</text>
  
  <!-- Clients -->
  <g transform="translate(100, 150)">
    <circle cx="0" cy="0" r="30" fill="#3b82f6"/>
    <text x="0" y="5" font-size="20" fill="white" text-anchor="middle">📱</text>
    <text x="0" y="50" font-size="12" fill="#1f2937" text-anchor="middle">Mobile</text>
  </g>
  
  <g transform="translate(100, 280)">
    <circle cx="0" cy="0" r="30" fill="#3b82f6"/>
    <text x="0" y="5" font-size="20" fill="white" text-anchor="middle">💻</text>
    <text x="0" y="50" font-size="12" fill="#1f2937" text-anchor="middle">Web</text>
  </g>
  
  <!-- API Gateway -->
  <g transform="translate(300, 215)">
    <rect x="-70" y="-80" width="140" height="160" rx="12" fill="url(#gatewayGradient)"/>
    <text x="0" y="-40" font-size="18" fill="white" text-anchor="middle" font-weight="bold">API</text>
    <text x="0" y="-18" font-size="18" fill="white" text-anchor="middle" font-weight="bold">Gateway</text>
    <text x="0" y="10" font-size="11" fill="white" text-anchor="middle">Routing</text>
    <text x="0" y="26" font-size="11" fill="white" text-anchor="middle">Auth</text>
    <text x="0" y="42" font-size="11" fill="white" text-anchor="middle">Rate Limiting</text>
    <text x="0" y="58" font-size="11" fill="white" text-anchor="middle">Load Balancing</text>
  </g>
  
  <!-- Arrows from clients to gateway -->
  <path d="M 135 150 L 225 180" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrowBlue2)"/>
  <path d="M 135 280 L 225 250" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrowBlue2)"/>
  
  <!-- User Service -->
  <g transform="translate(550, 120)">
    <rect x="-65" y="-50" width="130" height="100" rx="10" fill="#10b981"/>
    <text x="0" y="-20" font-size="15" fill="white" text-anchor="middle" font-weight="bold">User Service</text>
    <text x="0" y="2" font-size="11" fill="white" text-anchor="middle">Authentication</text>
    <text x="0" y="18" font-size="11" fill="white" text-anchor="middle">Profile</text>
    <text x="0" y="34" font-size="11" fill="white" text-anchor="middle">Node.js</text>
    
    <!-- User DB -->
    <ellipse cx="150" cy="0" rx="40" ry="12" fill="#059669"/>
    <rect x="110" y="0" width="80" height="30" fill="#059669"/>
    <ellipse cx="150" cy="30" rx="40" ry="12" fill="#047857"/>
    <text x="150" y="18" font-size="10" fill="white" text-anchor="middle" font-weight="bold">User DB</text>
  </g>
  
  <!-- Order Service -->
  <g transform="translate(550, 280)">
    <rect x="-65" y="-50" width="130" height="100" rx="10" fill="#f59e0b"/>
    <text x="0" y="-20" font-size="15" fill="white" text-anchor="middle" font-weight="bold">Order Service</text>
    <text x="0" y="2" font-size="11" fill="white" text-anchor="middle">Create Order</text>
    <text x="0" y="18" font-size="11" fill="white" text-anchor="middle">Track Order</text>
    <text x="0" y="34" font-size="11" fill="white" text-anchor="middle">Python</text>
    
    <!-- Order DB -->
    <ellipse cx="150" cy="0" rx="40" ry="12" fill="#d97706"/>
    <rect x="110" y="0" width="80" height="30" fill="#d97706"/>
    <ellipse cx="150" cy="30" rx="40" ry="12" fill="#b45309"/>
    <text x="150" y="18" font-size="10" fill="white" text-anchor="middle" font-weight="bold">Order DB</text>
  </g>
  
  <!-- Payment Service -->
  <g transform="translate(550, 440)">
    <rect x="-65" y="-50" width="130" height="100" rx="10" fill="#8b5cf6"/>
    <text x="0" y="-20" font-size="15" fill="white" text-anchor="middle" font-weight="bold">Payment Service</text>
    <text x="0" y="2" font-size="11" fill="white" text-anchor="middle">Process Payment</text>
    <text x="0" y="18" font-size="11" fill="white" text-anchor="middle">Refunds</text>
    <text x="0" y="34" font-size="11" fill="white" text-anchor="middle">Java</text>
    
    <!-- Payment DB -->
    <ellipse cx="150" cy="0" rx="40" ry="12" fill="#7c3aed"/>
    <rect x="110" y="0" width="80" height="30" fill="#7c3aed"/>
    <ellipse cx="150" cy="30" rx="40" ry="12" fill="#6d28d9"/>
    <text x="150" y="18" font-size="10" fill="white" text-anchor="middle" font-weight="bold">Pay DB</text>
  </g>
  
  <!-- Notification Service -->
  <g transform="translate(550, 600)">
    <rect x="-65" y="-50" width="130" height="100" rx="10" fill="#ef4444"/>
    <text x="0" y="-20" font-size="15" fill="white" text-anchor="middle" font-weight="bold">Notification</text>
    <text x="0" y="-2" font-size="15" fill="white" text-anchor="middle" font-weight="bold">Service</text>
    <text x="0" y="18" font-size="11" fill="white" text-anchor="middle">Email/SMS</text>
    <text x="0" y="34" font-size="11" fill="white" text-anchor="middle">Go</text>
    
    <!-- Notification DB -->
    <ellipse cx="150" cy="0" rx="40" ry="12" fill="#dc2626"/>
    <rect x="110" y="0" width="80" height="30" fill="#dc2626"/>
    <ellipse cx="150" cy="30" rx="40" ry="12" fill="#b91c1c"/>
    <text x="150" y="18" font-size="10" fill="white" text-anchor="middle" font-weight="bold">Notif DB</text>
  </g>
  
  <!-- Arrows from gateway to services -->
  <path d="M 375 180 L 480 130" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowGreen2)"/>
  <path d="M 375 215 L 480 270" stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#arrowOrange)"/>
  <path d="M 375 250 L 480 430" stroke="#8b5cf6" stroke-width="2" fill="none" marker-end="url(#arrowPurple2)"/>
  <path d="M 375 270 L 480 590" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#arrowRed2)"/>
  
  <!-- Message Queue -->
  <g transform="translate(900, 400)">
    <rect x="-80" y="-40" width="160" height="80" rx="10" fill="#06b6d4"/>
    <text x="0" y="-10" font-size="15" fill="white" text-anchor="middle" font-weight="bold">Message Queue</text>
    <text x="0" y="10" font-size="13" fill="white" text-anchor="middle">(Kafka/RabbitMQ)</text>
    <text x="0" y="28" font-size="11" fill="white" text-anchor="middle">Event Bus</text>
  </g>
  
  <!-- Service to service communication via queue -->
  <path d="M 620 280 L 820 380" stroke="#06b6d4" stroke-width="2" stroke-dasharray="5,3" fill="none"/>
  <path d="M 620 440 L 820 410" stroke="#06b6d4" stroke-width="2" stroke-dasharray="5,3" fill="none"/>
  <path d="M 620 600 L 820 420" stroke="#06b6d4" stroke-width="2" stroke-dasharray="5,3" fill="none"/>
  
  <!-- Benefits Box -->
  <g transform="translate(900, 120)">
    <rect x="0" y="0" width="250" height="180" rx="10" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
    <text x="125" y="25" font-size="15" fill="#065f46" text-anchor="middle" font-weight="bold">✅ Benefits</text>
    <text x="15" y="50" font-size="12" fill="#064e3b">• Independent deployment</text>
    <text x="15" y="70" font-size="12" fill="#064e3b">• Scale services separately</text>
    <text x="15" y="90" font-size="12" fill="#064e3b">• Technology flexibility</text>
    <text x="15" y="110" font-size="12" fill="#064e3b">• Team autonomy</text>
    <text x="15" y="130" font-size="12" fill="#064e3b">• Fault isolation</text>
    <text x="15" y="150" font-size="12" fill="#064e3b">• Easier to understand</text>
    <text x="15" y="170" font-size="12" fill="#064e3b">• Faster development</text>
  </g>
  
  <!-- Gradients and Markers -->
  <defs>
    <linearGradient id="gatewayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
    </linearGradient>
    <marker id="arrowBlue2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#3b82f6" />
    </marker>
    <marker id="arrowGreen2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#10b981" />
    </marker>
    <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#f59e0b" />
    </marker>
    <marker id="arrowPurple2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#8b5cf6" />
    </marker>
    <marker id="arrowRed2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#ef4444" />
    </marker>
  </defs>
</svg>

**Structure:**
- Multiple codebases
- Independent deployment
- Separate databases (often)
- Services communicate via APIs

**Characteristics:**
- Each service does one thing
- Independently deployable
- Can use different technologies
- Loosely coupled

**Real-world examples:**
- **Netflix** (hundreds of microservices)
- **Uber** (2000+ microservices)
- **Amazon** (service-oriented since 2001)
- **Spotify** (squad-based microservices)

<div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 12px; padding: 25px; margin: 30px 0; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
  <h4 style="margin: 0 0 20px 0; color: #1f2937; font-size: 19px; text-align: center;">⚖️ Monolithic vs Microservices Comparison</h4>
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: separate; border-spacing: 0; background: white; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);">
          <th style="padding: 15px; text-align: left; color: white; font-weight: 600; border: none;">Aspect</th>
          <th style="padding: 15px; text-align: left; color: white; font-weight: 600; border: none;">Monolithic</th>
          <th style="padding: 15px; text-align: left; color: white; font-weight: 600; border: none;">Microservices</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background: #f9fafb;">
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Codebase</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Single</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Multiple</td>
        </tr>
        <tr>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Deployment</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">All at once</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Independent</td>
        </tr>
        <tr style="background: #f9fafb;">
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Scaling</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Scale entire app</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Scale services independently</td>
        </tr>
        <tr>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Technology</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Single stack</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Multiple stacks</td>
        </tr>
        <tr style="background: #f9fafb;">
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Complexity</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><span style="background: #10b981; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px;">Low</span></td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><span style="background: #ef4444; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px;">High</span></td>
        </tr>
        <tr>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Best For</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Small teams, startups</td>
          <td style="padding: 14px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Large teams, scale</td>
        </tr>
        <tr style="background: #f9fafb;">
          <td style="padding: 14px; font-weight: 600; color: #374151;">Example</td>
          <td style="padding: 14px; color: #6b7280;">Stack Overflow</td>
          <td style="padding: 14px; color: #6b7280;">Netflix, Uber</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

**Pros:**
- Scale independently
- Deploy independently
- Technology flexibility
- Team autonomy
- Fault isolation

**Cons:**
- Complex infrastructure
- Network overhead
- Distributed system challenges
- Harder to debug
- Data consistency issues

**When to use:**
- Large teams
- Need independent scaling
- Different technology needs
- Mature organizations

**Microservices challenges:**

**1. Service Discovery**
- How services find each other
- Tools: Consul, Eureka, Kubernetes

**2. API Gateway**
- Single entry point
- Routing, authentication
- Tools: Kong, AWS API Gateway

**3. Data Consistency**
- No distributed transactions
- Eventual consistency
- Saga pattern

**4. Monitoring**
- Distributed tracing
- Centralized logging
- Tools: Jaeger, ELK

### Service-Oriented Architecture (SOA)

**What it is:** Similar to microservices but with enterprise service bus (ESB).

**Differences from microservices:**
- Larger services
- Shared ESB for communication
- More governance
- Heavier protocols (SOAP)

**Real-world examples:**
- **Enterprise systems**
- **Legacy modernization**
- **Banking systems**

**When to use:**
- Enterprise environments
- Need governance
- Legacy integration

### Event-Driven Architecture

**What it is:** Services communicate through events rather than direct calls.

**How it works:**
1. Service A publishes event
2. Event goes to message broker
3. Interested services subscribe
4. Each service reacts independently

**Real-world examples:**
- **Netflix** user activity events
- **Uber** ride lifecycle events
- **Amazon** order processing

**Pros:**
- Loose coupling
- Easy to add features
- Scales well
- Asynchronous

**Cons:**
- Harder to debug
- Eventual consistency
- Complex error handling

### Serverless Architecture

**What it is:** Run code without managing servers. Cloud provider handles infrastructure.

**How it works:**
- Write functions
- Deploy to cloud
- Pay per execution
- Auto-scales

**Real-world examples:**
- **AWS Lambda**
- **Google Cloud Functions**
- **Azure Functions**

**Use cases:**
- API backends
- Data processing
- Scheduled tasks
- Event handlers

**Pros:**
- No server management
- Auto-scaling
- Pay per use
- Fast development

**Cons:**
- Cold start latency
- Vendor lock-in
- Limited execution time
- Debugging challenges

---

## Common System Design Patterns

Reusable solutions to common problems.

### API Gateway

**What it is:** Single entry point for all client requests.

**Responsibilities:**
- Routing to services
- Authentication
- Rate limiting
- Request/response transformation
- Caching
- Logging

**Real-world examples:**
- **Netflix Zuul**
- **AWS API Gateway**
- **Kong**

**Pros:**
- Centralized control
- Simplifies clients
- Cross-cutting concerns

**Cons:**
- Single point of failure
- Can become bottleneck
- Added latency

### Service Mesh

**What it is:** Infrastructure layer handling service-to-service communication.

**Features:**
- Load balancing
- Service discovery
- Circuit breaking
- Retries
- Timeouts
- Metrics

**Real-world examples:**
- **Istio**
- **Linkerd**
- **Consul Connect**

**Pros:**
- Moves networking logic out of code
- Consistent behavior
- Observability

**Cons:**
- Complex setup
- Performance overhead
- Learning curve

### CQRS (Command Query Responsibility Segregation)

**What it is:** Separate models for reading and writing data.

**How it works:**
- Write model: Handles commands (create, update, delete)
- Read model: Handles queries (optimized for reads)
- Sync between models (eventually consistent)

**Real-world examples:**
- **E-commerce** (separate read/write for products)
- **Banking** (transaction processing vs balance queries)

**Pros:**
- Optimize reads and writes independently
- Scale reads and writes separately
- Simpler queries

**Cons:**
- More complex
- Eventual consistency
- Sync overhead

### Event Sourcing

**What it is:** Store all changes as sequence of events instead of current state.

**How it works:**
- Don't store current state
- Store all events that led to state
- Rebuild state by replaying events

**Example:**
Instead of storing balance = $100, store:
```
1. AccountCreated: $0
2. Deposited: $50
3. Deposited: $75
4. Withdrew: $25
Current balance = $100
```

**Real-world examples:**
- **Banking** (audit trail)
- **Version control** (Git)
- **Collaborative editing**

**Pros:**
- Complete audit trail
- Can rebuild any past state
- Event replay for debugging

**Cons:**
- More storage
- Complex queries
- Event versioning

### Saga Pattern

**What it is:** Managing distributed transactions across microservices.

**How it works:**
- Break transaction into steps
- Each step has compensating action
- If step fails, run compensating actions

**Example: E-commerce order**
```
1. Reserve inventory → Compensate: Release inventory
2. Charge payment → Compensate: Refund payment
3. Ship order → Compensate: Cancel shipment
```

**Types:**

**1. Choreography**
- Services coordinate via events
- No central controller

**2. Orchestration**
- Central coordinator
- Tells services what to do

**Real-world examples:**
- **Uber** ride booking
- **Airbnb** reservation
- **E-commerce** checkout

**Pros:**
- Handles distributed transactions
- Maintains consistency
- Fault tolerant

**Cons:**
- Complex to implement
- Hard to debug
- Compensating actions needed

---

## Performance Optimization

Making your system faster.

### Database Query Optimization

**Techniques:**

**1. Use Indexes**
```sql
CREATE INDEX idx_user_email ON users(email);
```

**2. Avoid SELECT ***
```sql
-- Bad
SELECT * FROM users;

-- Good
SELECT id, name, email FROM users;
```

**3. Use LIMIT**
```sql
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10;
```

**4. Avoid N+1 Queries**
```sql
-- Bad: 1 query + N queries
SELECT * FROM posts;
-- Then for each post:
SELECT * FROM users WHERE id = post.user_id;

-- Good: 1 query with JOIN
SELECT posts.*, users.name 
FROM posts 
JOIN users ON posts.user_id = users.id;
```

**5. Use Query Explain**
```sql
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
```

### Connection Pooling

**What it is:** Reusing database connections instead of creating new ones.

**Why it matters:**
- Creating connection: 50ms
- Reusing connection: 0.1ms
- 500x faster!

**How it works:**
1. Create pool of connections at startup
2. Request needs database → Get connection from pool
3. Request done → Return connection to pool
4. Reuse for next request

**Configuration:**
```
Min connections: 5
Max connections: 20
Idle timeout: 10 minutes
```

**Real-world examples:**
- **Shopify** uses connection pooling for millions of stores
- **Twitter** pools connections to handle billions of tweets

### Batch Processing

**What it is:** Processing multiple items together instead of one at a time.

**Example:**
```
// Bad: 1000 database calls
for (user in users) {
  database.save(user);
}

// Good: 1 database call
database.batchSave(users);
```

**Real-world examples:**
- **Email sending:** Batch 1000 emails
- **Data import:** Batch insert rows
- **Image processing:** Process multiple images

**Pros:**
- Much faster
- Reduces overhead
- Better resource usage

**Cons:**
- All-or-nothing (one failure affects batch)
- Memory usage
- Delayed feedback

### Lazy Loading

**What it is:** Load data only when needed, not upfront.

**Example:**
```
// Eager loading: Load everything
user = getUser(id);
user.posts = getAllPosts(user.id);
user.comments = getAllComments(user.id);

// Lazy loading: Load on demand
user = getUser(id);
// Posts loaded only when accessed
if (needPosts) {
  user.posts = getPosts(user.id);
}
```

**Real-world examples:**
- **Facebook** lazy loads images as you scroll
- **Netflix** lazy loads video thumbnails
- **Gmail** lazy loads old emails

**Pros:**
- Faster initial load
- Saves bandwidth
- Better performance

**Cons:**
- Delayed loading
- Multiple requests
- Complexity

### Pagination

**What it is:** Breaking large result sets into pages.

**Types:**

**1. Offset-Based**
```sql
SELECT * FROM posts 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 20;
```
- Simple
- Slow for large offsets

**2. Cursor-Based**
```sql
SELECT * FROM posts 
WHERE id < last_seen_id 
ORDER BY id DESC 
LIMIT 10;
```
- Fast for any page
- Consistent results

**Real-world examples:**
- **Twitter** uses cursor-based pagination
- **Google Search** uses offset-based
- **Instagram** uses cursor-based for feed

---

## Key Metrics & SLAs

<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; border-radius: 12px; margin: 35px 0; box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);">
  <h3 style="margin: 0 0 15px 0; font-size: 24px; color: white;">📊 Numbers That Matter</h3>
  <p style="margin: 0; font-size: 16px; line-height: 1.7; opacity: 0.95;">Understanding and measuring system performance is critical for production systems.</p>
</div>

### Latency

**What it is:** Time between request and response.

**Measurements:**
- **P50 (Median):** 50% of requests faster than this
- **P95:** 95% of requests faster than this
- **P99:** 99% of requests faster than this
- **P99.9:** 99.9% of requests faster than this

**Example:**
```
P50: 50ms   (half of users see this)
P95: 200ms  (95% of users see this or better)
P99: 500ms  (99% of users see this or better)
```

**Why percentiles matter:**
Average can be misleading. If 99% of requests take 50ms but 1% take 10 seconds, average is 150ms but user experience is bad.

**Targets:**
- Web pages: < 200ms
- Mobile apps: < 100ms
- Real-time: < 50ms
- Batch: seconds to minutes

### Throughput

**What it is:** Number of requests processed per unit time.

**Measurements:**
- **RPS:** Requests Per Second
- **QPS:** Queries Per Second
- **TPS:** Transactions Per Second

**Real-world examples:**
- **Google Search:** 99,000 queries per second
- **Twitter:** 6,000 tweets per second (peak)
- **Netflix:** 1 billion hours watched per week

### Availability

**What it is:** Percentage of time system is operational.

<div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin: 25px 0; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
  <h4 style="margin: 0 0 20px 0; color: #1f2937; font-size: 19px; text-align: center;">🎯 The Nines of Availability</h4>
  <table style="width: 100%; border-collapse: separate; border-spacing: 0; background: white;">
    <thead>
      <tr style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
        <th style="padding: 15px; text-align: left; color: white; font-weight: 600; border-radius: 8px 0 0 0;">Availability</th>
        <th style="padding: 15px; text-align: left; color: white; font-weight: 600;">Downtime per Year</th>
        <th style="padding: 15px; text-align: left; color: white; font-weight: 600; border-radius: 0 8px 0 0;">Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: #fef2f2;">
        <td style="padding: 14px; border-bottom: 1px solid #fee2e2; font-weight: 600; color: #991b1b;">99%</td>
        <td style="padding: 14px; border-bottom: 1px solid #fee2e2; color: #7f1d1d;">3.65 days</td>
        <td style="padding: 14px; border-bottom: 1px solid #fee2e2; color: #7f1d1d;"><span style="background: #10b981; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px;">$</span></td>
      </tr>
      <tr style="background: white;">
        <td style="padding: 14px; border-bottom: 1px solid #fee2e2; font-weight: 600; color: #991b1b;">99.9%</td>
        <td style="padding: 14px; border-bottom: 1px solid #fee2e2; color: #7f1d1d;">8.76 hours</td>
        <td style="padding: 14px; border-bottom: 1px solid #fee2e2; color: #7f1d1d;"><span style="background: #3b82f6; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px;">$$</span></td>
      </tr>
      <tr style="background: #fef2f2;">
        <td style="padding: 14px; border-bottom: 1px solid #fee2e2; font-weight: 600; color: #991b1b;">99.99%</td>
        <td style="padding: 14px; border-bottom: 1px solid #fee2e2; color: #7f1d1d;">52.56 minutes</td>
        <td style="padding: 14px; border-bottom: 1px solid #fee2e2; color: #7f1d1d;"><span style="background: #f59e0b; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px;">$$$</span></td>
      </tr>
      <tr style="background: white;">
        <td style="padding: 14px; font-weight: 600; color: #991b1b;">99.999%</td>
        <td style="padding: 14px; color: #7f1d1d;">5.26 minutes</td>
        <td style="padding: 14px; color: #7f1d1d;"><span style="background: #ef4444; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px;">$$$$</span></td>
      </tr>
    </tbody>
  </table>
</div>

<div style="background: #fef3c7; border-left: 5px solid #f59e0b; padding: 18px; border-radius: 8px; margin: 20px 0;">
  <p style="margin: 0; color: #92400e; font-size: 15px;"><strong>💰 Cost of nines:</strong> Each additional nine costs 10x more.</p>
</div>

**Real-world SLAs:**
- **AWS S3:** 99.99%
- **Google Cloud:** 99.95%
- **Stripe:** 99.99%

### SLA vs SLO vs SLI

**SLI (Service Level Indicator)**
- Metric you measure
- Example: API latency, error rate

**SLO (Service Level Objective)**
- Target for SLI
- Example: 99.9% of requests < 200ms

**SLA (Service Level Agreement)**
- Contract with consequences
- Example: 99.9% uptime or refund

---

## Estimation Techniques

Back-of-the-envelope calculations for interviews.

### Traffic Estimation

**Example: Design Twitter**

**Given:**
- 500 million users
- 200 million daily active users (DAU)
- Each user posts 2 tweets per day
- Each user views 100 tweets per day

**Calculations:**

**Writes:**
```
200M DAU × 2 tweets/day = 400M tweets/day
400M / 86,400 seconds = 4,630 tweets/second
Peak (3x average) = 14,000 tweets/second
```

**Reads:**
```
200M DAU × 100 tweets/day = 20B tweet views/day
20B / 86,400 seconds = 231,000 reads/second
Peak = 700,000 reads/second
```

**Read/Write Ratio:** 50:1 (read-heavy)

### Storage Estimation

**Example: Design Instagram**

**Given:**
- 500 million users
- 100 million photos uploaded per day
- Average photo size: 2MB

**Calculations:**

**Daily storage:**
```
100M photos × 2MB = 200TB per day
```

**5-year storage:**
```
200TB × 365 days × 5 years = 365PB
```

**With replication (3x):**
```
365PB × 3 = 1.1 Exabytes
```

### Bandwidth Estimation

**Example: Design YouTube**

**Given:**
- 1 billion hours watched per day
- Average video quality: 5 Mbps

**Calculations:**

**Bandwidth:**
```
1B hours × 3600 seconds × 5 Mbps
= 18 Exabits per day
= 208 Terabits per second
```

**Useful numbers to remember:**
- 1 million = 10^6
- 1 billion = 10^9
- 1 KB = 1,000 bytes
- 1 MB = 1,000 KB
- 1 GB = 1,000 MB
- 1 TB = 1,000 GB
- 1 day = 86,400 seconds
- 1 month = 2.5M seconds (roughly)

---

## Common Terminology Glossary

Quick reference for essential terms.

**API (Application Programming Interface)**
- Interface for services to communicate
- REST, GraphQL, gRPC

**Latency**
- Time for request to complete
- Lower is better

**Throughput**
- Requests processed per second
- Higher is better

**Bandwidth**
- Data transfer capacity
- Measured in Mbps or Gbps

**RPS/QPS**
- Requests/Queries Per Second
- Measure of load

**SLA/SLO/SLI**
- Service Level Agreement/Objective/Indicator
- Availability guarantees

**Idempotency**
- Operation can be repeated safely
- GET is idempotent, POST might not be

**Stateless**
- Server doesn't store session data
- Each request is independent

**Stateful**
- Server stores session data
- Requests depend on previous state

**Synchronous**
- Wait for response before continuing
- Blocking

**Asynchronous**
- Don't wait for response
- Non-blocking

**Hot Data**
- Frequently accessed
- Keep in cache

**Warm Data**
- Occasionally accessed
- Keep in fast storage

**Cold Data**
- Rarely accessed
- Archive to cheap storage

**Read-Heavy System**
- More reads than writes
- Example: Social media feeds

**Write-Heavy System**
- More writes than reads
- Example: Logging, analytics

**Eventual Consistency**
- Data becomes consistent eventually
- Temporary inconsistency OK

**Strong Consistency**
- Data always consistent
- All nodes see same data

**Horizontal Scaling**
- Add more machines
- Scale out

**Vertical Scaling**
- Add more power to machine
- Scale up

**Sharding**
- Split data across machines
- Horizontal partitioning

**Replication**
- Copy data across machines
- For redundancy and reads

**Failover**
- Switch to backup when primary fails
- Automatic recovery

**Circuit Breaker**
- Stop calling failing service
- Prevent cascading failures

**Rate Limiting**
- Restrict requests per time period
- Prevent abuse

**CDN**
- Content Delivery Network
- Serve content from edge servers

**Load Balancer**
- Distribute traffic across servers
- Improve availability

**Message Queue**
- Buffer for async processing
- Decouple services

**Microservices**
- Small, independent services
- Loosely coupled

**Monolith**
- Single large application
- Tightly coupled

---

## Interview Framework: STAR Approach

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; border-radius: 12px; margin: 35px 0; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);">
  <h3 style="margin: 0 0 15px 0; font-size: 24px; color: white;">⭐ Ace Your System Design Interview</h3>
  <p style="margin: 0; font-size: 16px; line-height: 1.7; opacity: 0.95;">How to tackle system design interviews with a proven framework.</p>
</div>

<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 30px 0;">
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 10px; padding: 20px; color: white; text-align: center; box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);">
    <div style="font-size: 36px; font-weight: bold; margin-bottom: 10px;">S</div>
    <h5 style="margin: 0 0 8px 0; font-size: 16px;">Scope</h5>
    <p style="margin: 0; font-size: 13px; opacity: 0.9;">5-10 min</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 10px; padding: 20px; color: white; text-align: center; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);">
    <div style="font-size: 36px; font-weight: bold; margin-bottom: 10px;">T</div>
    <h5 style="margin: 0 0 8px 0; font-size: 16px;">Traffic</h5>
    <p style="margin: 0; font-size: 13px; opacity: 0.9;">5 min</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 10px; padding: 20px; color: white; text-align: center; box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);">
    <div style="font-size: 36px; font-weight: bold; margin-bottom: 10px;">A</div>
    <h5 style="margin: 0 0 8px 0; font-size: 16px;">Architecture</h5>
    <p style="margin: 0; font-size: 13px; opacity: 0.9;">30-35 min</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); border-radius: 10px; padding: 20px; color: white; text-align: center; box-shadow: 0 6px 20px rgba(236, 72, 153, 0.3);">
    <div style="font-size: 36px; font-weight: bold; margin-bottom: 10px;">R</div>
    <h5 style="margin: 0 0 8px 0; font-size: 16px;">Refinement</h5>
    <p style="margin: 0; font-size: 13px; opacity: 0.9;">10-15 min</p>
  </div>
</div>

<svg role="img" aria-labelledby="star-title star-desc" viewBox="0 0 1200 500" style="max-width: 100%; height: auto; margin: 30px 0;">
  <title id="star-title">STAR Interview Framework Timeline</title>
  <desc id="star-desc">Visual timeline showing the four phases of system design interview: Scope, Traffic, Architecture, and Refinement with time allocations</desc>
  
  <!-- Background -->
  <rect width="1200" height="500" fill="#f8fafc"/>
  
  <!-- Timeline -->
  <line x1="100" y1="250" x2="1100" y2="250" stroke="#d1d5db" stroke-width="4"/>
  
  <!-- Scope Phase -->
  <g transform="translate(150, 250)">
    <circle cx="0" cy="0" r="50" fill="#3b82f6"/>
    <text x="0" y="10" font-size="32" fill="white" text-anchor="middle" font-weight="bold">S</text>
    <rect x="-80" y="-150" width="160" height="120" rx="10" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
    <text x="0" y="-120" font-size="16" fill="#1e40af" text-anchor="middle" font-weight="bold">Scope</text>
    <text x="0" y="-95" font-size="13" fill="#1e3a8a" text-anchor="middle">Clarify requirements</text>
    <text x="0" y="-75" font-size="12" fill="#1e3a8a" text-anchor="middle">• Functional needs</text>
    <text x="0" y="-58" font-size="12" fill="#1e3a8a" text-anchor="middle">• Non-functional</text>
    <text x="0" y="-41" font-size="12" fill="#1e3a8a" text-anchor="middle">• Constraints</text>
    <rect x="-50" y="70" width="100" height="30" rx="5" fill="#3b82f6"/>
    <text x="0" y="92" font-size="14" fill="white" text-anchor="middle" font-weight="bold">5-10 min</text>
  </g>
  
  <!-- Traffic Phase -->
  <g transform="translate(400, 250)">
    <circle cx="0" cy="0" r="50" fill="#10b981"/>
    <text x="0" y="10" font-size="32" fill="white" text-anchor="middle" font-weight="bold">T</text>
    <rect x="-80" y="-150" width="160" height="120" rx="10" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
    <text x="0" y="-120" font-size="16" fill="#065f46" text-anchor="middle" font-weight="bold">Traffic</text>
    <text x="0" y="-95" font-size="13" fill="#064e3b" text-anchor="middle">Estimate scale</text>
    <text x="0" y="-75" font-size="12" fill="#064e3b" text-anchor="middle">• DAU calculation</text>
    <text x="0" y="-58" font-size="12" fill="#064e3b" text-anchor="middle">• QPS estimation</text>
    <text x="0" y="-41" font-size="12" fill="#064e3b" text-anchor="middle">• Storage needs</text>
    <rect x="-50" y="70" width="100" height="30" rx="5" fill="#10b981"/>
    <text x="0" y="92" font-size="14" fill="white" text-anchor="middle" font-weight="bold">5 min</text>
  </g>
  
  <!-- Architecture Phase -->
  <g transform="translate(700, 250)">
    <circle cx="0" cy="0" r="50" fill="#8b5cf6"/>
    <text x="0" y="10" font-size="32" fill="white" text-anchor="middle" font-weight="bold">A</text>
    <rect x="-90" y="-150" width="180" height="120" rx="10" fill="#fae8ff" stroke="#8b5cf6" stroke-width="2"/>
    <text x="0" y="-120" font-size="16" fill="#5b21b6" text-anchor="middle" font-weight="bold">Architecture</text>
    <text x="0" y="-95" font-size="13" fill="#6b21a8" text-anchor="middle">Design the system</text>
    <text x="0" y="-75" font-size="12" fill="#6b21a8" text-anchor="middle">• High-level design</text>
    <text x="0" y="-58" font-size="12" fill="#6b21a8" text-anchor="middle">• Database schema</text>
    <text x="0" y="-41" font-size="12" fill="#6b21a8" text-anchor="middle">• API design</text>
    <rect x="-50" y="70" width="100" height="30" rx="5" fill="#8b5cf6"/>
    <text x="0" y="92" font-size="14" fill="white" text-anchor="middle" font-weight="bold">30-35 min</text>
  </g>
  
  <!-- Refinement Phase -->
  <g transform="translate(1000, 250)">
    <circle cx="0" cy="0" r="50" fill="#ec4899"/>
    <text x="0" y="10" font-size="32" fill="white" text-anchor="middle" font-weight="bold">R</text>
    <rect x="-80" y="-150" width="160" height="120" rx="10" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
    <text x="0" y="-120" font-size="16" fill="#9f1239" text-anchor="middle" font-weight="bold">Refinement</text>
    <text x="0" y="-95" font-size="13" fill="#881337" text-anchor="middle">Optimize & discuss</text>
    <text x="0" y="-75" font-size="12" fill="#881337" text-anchor="middle">• Bottlenecks</text>
    <text x="0" y="-58" font-size="12" fill="#881337" text-anchor="middle">• Trade-offs</text>
    <text x="0" y="-41" font-size="12" fill="#881337" text-anchor="middle">• Edge cases</text>
    <rect x="-50" y="70" width="100" height="30" rx="5" fill="#ec4899"/>
    <text x="0" y="92" font-size="14" fill="white" text-anchor="middle" font-weight="bold">10-15 min</text>
  </g>
  
  <!-- Total Time -->
  <g transform="translate(600, 420)">
    <rect x="-120" y="-25" width="240" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text x="0" y="5" font-size="16" fill="#92400e" text-anchor="middle" font-weight="bold">Total: 45-60 minutes</text>
  </g>
  
  <!-- Arrows -->
  <path d="M 205 250 L 345 250" stroke="#6b7280" stroke-width="2" fill="none" marker-end="url(#arrowTimeline)"/>
  <path d="M 455 250 L 645 250" stroke="#6b7280" stroke-width="2" fill="none" marker-end="url(#arrowTimeline)"/>
  <path d="M 755 250 L 945 250" stroke="#6b7280" stroke-width="2" fill="none" marker-end="url(#arrowTimeline)"/>
  
  <defs>
    <marker id="arrowTimeline" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
    </marker>
  </defs>
</svg>

### S - Scope (5-10 minutes)

**Clarify requirements:**

**Functional:**
- What features?
- What's in scope?
- What's out of scope?

**Non-functional:**
- How many users?
- How much data?
- How fast?
- How available?

**Example questions:**
- "Should we support video or just images?"
- "Do we need real-time updates?"
- "What's the expected traffic?"
- "Any specific latency requirements?"

### T - Traffic (5 minutes)

**Estimate scale:**

**Calculate:**
- Daily active users
- Requests per second
- Storage needed
- Bandwidth required

**Example:**
```
100M users
10M DAU
Each user makes 10 requests/day
= 100M requests/day
= 1,157 requests/second
Peak (3x) = 3,500 requests/second
```

### A - Architecture (30-35 minutes)

**Design the system:**

**Start high-level:**
1. Draw basic components
2. Show data flow
3. Explain technology choices

**Then dive deeper:**
4. Database schema
5. API design
6. Caching strategy
7. Scaling approach

**Example flow:**
```
Client → Load Balancer → App Servers → Cache → Database
                                     → Message Queue → Workers
```

### R - Refinement (10-15 minutes)

**Identify bottlenecks:**
- What fails first as you scale?
- How do you fix it?

**Discuss trade-offs:**
- Why this choice over alternatives?
- What are the downsides?

**Address concerns:**
- Security
- Monitoring
- Deployment
- Cost

---

## Common Mistakes to Avoid

<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; border-radius: 12px; margin: 35px 0; box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);">
  <h3 style="margin: 0 0 15px 0; font-size: 24px; color: white;">⚠️ Learn from Others' Errors</h3>
  <p style="margin: 0; font-size: 16px; line-height: 1.7; opacity: 0.95;">Avoid these common pitfalls in system design interviews and real-world projects.</p>
</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 30px 0;">
  <div style="background: white; border-left: 5px solid #ef4444; border-radius: 8px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h5 style="margin: 0 0 10px 0; color: #dc2626; font-size: 16px;">❌ Jumping to solutions</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Don't start designing before understanding requirements. Ask clarifying questions first.</p>
  </div>
  
  <div style="background: white; border-left: 5px solid #f59e0b; border-radius: 8px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h5 style="margin: 0 0 10px 0; color: #d97706; font-size: 16px;">❌ Over-engineering</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Don't use microservices for 1,000 users. Start simple, add complexity when needed.</p>
  </div>
  
  <div style="background: white; border-left: 5px solid #8b5cf6; border-radius: 8px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h5 style="margin: 0 0 10px 0; color: #7c3aed; font-size: 16px;">❌ Ignoring trade-offs</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Every decision has pros and cons. Discuss both sides.</p>
  </div>
  
  <div style="background: white; border-left: 5px solid #3b82f6; border-radius: 8px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h5 style="margin: 0 0 10px 0; color: #2563eb; font-size: 16px;">❌ Forgetting non-functional requirements</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Don't just focus on features. Consider scalability, availability, latency.</p>
  </div>
  
  <div style="background: white; border-left: 5px solid #10b981; border-radius: 8px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h5 style="margin: 0 0 10px 0; color: #059669; font-size: 16px;">❌ Not considering failures</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Systems fail. Discuss redundancy, failover.</p>
  </div>
  
  <div style="background: white; border-left: 5px solid #ec4899; border-radius: 8px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h5 style="margin: 0 0 10px 0; color: #db2777; font-size: 16px;">❌ Ignoring monitoring</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">You can't fix what you can't see. Include logging, metrics, alerts.</p>
  </div>
</div>

**1. Jumping to solutions**
- Don't start designing before understanding requirements
- Ask clarifying questions first

**2. Over-engineering**
- Don't use microservices for 1,000 users
- Start simple, add complexity when needed

**3. Ignoring trade-offs**
- Every decision has pros and cons
- Discuss both sides

**4. Forgetting non-functional requirements**
- Don't just focus on features
- Consider scalability, availability, latency

**5. Not considering failures**
- Systems fail
- Discuss redundancy, failover

**6. Ignoring monitoring**
- You can't fix what you can't see
- Include logging, metrics, alerts

**7. Unrealistic estimates**
- Use reasonable numbers
- Show your calculations

**8. Not asking questions**
- Interviewers expect questions
- Clarify ambiguities

**9. Going too deep too fast**
- Start high-level
- Dive deep only when asked

**10. Not managing time**
- 45-60 minute interview
- Allocate time wisely

---

## Conclusion

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 35px; border-radius: 12px; margin: 35px 0; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);">
  <h3 style="margin: 0 0 20px 0; font-size: 26px; color: white; text-align: center;">🎯 You're Ready to Design Systems</h3>
  <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.8; opacity: 0.95;">System design isn't about memorizing solutions. It's about understanding building blocks and knowing when to use each one.</p>
  <p style="margin: 0; font-size: 16px; line-height: 1.8; opacity: 0.95;">You now have the vocabulary. You understand the concepts. You know the trade-offs.</p>
</div>

<div style="background: white; border: 3px solid #e5e7eb; border-radius: 12px; padding: 30px; margin: 30px 0; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
  <h4 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; text-align: center;">💡 Key Takeaways</h4>
  
  <div style="display: grid; gap: 15px;">
    <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 6px;">
      <p style="margin: 0; color: #1e3a8a; font-size: 15px; line-height: 1.6;"><strong>Start simple.</strong> Every system begins with basic components. Add complexity only when you have a specific problem to solve.</p>
    </div>
    
    <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; border-radius: 6px;">
      <p style="margin: 0; color: #064e3b; font-size: 15px; line-height: 1.6;"><strong>Understand trade-offs.</strong> There's no perfect solution. Consistency vs availability. Latency vs throughput. Cost vs performance. Every decision has consequences.</p>
    </div>
    
    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px;">
      <p style="margin: 0; color: #78350f; font-size: 15px; line-height: 1.6;"><strong>Think in layers.</strong> Client, load balancer, application, cache, database. Each layer solves specific problems.</p>
    </div>
    
    <div style="background: #fae8ff; border-left: 4px solid #8b5cf6; padding: 15px; border-radius: 6px;">
      <p style="margin: 0; color: #6b21a8; font-size: 15px; line-height: 1.6;"><strong>Scale incrementally.</strong> Don't design for a billion users on day one. Scale as problems emerge.</p>
    </div>
    
    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; border-radius: 6px;">
      <p style="margin: 0; color: #7f1d1d; font-size: 15px; line-height: 1.6;"><strong>Practice.</strong> Design systems you use daily. How would you build Twitter? YouTube? Uber? Start simple, identify bottlenecks, add complexity.</p>
    </div>
  </div>
</div>

---

## Quick Reference Cheat Sheet

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin: 35px 0; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">
  <h3 style="margin: 0 0 15px 0; font-size: 24px; color: white; text-align: center;">📋 System Design Quick Reference</h3>
  <p style="margin: 0; font-size: 15px; text-align: center; opacity: 0.95;">Bookmark this section for quick lookups during interviews and design sessions</p>
</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 30px 0;">
  
  <!-- Scalability -->
  <div style="background: white; border: 2px solid #3b82f6; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h4 style="margin: 0 0 15px 0; color: #1e40af; font-size: 17px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">⚖️ Scalability</h4>
    <div style="font-size: 13px; line-height: 1.8; color: #374151;">
      <p style="margin: 0 0 8px 0;"><strong>Vertical:</strong> Add more power (CPU, RAM)</p>
      <p style="margin: 0 0 8px 0;"><strong>Horizontal:</strong> Add more machines</p>
      <p style="margin: 0 0 8px 0;"><strong>Auto-scaling:</strong> Dynamic based on load</p>
      <p style="margin: 0; color: #6b7280; font-style: italic;">Use: Start vertical, scale horizontal</p>
    </div>
  </div>
  
  <!-- Databases -->
  <div style="background: white; border: 2px solid #10b981; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h4 style="margin: 0 0 15px 0; color: #065f46; font-size: 17px; border-bottom: 2px solid #10b981; padding-bottom: 8px;">🗄️ Databases</h4>
    <div style="font-size: 13px; line-height: 1.8; color: #374151;">
      <p style="margin: 0 0 8px 0;"><strong>SQL:</strong> ACID, relationships, structured</p>
      <p style="margin: 0 0 8px 0;"><strong>NoSQL:</strong> Scale, flexible, eventual consistency</p>
      <p style="margin: 0 0 8px 0;"><strong>Replication:</strong> Primary + Replicas for reads</p>
      <p style="margin: 0; color: #6b7280; font-style: italic;">Use: SQL for transactions, NoSQL for scale</p>
    </div>
  </div>
  
  <!-- Caching -->
  <div style="background: white; border: 2px solid #ef4444; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h4 style="margin: 0 0 15px 0; color: #991b1b; font-size: 17px; border-bottom: 2px solid #ef4444; padding-bottom: 8px;">⚡ Caching</h4>
    <div style="font-size: 13px; line-height: 1.8; color: #374151;">
      <p style="margin: 0 0 8px 0;"><strong>Layers:</strong> Browser → CDN → Redis → DB</p>
      <p style="margin: 0 0 8px 0;"><strong>Speed:</strong> 0ms → 20ms → 1ms → 50ms</p>
      <p style="margin: 0 0 8px 0;"><strong>Strategies:</strong> Cache-aside, Write-through</p>
      <p style="margin: 0; color: #6b7280; font-style: italic;">Use: Cache hot data, set TTL</p>
    </div>
  </div>
  
  <!-- Load Balancing -->
  <div style="background: white; border: 2px solid #f59e0b; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h4 style="margin: 0 0 15px 0; color: #92400e; font-size: 17px; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">🔄 Load Balancing</h4>
    <div style="font-size: 13px; line-height: 1.8; color: #374151;">
      <p style="margin: 0 0 8px 0;"><strong>Algorithms:</strong> Round Robin, Least Connections</p>
      <p style="margin: 0 0 8px 0;"><strong>Types:</strong> Layer 4 (fast) vs Layer 7 (flexible)</p>
      <p style="margin: 0 0 8px 0;"><strong>Health Checks:</strong> Every 5s, 2 failures = out</p>
      <p style="margin: 0; color: #6b7280; font-style: italic;">Use: Distribute traffic, enable redundancy</p>
    </div>
  </div>
  
  <!-- CAP Theorem -->
  <div style="background: white; border: 2px solid #8b5cf6; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h4 style="margin: 0 0 15px 0; color: #5b21b6; font-size: 17px; border-bottom: 2px solid #8b5cf6; padding-bottom: 8px;">⚖️ CAP Theorem</h4>
    <div style="font-size: 13px; line-height: 1.8; color: #374151;">
      <p style="margin: 0 0 8px 0;"><strong>CP:</strong> Consistency + Partition (MongoDB)</p>
      <p style="margin: 0 0 8px 0;"><strong>AP:</strong> Availability + Partition (Cassandra)</p>
      <p style="margin: 0 0 8px 0;"><strong>Trade-off:</strong> Can't have all three</p>
      <p style="margin: 0; color: #6b7280; font-style: italic;">Use: CP for banking, AP for social media</p>
    </div>
  </div>
  
  <!-- Message Queues -->
  <div style="background: white; border: 2px solid #06b6d4; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h4 style="margin: 0 0 15px 0; color: #0e7490; font-size: 17px; border-bottom: 2px solid #06b6d4; padding-bottom: 8px;">📬 Message Queues</h4>
    <div style="font-size: 13px; line-height: 1.8; color: #374151;">
      <p style="margin: 0 0 8px 0;"><strong>Purpose:</strong> Async processing, decouple services</p>
      <p style="margin: 0 0 8px 0;"><strong>Tools:</strong> Kafka, RabbitMQ, AWS SQS</p>
      <p style="margin: 0 0 8px 0;"><strong>Patterns:</strong> Point-to-point, Pub/Sub</p>
      <p style="margin: 0; color: #6b7280; font-style: italic;">Use: Email, notifications, background jobs</p>
    </div>
  </div>
  
  <!-- Availability -->
  <div style="background: white; border: 2px solid #ec4899; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h4 style="margin: 0 0 15px 0; color: #9f1239; font-size: 17px; border-bottom: 2px solid #ec4899; padding-bottom: 8px;">📊 Availability</h4>
    <div style="font-size: 13px; line-height: 1.8; color: #374151;">
      <p style="margin: 0 0 8px 0;"><strong>99.9%:</strong> 8.76 hours downtime/year</p>
      <p style="margin: 0 0 8px 0;"><strong>99.99%:</strong> 52 minutes downtime/year</p>
      <p style="margin: 0 0 8px 0;"><strong>99.999%:</strong> 5 minutes downtime/year</p>
      <p style="margin: 0; color: #6b7280; font-style: italic;">Cost: Each nine costs 10x more</p>
    </div>
  </div>
  
  <!-- Microservices -->
  <div style="background: white; border: 2px solid #14b8a6; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <h4 style="margin: 0 0 15px 0; color: #115e59; font-size: 17px; border-bottom: 2px solid #14b8a6; padding-bottom: 8px;">🔧 Microservices</h4>
    <div style="font-size: 13px; line-height: 1.8; color: #374151;">
      <p style="margin: 0 0 8px 0;"><strong>Pros:</strong> Independent deploy, scale, tech</p>
      <p style="margin: 0 0 8px 0;"><strong>Cons:</strong> Complex, network overhead</p>
      <p style="margin: 0 0 8px 0;"><strong>Needs:</strong> API Gateway, Service Discovery</p>
      <p style="margin: 0; color: #6b7280; font-style: italic;">Use: Large teams, need independent scaling</p>
    </div>
  </div>
  
</div>

<div style="background: linear-gradient(to right, #fef3c7, #fde68a); border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; margin: 30px 0;">
  <h4 style="margin: 0 0 20px 0; color: #92400e; font-size: 19px; text-align: center;">🎯 Golden Rules for System Design</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
    <div style="background: white; padding: 15px; border-radius: 8px;">
      <p style="margin: 0; color: #78350f; font-size: 14px;"><strong>1. Start Simple:</strong> Don't over-engineer. Add complexity only when needed.</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px;">
      <p style="margin: 0; color: #78350f; font-size: 14px;"><strong>2. Know Trade-offs:</strong> Every decision has pros and cons. Discuss both.</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px;">
      <p style="margin: 0; color: #78350f; font-size: 14px;"><strong>3. Scale Incrementally:</strong> Design for current needs + 10x growth.</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px;">
      <p style="margin: 0; color: #78350f; font-size: 14px;"><strong>4. Plan for Failure:</strong> Everything fails. Design for redundancy.</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px;">
      <p style="margin: 0; color: #78350f; font-size: 14px;"><strong>5. Monitor Everything:</strong> You can't fix what you can't see.</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px;">
      <p style="margin: 0; color: #78350f; font-size: 14px;"><strong>6. Ask Questions:</strong> Clarify requirements before designing.</p>
    </div>
  </div>
</div>

---

## What's Next?

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 30px; border-radius: 12px; margin: 35px 0; box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);">
  <h3 style="margin: 0 0 15px 0; font-size: 24px; color: white;">🚀 Continue Your Learning Journey</h3>
  <p style="margin: 0; font-size: 16px; line-height: 1.7; opacity: 0.95;">This guide covered the fundamentals. Each concept deserves deeper exploration. In upcoming posts, we'll dive into:</p>
</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 30px 0;">
  <div style="background: white; border: 2px solid #3b82f6; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15);">
    <h5 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px;">💾 Caching Deep Dive</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Strategies, invalidation, distributed caching</p>
  </div>
  
  <div style="background: white; border: 2px solid #10b981; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.15);">
    <h5 style="margin: 0 0 10px 0; color: #065f46; font-size: 16px;">🗄️ Database Sharding</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Consistent hashing, rebalancing, cross-shard queries</p>
  </div>
  
  <div style="background: white; border: 2px solid #8b5cf6; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.15);">
    <h5 style="margin: 0 0 10px 0; color: #5b21b6; font-size: 16px;">🔧 Microservices Patterns</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Service mesh, API gateway, saga pattern</p>
  </div>
  
  <div style="background: white; border: 2px solid #f59e0b; border-radius: 10px; padding: 20px; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.15);">
    <h5 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🏗️ Real System Designs</h5>
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Twitter, Instagram, Uber, Netflix</p>
  </div>
</div>

<div style="background: linear-gradient(to right, #fef3c7, #fde68a); border-left: 5px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 25px 0;">
  <p style="margin: 0 0 10px 0; color: #92400e; font-weight: 600; font-size: 16px;">📚 The best way to learn is to practice.</p>
  <p style="margin: 0; color: #78350f; font-size: 14px; line-height: 1.7;">Pick a system and design it. Start with requirements, estimate scale, draw architecture, identify bottlenecks.</p>
</div>

**Resources for continued learning:**
- System Design Primer (GitHub)
- Designing Data-Intensive Applications (Book)
- Company engineering blogs (Netflix, Uber, Airbnb)
- System design interview courses

---

## Real-World Case Studies

<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; border-radius: 12px; margin: 35px 0; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);">
  <h3 style="margin: 0 0 15px 0; font-size: 24px; color: white; text-align: center;">🏢 How Tech Giants Use These Concepts</h3>
  <p style="margin: 0; font-size: 15px; text-align: center; opacity: 0.95;">Real implementations from companies you know</p>
</div>

<div style="display: grid; gap: 25px; margin: 30px 0;">
  
  <!-- Netflix Case Study -->
  <div style="background: white; border-left: 5px solid #ef4444; border-radius: 10px; padding: 25px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <div style="background: #ef4444; color: white; width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 15px;">N</div>
      <div>
        <h4 style="margin: 0; color: #1f2937; font-size: 20px;">Netflix: Microservices at Scale</h4>
        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">200M+ subscribers, 1B+ hours watched weekly</p>
      </div>
    </div>
    <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
      <p style="margin: 0 0 10px 0; color: #7f1d1d; font-weight: 600; font-size: 15px;">Architecture Decisions:</p>
      <ul style="margin: 0; padding-left: 20px; color: #991b1b; font-size: 14px; line-height: 1.8;">
        <li><strong>Microservices:</strong> 700+ services for different features (recommendations, billing, streaming)</li>
        <li><strong>CDN:</strong> Open Connect CDN with servers in ISPs worldwide for low latency</li>
        <li><strong>Cassandra:</strong> NoSQL for viewing history (billions of records, eventual consistency OK)</li>
        <li><strong>Chaos Engineering:</strong> <span class="term-tooltip group relative inline cursor-help border-b border-dotted border-blue-600">Chaos Monkey<span class="tooltip-content invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] max-w-[90vw] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-3 border border-gray-300 dark:border-gray-600 rounded-sm shadow-md transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">A tool developed by Netflix that randomly terminates instances in production to test system resilience and ensure services can withstand failures. Part of the Simian Army suite.<a href="https://netflix.github.io/chaosmonkey/" target="_blank" rel="noopener" class="tooltip-link block mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-blue-600 dark:text-blue-400 hover:underline pointer-events-auto">Learn more →</a><span class="tooltip-arrow"></span></span></span> randomly kills servers to test resilience</li>
        <li><strong>Auto-scaling:</strong> AWS auto-scaling handles traffic spikes during new releases</li>
      </ul>
    </div>
    <div style="background: #d1fae5; padding: 12px; border-radius: 6px;">
      <p style="margin: 0; color: #065f46; font-size: 13px;"><strong>💡 Key Takeaway:</strong> Microservices enable independent scaling and deployment. Each team owns their service end-to-end.</p>
    </div>
  </div>
  
  <!-- Instagram Case Study -->
  <div style="background: white; border-left: 5px solid #ec4899; border-radius: 10px; padding: 25px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <div style="background: linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6); color: white; width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 15px;">📷</div>
      <div>
        <h4 style="margin: 0; color: #1f2937; font-size: 20px;">Instagram: Scaling Photo Storage</h4>
        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">2B+ users, 100M+ photos uploaded daily</p>
      </div>
    </div>
    <div style="background: #fdf2f8; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
      <p style="margin: 0 0 10px 0; color: #831843; font-weight: 600; font-size: 15px;">Architecture Decisions:</p>
      <ul style="margin: 0; padding-left: 20px; color: #9f1239; font-size: 14px; line-height: 1.8;">
        <li><strong>Sharding:</strong> PostgreSQL sharded by user ID (thousands of shards)</li>
        <li><strong>CDN:</strong> Facebook CDN serves images from edge locations worldwide</li>
        <li><strong>Caching:</strong> Memcached for feed data, Redis for real-time features</li>
        <li><strong>Async Processing:</strong> Celery queues for image processing (thumbnails, filters)</li>
        <li><strong>Read Replicas:</strong> Multiple replicas per shard for read scaling</li>
      </ul>
    </div>
    <div style="background: #d1fae5; padding: 12px; border-radius: 6px;">
      <p style="margin: 0; color: #065f46; font-size: 13px;"><strong>💡 Key Takeaway:</strong> Sharding enables horizontal scaling of databases. CDN reduces latency for global users.</p>
    </div>
  </div>
  
  <!-- Uber Case Study -->
  <div style="background: white; border-left: 5px solid #10b981; border-radius: 10px; padding: 25px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <div style="background: #10b981; color: white; width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 15px;">🚗</div>
      <div>
        <h4 style="margin: 0; color: #1f2937; font-size: 20px;">Uber: Real-Time Matching System</h4>
        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">20M+ rides daily, sub-second matching</p>
      </div>
    </div>
    <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
      <p style="margin: 0 0 10px 0; color: #14532d; font-weight: 600; font-size: 15px;">Architecture Decisions:</p>
      <ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 14px; line-height: 1.8;">
        <li><strong>Geospatial Indexing:</strong> Custom geo-indexing for fast driver lookup by location</li>
        <li><strong>Kafka:</strong> Event streaming for real-time location updates</li>
        <li><strong>Redis:</strong> In-memory cache for active drivers and riders</li>
        <li><strong>Microservices:</strong> 2000+ services (matching, pricing, routing, payments)</li>
        <li><strong>Circuit Breakers:</strong> Prevent cascading failures between services</li>
      </ul>
    </div>
    <div style="background: #d1fae5; padding: 12px; border-radius: 6px;">
      <p style="margin: 0; color: #065f46; font-size: 13px;"><strong>💡 Key Takeaway:</strong> Real-time systems need in-memory caching and event streaming. Geospatial indexing enables fast location queries.</p>
    </div>
  </div>
  
  <!-- Twitter Case Study -->
  <div style="background: white; border-left: 5px solid #3b82f6; border-radius: 10px; padding: 25px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <div style="background: #3b82f6; color: white; width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 15px;">🐦</div>
      <div>
        <h4 style="margin: 0; color: #1f2937; font-size: 20px;">Twitter: Timeline Generation</h4>
        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">500M tweets daily, 6000 tweets/second peak</p>
      </div>
    </div>
    <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
      <p style="margin: 0 0 10px 0; color: #1e3a8a; font-weight: 600; font-size: 15px;">Architecture Decisions:</p>
      <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; line-height: 1.8;">
        <li><strong>Fan-out on Write:</strong> Pre-compute timelines for followers when tweet posted</li>
        <li><strong>Redis:</strong> Cache timelines in memory for instant loading</li>
        <li><strong>Manhattan:</strong> Custom distributed database for tweets (key-value store)</li>
        <li><strong>Hybrid Approach:</strong> Fan-out for normal users, on-demand for celebrities (millions of followers)</li>
        <li><strong>Rate Limiting:</strong> Prevent abuse and ensure fair usage</li>
      </ul>
    </div>
    <div style="background: #d1fae5; padding: 12px; border-radius: 6px;">
      <p style="margin: 0; color: #065f46; font-size: 13px;"><strong>💡 Key Takeaway:</strong> Pre-computation (fan-out) trades write cost for read speed. Hybrid approaches handle edge cases.</p>
    </div>
  </div>
  
</div>

---

## Practice Problems

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 30px; border-radius: 12px; margin: 35px 0; box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);">
  <h3 style="margin: 0 0 15px 0; font-size: 24px; color: white; text-align: center;">💪 Test Your Knowledge</h3>
  <p style="margin: 0; font-size: 15px; text-align: center; opacity: 0.95;">Try designing these systems using concepts from this guide</p>
</div>

<div style="display: grid; gap: 20px; margin: 30px 0;">
  
  <!-- Beginner Level -->
  <div style="background: linear-gradient(to right, #d1fae5, #a7f3d0); border: 2px solid #10b981; border-radius: 12px; padding: 25px;">
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <span style="background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-right: 15px;">BEGINNER</span>
      <h4 style="margin: 0; color: #065f46; font-size: 19px;">Design a URL Shortener (like bit.ly)</h4>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px;">
      <p style="margin: 0 0 10px 0; color: #374151; font-weight: 600;">Requirements:</p>
      <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.8;">
        <li>Generate short URL from long URL</li>
        <li>Redirect short URL to original URL</li>
        <li>Track click analytics</li>
        <li>Handle 100M URLs, 1000 requests/second</li>
      </ul>
    </div>
    <details style="background: white; padding: 15px; border-radius: 8px; cursor: pointer;">
      <summary style="color: #065f46; font-weight: 600; font-size: 14px; cursor: pointer;">💡 Hints (click to expand)</summary>
      <div style="margin-top: 10px; color: #6b7280; font-size: 13px; line-height: 1.7;">
        <p style="margin: 0 0 8px 0;">• Use base62 encoding for short URLs (a-z, A-Z, 0-9)</p>
        <p style="margin: 0 0 8px 0;">• SQL database for URL mappings (small dataset)</p>
        <p style="margin: 0 0 8px 0;">• Redis cache for popular URLs</p>
        <p style="margin: 0;">• Async queue for analytics processing</p>
      </div>
    </details>
  </div>
  
  <!-- Intermediate Level -->
  <div style="background: linear-gradient(to right, #fef3c7, #fde68a); border: 2px solid #f59e0b; border-radius: 12px; padding: 25px;">
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <span style="background: #f59e0b; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-right: 15px;">INTERMEDIATE</span>
      <h4 style="margin: 0; color: #92400e; font-size: 19px;">Design Instagram Feed</h4>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px;">
      <p style="margin: 0 0 10px 0; color: #374151; font-weight: 600;">Requirements:</p>
      <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.8;">
        <li>Users can post photos and follow others</li>
        <li>Generate personalized feed of followed users' posts</li>
        <li>Support likes and comments</li>
        <li>Handle 1B users, 100M daily active users</li>
      </ul>
    </div>
    <details style="background: white; padding: 15px; border-radius: 8px; cursor: pointer;">
      <summary style="color: #92400e; font-weight: 600; font-size: 14px; cursor: pointer;">💡 Hints (click to expand)</summary>
      <div style="margin-top: 10px; color: #6b7280; font-size: 13px; line-height: 1.7;">
        <p style="margin: 0 0 8px 0;">• Sharded PostgreSQL for user data and relationships</p>
        <p style="margin: 0 0 8px 0;">• CDN for image storage and delivery</p>
        <p style="margin: 0 0 8px 0;">• Redis for pre-computed feeds (fan-out on write)</p>
        <p style="margin: 0 0 8px 0;">• Cassandra for activity logs (likes, comments)</p>
        <p style="margin: 0;">• Message queue for async feed generation</p>
      </div>
    </details>
  </div>
  
  <!-- Advanced Level -->
  <div style="background: linear-gradient(to right, #fee2e2, #fecaca); border: 2px solid #ef4444; border-radius: 12px; padding: 25px;">
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <span style="background: #ef4444; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-right: 15px;">ADVANCED</span>
      <h4 style="margin: 0; color: #7f1d1d; font-size: 19px;">Design Uber Ride Matching System</h4>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px;">
      <p style="margin: 0 0 10px 0; color: #374151; font-weight: 600;">Requirements:</p>
      <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.8;">
        <li>Match riders with nearby drivers in real-time</li>
        <li>Track driver locations continuously</li>
        <li>Calculate dynamic pricing (surge)</li>
        <li>Handle 20M rides daily, sub-second matching</li>
      </ul>
    </div>
    <details style="background: white; padding: 15px; border-radius: 8px; cursor: pointer;">
      <summary style="color: #7f1d1d; font-weight: 600; font-size: 14px; cursor: pointer;">💡 Hints (click to expand)</summary>
      <div style="margin-top: 10px; color: #6b7280; font-size: 13px; line-height: 1.7;">
        <p style="margin: 0 0 8px 0;">• Geospatial indexing (QuadTree/S2) for location queries</p>
        <p style="margin: 0 0 8px 0;">• Redis for active driver/rider state (in-memory)</p>
        <p style="margin: 0 0 8px 0;">• Kafka for real-time location streaming</p>
        <p style="margin: 0 0 8px 0;">• Microservices: matching, pricing, routing, payments</p>
        <p style="margin: 0 0 8px 0;">• WebSockets for real-time updates to apps</p>
        <p style="margin: 0;">• Circuit breakers between services</p>
      </div>
    </details>
  </div>
  
</div>

<div style="background: #dbeafe; border-left: 5px solid #3b82f6; padding: 20px; border-radius: 8px; margin: 25px 0;">
  <p style="margin: 0 0 10px 0; color: #1e40af; font-weight: 600; font-size: 16px;">📝 How to Practice:</p>
  <ol style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 14px; line-height: 1.8;">
    <li>Start with requirements - clarify functional and non-functional needs</li>
    <li>Estimate scale - calculate QPS, storage, bandwidth</li>
    <li>Draw high-level architecture - components and data flow</li>
    <li>Identify bottlenecks - what fails first as you scale?</li>
    <li>Optimize - add caching, sharding, replication as needed</li>
    <li>Discuss trade-offs - why this choice over alternatives?</li>
  </ol>
</div>

---

## Let's Connect

System design is a journey. I'm constantly learning from real-world systems and sharing discoveries.

Have questions about specific concepts? Designing a system and want feedback? [Reach out](/contact.html)—I love discussing architecture and trade-offs.

Remember: every massive system started simple. Twitter began as a basic web app. Instagram was just photo uploads. They evolved by solving one problem at a time.

You now have the foundation. Start designing, keep learning, and watch these concepts become second nature.

Happy designing!
