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
    this.Auth.signOut();
  }

  signIn(email, password) {
    return this.Auth.signInWithEmailAndPassword(email, password)
    
  }

  async createUser(email, password) {
    const newUser = await this.Auth.createUserWithEmailAndPassword(email, password);
    const userEmail = newUser.user.email;
    const userId = newUser.user.uid;
    console.log( newUser ,newUser.user);
    this.db.ref(`users/${userId}`).set({ email: userEmail, films: { 0: 'empty'} })
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
    const userId = localStorage.getItem('userId');
    const sortFilms = (await (await this.db.ref().child('users').child(userId).child('films').orderByChild("added").equalTo(`${status}`).get()).val());
    return Object.values(sortFilms);
  }

  async getObject(id) {
    const arrayObjects = await this.getObjects();
    const object = arrayObjects.find(el => el.id === Number(id));
    return object;
  }
}

export default new Firebase(firebaseConfig);