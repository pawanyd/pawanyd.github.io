/**
 * Quiz UI - User Interface Management
 * Handles all UI rendering and user interactions
 */

class QuizUI {
  constructor() {
    this.quizSystem = new QuizSystem();
    this.currentQuestion = null;
    this.selectedAnswer = null;
  }

  /**
   * Initialize UI
   */
  async init() {
    const initialized = await this.quizSystem.init();
    
    if (initialized) {
      await this.loadCategories();
    } else {
      this.showError('Failed to connect to quiz database. Please check your internet connection.');
    }
  }

  /**
   * Load and display categories
   */
  async loadCategories() {
    try {
      const categories = await this.quizSystem.loadCategories();
      
      if (categories.length === 0) {
        this.showError('No quiz categories available yet. Please check back later!');
        return;
      }
      
      this.renderCategories(categories);
      
      // Hide loading, show categories
      document.getElementById('loading-state').classList.add('hidden');
      document.getElementById('quiz-categories').classList.remove('hidden');
      
    } catch (error) {
      this.showError('Failed to load quiz categories: ' + error.message);
    }
  }

  /**
   * Render category cards
   */
  renderCategories(categories) {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = '';
    
    categories.forEach(category => {
      const card = this.createCategoryCard(category);
      grid.appendChild(card);
    });
  }

  /**
   * Create category card element
   */
  createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2';
    card.onclick = () => this.showQuizOptions(category);
    
    card.innerHTML = `
      <div class="text-center">
        <div class="text-5xl mb-4">
          <i class="fas ${category.icon || 'fa-question-circle'} text-blue-600"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">${category.name}</h3>
        <p class="text-gray-600 mb-4">${category.description || ''}</p>
        <div class="flex justify-center items-center gap-4 text-sm text-gray-500">
          <span><i class="fas fa-question-circle mr-1"></i>${category.questionCount || 0} Questions</span>
        </div>
        <button class="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
          Start Quiz <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    `;
    
    return card;
  }

  /**
   * Show quiz options modal
   */
  showQuizOptions(category) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
    
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">
          <i class="fas ${category.icon} text-blue-600 mr-2"></i>
          ${category.name}
        </h2>
        
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Questions</label>
            <select id="question-count" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="5">5 Questions (Quick)</option>
              <option value="10" selected>10 Questions (Standard)</option>
              <option value="15">15 Questions (Extended)</option>
              <option value="20">20 Questions (Full)</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level</label>
            <select id="difficulty" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Levels (Mixed)</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        
        <div class="flex gap-3">
          <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            Cancel
          </button>
          <button id="start-quiz-btn" class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
            Start Quiz
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle start quiz
    document.getElementById('start-quiz-btn').onclick = async () => {
      const questionCount = parseInt(document.getElementById('question-count').value);
      const difficulty = document.getElementById('difficulty').value || null;
      
      modal.remove();
      await this.startQuiz(category.slug, { questionCount, difficulty });
    };
  }

  /**
   * Start quiz
   */
  async startQuiz(categorySlug, options) {
    // Show loading
    document.getElementById('quiz-categories').classList.add('hidden');
    document.getElementById('loading-state').classList.remove('hidden');
    document.getElementById('loading-state').querySelector('p').textContent = 'Loading questions...';
    
    const result = await this.quizSystem.startQuiz(categorySlug, options);
    
    if (result.success) {
      document.getElementById('loading-state').classList.add('hidden');
      document.getElementById('quiz-interface').classList.remove('hidden');
      this.showQuestion();
    } else {
      this.showError(result.error);
    }
  }

  /**
   * Show current question
   */
  showQuestion() {
    this.currentQuestion = this.quizSystem.getCurrentQuestion();
    this.selectedAnswer = null;
    
    if (!this.currentQuestion) {
      this.showResults();
      return;
    }
    
    const quizInterface = document.getElementById('quiz-interface');
    quizInterface.innerHTML = `
      <div class="max-w-3xl mx-auto">
        <!-- Progress Bar -->
        <div class="mb-6">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question ${this.currentQuestion.questionNumber} of ${this.currentQuestion.totalQuestions}</span>
            <span>Score: ${this.quizSystem.score}/${this.currentQuestion.questionNumber - 1}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300" 
                 style="width: ${(this.currentQuestion.questionNumber / this.currentQuestion.totalQuestions) * 100}%"></div>
          </div>
        </div>
        
        <!-- Question Card -->
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div class="flex items-start gap-3 mb-6">
            <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
              ${this.currentQuestion.difficulty || 'medium'}
            </span>
            ${this.currentQuestion.tags ? this.currentQuestion.tags.map(tag => 
              `<span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">${tag}</span>`
            ).join('') : ''}
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mb-8">${this.currentQuestion.question}</h2>
          
          <div class="space-y-3" id="options-container">
            ${this.currentQuestion.options.map((option, index) => `
              <button onclick="quizUIInstance.selectAnswer(${index})" 
                      class="option-btn w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium text-gray-700">
                <span class="inline-block w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-center leading-8 mr-3 font-semibold">
                  ${String.fromCharCode(65 + index)}
                </span>
                ${option}
              </button>
            `).join('')}
          </div>
        </div>
        
        <!-- Submit Button -->
        <div class="text-center">
          <button id="submit-answer-btn" disabled 
                  class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all">
            Submit Answer
          </button>
        </div>
      </div>
    `;
    
    // Handle submit
    document.getElementById('submit-answer-btn').onclick = () => this.submitAnswer();
  }

  /**
   * Select answer
   */
  selectAnswer(index) {
    this.selectedAnswer = index;
    
    // Update UI
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('border-blue-600', 'bg-blue-50');
        btn.classList.remove('border-gray-200');
      } else {
        btn.classList.remove('border-blue-600', 'bg-blue-50');
        btn.classList.add('border-gray-200');
      }
    });
    
    // Enable submit button
    document.getElementById('submit-answer-btn').disabled = false;
  }

  /**
   * Submit answer
   */
  submitAnswer() {
    if (this.selectedAnswer === null) return;
    
    const result = this.quizSystem.submitAnswer(this.selectedAnswer);
    this.showAnswerFeedback(result);
  }

  /**
   * Show answer feedback
   */
  showAnswerFeedback(result) {
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach((btn, index) => {
      btn.disabled = true;
      btn.classList.remove('hover:border-blue-500', 'hover:bg-blue-50');
      
      if (index === result.correctAnswer) {
        btn.classList.add('border-green-500', 'bg-green-50');
        btn.innerHTML += ' <i class="fas fa-check-circle text-green-600 float-right mt-1"></i>';
      } else if (index === this.selectedAnswer && !result.isCorrect) {
        btn.classList.add('border-red-500', 'bg-red-50');
        btn.innerHTML += ' <i class="fas fa-times-circle text-red-600 float-right mt-1"></i>';
      }
    });
    
    // Show explanation
    const explanationDiv = document.createElement('div');
    explanationDiv.className = `mt-6 p-4 rounded-lg ${result.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`;
    explanationDiv.innerHTML = `
      <div class="flex items-start gap-3">
        <i class="fas ${result.isCorrect ? 'fa-check-circle text-green-600' : 'fa-info-circle text-red-600'} text-2xl"></i>
        <div>
          <h4 class="font-semibold ${result.isCorrect ? 'text-green-800' : 'text-red-800'} mb-2">
            ${result.isCorrect ? 'Correct!' : 'Incorrect'}
          </h4>
          <p class="text-gray-700">${result.explanation}</p>
        </div>
      </div>
    `;
    
    document.querySelector('.bg-white.rounded-2xl').appendChild(explanationDiv);
    
    // Change submit button to next
    const submitBtn = document.getElementById('submit-answer-btn');
    submitBtn.textContent = this.quizSystem.currentQuestionIndex < this.quizSystem.questions.length - 1 ? 'Next Question' : 'View Results';
    submitBtn.disabled = false;
    submitBtn.onclick = () => {
      if (this.quizSystem.nextQuestion()) {
        this.showQuestion();
      } else {
        this.showResults();
      }
    };
  }

  /**
   * Show quiz results
   */
  showResults() {
    const results = this.quizSystem.getResults();
    const minutes = Math.floor(results.timeTaken / 60);
    const seconds = results.timeTaken % 60;
    
    const quizInterface = document.getElementById('quiz-interface');
    quizInterface.innerHTML = `
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div class="text-6xl mb-4">
            ${results.percentage >= 80 ? '🎉' : results.percentage >= 60 ? '👍' : '📚'}
          </div>
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
          
          <div class="text-6xl font-bold mb-6">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              ${results.percentage}%
            </span>
          </div>
          
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-3xl font-bold text-gray-900">${results.score}</div>
              <div class="text-sm text-gray-600">Correct</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-3xl font-bold text-gray-900">${results.totalQuestions - results.score}</div>
              <div class="text-sm text-gray-600">Incorrect</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-3xl font-bold text-gray-900">${minutes}:${seconds.toString().padStart(2, '0')}</div>
              <div class="text-sm text-gray-600">Time</div>
            </div>
          </div>
          
          <div class="flex gap-3 justify-center">
            <button onclick="location.reload()" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
              <i class="fas fa-redo mr-2"></i>Take Another Quiz
            </button>
            <button onclick="quizUIInstance.showDetailedResults()" class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              <i class="fas fa-list mr-2"></i>View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Show detailed results
   */
  showDetailedResults() {
    const results = this.quizSystem.getResults();
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto';
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
    
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 my-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-gray-900">Detailed Results</h2>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>
        
        <div class="space-y-4 max-h-[60vh] overflow-y-auto">
          ${results.answers.map((answer, index) => `
            <div class="border ${answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} rounded-lg p-4">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full ${answer.isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white flex items-center justify-center font-bold">
                  ${index + 1}
                </span>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 mb-2">${answer.question}</h4>
                  <p class="text-sm text-gray-700 mb-1">
                    <span class="font-semibold">Your answer:</span> ${this.currentQuestion?.options[answer.selectedOption] || 'N/A'}
                  </p>
                  ${!answer.isCorrect ? `
                    <p class="text-sm text-gray-700 mb-2">
                      <span class="font-semibold">Correct answer:</span> ${this.currentQuestion?.options[answer.correctAnswer] || 'N/A'}
                    </p>
                  ` : ''}
                  <p class="text-sm text-gray-600 italic">${answer.explanation}</p>
                </div>
                <i class="fas ${answer.isCorrect ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'} text-2xl"></i>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  /**
   * Show error message
   */
  showError(message) {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-state').classList.remove('hidden');
    document.getElementById('error-message').textContent = message;
  }
}

// Create global instance
window.quizUIInstance = null;
window.QuizUI = QuizUI;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  window.quizUIInstance = new QuizUI();
});
