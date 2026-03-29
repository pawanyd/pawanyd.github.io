// Blog Search, Category Filter & Visit Tracker
(function () {
    'use strict';

    // ─── DOM References ───────────────────────────────────────────────────────────
    const els = {
        searchInput:          document.getElementById('sidebar-search-input'),
        clearBtn:             document.getElementById('sidebar-clear-search'),
        searchCount:          document.getElementById('sidebar-search-count'),
        searchResultsSection: document.getElementById('search-results-section'),
        searchResults:        document.getElementById('search-results'),
        blogPosts:            document.getElementById('blog-posts'),
        paginationSection:    document.getElementById('pagination-section'),
        categoryPills:        document.querySelectorAll('.cat-pill'),
        activeBanner:         document.getElementById('active-filter-banner'),
        activeBannerText:     document.getElementById('active-filter-text'),
        clearCatBtn:          document.getElementById('clear-category-filter'),
        noCatResults:         document.getElementById('no-category-results'),
        mostVisitedList:      document.getElementById('most-visited-list'),
        recentlyVisitedList:  document.getElementById('recently-visited-list'),
    };

    // ─── State ────────────────────────────────────────────────────────────────────
    let searchIndex    = null;
    let searchData     = [];
    let activeCategory = 'all';
    // Save the original paginated HTML so we can restore it when "All" is clicked
    const originalBlogPostsHTML = els.blogPosts ? els.blogPosts.innerHTML : '';

    // ─── LocalStorage Keys ────────────────────────────────────────────────────────
    const VISITS_KEY = 'blog_visits';  // { url: { title, image, count } }
    const RECENT_KEY = 'blog_recent';  // [ { url, title, image, ts } ] max 10

    // ═══════════════════════════════════════════════════════════════════════════════
    // SEARCH
    // ═══════════════════════════════════════════════════════════════════════════════

    async function initSearch() {
        try {
            const res = await fetch('/search.json');
            searchData = await res.json();
            searchIndex = lunr(function () {
                this.ref('id');
                this.field('title',    { boost: 10 });
                this.field('category', { boost: 5  });
                this.field('tags',     { boost: 5  });
                this.field('excerpt',  { boost: 3  });
                this.field('content');
                searchData.forEach(function (d) { this.add(d); }, this);
            });
        } catch (e) { console.error('Search init error:', e); }
    }

    function performSearch(query) {
        if (!searchIndex || !query || query.trim().length < 2) { resetSearch(); return; }
        let results = [];
        try { results = searchIndex.search(query + '*'); } catch (_) {}
        if (!results.length) { try { results = searchIndex.search(query + '~1'); } catch (_) {} }
        if (!results.length) { try { results = searchIndex.search(query); }       catch (_) {} }

        const posts = results.map(r => searchData.find(p => p.id === r.ref)).filter(Boolean);
        if (!posts.length) { showNoSearchResults(query); return; }
        displaySearchResults(posts, query);
    }

    function displaySearchResults(posts, query) {
        showSearchMode();
        if (els.searchCount) {
            els.searchCount.textContent = `Found ${posts.length} result${posts.length !== 1 ? 's' : ''} for "${query}"`;
        }
        els.searchResults.innerHTML = posts.map(post => {
            const categoryConfig = getCategoryConfig(post.category);
            return `
            <article class="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <a href="${escHtml(post.url)}" class="block relative overflow-hidden h-48 sm:h-44 md:h-52 lg:h-48" onclick="trackVisit('${escHtml(post.url)}','${escHtml(post.title)}','${escHtml(post.image||'')}')">
                    <img src="${escHtml(post.image||'')}" alt="${escHtml(post.title)}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy">
                    
                    <!-- Enhanced gradient overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                    
                    <!-- Category badge at bottom left -->
                    <span class="absolute bottom-3 left-3 inline-flex items-center gap-2 ${categoryConfig.bgColor} backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-md border border-white/20">
                        <i class="${categoryConfig.icon}"></i>
                        <span>${categoryConfig.label}</span>
                    </span>
                </a>
                <div class="p-4 lg:p-5 flex flex-col flex-1">
                    <h2 class="text-base font-bold text-gray-900 leading-snug mb-2">
                        <a href="${escHtml(post.url)}" class="hover:text-blue-600 transition-colors duration-200">${highlightText(post.title, query)}</a>
                    </h2>
                    
                    <!-- Enhanced metadata with author -->
                    <div class="flex flex-wrap items-center gap-2 text-gray-500 text-xs mb-3">
                        <time class="flex items-center gap-1">
                            <i class="fas fa-calendar text-blue-600"></i>
                            ${escHtml(post.date)}
                        </time>
                        <span class="text-gray-300">•</span>
                        <span class="flex items-center gap-1">
                            <i class="fas fa-clock text-purple-600"></i>
                            ${calcReadTime(post.content)}
                        </span>
                        ${post.author ? `
                        <span class="text-gray-300">•</span>
                        <span class="flex items-center gap-1">
                            <i class="fas fa-user text-pink-600"></i>
                            ${escHtml(post.author)}
                        </span>
                        ` : ''}
                    </div>
                    
                    ${post.tags && post.tags.length ? `<div class="flex flex-wrap gap-1 mb-3">${post.tags.slice(0,3).map(t=>`<span class="text-xs px-2 py-0.5 ${categoryConfig.tagColor} rounded-full font-medium">${escHtml(t)}</span>`).join('')}</div>` : ''}
                    <p class="text-gray-500 text-sm leading-relaxed mb-4 flex-1">${escHtml(post.excerpt||'').split(' ').slice(0,18).join(' ')}...</p>
                    <a href="${escHtml(post.url)}" class="inline-flex items-center gap-2 ${categoryConfig.linkColor} text-sm font-semibold hover:gap-3 transition-all duration-200">Read More <i class="fas fa-arrow-right text-xs"></i></a>
                </div>
            </article>
        `}).join('');
    }

    function showNoSearchResults(query) {
        showSearchMode();
        if (els.searchCount) els.searchCount.textContent = `No results for "${query}"`;
        els.searchResults.innerHTML = `
            <div class="col-span-2 text-center py-14 text-gray-400">
                <i class="fas fa-search text-5xl mb-4 block"></i>
                <p class="text-base font-medium text-gray-500">No posts found matching "<strong>${escHtml(query)}</strong>"</p>
                <p class="text-sm text-gray-400 mt-1">Try different keywords or browse the categories.</p>
            </div>`;
    }

    function showSearchMode() {
        if (els.blogPosts)           els.blogPosts.classList.add('hidden');
        if (els.paginationSection)   els.paginationSection.classList.add('hidden');
        if (els.activeBanner)        els.activeBanner.classList.add('hidden');
        if (els.noCatResults)        els.noCatResults.classList.add('hidden');
        if (els.searchResultsSection) els.searchResultsSection.classList.remove('hidden');
    }

    function resetSearch() {
        if (els.searchResultsSection) els.searchResultsSection.classList.add('hidden');
        if (els.searchResults)        els.searchResults.innerHTML = '';
        if (els.searchCount)          els.searchCount.textContent = 'Start typing to search...';
        if (els.blogPosts)            els.blogPosts.classList.remove('hidden');
        if (els.paginationSection)    els.paginationSection.classList.remove('hidden');
        if (activeCategory !== 'all') applyCategoryFilter(activeCategory);
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // CATEGORY FILTER
    // ═══════════════════════════════════════════════════════════════════════════════

    function buildPostCard(post) {
        const tags = Array.isArray(post.tags) ? post.tags : (post.tags ? [post.tags] : []);
        const categoryConfig = getCategoryConfig(post.category);
        
        const tagsHtml = tags.length
            ? `<div class="flex flex-wrap gap-1 mb-3">${tags.slice(0, 3).map(t => `<span class="text-xs px-2 py-0.5 ${categoryConfig.tagColor} rounded-full font-medium">${escHtml(t)}</span>`).join('')}</div>`
            : '';
        return `
            <article class="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col" data-category="${escHtml(post.category)}" data-url="${escHtml(post.url)}">
                <a href="${escHtml(post.url)}" class="block relative overflow-hidden h-48 sm:h-44 md:h-52 lg:h-48" onclick="trackVisit('${escHtml(post.url)}','${escHtml(post.title)}','${escHtml(post.image||'')}')">
                    <img src="${escHtml(post.image||'')}" alt="${escHtml(post.title)}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy">
                    
                    <!-- Enhanced gradient overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                    
                    <!-- Category badge at bottom left -->
                    <span class="absolute bottom-3 left-3 inline-flex items-center gap-2 ${categoryConfig.bgColor} backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-md border border-white/20">
                        <i class="${categoryConfig.icon}"></i>
                        <span>${categoryConfig.label}</span>
                    </span>
                </a>
                <div class="p-4 lg:p-5 flex flex-col flex-1">
                    <h2 class="text-base font-bold text-gray-900 leading-snug mb-2">
                        <a href="${escHtml(post.url)}" class="${categoryConfig.hoverColor} transition-colors duration-200">${escHtml(post.title)}</a>
                    </h2>
                    
                    <!-- Enhanced metadata with author -->
                    <div class="flex flex-wrap items-center gap-2 text-gray-500 text-xs mb-3">
                        <time class="flex items-center gap-1">
                            <i class="fas fa-calendar text-blue-600"></i>
                            ${escHtml(post.date)}
                        </time>
                        <span class="text-gray-300">•</span>
                        <span class="flex items-center gap-1">
                            <i class="fas fa-clock text-purple-600"></i>
                            ${calcReadTime(post.content)}
                        </span>
                        ${post.author ? `
                        <span class="text-gray-300">•</span>
                        <span class="flex items-center gap-1">
                            <i class="fas fa-user text-pink-600"></i>
                            ${escHtml(post.author)}
                        </span>
                        ` : ''}
                    </div>
                    
                    ${tagsHtml}
                    <p class="text-gray-500 text-sm leading-relaxed mb-4 flex-1">${escHtml(post.excerpt||'').split(' ').slice(0, 18).join(' ')}...</p>
                    <a href="${escHtml(post.url)}" class="inline-flex items-center gap-2 ${categoryConfig.linkColor} text-sm font-semibold hover:gap-3 transition-all duration-200">Read More <i class="fas fa-arrow-right text-xs"></i></a>
                </div>
            </article>`;
    }

    function applyCategoryFilter(cat) {
        activeCategory = cat;

        if (cat === 'all') {
            // Restore original paginated HTML
            if (els.blogPosts) els.blogPosts.innerHTML = originalBlogPostsHTML;
            if (els.activeBanner)      els.activeBanner.classList.add('hidden');
            if (els.noCatResults)      els.noCatResults.classList.add('hidden');
            if (els.paginationSection) els.paginationSection.classList.remove('hidden');
        } else {
            // Filter ALL posts (from search.json) by category and render them
            const filtered = searchData.filter(p =>
                (p.category || '').toLowerCase() === cat.toLowerCase()
            );
            if (els.blogPosts) {
                els.blogPosts.innerHTML = filtered.length
                    ? filtered.map(buildPostCard).join('')
                    : '';
            }
            if (els.activeBanner) {
                els.activeBanner.classList.remove('hidden');
                els.activeBannerText.textContent = `Showing: ${cat} (${filtered.length} post${filtered.length !== 1 ? 's' : ''})`;
            }
            if (els.noCatResults) {
                els.noCatResults.classList.toggle('hidden', filtered.length > 0);
            }
            if (els.paginationSection) els.paginationSection.classList.add('hidden');
        }

        // Update active pill styling with tailwind classes
        els.categoryPills.forEach(p => {
            const isActive = p.dataset.cat === cat;
            if (isActive) {
                p.classList.remove('bg-gray-50', 'text-gray-600', 'border-gray-200', 'hover:border-blue-300', 'hover:bg-blue-50', 'hover:text-blue-600');
                if (cat === 'DSA') {
                    p.classList.add('bg-purple-600', 'text-white', 'border-purple-600', 'shadow-md', 'active');
                } else {
                    p.classList.add('bg-blue-600', 'text-white', 'border-blue-600', 'shadow-md', 'active');
                }
                const countSpan = p.querySelector('span');
                if (countSpan) {
                    countSpan.classList.remove('text-gray-400');
                    countSpan.classList.add('text-white', 'opacity-80');
                }
            } else {
                p.classList.remove('bg-blue-600', 'bg-purple-600', 'text-white', 'border-blue-600', 'border-purple-600', 'shadow-md', 'active');
                p.classList.add('bg-gray-50', 'text-gray-600', 'border-gray-200', 'hover:border-blue-300', 'hover:bg-blue-50', 'hover:text-blue-600');
                const countSpan = p.querySelector('span');
                if (countSpan) {
                    countSpan.classList.remove('text-white', 'opacity-80');
                    countSpan.classList.add('text-gray-400', 'opacity-60');
                }
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // VISIT TRACKING
    // ═══════════════════════════════════════════════════════════════════════════════

    window.trackVisit = function (url, title, image) {
        try {
            // Most Visited
            const visits = JSON.parse(localStorage.getItem(VISITS_KEY) || '{}');
            if (!visits[url]) visits[url] = { title, image, count: 0 };
            visits[url].count++;
            visits[url].title = title;
            visits[url].image = image;
            localStorage.setItem(VISITS_KEY, JSON.stringify(visits));

            // Recently Visited
            let recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
            recent = recent.filter(r => r.url !== url);
            recent.unshift({ url, title, image, ts: Date.now() });
            if (recent.length > 10) recent = recent.slice(0, 10);
            localStorage.setItem(RECENT_KEY, JSON.stringify(recent));

            renderSidebarWidgets();
        } catch (e) { console.warn('trackVisit error:', e); }
    };

    function renderSidebarWidgets() {
        renderMostVisited();
        renderRecentlyVisited();
    }

    function renderMostVisited() {
        const list = els.mostVisitedList;
        if (!list) return;
        try {
            const visits = JSON.parse(localStorage.getItem(VISITS_KEY) || '{}');
            const sorted = Object.entries(visits).sort((a, b) => b[1].count - a[1].count).slice(0, 5);
            if (!sorted.length) {
                list.innerHTML = `<li class="flex items-center gap-2 text-xs text-gray-400 py-1"><i class="fas fa-chart-bar text-gray-300"></i> Visit some posts to see stats here.</li>`;
                return;
            }
            list.innerHTML = sorted.map(([url, d], i) => `
                <li class="flex items-start gap-3 group">
                    <span class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex-shrink-0 mt-0.5">${i + 1}</span>
                    <img src="${escHtml(d.image||'')}" alt="" class="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-200" loading="lazy" onerror="this.style.display='none'">
                    <div class="flex flex-col gap-1 min-w-0">
                        <a href="${escHtml(url)}" class="text-[13px] font-semibold text-slate-900 leading-snug line-clamp-2 transition-colors group-hover:text-blue-600" onclick="trackVisit('${escHtml(url)}','${escHtml(d.title)}','${escHtml(d.image||'')}')">${escHtml(d.title)}</a>
                        <span class="flex items-center gap-1.5 text-[11px] text-slate-400"><i class="fas fa-eye text-slate-300"></i> ${d.count} view${d.count !== 1 ? 's' : ''}</span>
                    </div>
                </li>
            `).join('');
        } catch (e) {
            list.innerHTML = `<li class="flex items-center gap-2 text-xs text-gray-400 py-1">Could not load stats.</li>`;
        }
    }

    function renderRecentlyVisited() {
        const list = els.recentlyVisitedList;
        if (!list) return;
        try {
            const recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]').slice(0, 5);
            if (!recent.length) {
                list.innerHTML = `<li class="flex items-center gap-2 text-xs text-gray-400 py-1"><i class="fas fa-history text-gray-300"></i> Your reading history will appear here.</li>`;
                return;
            }
            list.innerHTML = recent.map(r => `
                <li class="flex items-start gap-3 group">
                    <img src="${escHtml(r.image||'')}" alt="" class="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-200" loading="lazy" onerror="this.style.display='none'">
                    <div class="flex flex-col gap-1 min-w-0">
                        <a href="${escHtml(r.url)}" class="text-[13px] font-semibold text-slate-900 leading-snug line-clamp-2 transition-colors group-hover:text-blue-600" onclick="trackVisit('${escHtml(r.url)}','${escHtml(r.title)}','${escHtml(r.image||'')}')">${escHtml(r.title)}</a>
                        <span class="flex items-center gap-1.5 text-[11px] text-slate-400"><i class="fas fa-clock text-slate-300"></i> ${timeAgo(r.ts)}</span>
                    </div>
                </li>
            `).join('');
        } catch (e) {
            list.innerHTML = `<li class="flex items-center gap-2 text-xs text-gray-400 py-1">Could not load history.</li>`;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // UTILITIES
    // ═══════════════════════════════════════════════════════════════════════════════

    function getCategoryConfig(category) {
        const configs = {
            'DSA': {
                bgColor: 'bg-white/10',
                icon: 'fas fa-code',
                label: 'DSA',
                tagColor: 'bg-purple-50 text-purple-600',
                linkColor: 'text-purple-600',
                hoverColor: 'hover:text-purple-600'
            },
            'System Design & Architecture': {
                bgColor: 'bg-white/10',
                icon: 'fas fa-sitemap',
                label: 'System Design',
                tagColor: 'bg-cyan-50 text-cyan-600',
                linkColor: 'text-cyan-600',
                hoverColor: 'hover:text-cyan-600'
            },
            'Machine Learning & AI': {
                bgColor: 'bg-white/10',
                icon: 'fas fa-brain',
                label: 'ML & AI',
                tagColor: 'bg-pink-50 text-pink-600',
                linkColor: 'text-pink-600',
                hoverColor: 'hover:text-pink-600'
            },
            'OOPs & Design Patterns': {
                bgColor: 'bg-white/10',
                icon: 'fas fa-cubes',
                label: 'OOP',
                tagColor: 'bg-indigo-50 text-indigo-600',
                linkColor: 'text-indigo-600',
                hoverColor: 'hover:text-indigo-600'
            },
            'Web Fundamentals': {
                bgColor: 'bg-white/10',
                icon: 'fas fa-globe',
                label: 'Web',
                tagColor: 'bg-green-50 text-green-600',
                linkColor: 'text-green-600',
                hoverColor: 'hover:text-green-600'
            },
            'Technology': {
                bgColor: 'bg-white/10',
                icon: 'fas fa-laptop-code',
                label: 'Tech',
                tagColor: 'bg-orange-50 text-orange-600',
                linkColor: 'text-orange-600',
                hoverColor: 'hover:text-orange-600'
            },
            'DevOps': {
                bgColor: 'bg-white/10',
                icon: 'fas fa-server',
                label: 'DevOps',
                tagColor: 'bg-teal-50 text-teal-600',
                linkColor: 'text-teal-600',
                hoverColor: 'hover:text-teal-600'
            },
            'Management': {
                bgColor: 'bg-white/10',
                icon: 'fas fa-users',
                label: 'Management',
                tagColor: 'bg-amber-50 text-amber-600',
                linkColor: 'text-amber-600',
                hoverColor: 'hover:text-amber-600'
            },
            'Code | AI': {
                bgColor: 'bg-white/10',
                icon: 'fas fa-robot',
                label: 'Code | AI',
                tagColor: 'bg-blue-50 text-blue-600',
                linkColor: 'text-blue-600',
                hoverColor: 'hover:text-blue-600'
            },
            'AI': {
                bgColor: 'bg-white/10',
                icon: 'fas fa-brain',
                label: 'AI',
                tagColor: 'bg-pink-50 text-pink-600',
                linkColor: 'text-pink-600',
                hoverColor: 'hover:text-pink-600'
            }
        };
        
        return configs[category] || {
            bgColor: 'bg-white/10',
            icon: 'fas fa-folder',
            label: category || 'Blog',
            tagColor: 'bg-blue-50 text-blue-600',
            linkColor: 'text-blue-600',
            hoverColor: 'hover:text-blue-600'
        };
    }

    function highlightText(text, query) {
        if (!query || !text) return escHtml(text);
        const words = query.trim().split(/\s+/).filter(Boolean);
        let result = escHtml(text);
        words.forEach(w => {
            result = result.replace(new RegExp(`(${escRegex(w)})`, 'gi'), '<mark class="bg-yellow-200 font-semibold">$1</mark>');
        });
        return result;
    }

    function escHtml(t) {
        if (!t) return '';
        const d = document.createElement('div');
        d.textContent = String(t);
        return d.innerHTML;
    }

    function escRegex(t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function calcReadTime(content) {
        if (!content) return '1 min read';
        const min = Math.ceil(content.trim().split(/\s+/).length / 180);
        return `${min} min read`;
    }

    function timeAgo(ts) {
        const diff = Date.now() - ts, mins = Math.floor(diff / 60000);
        if (mins < 1)  return 'just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24)  return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    }

    function debounce(fn, wait) {
        let t;
        return function (...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); };
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // EVENT LISTENERS
    // ═══════════════════════════════════════════════════════════════════════════════

    if (els.searchInput) {
        els.searchInput.addEventListener('input', debounce(function (e) {
            const q = e.target.value.trim();
            if (els.clearBtn) els.clearBtn.style.display = q ? 'flex' : 'none';
            performSearch(q);
        }, 300));
        els.searchInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); performSearch(e.target.value.trim()); }
        });
    }

    if (els.clearBtn) {
        els.clearBtn.addEventListener('click', () => {
            els.searchInput.value = '';
            els.clearBtn.style.display = 'none';
            resetSearch();
            els.searchInput.focus();
        });
    }

    els.categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            if (els.searchInput && els.searchInput.value) {
                els.searchInput.value = '';
                if (els.clearBtn) els.clearBtn.style.display = 'none';
                resetSearch();
            }
            applyCategoryFilter(pill.dataset.cat);
        });
    });

    // Handle featured category buttons
    document.querySelectorAll('.cat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            if (els.searchInput && els.searchInput.value) {
                els.searchInput.value = '';
                if (els.clearBtn) els.clearBtn.style.display = 'none';
                resetSearch();
            }
            applyCategoryFilter(pill.dataset.cat);
        });
    });

    if (els.clearCatBtn) {
        els.clearCatBtn.addEventListener('click', () => applyCategoryFilter('all'));
    }

    // ─── Init ─────────────────────────────────────────────────────────────────────
    function init() {
        initSearch();
        renderSidebarWidgets();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
