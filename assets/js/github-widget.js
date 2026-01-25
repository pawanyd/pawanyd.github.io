/**
 * GitHub Integration Widget
 * Fetches GitHub profile stats and displays them on the portfolio
 * Uses GitHub API (public endpoints - no authentication required)
 */

const GitHubWidget = {
  username: 'pawanyd',
  apiBaseUrl: 'https://api.github.com',

  /**
   * Initialize the widget
   */
  init() {
    this.fetchUserStats();
    this.fetchRepositories();
  },

  /**
   * Fetch GitHub user profile stats
   */
  fetchUserStats() {
    const url = `${this.apiBaseUrl}/users/${this.username}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.displayUserStats(data);
      })
      .catch(error => {
        console.error('Error fetching GitHub user stats:', error);
        this.showError('github-stats', 'Failed to load GitHub stats');
      });
  },

  /**
   * Display user stats in the widget
   */
  displayUserStats(userData) {
    const statsContainer = document.getElementById('github-stats');
    
    if (!statsContainer) return;

    const stats = `
      <div class="github-stat">
        <div class="stat-value">${userData.public_repos}</div>
        <div class="stat-label">Public Repositories</div>
      </div>
      <div class="github-stat">
        <div class="stat-value">${userData.followers}</div>
        <div class="stat-label">Followers</div>
      </div>
      <div class="github-stat">
        <div class="stat-value">${userData.following}</div>
        <div class="stat-label">Following</div>
      </div>
      <div class="github-stat">
        <div class="stat-value">${userData.public_gists}</div>
        <div class="stat-label">Public Gists</div>
      </div>
    `;

    statsContainer.innerHTML = stats;
  },

  /**
   * Fetch top repositories
   */
  fetchRepositories() {
    const url = `${this.apiBaseUrl}/users/${this.username}/repos?sort=stars&order=desc&per_page=6`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.displayRepositories(data);
      })
      .catch(error => {
        console.error('Error fetching GitHub repositories:', error);
        this.showError('github-repos', 'Failed to load repositories');
      });
  },

  /**
   * Display repositories in the widget
   */
  displayRepositories(repos) {
    const reposContainer = document.getElementById('github-repos');
    
    if (!reposContainer || repos.length === 0) return;

    let reposHTML = '';
    
    repos.forEach(repo => {
      const language = repo.language || 'Unknown';
      const stars = repo.stargazers_count;
      const forks = repo.forks_count;
      
      reposHTML += `
        <div class="github-repo-card">
          <div class="repo-header">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name">
              <i class="fas fa-code-branch"></i> ${repo.name}
            </a>
          </div>
          <p class="repo-description">${repo.description || 'No description'}</p>
          <div class="repo-footer">
            <span class="repo-language">
              <span class="lang-dot" style="background-color: ${this.getLanguageColor(language)}"></span>
              ${language}
            </span>
            <span class="repo-stars">
              <i class="fas fa-star"></i> ${stars}
            </span>
            <span class="repo-forks">
              <i class="fas fa-code-branch"></i> ${forks}
            </span>
          </div>
        </div>
      `;
    });

    reposContainer.innerHTML = reposHTML;
  },

  /**
   * Show error message when data fails to load
   */
  showError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<div style="padding: 2rem; text-align: center; color: #d1495a;"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
    }
  },

  /**
   * Get color for programming language
   */
  getLanguageColor(language) {
    const colors = {
      'JavaScript': '#f1e05a',
      'Python': '#3572a5',
      'PHP': '#777bb4',
      'Java': '#b07219',
      'TypeScript': '#3178c6',
      'Go': '#00add8',
      'Rust': '#ce422b',
      'Ruby': '#cc342d',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Shell': '#89e051',
      'C++': '#f34b7d',
      'C#': '#239120',
      'Vue': '#2c3e50',
      'React': '#61dafb'
    };
    
    return colors[language] || '#858585';
  }
};

/**
 * Initialize on DOM ready
 */
document.addEventListener('DOMContentLoaded', function() {
  const statsEl = document.getElementById('github-stats');
  const reposEl = document.getElementById('github-repos');
  
  if (statsEl || reposEl) {
    GitHubWidget.init();
  }
});
