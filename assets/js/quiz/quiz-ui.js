/**
 * Quiz UI - User Interface Management
 * Handles all UI rendering and user interactions
 */

class QuizUI {
  constructor() {
    this.quizSystem = new QuizSystem();
    this.currentQuestion = null;
    this.selectedAnswer = null;
    this.timerInterval = null;
    this.totalTimeLimit = 0; // Total time in seconds
    this.timeRemaining = 0;
    this.quizStartTime = null;
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
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          <i class="fas ${category.icon} text-blue-600 mr-2"></i>
          ${category.name}
        </h2>
        
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Number of Questions</label>
            <select id="question-count" class="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="5">5 Questions (Quick)</option>
              <option value="10" selected>10 Questions (Standard)</option>
              <option value="15">15 Questions (Extended)</option>
              <option value="20">20 Questions (Full)</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Difficulty Level</label>
            <select id="difficulty" class="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Levels (Mixed)</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-clock mr-1"></i>Total Time Limit
            </label>
            <select id="time-limit" class="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="10">10 Minutes</option>
              <option value="20" selected>20 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="40">40 Minutes</option>
              <option value="50">50 Minutes</option>
              <option value="60">60 Minutes</option>
            </select>
          </div>
        </div>
        
        <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-6">
          <p class="text-sm text-blue-800 dark:text-blue-300">
            <i class="fas fa-info-circle mr-1"></i>
            You can skip questions, go back, and submit anytime before time runs out.
          </p>
        </div>
        
        <div class="flex gap-3">
          <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
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
      const timeLimit = parseInt(document.getElementById('time-limit').value);
      
      modal.remove();
      await this.startQuiz(category.slug, { questionCount, difficulty, timeLimit });
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
    
    // Store time limit
    this.totalTimeLimit = (options.timeLimit || 20) * 60; // Convert minutes to seconds
    this.timeRemaining = this.totalTimeLimit;
    this.quizStartTime = Date.now();
    
    const result = await this.quizSystem.startQuiz(categorySlug, options);
    
    if (result.success) {
      document.getElementById('loading-state').classList.add('hidden');
      document.getElementById('quiz-interface').classList.remove('hidden');
      
      // Start the total quiz timer
      this.startTotalTimer();
      
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
        <!-- Progress Bar and Timer -->
        <div class="mb-6">
          <div class="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <div class="flex items-center gap-4">
              <span>Question ${this.currentQuestion.questionNumber} of ${this.currentQuestion.totalQuestions}</span>
              <span>Answered: ${this.quizSystem.answers.length}/${this.currentQuestion.totalQuestions}</span>
            </div>
            <div class="flex items-center gap-4">
              <span id="timer" class="font-bold text-blue-600 dark:text-blue-400 text-lg">
                <i class="fas fa-clock mr-1"></i><span id="timer-value">00:00</span>
              </span>
              <button onclick="quizUIInstance.quitQuiz()" class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold">
                <i class="fas fa-times-circle mr-1"></i>Quit
              </button>
            </div>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300" 
                 style="width: ${(this.quizSystem.answers.length / this.currentQuestion.totalQuestions) * 100}%"></div>
          </div>
        </div>
        
        <!-- Question Card -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
          <div class="flex items-start justify-between gap-3 mb-6">
            <div class="flex items-start gap-3">
              <span class="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                ${this.currentQuestion.difficulty || 'medium'}
              </span>
              ${this.currentQuestion.tags ? this.currentQuestion.tags.map(tag => 
                `<span class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">${tag}</span>`
              ).join('') : ''}
            </div>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">${this.currentQuestion.question}</h2>
          
          <div class="space-y-3" id="options-container">
            ${this.currentQuestion.options.map((option, index) => `
              <button data-option-index="${index}"
                      class="option-btn w-full text-left p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 font-medium text-gray-700 dark:text-gray-200">
                <span class="inline-block w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-center leading-8 mr-3 font-semibold">
                  ${String.fromCharCode(65 + index)}
                </span>
                ${option}
              </button>
            `).join('')}
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-3 justify-between items-center">
          <div class="flex gap-3">
            ${this.currentQuestion.questionNumber > 1 ? `
              <button id="back-btn" 
                      class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                <i class="fas fa-arrow-left mr-2"></i>Back
              </button>
            ` : ''}
          </div>
          
          <div class="flex gap-3">
            <button id="skip-btn" 
                    class="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-all border-2 border-yellow-300 dark:border-yellow-700">
              <i class="fas fa-forward mr-2"></i>Skip
            </button>
            <button id="submit-answer-btn" disabled 
                    class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
              ${this.currentQuestion.questionNumber === this.currentQuestion.totalQuestions ? '<i class="fas fa-flag-checkered mr-2"></i>Finish Quiz' : 'Submit & Next'}
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners for option buttons
    setTimeout(() => {
      const optionButtons = document.querySelectorAll('.option-btn');
      optionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(btn.getAttribute('data-option-index'));
          this.selectAnswer(index);
        });
      });
    }, 0);
    
    // Handle submit
    const submitBtn = document.getElementById('submit-answer-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        // Only proceed if button is not disabled
        if (!submitBtn.disabled) {
          this.submitAnswer();
        }
      });
    }
    
    // Handle back button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.goToPreviousQuestion());
    }
    
    // Handle skip button
    const skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => this.skipQuestion());
    }
  }

  /**
   * Start total quiz timer
   */
  startTotalTimer() {
    // Clear any existing timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    this.updateTimerDisplay();
    
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.updateTimerDisplay();
      
      // Time's up - auto submit quiz
      if (this.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeUp();
      }
      
      // Warning at 5 minutes (300 seconds)
      if (this.timeRemaining === 300) {
        const timerElement = document.getElementById('timer');
        if (timerElement) {
          timerElement.classList.add('text-orange-600', 'dark:text-orange-400');
          timerElement.classList.remove('text-blue-600', 'dark:text-blue-400');
        }
      }
      
      // Critical warning at 1 minute (60 seconds)
      if (this.timeRemaining === 60) {
        const timerElement = document.getElementById('timer');
        if (timerElement) {
          timerElement.classList.add('text-red-600', 'dark:text-red-400', 'animate-pulse');
          timerElement.classList.remove('text-orange-600', 'dark:text-orange-400');
        }
      }
    }, 1000);
  }

  /**
   * Update timer display
   */
  updateTimerDisplay() {
    const timerValue = document.getElementById('timer-value');
    if (timerValue) {
      const minutes = Math.floor(this.timeRemaining / 60);
      const seconds = this.timeRemaining % 60;
      timerValue.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  /**
   * Handle time up - auto submit quiz
   */
  handleTimeUp() {
    alert('⏰ Time\'s up! Your quiz will be submitted automatically.');
    this.finishQuiz();
  }

  /**
   * Stop timer
   */
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  /**
   * Select answer
   */
  selectAnswer(index) {
    this.selectedAnswer = index;
    
    console.log('Answer selected:', index); // Debug log
    
    // Update UI
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('border-blue-600', 'dark:border-blue-400', 'bg-blue-50', 'dark:bg-blue-900/50', '!text-gray-900', 'dark:!text-gray-100');
        btn.classList.remove('border-gray-200', 'dark:border-gray-600');
      } else {
        btn.classList.remove('border-blue-600', 'dark:border-blue-400', 'bg-blue-50', 'dark:bg-blue-900/50', '!text-gray-900', 'dark:!text-gray-100');
        btn.classList.add('border-gray-200', 'dark:border-gray-600');
      }
    });
    
    // Enable submit button
    const submitBtn = document.getElementById('submit-answer-btn');
    if (submitBtn) {
      submitBtn.disabled = false;
      console.log('Submit button enabled'); // Debug log
    }
  }

  /**
   * Submit answer
   */
  submitAnswer() {
    console.log('Submit called, selectedAnswer:', this.selectedAnswer); // Debug log
    
    // Check if an answer is selected
    if (this.selectedAnswer === null) {
      // Shake animation to indicate selection is required
      this.shakeOptions();
      return;
    }
    
    // Store the selected answer before moving forward
    const answerToSubmit = this.selectedAnswer;
    
    // Submit answer to quiz system
    this.quizSystem.submitAnswer(answerToSubmit);
    
    // Move to next question or finish quiz
    if (this.quizSystem.nextQuestion()) {
      this.showQuestion();
    } else {
      this.finishQuiz();
    }
  }

  /**
   * Shake options to indicate selection is required
   */
  shakeOptions() {
    const optionsContainer = document.getElementById('options-container');
    if (optionsContainer) {
      optionsContainer.classList.add('animate-shake');
      
      // Show message
      const existingMsg = document.getElementById('selection-required-msg');
      if (!existingMsg) {
        const message = document.createElement('div');
        message.id = 'selection-required-msg';
        message.className = 'mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-center font-semibold';
        message.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Please select an answer before submitting!';
        optionsContainer.parentElement.appendChild(message);
        
        // Remove message after 3 seconds
        setTimeout(() => {
          message.remove();
        }, 3000);
      }
      
      // Remove shake animation after it completes
      setTimeout(() => {
        optionsContainer.classList.remove('animate-shake');
      }, 500);
    }
  }

  /**
   * Skip current question
   */
  skipQuestion() {
    // Mark as skipped in quiz system
    this.quizSystem.skipCurrentQuestion();
    
    // Move to next question or finish quiz
    if (this.quizSystem.nextQuestion()) {
      this.showQuestion();
    } else {
      this.finishQuiz();
    }
  }

  /**
   * Finish quiz and show results
   */
  finishQuiz() {
    // Stop timer
    this.stopTimer();
    
    // Show results
    this.showResults();
  }

  /**
   * Go to previous question
   */
  goToPreviousQuestion() {
    // Stop timer
    this.stopTimer();
    
    // Go back in quiz system
    if (this.quizSystem.previousQuestion()) {
      this.showQuestion();
    }
  }

  /**
   * Quit quiz and return to categories
   */
  quitQuiz() {
    if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
      this.stopTimer();
      location.reload();
    }
  }



  /**
   * Show quiz results
   */
  showResults() {
    // Stop timer if still running
    this.stopTimer();
    
    const results = this.quizSystem.getResults();
    const minutes = Math.floor(results.timeTaken / 60);
    const seconds = results.timeTaken % 60;
    const skippedCount = results.answers.filter(a => a.skipped).length;
    
    // Save quiz attempt if user is authenticated
    if (window.authManager && window.authManager.isAuthenticated()) {
      this.saveQuizAttempt(results);
    }
    
    const quizInterface = document.getElementById('quiz-interface');
    quizInterface.innerHTML = `
      <div class="max-w-3xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div class="text-6xl mb-4">
            ${results.percentage >= 80 ? '🎉' : results.percentage >= 60 ? '👍' : '📚'}
          </div>
          <h2 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quiz Complete!</h2>
          
          ${window.authManager && window.authManager.isAuthenticated() ? `
            <div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-3 mb-6">
              <p class="text-sm text-green-800 dark:text-green-300">
                <i class="fas fa-check-circle mr-1"></i>
                Your progress has been saved!
              </p>
            </div>
          ` : `
            <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-6">
              <p class="text-sm text-blue-800 dark:text-blue-300">
                <i class="fas fa-info-circle mr-1"></i>
                Sign in to save your progress and track your performance!
              </p>
            </div>
          `}
          
          <div class="text-6xl font-bold mb-6">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              ${results.percentage}%
            </span>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="text-3xl font-bold text-green-600 dark:text-green-400">${results.score}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Correct</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="text-3xl font-bold text-red-600 dark:text-red-400">${results.totalQuestions - results.score - skippedCount}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Incorrect</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">${skippedCount}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Skipped</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">${minutes}:${seconds.toString().padStart(2, '0')}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Time</div>
            </div>
          </div>
          
          <div class="flex gap-3 justify-center">
            <button onclick="location.reload()" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
              <i class="fas fa-redo mr-2"></i>Take Another Quiz
            </button>
            <button onclick="quizUIInstance.showDetailedResults()" class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <i class="fas fa-list mr-2"></i>View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Save quiz attempt to Firebase
   */
  async saveQuizAttempt(results) {
    try {
      const result = await window.authManager.saveQuizAttempt({
        category: this.quizSystem.currentCategory,
        score: results.score,
        totalQuestions: results.totalQuestions,
        percentage: results.percentage,
        timeTaken: results.timeTaken,
        answers: results.answers
      });
      
      if (result.success) {
        console.log('✅ Quiz attempt saved successfully');
      }
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }
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
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full p-8 my-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Detailed Results</h2>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>
        
        <div class="space-y-4 max-h-[60vh] overflow-y-auto">
          ${results.answers.map((answer, index) => {
            const borderColor = answer.skipped ? 'border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20' : 
                               answer.isCorrect ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20' : 
                               'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20';
            const badgeColor = answer.skipped ? 'bg-yellow-500' : answer.isCorrect ? 'bg-green-500' : 'bg-red-500';
            const iconClass = answer.skipped ? 'fa-forward text-yellow-600 dark:text-yellow-400' : 
                             answer.isCorrect ? 'fa-check-circle text-green-600 dark:text-green-400' : 
                             'fa-times-circle text-red-600 dark:text-red-400';
            
            return `
            <div class="border ${borderColor} rounded-lg p-4">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full ${badgeColor} text-white flex items-center justify-center font-bold">
                  ${index + 1}
                </span>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">${answer.question}</h4>
                  ${answer.skipped ? `
                    <p class="text-sm text-yellow-700 dark:text-yellow-300 mb-2 font-semibold">
                      <i class="fas fa-forward mr-1"></i>Question Skipped
                    </p>
                  ` : `
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-1">
                      <span class="font-semibold">Your answer:</span> ${answer.options[answer.selectedOption]}
                    </p>
                  `}
                  ${!answer.isCorrect ? `
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <span class="font-semibold">Correct answer:</span> ${answer.options[answer.correctAnswer]}
                    </p>
                  ` : ''}
                  <p class="text-sm text-gray-600 dark:text-gray-400 italic">${answer.explanation}</p>
                </div>
                <i class="fas ${iconClass} text-2xl"></i>
              </div>
            </div>
          `}).join('')}
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
