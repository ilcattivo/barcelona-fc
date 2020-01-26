import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDfV7xd8zivDyLhY0jyBSwzU_5CR8MoHJU',
  authDomain: 'barcelona-6d271.firebaseapp.com',
  databaseURL: 'https://barcelona-6d271.firebaseio.com',
  projectId: 'barcelona-6d271',
  storageBucket: 'barcelona-6d271.appspot.com',
  messagingSenderId: '428553841812',
  appId: '1:428553841812:web:ad24928a7b4393897e1881'
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebasePlayers = firebaseDB.ref('players');
const firebasePositions = firebaseDB.ref('positions');

export {
  firebase,
  firebaseDB,
  firebaseMatches,
  firebasePromotions,
  firebasePlayers,
  firebasePositions
};
