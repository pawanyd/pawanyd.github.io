/**
 * Algorithm Code Modal - Reusable component for displaying algorithm code snippets
 * Loads algorithm data from _data/algorithm_snippets.yml
 */

(function() {
  'use strict';
  
  // State management
  let currentAlgorithm = null;
  let currentLanguage = 'python';
  
  // Get modal elements
  const modal = document.getElementById('algorithm-code-modal');
  const modalTitle = document.getElementById('algo-modal-title');
  const modalDescription = document.getElementById('algo-modal-description');
  const timeComplexity = document.getElementById('algo-time-complexity');
  const spaceComplexity = document.getElementById('algo-space-complexity');
  const codeDisplay = document.getElementById('algo-code-display');
  const copyBtn = document.querySelector('.algo-copy-btn');
  const closeBtn = document.querySelector('.algo-modal-close');
  const tabs = document.querySelectorAll('.algo-tab');
  
  // Load user's preferred language from localStorage
  function loadPreferredLanguage() {
    const saved = localStorage.getItem('preferred-algo-language');
    if (saved) {
      currentLanguage = saved;
    }
  }
  
  // Save user's preferred language
  function savePreferredLanguage(lang) {
    localStorage.setItem('preferred-algo-language', lang);
  }
  
  // Open modal with specific algorithm
  function openModal(algorithmKey) {
    // Check if algorithm data is loaded
    if (!window.algorithmSnippets) {
      console.error('Algorithm snippets data not loaded. Make sure algorithm_snippets.yml is configured.');
      alert('Algorithm data not available. Please refresh the page.');
      return;
    }
    
    const algorithm = window.algorithmSnippets[algorithmKey];
    
    if (!algorithm) {
      console.error(`Algorithm "${algorithmKey}" not found in config`);
      alert(`Algorithm "${algorithmKey}" not found.`);
      return;
    }
    
    currentAlgorithm = algorithm;
    
    // Update modal content
    modalTitle.textContent = algorithm.name;
    modalDescription.textContent = algorithm.description;
    timeComplexity.textContent = algorithm.time_complexity || 'Not specified';
    spaceComplexity.textContent = algorithm.space_complexity || 'Not specified';
    
    // Set active tab to user's preferred language
    updateActiveTab(currentLanguage);
    
    // Display code
    displayCode(currentLanguage);
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }
  
  // Close modal
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scroll
  }
  
  // Update active tab styling
  function updateActiveTab(lang) {
    tabs.forEach(tab => {
      if (tab.dataset.lang === lang) {
        tab.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        tab.classList.add('bg-blue-600', 'text-white');
      } else {
        tab.classList.remove('bg-blue-600', 'text-white');
        tab.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
      }
    });
  }
  
  // Display code for selected language
  function displayCode(lang) {
    if (!currentAlgorithm) {
      codeDisplay.textContent = '// Algorithm data not loaded';
      return;
    }
    
    if (!currentAlgorithm.languages) {
      codeDisplay.textContent = '// No code snippets available for this algorithm';
      return;
    }
    
    if (!currentAlgorithm.languages[lang]) {
      codeDisplay.textContent = '// Code not available for this language';
      return;
    }
    
    const code = currentAlgorithm.languages[lang];
    codeDisplay.textContent = code;
    
    // Update code block language class for syntax highlighting
    codeDisplay.className = `language-${lang} text-sm`;
    
    // Re-run syntax highlighter if available (Prism.js or Highlight.js)
    if (window.Prism) {
      Prism.highlightElement(codeDisplay);
    } else if (window.hljs) {
      hljs.highlightElement(codeDisplay);
    }
  }
  
  // Copy code to clipboard
  function copyCode() {
    const code = codeDisplay.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
      // Show success feedback
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyBtn.classList.add('bg-green-600');
      copyBtn.classList.remove('bg-blue-600');
      
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.classList.remove('bg-green-600');
        copyBtn.classList.add('bg-blue-600');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code:', err);
      alert('Failed to copy code. Please try again.');
    });
  }
  
  // Event Listeners
  
  // Tab clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const lang = tab.dataset.lang;
      currentLanguage = lang;
      savePreferredLanguage(lang);
      updateActiveTab(lang);
      displayCode(lang);
    });
  });
  
  // Copy button
  if (copyBtn) {
    copyBtn.addEventListener('click', copyCode);
  }
  
  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('bg-gray-900')) {
      closeModal();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
  
  // Initialize algorithm triggers
  function initializeTriggers() {
    // Find all elements with data-algorithm attribute
    const triggers = document.querySelectorAll('[data-algorithm]');
    
    triggers.forEach(trigger => {
      trigger.style.cursor = 'pointer';
      trigger.classList.add('algorithm-trigger');
      
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const algorithmKey = trigger.dataset.algorithm;
        openModal(algorithmKey);
      });
    });
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadPreferredLanguage();
      initializeTriggers();
    });
  } else {
    loadPreferredLanguage();
    initializeTriggers();
  }
  
  // Expose openModal globally for manual triggering
  window.openAlgorithmModal = openModal;
  
})();
