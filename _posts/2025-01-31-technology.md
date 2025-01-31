---
layout: profile
title: "Technology is evolving"
date: 2025-01-31
category: "Technology"
image: "https://placehold.co/400x250"
excerpt: "A deep dive into cloud computing and its impact on modern businesses."
---

<!-- Blog Detail Page -->
<section class="py-16 bg-gradient-to-r from-gray-50 to-gray-200 text-center">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl font-extrabold text-gray-900">{{ page.title }}</h1>
        <p class="text-gray-500 mt-4 text-sm">Published on {{ page.date | date: "%B %d, %Y" }} | Category: {{ page.category }}</p>
    </div>
</section>

<!-- Blog Content -->
<section class="py-12">
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div class="relative w-full h-96 mb-6">
            <img src="{{ page.image }}" alt="{{ page.title }}" class="w-full h-full object-cover rounded-lg shadow-md">
            <span class="absolute top-4 left-4 bg-blue-600 text-white text-xs uppercase font-semibold px-3 py-1 rounded-lg shadow-lg">{{ page.category }}</span>
        </div>
        <div class="prose prose-lg text-gray-800 leading-relaxed">
            {{ content }}
        </div>
    </div>
</section>

<!-- Related Posts -->
<section class="py-16 bg-gray-100">
    <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-900">Related Posts</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {% for post in site.posts limit:2 %}
            {% if post.url != page.url %}
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-300">
                <img src="{{ post.image }}" alt="{{ post.title }}" class="w-full h-40 object-cover rounded-lg">
                <h3 class="text-xl font-bold text-gray-900 mt-4 hover:text-blue-600 transition duration-200">
                    <a href="{{ post.url }}">{{ post.title }}</a>
                </h3>
                <p class="text-gray-600 mt-2 text-sm">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
            </div>
            {% endif %}
            {% endfor %}
        </div>
    </div>
</section>