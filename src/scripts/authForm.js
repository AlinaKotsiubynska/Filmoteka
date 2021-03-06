import firebase from './classFirebase.js'

const loginBtn = document.getElementById('login');
const modalAuth = document.getElementById('modal-auth')
const form = document.querySelector('.auth-form');
const closeBtn = document.getElementById('auth-cancel')

firebase.onAuthChanged(setLocalId, setLocalId);

form.addEventListener('submit', submitHandler);

closeBtn.addEventListener('click', closeModal);

modalAuth.addEventListener('click', (e) => {
  if(e.target === modalAuth) {
  closeModal()
    }
})


function setLocalId(user) {
  if (user) {
    localStorage.setItem('userId', user.uid);
    setLogoutBtn()
  } else {
    localStorage.setItem('userId', user)
    setLoginBtn()
  }
}

function setLoginBtn() {
    loginBtn.addEventListener('click', openAuthForm);
    loginBtn.removeEventListener('click', firebase.signOut.bind(firebase));
    loginBtn.dataset.auth = 'login';
    loginBtn.innerText = 'LOGIN'
}
  
function setLogoutBtn() {
    loginBtn.removeEventListener('click', openAuthForm);
    loginBtn.addEventListener('click', firebase.signOut.bind(firebase));
    loginBtn.dataset.auth = 'logout';
    loginBtn.innerText = 'LOGOUT'
  }

function openAuthForm() {
  modalAuth.classList.remove('is-hidden')
}

function closeModal() {
  modalAuth.classList.add('is-hidden')
  form.reset()
}

function submitHandler(e) {
  e.preventDefault();
  const email = form['user-email'].value;
  const password = form['user-password'].value
  firebase.signIn(email, password).catch(error => {
    console.log(error.code)
    if ('auth/user-not-found') {
      firebase.createUser(email,password)
    }
  })

  closeModal()
}

