---
layout: profile
title: "About Pawan Kumar - Software Developer & SaaS Expert"
meta_title: "About Pawan Kumar | Software Developer & SaaS Architect"
meta_description: "Learn more about Pawan Kumar, a Principal Software Developer with expertise in SaaS, PHP, Laravel, and cloud technologies. Discover his journey, skills, and professional achievements."
meta_image: "/assets/images/about-meta-image.jpg"
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
            <img src="{{ site.data.home.about.image-prof }}" alt="About Me" class="rounded-lg shadow-lg w-full md:w-2/3">
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

<!-- Experience Timeline Section -->
<section class="py-16 bg-gray-100">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-gray-800 text-center mb-12">My Professional Journey</h2>
        <div class="relative flex flex-col items-center">
            <div class="absolute w-1 bg-blue-600 h-full left-1/2 transform -translate-x-1/2"></div>
            {% for experience in site.data.about.experience_list reversed %}
            <div class="w-full md:w-1/2 {% cycle 'ml-auto pr-10', 'mr-auto pl-10' %} relative mb-16">
                <div class="absolute {% cycle '-right-4 md:-right-6', '-left-4 md:-left-6' %} top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                    <i class="fa-solid fa-briefcase text-white text-xs"></i>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 relative">
                    <h3 class="text-2xl font-bold text-gray-800">{{ experience.company }}</h3>
                    <p class="text-gray-500 mt-2 text-sm">{{ experience.duration }}</p>
                    <p class="text-gray-600 mt-3">{{ experience.role }}</p>
                    <span class="absolute -top-4 {% cycle 'left-4', 'right-4' %} bg-gray-200 px-4 py-1 rounded-full text-xs font-semibold uppercase">Step {{ forloop.index }}</span>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>




<!-- Skills Section -->
<section class="py-16 bg-gray-100">
  <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-gray-800">{{ site.data.home.skills.title }}</h2>
      <div class="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {% for skill in site.data.home.skills.list %}
          <div class="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center space-x-4 hover:shadow-xl transition-transform duration-300 ease-in-out">
              <i class="{{ skill.icon }} text-3xl text-blue-600"></i>
              <p class="text-lg font-semibold text-gray-800">{{ skill.name }}</p>
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