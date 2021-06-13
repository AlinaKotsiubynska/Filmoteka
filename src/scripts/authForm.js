import Auth from './classAuth.js';
const ClassAuth = new Auth();


const header = document.querySelector('header');
console.log(header.appendChild());
const loginBtn = document.getElementById('login');
const authForm = `
<div id="modal-auth" class="backdrop section">
  <div class="auth-modal-container modal-container">
    <form action="#" name="user-auth" class="auth-form">
      <fieldset class="auth-form-inputs">
        <label> Email
          <input class="email" type="email" name="user-email" placeholder="Enter email">
        </label>
        <label> Password
          <input class="password" type="text" name="user-password" placeholder="Enter password">
        </label>
      </fieldset>
      <div>
        <button type="submit">Submit</button>
        <button id="auth-cancel" type="button">Cancel</button>
      </div>
      
    </form>
  </div>
</div>`;


loginBtn.addEventListener('click', openAuthForm);
// const modalAuth = document.getElementById('modal-auth');
// const closeBtn = document.getElementById('auth-cancel')
const modalAuth = createLoginModal();

function createLoginModal() {
  const modal = document.createElement('div');
  modal.id = 'modal-auth';
  modal.classList.add('backdrop', 'section');
  modal.insertAdjacentHTML('afterbegin', authForm);
  console.log(modal);
  // const closeBtn = modal.getElementById('auth-cancel');
  // 
  // closeBtn.addEventListener('click', closeModal);
  // modal.addEventListener('click', (e) => {
  //   if(e.currentTarget === e.target) {
  //   closeModal()
  //     }
  // })
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
  const modal = header.insertAdjacenElement('afterend', modalAuth);
  console.log(modal);
  // header.insertAdjacentHTML('afterend', authForm);
  document.querySelector('.auth-form').addEventListener('submit', submitHandler);
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
