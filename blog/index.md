---
layout: profile
title: "Pawan Kumar's Blog - Insights on SaaS, Web Development & Cloud"
meta_title: "Tech Blog by Pawan Kumar | SaaS, Web Development & Cloud Solutions"
meta_description: "Stay updated with Pawan Kumar's latest insights on SaaS development, web technologies, and cloud solutions. Read expert articles, tutorials, and industry trends."
meta_image: "/assets/images/blog-listing-meta.jpg"
permalink: /blogs/
pagination:
  enabled: true
---

<!-- Blog Listing Page -->
<section class="py-16 bg-gradient-to-r from-gray-50 to-gray-200">
    <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl font-extrabold text-gray-900">Latest Blog Posts</h1>
        <p class="text-lg text-gray-700 mt-4">Stay updated with the latest insights, tutorials, and industry trends.</p>
    </div>
</section>

<!-- Blog Posts -->
<section class="py-12">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {% for post in site.posts %}
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-300">
            <div class="relative">
                <img src="{{ post.image }}" alt="{{ post.title }}" class="w-full h-56 object-cover">
                <span class="absolute top-2 left-2 bg-blue-600 text-white text-xs uppercase font-semibold px-3 py-1 rounded-lg shadow-md">{{ post.category }}</span>
            </div>
            <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-900 hover:text-blue-600 transition duration-200">
                    <a href="{{ post.url }}">{{ post.title }}</a>
                </h2>
                <p class="text-gray-500 mt-2 text-sm">Published on {{ post.date | date: "%B %d, %Y" }}</p>
                <p class="text-gray-600 mt-3">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
                <a href="{{ post.url }}" class="inline-block mt-4 text-blue-600 font-semibold hover:underline">Read More</a>
            </div>
        </div>
        {% endfor %}
    </div>
</section>


<!-- Pagination -->
<section class="py-8">
    <div class="max-w-6xl mx-auto flex justify-center space-x-4">
        {% if paginator.previous_page %}
            <a href="{{ paginator.previous_page_path }}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Previous</a>
        {% endif %}
        <span class="px-4 py-2 bg-gray-200 rounded-lg">Page {{ paginator.page }} of {{ paginator.total_pages }}</span>
        {% if paginator.next_page %}
            <a href="{{ paginator.next_page_path }}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next</a>
        {% endif %}
    </div>
</section>
