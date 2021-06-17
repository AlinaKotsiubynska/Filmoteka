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
    this.Auth.signOut();
  }

  signIn(email, password) {
    return this.Auth.signInWithEmailAndPassword(email, password);
  }

  async createUser(email, password) {
    const newUser = await this.Auth.createUserWithEmailAndPassword(email, password);
    const userEmail = newUser.user.email;
    const userId = newUser.user.uid;
    this.db.ref(`users/${userId}`).set({ email: userEmail, films: { 0: 'empty' } });
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
    const userId = localStorage.getItem('userId');
    const sortFilmsPromise = await this.db
      .ref()
      .child('users')
      .child(userId)
      .child('films')
      .orderByChild('added')
      .equalTo(`${status}`)
      .get();

    console.log(sortFilmsPromise.val());
    const sortFilmsObj = sortFilmsPromise.val();
    const sortFilmsArr = Object.values(sortFilmsObj);
    spinner.hide();
    return sortFilmsArr;
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
