import Auth from './classAuth.js';
const ClassAuth = new Auth();

const loginBtn = document.getElementById('login');
const header = document.querySelector('header');
const authFotm = `<div id="modal-auth" class="backdrop">
  <div class="auth-modal-container modal-container">
    <form action="#" name="user-auth" class="auth-form">
      <fieldset class="auth-form-inputs">
        <label> Email
          <input class="email" type="email" name="user-email" placeholder="Enter email" value="19tomat@gmail.com">
        </label>
        <label> Password
          <input class="password" type="text" name="user-password" placeholder="Enter password" value="123456">
        </label>
      </fieldset>
      <div>
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </div>
      
    </form>
  </div>`;

loginBtn.addEventListener('click', openAuthForm);

function openAuthForm() {
  header.insertAdjacentHTML('afterend', authFotm);

  document.querySelector('.auth-form').addEventListener('submit', submitHandler);
}

function closeModal(e) {
  e.currentTarget.remove();
}

function submitHandler(e) {
  console.log(e);
  e.preventDefault();
  console.log(e);
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  ClassAuth.getToken(email, password);
  const modalAuth = document.getElementById('modal-auth');
  modalAuth.addEventListener('click', closeModal);
}
