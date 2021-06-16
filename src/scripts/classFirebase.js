import firebase from 'firebase/app';
import spinner from './spinner';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBRhX5RMVSwrYfBPrYJffmZ8SgEdrIcXCI',
  authDomain: 'auth-filmoteka.firebaseapp.com',
  databaseURL: 'https://auth-filmoteka-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'auth-filmoteka',
  storageBucket: 'auth-filmoteka.appspot.com',
  messagingSenderId: '980393981976',
  appId: '1:980393981976:web:e61aee84f208009d0d2b6d',
};

class Firebase {
  constructor(config) {
    firebase.initializeApp(config);
    this.Auth = firebase.auth();
    this.db = firebase.database();
  }

onAuthChanged(succes, error) {
  this.Auth.onAuthStateChanged(user => {
      if (user) {
        succes(user);
      } else {
        error(user);
      }
    });
  }

  signOut() {
    this.Auth.signOut()
  }

  signIn(email, password) {
    this.Auth.signInWithEmailAndPassword(email, password)
  }

  createUser(email, password) {
    this.Auth.createUserWithEmailAndPassword(email, password)
  }

  addObject(id, obj) {
    const userId = localStorage.getItem('userId');
    this.db.ref(`users/${userId}/films/${id}`).set(obj);
  }

  async getObjects() {
    const userId = localStorage.getItem('userId');
    
    try {
      const objectsList = await this.db.ref().child('users').child(userId).child('films').get();
      const parseObj = await objectsList.val();
      
      return parseObj ? Object.values(parseObj) : 'You dont have any movies in your library';
    } catch (error) {
      console.error(error);
    }
  }

  async getSorted(status = 'watched') {
    spinner.show();
    const arrayFims = await this.getObjects()
    spinner.hide();
    if (typeof arrayFims === 'string') {
      return arrayFims
    }
    const sortFilms = arrayFims.filter(el => el.added === status);
    return sortFilms;
  }

  async getObject(id) {
    let arrayObjects = await this.getObjects();
    if (typeof arrayObjects === 'string') {
      arrayObjects = [];
    }
    const object = arrayObjects.find(el => el.id === Number(id));
    return object;
  }
}

export default new Firebase(firebaseConfig);