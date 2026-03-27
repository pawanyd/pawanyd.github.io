/**
 * Dashboard - User Progress and Statistics
 */

class Dashboard {
  constructor() {
    this.authManager = window.authManager;
  }

  /**
   * Initialize dashboard
   */
  async init() {
    // Wait for auth to initialize
    await this.waitForAuth();

    // Listen for auth state changes
    this.authManager.onAuthStateChanged((user) => {
      if (user) {
        this.loadDashboard();
      } else {
        this.showNotAuthenticated();
      }
    });

    // Check current auth state
    if (this.authManager.isAuthenticated()) {
      this.loadDashboard();
    } else {
      this.showNotAuthenticated();
    }
  }

  /**
   * Wait for auth manager to initialize
   */
  async waitForAuth() {
    return new Promise((resolve) => {
      const checkAuth = () => {
        if (window.authManager && window.authManager.auth) {
          resolve();
        } else {
          setTimeout(checkAuth, 100);
        }
      };
      checkAuth();
    });
  }

  /**
   * Show not authenticated state
   */
  showNotAuthenticated() {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('not-authenticated').classList.remove('hidden');

    // Add sign in handler
    const signInBtn = document.getElementById('sign-in-dashboard-btn');
    if (signInBtn) {
      signInBtn.onclick = async () => {
        const result = await this.authManager.signInWithGoogle();
        if (result.success) {
          this.loadDashboard();
        }
      };
    }
  }

  /**
   * Load dashboard data
   */
  async loadDashboard() {
    document.getElementById('loading-state').classList.remove('hidden');
    document.getElementById('not-authenticated').classList.add('hidden');
    document.getElementById('dashboard-content').classList.add('hidden');

    try {
      // Load user progress
      const progress = await this.authManager.getUserProgress();
      
      // Load quiz history
      const history = await this.authManager.getUserQuizHistory(10);

      // Update UI
      this.updateStats(progress, history);
      this.renderQuizHistory(history);

      // Show dashboard
      document.getElementById('loading-state').classList.add('hidden');
      document.getElementById('dashboard-content').classList.remove('hidden');
    } catch (error) {
      console.error('Error loading dashboard:', error);
      document.getElementById('loading-state').innerHTML = `
        <div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-6 text-center">
          <i class="fas fa-exclamation-triangle text-red-600 dark:text-red-400 text-3xl mb-3"></i>
          <h3 class="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">Error Loading Dashboard</h3>
          <p class="text-red-600 dark:text-red-400 mb-4">${error.message}</p>
          <button onclick="location.reload()" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Try Again
          </button>
        </div>
      `;
    }
  }

  /**
   * Update statistics
   */
  updateStats(progress, history) {
    const totalQuizzes = progress?.totalQuizzes || history.length || 0;
    const totalQuestions = progress?.totalQuestions || 0;
    const totalScore = progress?.totalScore || 0;
    const average = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

    document.getElementById('stat-total-quizzes').textContent = totalQuizzes;
    document.getElementById('stat-total-questions').textContent = totalQuestions;
    document.getElementById('stat-total-score').textContent = totalScore;
    document.getElementById('stat-average').textContent = average + '%';
  }

  /**
   * Render quiz history
   */
  renderQuizHistory(history) {
    const container = document.getElementById('quiz-history');

    if (history.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <i class="fas fa-clipboard-list text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
          <p class="text-gray-600 dark:text-gray-400 text-lg mb-4">No quiz attempts yet</p>
          <a href="/quiz/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
            Take Your First Quiz
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = history.map(attempt => {
      const date = attempt.timestamp?.toDate ? attempt.timestamp.toDate() : new Date();
      const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const minutes = Math.floor(attempt.timeTaken / 60);
      const seconds = attempt.timeTaken % 60;

      const percentageColor = attempt.percentage >= 80 ? 'text-green-600 dark:text-green-400' : 
                             attempt.percentage >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 
                             'text-red-600 dark:text-red-400';

      return `
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                  ${attempt.category.replace('-', ' ')}
                </h3>
                <span class="text-2xl font-bold ${percentageColor}">
                  ${attempt.percentage}%
                </span>
              </div>
              <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>
                  <i class="fas fa-check-circle text-green-600 dark:text-green-400 mr-1"></i>
                  ${attempt.score}/${attempt.totalQuestions} correct
                </span>
                <span>
                  <i class="fas fa-clock text-blue-600 dark:text-blue-400 mr-1"></i>
                  ${minutes}:${seconds.toString().padStart(2, '0')}
                </span>
                <span>
                  <i class="fas fa-calendar text-purple-600 dark:text-purple-400 mr-1"></i>
                  ${formattedDate}
                </span>
              </div>
            </div>
            <div class="text-right">
              ${attempt.percentage >= 80 ? '🎉' : attempt.percentage >= 60 ? '👍' : '📚'}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', async () => {
  const dashboard = new Dashboard();
  await dashboard.init();
});
