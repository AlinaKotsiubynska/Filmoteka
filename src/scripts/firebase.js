import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import fetch from './classFetchFilms'

const firebaseConfig = {
  apiKey: 'AIzaSyBRhX5RMVSwrYfBPrYJffmZ8SgEdrIcXCI',
  authDomain: 'auth-filmoteka.firebaseapp.com',
  databaseURL: 'https://auth-filmoteka-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'auth-filmoteka',
  storageBucket: 'auth-filmoteka.appspot.com',
  messagingSenderId: '980393981976',
  appId: '1:980393981976:web:e61aee84f208009d0d2b6d',
};

firebase.initializeApp(firebaseConfig);

class Firebase {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.onAuthStateChanged(console.log, console.log);
  }

  onAuthStateChanged(succes = console.log, error = console.log) {
    this.auth.onAuthStateChanged(user => {
      localStorage.setItem('userId', user.uid)
      if (user) {
        succes(user);
      } else {
        error(user);
      }
    });
  }

  signOut() {
    this.auth.signOut;
  }

  signIn(email, password) {
    this.auth.signInWithEmailAndPassword(email, password);
  }

  createUser(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password);
  }

  

  addObject(id, obj) {
    const userId = localStorage.getItem('userId')
    this.db.ref(`users/${userId}/films/${id}`).set(obj);
  }

  async getObjects() {
    const userId = localStorage.getItem('userId')
    console.log(userId);
    try {
      const objectsList = await this.db.ref().child(userId).child('films').get().then(r => console.log(r.val()));
      // const objectsList = await this.db.ref().child(userId).get();
      // const parseObj = await objectsList.val();
      // console.log(objectsList, parseObj);
      // console.log(Object.values(parseObj))
      // return Object.values(parseObj);
    } catch (error) {
      console.error(error);
    }
  }

  async getObject(id, refKey) {
    const arrayObjects = await this.getObjects(refKey);
    const object = arrayObjects.find(el => el.id === id);
    return object;
  }
}

// firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// function writeUserData(userId, name, email, imageUrl = '') {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }
// const cred = firebase.auth().signInWithEmailAndPassword('alinakaraja@gmail.com', '123456').then()
// console.log(cred);
// console.log(firebase.auth().then().currentUser);
// console.log(firebase.auth());
// console.log(firebase.auth().signOut().then());
// console.log(firebase.auth());
// const newUser = firebase.auth().createUserWithEmailAndPassword('alinakaraja@gmail.com', '123456').then()
// console.log(newUser);
// const result = writeUserData('dirsZAuVGIOg07d6Yeqgj7bWFT52', 'Alina', 'alinakaraja@gmail.com')
// console.log(result);

// firebase.auth().onAuthStateChanged(user => {
//   console.log(user);
//   console.log(user ? user.uid : user);
//   // return user ? user.x : user
// })
// firebase.auth().signOut()
// console.log('user: ', user);
// const dbRef = firebase.database().ref();
// console.log(dbRef);
// dbRef.child("films").get().then(r =>console.log(r.val()))
//   .catch((error) => {
//   console.error(error);
// });
const myBase = new Firebase();
// fetch.getFilmById(550).then(r => {
//   myBase.addObject(r.id, r)
//   console.log(localStorage.getItem('userId'));
//   console.log( r.id, r);
// });

// fetch.getFilmById(785522).then(r => {
  
//   console.log(localStorage.getItem('userId'));
//   myBase.addObject(r.id, r)
//   console.log(r.id, r);
// });
myBase.getObjects()
export default myBase;
