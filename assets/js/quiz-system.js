/**
 * Quiz System - Main Logic
 * Handles quiz loading, question display, scoring, and progress tracking
 */

class QuizSystem {
  constructor() {
    this.db = null;
    this.currentCategory = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];
    this.startTime = null;
  }

  /**
   * Initialize the quiz system
   */
  async init() {
    try {
      // Initialize Firebase
      if (window.firebaseDB && window.firebaseDB.init()) {
        this.db = window.firebaseDB.getDB();
        console.log('✅ Quiz system initialized');
        return true;
      } else {
        throw new Error('Firebase not initialized');
      }
    } catch (error) {
      console.error('❌ Quiz system initialization error:', error);
      this.showError('Failed to initialize quiz system. Please refresh the page.');
      return false;
    }
  }

  /**
   * Load all quiz categories
   */
  async loadCategories() {
    try {
      const snapshot = await this.db.collection('quizCategories')
        .orderBy('order', 'asc')
        .get();
      
      const categories = [];
      snapshot.forEach(doc => {
        categories.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return categories;
    } catch (error) {
      console.error('Error loading categories:', error);
      throw error;
    }
  }

  /**
   * Load questions for a specific category
   */
  async loadQuestions(category, limit = 10, difficulty = null) {
    try {
      let query = this.db.collection('questions')
        .where('category', '==', category);
      
      if (difficulty) {
        query = query.where('difficulty', '==', difficulty);
      }
      
      const snapshot = await query.limit(limit).get();
      
      const questions = [];
      snapshot.forEach(doc => {
        questions.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Shuffle questions for randomness
      return this.shuffleArray(questions);
    } catch (error) {
      console.error('Error loading questions:', error);
      throw error;
    }
  }

  /**
   * Start a new quiz
   */
  async startQuiz(category, options = {}) {
    try {
      this.currentCategory = category;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.answers = [];
      this.startTime = Date.now();
      
      const limit = options.questionCount || 10;
      const difficulty = options.difficulty || null;
      
      this.questions = await this.loadQuestions(category, limit, difficulty);
      
      if (this.questions.length === 0) {
        throw new Error('No questions found for this category');
      }
      
      return {
        success: true,
        totalQuestions: this.questions.length
      };
    } catch (error) {
      console.error('Error starting quiz:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get current question
   */
  getCurrentQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      return {
        ...this.questions[this.currentQuestionIndex],
        questionNumber: this.currentQuestionIndex + 1,
        totalQuestions: this.questions.length
      };
    }
    return null;
  }

  /**
   * Submit answer for current question
   */
  submitAnswer(selectedOption) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      this.score++;
    }
    
    this.answers.push({
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedOption,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      explanation: currentQuestion.explanation,
      skipped: false
    });
    
    return {
      isCorrect,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation
    };
  }

  /**
   * Skip current question
   */
  skipCurrentQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    
    this.answers.push({
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedOption: null,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: false,
      explanation: currentQuestion.explanation,
      skipped: true
    });
  }

  /**
   * Move to next question
   */
  nextQuestion() {
    this.currentQuestionIndex++;
    return this.currentQuestionIndex < this.questions.length;
  }

  /**
   * Move to previous question
   */
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      // Remove the last answer from the array
      const lastAnswer = this.answers.pop();
      // Adjust score if the removed answer was correct
      if (lastAnswer && lastAnswer.isCorrect) {
        this.score--;
      }
      return true;
    }
    return false;
  }

  /**
   * Get quiz results
   */
  getResults() {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - this.startTime) / 1000); // seconds
    
    return {
      score: this.score,
      totalQuestions: this.questions.length,
      percentage: Math.round((this.score / this.questions.length) * 100),
      timeTaken,
      answers: this.answers,
      category: this.currentCategory
    };
  }

  /**
   * Save user progress (requires authentication)
   */
  async saveProgress(userId, results) {
    try {
      await this.db.collection('userProgress').doc(userId).set({
        lastQuiz: {
          category: results.category,
          score: results.score,
          totalQuestions: results.totalQuestions,
          percentage: results.percentage,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        },
        totalQuizzesTaken: firebase.firestore.FieldValue.increment(1),
        totalScore: firebase.firestore.FieldValue.increment(results.score)
      }, { merge: true });
      
      return true;
    } catch (error) {
      console.error('Error saving progress:', error);
      return false;
    }
  }

  /**
   * Submit score to leaderboard (requires authentication)
   */
  async submitToLeaderboard(userId, username, results) {
    try {
      await this.db.collection('leaderboard').add({
        userId,
        username: username || 'Anonymous',
        score: results.score,
        totalQuestions: results.totalQuestions,
        percentage: results.percentage,
        category: results.category,
        timeTaken: results.timeTaken,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting to leaderboard:', error);
      return false;
    }
  }

  /**
   * Get leaderboard for a category
   */
  async getLeaderboard(category, limit = 10) {
    try {
      const snapshot = await this.db.collection('leaderboard')
        .where('category', '==', category)
        .orderBy('percentage', 'desc')
        .orderBy('timeTaken', 'asc')
        .limit(limit)
        .get();
      
      const leaderboard = [];
      snapshot.forEach(doc => {
        leaderboard.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return leaderboard;
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      return [];
    }
  }

  /**
   * Utility: Shuffle array
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Show error message
   */
  showError(message) {
    console.error(message);
    // You can implement a UI notification here
  }
}

// Export quiz system
window.QuizSystem = QuizSystem;
