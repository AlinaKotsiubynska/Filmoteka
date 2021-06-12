export default {
  apiKey: 'AIzaSyBRhX5RMVSwrYfBPrYJffmZ8SgEdrIcXCI',
  singInUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
  fetchUrl: 'https://auth-filmoteka-default-rtdb.europe-west1.firebasedatabase.app/films.json',
  getOptinsFetch(email, password) {
    return {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  },
  addFilm(film) {
    return {
      method: 'post',
      body: JSON.stringify(film),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  },
};
