import firebase from './classFirebase.js'

const loginBtn = document.getElementById('login');
const modalAuth = document.getElementById('modal-auth')
const form = document.querySelector('.auth-form');
const closeBtn = document.getElementById('auth-cancel')

firebase.onAuthChanged(setLocalId, setLocalId);

form.addEventListener('submit', submitHandler);

closeBtn.addEventListener('click', closeModal);

modalAuth.addEventListener('click', (e) => {
  if(e.target === document.querySelector('.backdrop')) {
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
}

function submitHandler(e) {
  e.preventDefault();
  firebase.signIn(form['user-email'].value, form['user-password'].value)
  closeModal()
}