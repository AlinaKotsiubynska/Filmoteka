import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRhX5RMVSwrYfBPrYJffmZ8SgEdrIcXCI",
  authDomain: "auth-filmoteka.firebaseapp.com",
  databaseURL: "https://auth-filmoteka-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "auth-filmoteka",
  storageBucket: "auth-filmoteka.appspot.com",
  messagingSenderId: "980393981976",
  appId: "1:980393981976:web:e61aee84f208009d0d2b6d"
};

firebase.initializeApp(firebaseConfig);

class Firebase {
  constructor() {
    // firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.onAuthStateChanged(console.log, console.log)
  }
  
  onAuthStateChanged(succes, error) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        succes(user)
      } else {
        error(user)
      }
    })
  }

  signOut() {
    this.auth.signOut
  }

  signIn(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
  }

  createUser(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password)
  }

  addObject(refKey = 'films', id, obj) {
    this.db.ref(`${refKey}/${id}`).set(obj)
  }

  async getObjects(refKey = 'films') {
    try {
      const objectsList = await this.db.ref().child(refKey).get()
    return objectsList
    } catch (error) {
      console.error(error)
    }
  }

  async getObject(id, refKey) {
    const objects = (await this.getObjects(refKey)).val()
    const object = await objects[id];
    return object
  }
}

// firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database()




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
myBase.getObject(550)
export default firebase