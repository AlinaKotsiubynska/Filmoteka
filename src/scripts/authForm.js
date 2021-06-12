const loginBtn = document.getElementById('login')
const header = document.querySelector('header');
const authFotm = `<div id="modal-auth" class="backdrop">
  <div class="auth-modal-container modal-container">
    <form action="#" name="user-auth" class="auth-form">
      <fieldset class="auth-form-inputs">
        <label> Email
          <input type="email" name="user-email" placeholder="Enter email">
        </label>
        <label> Password
          <input type="text" name="user-password" placeholder="Enter password">
        </label>
      </fieldset>
      <div>
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </div>
      
    </form>
  </div>
</div>`;

loginBtn.addEventListener('click', openAuthForm);

function openAuthForm() {
  header.insertAdjacentHTML('afterend', authFotm)
  const modalAuth = document.getElementById('modal-auth')
  modalAuth.addEventListener('click', closeModal)

}

function closeModal(e) {
  e.currentTarget.remove()
}