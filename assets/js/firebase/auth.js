/**
 * Authentication Module
 * Handles user authentication with Firebase
 */

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.auth = null;
    this.db = null;
    this.onAuthStateChangedCallbacks = [];
  }

  /**
   * Initialize authentication
   */
  init() {
    if (typeof firebase === 'undefined') {
      console.error('Firebase SDK not loaded');
      return false;
    }

    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
      console.error('Firebase not initialized. Please initialize Firebase first.');
      return false;
    }

    this.auth = firebase.auth();
    this.db = firebase.firestore();

    // Listen for auth state changes
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      this.updateUI(user);
      
      // Call registered callbacks
      this.onAuthStateChangedCallbacks.forEach(callback => callback(user));
      
      if (user) {
        console.log('✅ User signed in:', user.email);
        this.saveUserProfile(user);
      } else {
        console.log('👤 User signed out');
      }
    });

    return true;
  }

  /**
   * Register callback for auth state changes
   */
  onAuthStateChanged(callback) {
    this.onAuthStateChangedCallbacks.push(callback);
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.auth.signInWithPopup(provider);
      
      // User signed in
      const user = result.user;
      await this.saveUserProfile(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Sign in error:', error);
      
      let errorMessage = 'Failed to sign in. Please try again.';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign in cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up blocked. Please allow pop-ups for this site.';
      }
      
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    try {
      await this.auth.signOut();
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: 'Failed to sign out' };
    }
  }

  /**
   * Save user profile to Firestore
   */
  async saveUserProfile(user) {
    try {
      const userRef = this.db.collection('users').doc(user.uid);
      
      await userRef.set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      console.log('✅ User profile saved');
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId) {
    try {
      const userDoc = await this.db.collection('users').doc(userId).get();
      return userDoc.exists ? userDoc.data() : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  /**
   * Save quiz attempt
   */
  async saveQuizAttempt(quizData) {
    if (!this.currentUser) {
      console.error('User not authenticated');
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const attemptRef = await this.db.collection('quizAttempts').add({
        userId: this.currentUser.uid,
        userEmail: this.currentUser.email,
        userName: this.currentUser.displayName,
        category: quizData.category,
        score: quizData.score,
        totalQuestions: quizData.totalQuestions,
        percentage: quizData.percentage,
        timeTaken: quizData.timeTaken,
        answers: quizData.answers,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      console.log('✅ Quiz attempt saved:', attemptRef.id);
      
      // Update user progress
      await this.updateUserProgress(quizData);
      
      return { success: true, attemptId: attemptRef.id };
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Update user progress statistics
   */
  async updateUserProgress(quizData) {
    try {
      const progressRef = this.db.collection('userProgress').doc(this.currentUser.uid);
      
      await progressRef.set({
        userId: this.currentUser.uid,
        totalQuizzes: firebase.firestore.FieldValue.increment(1),
        totalScore: firebase.firestore.FieldValue.increment(quizData.score),
        totalQuestions: firebase.firestore.FieldValue.increment(quizData.totalQuestions),
        lastQuiz: {
          category: quizData.category,
          score: quizData.score,
          percentage: quizData.percentage,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        },
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      console.log('✅ User progress updated');
    } catch (error) {
      console.error('Error updating user progress:', error);
    }
  }

  /**
   * Get user quiz history
   */
  async getUserQuizHistory(limit = 10) {
    if (!this.currentUser) {
      return [];
    }

    try {
      const snapshot = await this.db.collection('quizAttempts')
        .where('userId', '==', this.currentUser.uid)
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();

      const history = [];
      snapshot.forEach(doc => {
        history.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return history;
    } catch (error) {
      console.error('Error getting quiz history:', error);
      return [];
    }
  }

  /**
   * Get user progress
   */
  async getUserProgress() {
    if (!this.currentUser) {
      return null;
    }

    try {
      const progressDoc = await this.db.collection('userProgress')
        .doc(this.currentUser.uid)
        .get();

      return progressDoc.exists ? progressDoc.data() : null;
    } catch (error) {
      console.error('Error getting user progress:', error);
      return null;
    }
  }

  /**
   * Update UI based on auth state
   */
  updateUI(user) {
    const authButton = document.getElementById('auth-button');
    const userInfo = document.getElementById('user-info');
    
    if (!authButton) return;

    if (user) {
      // User is signed in
      authButton.innerHTML = `
        <div class="flex items-center gap-3">
          <img src="${user.photoURL}" alt="${user.displayName}" 
               class="w-8 h-8 rounded-full border-2 border-blue-500">
          <span class="hidden md:inline text-gray-700 dark:text-gray-200">${user.displayName}</span>
          <button id="sign-out-btn" 
                  class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
            Sign Out
          </button>
        </div>
      `;
      
      // Add sign out handler
      const signOutBtn = document.getElementById('sign-out-btn');
      if (signOutBtn) {
        signOutBtn.onclick = () => this.signOut();
      }
    } else {
      // User is signed out
      authButton.innerHTML = `
        <button id="sign-in-btn" 
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
          <i class="fab fa-google"></i>
          Sign in with Google
        </button>
      `;
      
      // Add sign in handler
      const signInBtn = document.getElementById('sign-in-btn');
      if (signInBtn) {
        signInBtn.onclick = () => this.signInWithGoogle();
      }
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.currentUser !== null;
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser;
  }
}

// Create global instance
window.authManager = new AuthManager();

// Initialize on DOM load - wait for Firebase to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for Firebase to be initialized by firebase-config.js
  const initAuth = () => {
    if (window.firebaseDB && window.firebaseDB.getDB()) {
      console.log('🔥 Initializing Auth Manager...');
      window.authManager.init();
    } else {
      console.log('⏳ Waiting for Firebase to initialize...');
      setTimeout(initAuth, 100);
    }
  };
  
  initAuth();
});
