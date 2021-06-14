import Auth from './classAuth.js';
import authForm from '../templates/login.hbs';
const ClassAuth = new Auth();

const header = document.querySelector('header');
const loginBtn = document.getElementById('login');


loginBtn.addEventListener('click', openAuthForm);
// const modalAuth = document.getElementById('modal-auth');
// const closeBtn = document.getElementById('auth-cancel')
const modalAuth = createLoginModal();

function createLoginModal() {
  const modal = document.createElement('div');
  modal.id = 'modal-auth';
  modal.classList.add('section');
  modal.insertAdjacentHTML('afterbegin', authForm());
  return modal
}

// loginBtn.addEventListener('click', openAuthForm);
// closeBtn.addEventListener('click', closeModal);
// modalAuth.addEventListener('click', (e) => {
//     if(e.currentTarget === e.target) {
//     closeModal()
//       }
// })


function openAuthForm() {
  const modal = header.appendChild(modalAuth);
  console.log(modal);
  // header.insertAdjacentHTML('afterend', authForm);
  console.log(document.querySelector('.auth-form'));
  document.querySelector('.auth-form').addEventListener('submit', submitHandler);
  const closeBtn = document.getElementById('auth-cancel');
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if(e.currentTarget === e.target) {
    closeModal()
      }
  })
}

function closeModal() {
  modalAuth.remove();
}

function submitHandler(e) {
  e.preventDefault();
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  ClassAuth.getToken(email, password);
  closeModal()  
  // modalAuth.addEventListener('click', closeModal);
}
