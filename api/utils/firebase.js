require('dotenv').config({ path: './api/config/config.env' });

const { initializeApp } = require('firebase-admin/app');
 
const firebaseConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID
};

  // Initialize Firebase
exports.app = initializeApp(firebaseConfig);