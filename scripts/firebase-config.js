// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWjM5rbtl4j6JaKjRJ9L0cfj2mFKbBoRs",
  authDomain: "wedding-invite-c4e55.firebaseapp.com",
  projectId: "wedding-invite-c4e55",
  storageBucket: "wedding-invite-c4e55.firebasestorage.app",
  messagingSenderId: "303488821217",
  appId: "1:303488821217:web:87a3cd700a6726990894a0",
  measurementId: "G-1S1L0X06WG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
