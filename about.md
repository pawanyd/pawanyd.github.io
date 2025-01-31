---
layout: profile
title: {{ site.data.about.title }}
---

<!-- About Me Page -->
<section class="text-center py-12">
    <h1 class="text-4xl font-bold text-gray-800">{{ site.data.about.title }}</h1>
    <p class="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">{{ site.data.about.description }}</p>
</section>

<!-- Personal Introduction -->
<section class="py-12 bg-gray-100">
    <div class="max-w-6xl mx-auto flex flex-wrap items-center">
        <div class="w-full md:w-1/2 text-center md:text-left p-6">
            <h2 class="text-3xl font-semibold text-gray-800">{{ site.data.about.intro_title }}</h2>
            <p class="text-gray-600 mt-4">{{ site.data.about.intro_description }}</p>
        </div>
        <div class="w-full md:w-1/2 text-center">
            <img src="{{ site.data.about.image }}" alt="About Me" class="rounded-lg shadow-lg w-full md:w-2/3">
        </div>
    </div>
</section>

<!-- Experience Section -->
<section class="py-12">
    <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-semibold text-gray-800">{{ site.data.about.experience_title }}</h2>
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {% for experience in site.data.about.experience_list %}
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h3 class="text-2xl font-semibold text-gray-800">{{ experience.company }}</h3>
                <p class="text-gray-600 mt-2">{{ experience.role }}</p>
                <p class="text-gray-500 text-sm">{{ experience.duration }}</p>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<!-- Skills Section -->
<section class="py-12 bg-gray-100">
    <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-semibold text-gray-800">{{ site.data.about.skills_title }}</h2>
        <div class="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {% for skill in site.data.about.skills_list %}
            <div class="bg-white p-4 rounded-lg shadow-md text-center hover:bg-blue-50 transition">
                <p class="text-lg font-semibold text-gray-800">{{ skill }}</p>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<!-- Contact Section -->
<section class="text-center py-12">
    <h2 class="text-3xl font-semibold text-gray-800">{{ site.data.about.contact_title }}</h2>
    <p class="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">{{ site.data.about.contact_description }}</p>
    <a href="{{ site.data.about.contact_button_link }}" class="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600">
        {{ site.data.about.contact_button_text }}
    </a>
</section>