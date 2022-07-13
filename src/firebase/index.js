import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBZ7T4srqbQ0ajZcebzmqlAyOSYwpmajbY',
  authDomain: 'react-books-reviewer.firebaseapp.com',
  databaseURL:
    'https://react-books-reviewer-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-books-reviewer',
  storageBucket: 'react-books-reviewer.appspot.com',
  messagingSenderId: '62260867003',
  appId: '1:62260867003:web:c8ebd34586790448b91e9e',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
