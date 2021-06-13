import options from './baseSettingsClassAuth.js';

class Auth {
  constructor() {}
  getToken(email, password) {
    fetch(`${options.singInUrl}?key=${options.apiKey}`, options.getOptinsFetch(email, password))
      .then(res => res.json())
      .then(data => data)
      .then(token => localStorage.setItem('id', token.idToken))
      .catch(err => console.log(err));
  }
}

export default Auth;
