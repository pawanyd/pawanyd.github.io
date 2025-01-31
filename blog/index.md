---
layout: default
title: Blog
---

<section class="max-w-4xl mx-auto py-8">
  <h1 class="text-4xl font-bold text-gray-800 mb-8">Blog Posts</h1>

  <div class="space-y-8">
    {% for post in site.posts %}
      <article class="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h2 class="text-2xl font-semibold text-gray-800">
          <a href="{{ post.url }}" class="hover:text-blue-600">{{ post.title }}</a>
        </h2>
        <time class="text-gray-500 text-sm">{{ post.date | date: "%B %d, %Y" }}</time>
        <p class="mt-2 text-gray-600">{{ post.excerpt | strip_html }}</p>
      </article>
    {% endfor %}
  </div>
</section>