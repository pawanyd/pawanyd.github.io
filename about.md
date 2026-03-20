---
layout: profile
title: "About Pawan Kumar - Software Developer & SaaS Expert"
meta_title: "About Pawan Kumar | Software Developer & SaaS Architect"
meta_description: "Learn more about Pawan Kumar, a Principal Software Developer with expertise in SaaS, PHP, Laravel, and cloud technologies. Discover his journey, skills, and professional achievements."
meta_image: "/assets/images/about-meta-image.jpg"
---

<!-- Enhanced Hero Section with Terminal Style -->
<section class="about-hero-section relative overflow-hidden" style="content-visibility:visible">
    <!-- Animated Background with Grid -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
    
    <!-- Tech Grid Pattern -->
    <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>
    
    <!-- Animated particles -->
    <div class="absolute inset-0 overflow-hidden">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div class="flex flex-col md:flex-row items-center justify-between gap-12">
            <!-- Text Content -->
            <div class="flex-1 text-center md:text-left space-y-6">
                <!-- Terminal Window -->
                <div class="terminal-window bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700 shadow-2xl overflow-hidden animate-fade-in-up">
                    <!-- Terminal Header -->
                    <div class="terminal-header bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                        <div class="flex gap-2">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span class="text-gray-400 text-sm ml-4 font-mono">about-me.sh</span>
                    </div>
                    
                    <!-- Terminal Content -->
                    <div class="terminal-content p-6 font-mono text-sm md:text-base">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-green-400">➜</span>
                            <span class="text-blue-400">~</span>
                            <span class="text-gray-300">whoami</span>
                        </div>
                        <div class="mb-4">
                            <h1 class="text-2xl md:text-4xl font-bold text-white mb-2">
                                {{ site.data.about.title }}
                            </h1>
                        </div>
                        
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-green-400">➜</span>
                            <span class="text-blue-400">~</span>
                            <span class="text-gray-300">cat profile.txt</span>
                        </div>
                        <div class="mb-4">
                            <p id="typing-text" class="text-green-300 text-base md:text-lg leading-relaxed min-h-[60px]">
                                <span class="typing-cursor">|</span>
                            </p>
                        </div>
                        
                        <div class="flex items-center gap-2">
                            <span class="text-green-400">➜</span>
                            <span class="text-blue-400">~</span>
                            <span class="text-gray-300 typing-cursor-blink">|</span>
                        </div>
                    </div>
                </div>
                
                <!-- Social Links -->
                <div class="flex justify-center md:justify-start gap-4 pt-4">
                    {% for social in site.data.social.social_links %}
                    <a href="{{ social.url }}" target="_blank" rel="noopener noreferrer" 
                       class="w-12 h-12 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 border border-gray-700 hover:border-blue-500" 
                       title="{{ social.name | capitalize }}">
                        <i class="fab fa-{{ social.name }} text-xl"></i>
                    </a>
                    {% endfor %}
                </div>
                
                <!-- CTA Buttons -->
                <div class="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                    <a href="#contact" class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-blue-500">
                        <i class="fas fa-terminal"></i>
                        <span>$ connect --now</span>
                    </a>
                    <a href="#intro" class="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm text-gray-300 px-6 py-3 rounded-lg text-base font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600">
                        <i class="fas fa-code"></i>
                        <span>$ explore --more</span>
                    </a>
                </div>
            </div>
            
            <!-- Profile Image with Tech Frame -->
            <div class="flex-shrink-0 animate-fade-in-up animation-delay-300">
                <div class="relative">
                    <!-- Tech corners -->
                    <div class="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-blue-500"></div>
                    <div class="absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-purple-500"></div>
                    <div class="absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-purple-500"></div>
                    <div class="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-blue-500"></div>
                    
                    <!-- Scanning line effect -->
                    <div class="absolute inset-0 overflow-hidden rounded-lg">
                        <div class="scan-line"></div>
                    </div>
                    
                    <!-- Image container -->
                    <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-4 border-gray-700 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                        <img src="/assets/images/pawan.webp" 
                             alt="{{ site.data.about.title }}" 
                             class="w-full h-full object-cover"
                             loading="eager">
                        <!-- Tech overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                    </div>
                    
                    <!-- Status badge -->
                    <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg px-4 py-2 shadow-xl border border-green-500">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span class="text-xs font-mono text-green-400">STATUS: ONLINE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#intro" class="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
                <span class="text-sm mb-2 font-mono">scroll_down()</span>
                <i class="fas fa-chevron-down text-2xl"></i>
            </a>
        </div>
    </div>
</section>

<!-- Typing Animation Script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typing-text');
    const fullText = "{{ site.data.about.description }}";
    let index = 0;
    
    function typeText() {
        if (index < fullText.length) {
            textElement.textContent = fullText.substring(0, index + 1);
            index++;
            setTimeout(typeText, 50); // Typing speed
        } else {
            // Remove cursor after typing is complete
            textElement.classList.remove('typing-cursor');
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 500);
});
</script>

<style>
/* Tech Hero Section Styles */
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scan {
    0% {
        top: -100%;
    }
    100% {
        top: 100%;
    }
}

@keyframes float {
    0%, 100% {
        transform: translate(0, 0);
    }
    25% {
        transform: translate(10px, -10px);
    }
    50% {
        transform: translate(-10px, 10px);
    }
    75% {
        transform: translate(-10px, -10px);
    }
}

@keyframes cursor-blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-300 {
    animation-delay: 0.3s;
}

/* Terminal cursor */
.typing-cursor::after {
    content: '|';
    animation: cursor-blink 1s infinite;
    margin-left: 2px;
}

.typing-cursor-blink {
    animation: cursor-blink 1s infinite;
}

/* Scanning line effect */
.scan-line {
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent);
    animation: scan 3s linear infinite;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

/* Floating particles */
.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(59, 130, 246, 0.6);
    border-radius: 50%;
    animation: float 6s infinite ease-in-out;
}

.particle:nth-child(1) {
    top: 20%;
    left: 20%;
    animation-delay: 0s;
}

.particle:nth-child(2) {
    top: 40%;
    left: 80%;
    animation-delay: 1s;
}

.particle:nth-child(3) {
    top: 60%;
    left: 40%;
    animation-delay: 2s;
}

.particle:nth-child(4) {
    top: 80%;
    left: 70%;
    animation-delay: 3s;
}

.particle:nth-child(5) {
    top: 30%;
    left: 60%;
    animation-delay: 4s;
}

/* Terminal window effects */
.terminal-window {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.terminal-content {
    background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%);
}

/* Smooth scroll */
html {
    scroll-behavior: smooth;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .terminal-content {
        font-size: 0.875rem;
    }
    
    #typing-text {
        font-size: 1rem;
    }
}
</style>

<!-- Personal Introduction - Enhanced -->
<section id="intro" class="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" style="content-visibility:visible">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div class="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    
    <div class="max-w-6xl mx-auto px-6 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-12">
            <div class="inline-block mb-4">
                <span class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    <i class="fas fa-user-circle"></i>
                    <span>About Me</span>
                </span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {{ site.data.about.intro_title }}
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>
        
        <!-- Content Grid -->
        <div class="grid md:grid-cols-2 gap-8 items-center">
            <!-- Left: Description -->
            <div class="space-y-6">
                <div class="prose prose-lg max-w-none">
                    <p class="text-gray-700 text-lg leading-relaxed">
                        {{ site.data.about.intro_description }}
                    </p>
                </div>
                
                <!-- Quick Stats -->
                <div class="grid grid-cols-2 gap-4 pt-4">
                    <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-code text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-gray-800">10+</div>
                                <div class="text-sm text-gray-600">Years Experience</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-project-diagram text-purple-600 text-xl"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-gray-800">50+</div>
                                <div class="text-sm text-gray-600">Projects Done</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right: Key Highlights -->
            <div class="space-y-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-start gap-4">
                        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-rocket text-white"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800 mb-2">SaaS Expertise</h3>
                            <p class="text-gray-700">Building scalable cloud-based solutions with modern architectures and best practices.</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-start gap-4">
                        <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-brain text-white"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800 mb-2">Problem Solver</h3>
                            <p class="text-gray-700">Passionate about tackling complex challenges and delivering innovative solutions.</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-start gap-4">
                        <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-users text-white"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800 mb-2">Team Leader</h3>
                            <p class="text-gray-700">Leading development teams and mentoring developers to achieve excellence.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Tech Stack Preview -->
        <div class="mt-12 text-center">
            <p class="text-gray-600 mb-6 font-semibold">Technologies I Work With</p>
            <div class="flex flex-wrap justify-center gap-3">
                <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300">
                    <i class="fab fa-php text-blue-600"></i> PHP
                </span>
                <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200 hover:border-red-500 hover:shadow-lg transition-all duration-300">
                    <i class="fab fa-laravel text-red-600"></i> Laravel
                </span>
                <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200 hover:border-yellow-500 hover:shadow-lg transition-all duration-300">
                    <i class="fab fa-js text-yellow-600"></i> JavaScript
                </span>
                <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300">
                    <i class="fab fa-node text-green-600"></i> Node.js
                </span>
                <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300">
                    <i class="fab fa-react text-blue-600"></i> React
                </span>
                <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                    <i class="fab fa-aws text-orange-600"></i> AWS
                </span>
                <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-md border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300">
                    <i class="fab fa-docker text-blue-600"></i> Docker
                </span>
            </div>
        </div>
    </div>
</section>

<style>
@keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(20px, -20px) scale(1.1); }
    50% { transform: translate(-20px, 20px) scale(0.9); }
    75% { transform: translate(20px, 20px) scale(1.05); }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}
</style>

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

<!-- GitHub Integration Widget Section -->
<section class="github-widget-section">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-4xl font-bold text-gray-800">GitHub Presence</h2>
    <p class="text-gray-700 text-lg max-w-2xl mx-auto mt-2">Check out my open-source contributions and projects on GitHub</p>
    
    <!-- GitHub Stats -->
    <div id="github-stats" class="mt-8">
      <div class="github-stat loading-skeleton" style="height: 120px;"></div>
      <div class="github-stat loading-skeleton" style="height: 120px;"></div>
      <div class="github-stat loading-skeleton" style="height: 120px;"></div>
      <div class="github-stat loading-skeleton" style="height: 120px;"></div>
    </div>

    <!-- GitHub Repositories -->
    <h3 class="text-2xl font-semibold text-gray-800 mt-12 mb-6">Featured Repositories</h3>
    <div id="github-repos" class="mt-6">
      <div class="github-repo-card loading-skeleton" style="height: 200px;"></div>
      <div class="github-repo-card loading-skeleton" style="height: 200px;"></div>
      <div class="github-repo-card loading-skeleton" style="height: 200px;"></div>
    </div>

    <!-- CTA Link -->
    <a href="https://github.com/pawanyd" target="_blank" rel="noopener noreferrer" class="github-widget-cta">
      <i class="fab fa-github"></i> Visit My GitHub Profile
    </a>
  </div>
</section>

<!-- Contact Section -->
<section id="contact" class="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50">
    <h2 class="text-4xl font-bold text-gray-800">{{ site.data.about.contact_title }}</h2>
    <p class="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">{{ site.data.about.contact_description }}</p>
    
    <!-- Social Media Links -->
    <div class="flex justify-center gap-6 mt-8 mb-8">
        {% for social in site.data.social.social_links %}
        <a href="{{ social.url }}" target="_blank" rel="noopener noreferrer" 
           class="w-14 h-14 flex items-center justify-center bg-white rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl" 
           title="{{ social.name | capitalize }}">
            <i class="fab fa-{{ social.name }} text-2xl"></i>
        </a>
        {% endfor %}
    </div>
    
    <a href="{{ site.data.about.contact_button_link }}" class="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
        {{ site.data.about.contact_button_text }}
        <i class="fas fa-envelope"></i>
    </a>
</section>