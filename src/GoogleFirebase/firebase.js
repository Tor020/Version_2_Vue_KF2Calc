import firebase from 'firebase';
// https://www.youtube.com/watch?v=7lEU1UEw3YI&index=2&list=PLRqwX-V7Uu6agS82Le9lLCBbeaW8inATT

// https://firebase.google.com/docs/database/web/read-and-write?authuser=0  Current step in docs 
// Attempting to Google Sheets instead first


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDubcmQhJZyj7Qzh30CtRto49b4T-Vh1Ig",
    authDomain: "killingfloor2comments.firebaseapp.com",
    databaseURL: "https://killingfloor2comments.firebaseio.com",
    projectId: "killingfloor2comments",
    storageBucket: "killingfloor2comments.appspot.com",
    messagingSenderId: "325255289712"
  };


  
  firebase.initializeApp(config);