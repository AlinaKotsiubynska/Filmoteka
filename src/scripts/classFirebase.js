import firebase from 'firebase/app';
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
    this.auth = firebase.auth();
    this.db = firebase.database();
  }

onAuthChanged(succes, error) {
  this.auth.onAuthStateChanged(user => {
      if (user) {
        succes(user);
      } else {
        error(user);
      }
    });
  }

  signOut() {
    this.auth.signOut();
  }

  signIn(email, password) {
    this.auth.signInWithEmailAndPassword(email, password);
  }

  createUser(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password);
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
      return Object.values(parseObj);
    } catch (error) {
      console.error(error);
    }
  }

  async getSorted(status = 'watched') {
    const arrayFims = await this.getObjects()
    const sortFilms = arrayFims.filter(el => el.added === status);
    return sortFilms;
  }

  async getObject(id) {
    const arrayObjects = await this.getObjects();
    const object = arrayObjects.find(el => el.id === Number(id));
    return object;
  }
}

export default new Firebase(firebaseConfig);