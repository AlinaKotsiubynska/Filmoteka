import Auth from './classAuth.js';
const ClassAuth = new Auth();

const loginBtn = document.getElementById('login');
const modalAuth = document.getElementById('modal-auth')
const form = document.querySelector('.auth-form');
const closeBtn = document.getElementById('auth-cancel')

loginBtn.addEventListener('click', openAuthForm);
form.addEventListener('submit', submitHandler);
closeBtn.addEventListener('click', closeModal);
modalAuth.addEventListener('click', (e) => {
  if(e.target === document.querySelector('.backdrop')) {
  closeModal()
    }
})

function openAuthForm() {
  modalAuth.classList.remove('is-hidden')
}

function closeModal() {
  modalAuth.classList.add('is-hidden')
}

function submitHandler(e) {
  e.preventDefault();
  ClassAuth.getToken(form['user-email'].value, form['user-password'].value);
  closeModal()  
}
