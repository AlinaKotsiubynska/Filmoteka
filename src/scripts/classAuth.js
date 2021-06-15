import options from './baseSettingsClassAuth.js';
import firebase from './firebase.js'


class Auth {
  constructor() {}
  getToken(email, password) {
    fetch(`${options.singInUrl}?key=${options.apiKey}`, options.getOptinsFetch(email, password))
      .then(res => res.json())
      .then(data => data)
      .then(token => localStorage.setItem('id', token.idToken))
      .catch(err => console.log(err));
    
      firebase.auth().signInWithEmailAndPassword(email, password)
  }

}

export default Auth;
