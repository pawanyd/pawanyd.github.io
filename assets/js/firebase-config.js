/**
 * Firebase Configuration
 * This file is safe to be public - security is handled by Firestore Rules
 * 
 * Setup Instructions:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (or use existing)
 * 3. Add a Web App to your project
 * 4. Copy the config values below
 * 5. Enable Firestore Database
 * 6. Set up security rules (see firestore.rules file)
 * 7. Add authorized domain: pawanyd.github.io
 */
const firebaseConfig = {
  apiKey: "AIzaSyA_TQdS9vrDqqsi1YHa43hD1bZBxpZwQc8",
  authDomain: "pawan-profile.firebaseapp.com",
  projectId: "pawan-profile",
  storageBucket: "pawan-profile.firebasestorage.app",
  messagingSenderId: "643165373948",
  appId: "1:643165373948:web:f17e4a10d9fd93673b9e79"
};

// TODO: Replace with your Firebase project config
// const firebaseConfig = {
//   apiKey: "AIzaSyA_TQdS9vrDqqsi1YHa43hD1bZBxpZwQc8",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// Initialize Firebase
let db = null;

function initializeFirebase() {
  try {
    if (typeof firebase === 'undefined') {
      console.error('Firebase SDK not loaded');
      return false;
    }
    
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    // Initialize Firestore
    db = firebase.firestore();
    
    console.log('✅ Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    return false;
  }
}

// Export for use in other files
window.firebaseDB = {
  init: initializeFirebase,
  getDB: () => db
};
