// Blog Search with Lunr.js
(function() {
    'use strict';

    const searchConfig = {
        searchInput: document.getElementById('blog-search-input'),
        searchResults: document.getElementById('search-results'),
        searchResultsSection: document.getElementById('search-results-section'),
        searchCount: document.getElementById('search-count'),
        clearButton: document.getElementById('clear-search'),
        blogPosts: document.getElementById('blog-posts'),
        blogPostsSection: document.getElementById('blog-posts-section'),
        paginationSection: document.getElementById('pagination-section')
    };

    let searchIndex = null;
    let searchData = [];

    // Initialize search
    async function initSearch() {
        try {
            // Fetch search data
            const response = await fetch('/search.json');
            searchData = await response.json();

            // Build Lunr index
            searchIndex = lunr(function() {
                this.ref('id');
                this.field('title', { boost: 10 });
                this.field('category', { boost: 5 });
                this.field('tags', { boost: 5 });
                this.field('excerpt', { boost: 3 });
                this.field('content');

                searchData.forEach(function(doc) {
                    this.add(doc);
                }, this);
            });

            console.log('Search index built successfully with', searchData.length, 'posts');
        } catch (error) {
            console.error('Error initializing search:', error);
        }
    }

    // Perform search
    function performSearch(query) {
        if (!searchIndex || !query || query.trim().length < 2) {
            resetSearch();
            return;
        }

        try {
            // Search with Lunr - try multiple search strategies
            let results = searchIndex.search(query + '*'); // Wildcard for partial matches
            
            // If no results, try fuzzy search
            if (results.length === 0) {
                results = searchIndex.search(query + '~1'); // Fuzzy search with edit distance 1
            }
            
            // If still no results, try without wildcards
            if (results.length === 0) {
                results = searchIndex.search(query);
            }
            
            if (results.length === 0) {
                showNoResults(query);
                return;
            }

            // Get full post data for results
            const posts = results.map(result => {
                return searchData.find(post => post.id === result.ref);
            }).filter(post => post !== undefined);

            displayResults(posts, query);
        } catch (error) {
            console.error('Search error:', error);
            // Try simple search without special characters
            try {
                const results = searchIndex.search(query);
                if (results.length > 0) {
                    const posts = results.map(result => {
                        return searchData.find(post => post.id === result.ref);
                    }).filter(post => post !== undefined);
                    displayResults(posts, query);
                } else {
                    showNoResults(query);
                }
            } catch (e) {
                console.error('Fallback search also failed:', e);
                showNoResults(query);
            }
        }
    }

    // Display search results
    function displayResults(posts, query) {
        if (!searchConfig.searchResults || !searchConfig.blogPostsSection) return;

        // Hide original blog posts and pagination
        searchConfig.blogPostsSection.style.display = 'none';
        if (searchConfig.paginationSection) {
            searchConfig.paginationSection.style.display = 'none';
        }
        
        // Show search results container
        searchConfig.searchResultsSection.classList.remove('hidden');
        
        // Update count
        if (searchConfig.searchCount) {
            searchConfig.searchCount.textContent = `Found ${posts.length} result${posts.length !== 1 ? 's' : ''} for "${query}"`;
        }

        // Build results HTML
        const resultsHTML = posts.map(post => `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-300">
                <div class="relative">
                    <img src="${post.image}" alt="${escapeHtml(post.title)}" class="w-full h-56 object-cover" loading="lazy">
                    <span class="absolute top-2 left-2 bg-blue-600 text-white text-xs uppercase font-semibold px-3 py-1 rounded-lg shadow-md">${escapeHtml(post.category)}</span>
                </div>
                <div class="p-6">
                    <h2 class="text-2xl font-bold text-gray-900 hover:text-blue-600 transition duration-200">
                        <a href="${post.url}">${highlightText(post.title, query)}</a>
                    </h2>
                    <p class="text-gray-500 mt-2 text-sm">Published on ${post.date}</p>
                    ${post.tags && post.tags.length > 0 ? `
                        <div class="flex flex-wrap gap-2 mt-3">
                            ${post.tags.map(tag => `<span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">${escapeHtml(tag)}</span>`).join('')}
                        </div>
                    ` : ''}
                    <p class="text-gray-600 mt-3">${post.excerpt}</p>
                    <a href="${post.url}" class="inline-block mt-4 text-blue-600 font-semibold hover:underline">Read More</a>
                </div>
            </div>
        `).join('');

        searchConfig.searchResults.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                ${resultsHTML}
            </div>
        `;
    }

    // Show no results message
    function showNoResults(query) {
        if (!searchConfig.searchResults || !searchConfig.blogPostsSection) return;

        searchConfig.blogPostsSection.style.display = 'none';
        if (searchConfig.paginationSection) {
            searchConfig.paginationSection.style.display = 'none';
        }
        searchConfig.searchResultsSection.classList.remove('hidden');
        
        if (searchConfig.searchCount) {
            searchConfig.searchCount.textContent = `No results found for "${query}"`;
        }

        searchConfig.searchResults.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <p class="text-xl text-gray-600 mb-2">No posts found matching "${escapeHtml(query)}"</p>
                <p class="text-gray-500">Try different keywords or browse all posts below.</p>
                <button onclick="document.getElementById('clear-search').click()" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Clear Search
                </button>
            </div>
        `;
    }

    // Reset search
    function resetSearch() {
        if (!searchConfig.searchResults || !searchConfig.blogPostsSection) return;

        searchConfig.searchResultsSection.classList.add('hidden');
        searchConfig.searchResults.innerHTML = '';
        searchConfig.blogPostsSection.style.display = 'block';
        if (searchConfig.paginationSection) {
            searchConfig.paginationSection.style.display = 'block';
        }
        
        if (searchConfig.searchCount) {
            searchConfig.searchCount.textContent = '';
        }
    }

    // Highlight matching text
    function highlightText(text, query) {
        if (!query || !text) return escapeHtml(text);
        
        const words = query.split(' ').filter(w => w.length > 0);
        let result = escapeHtml(text);
        
        words.forEach(word => {
            const regex = new RegExp(`(${escapeRegex(word)})`, 'gi');
            result = result.replace(regex, '<mark class="bg-yellow-200 font-semibold">$1</mark>');
        });
        
        return result;
    }

    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Escape regex special characters
    function escapeRegex(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Event listeners
    if (searchConfig.searchInput) {
        // Search on input with debounce
        searchConfig.searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value.trim();
            performSearch(query);
            
            // Show/hide clear button
            if (searchConfig.clearButton) {
                searchConfig.clearButton.style.display = query ? 'block' : 'none';
            }
        }, 300));

        // Clear search
        if (searchConfig.clearButton) {
            searchConfig.clearButton.addEventListener('click', function() {
                searchConfig.searchInput.value = '';
                searchConfig.clearButton.style.display = 'none';
                resetSearch();
                searchConfig.searchInput.focus();
            });
        }

        // Handle Enter key
        searchConfig.searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(e.target.value.trim());
            }
        });
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
})();
