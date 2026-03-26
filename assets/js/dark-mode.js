/**
 * Dark Mode Toggle Script
 * Manages dark/light theme switching with localStorage persistence
 * and system preference detection.
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'theme-preference';

    /**
     * Get the saved theme or detect from system preference
     */
    function getThemePreference() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    /**
     * Apply the theme to the document
     */
    function applyTheme(theme) {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        updateToggleIcon(theme);
    }

    /**
     * Update the toggle button icon
     */
    function updateToggleIcon(theme) {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        const icon = toggle.querySelector('i');
        if (!icon) return;

        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            toggle.setAttribute('aria-label', 'Switch to light mode');
            toggle.setAttribute('title', 'Switch to light mode');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            toggle.setAttribute('aria-label', 'Switch to dark mode');
            toggle.setAttribute('title', 'Switch to dark mode');
        }
    }

    /**
     * Toggle between themes
     */
    function toggleTheme() {
        const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }

    // Apply theme immediately (backup — critical-css.html has inline script for FOUC prevention)
    applyTheme(getThemePreference());

    // Set up toggle button when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', toggleTheme);
        }
        // Ensure icon is correct after DOM load
        updateToggleIcon(getThemePreference());
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
})();
