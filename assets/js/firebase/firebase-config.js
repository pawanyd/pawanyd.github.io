/**
 * Firebase Configuration
 * 
 * ⚠️ GITHUB SECURITY SCANNER NOTE:
 * This is a Firebase CLIENT configuration, NOT a secret key.
 * - These values are meant to be public and used in browser code
 * - Security is enforced by Firestore Security Rules, not by hiding this config
 * - API keys here only identify the Firebase project, they don't grant access
 * - See: https://firebase.google.com/docs/projects/api-keys
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
  authDomain: "pawanyd.github.io",
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

// Auto-initialize Firebase when script loads
if (typeof firebase !== 'undefined') {
  initializeFirebase();
} else {
  console.error('Firebase SDK not loaded. Make sure Firebase scripts are loaded before firebase-config.js');
}
