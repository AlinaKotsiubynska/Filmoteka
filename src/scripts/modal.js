const renderModal = new RenderData(modalTemp, '.modal-wrapper');
renderModal.render(testObject);

const backdrop = document.querySelector('.backdrop');
  onOpenModal();

  function onOpenModal() {
  backdrop.classList.remove('is-hidden');

  const btnClose = document.querySelector('.modal-btn-close');
  btnClose.addEventListener('click', () => {
    backdrop.classList.add('is-hidden');
  })
  
    window.addEventListener('keyup', onEscPress);
    backdrop.addEventListener('click', onBackdropClick);
}
  
function onEscPress(e) {
if (e.code === "Escape") {
  onCloseModal();
  }
}

function onCloseModal() {
  backdrop.classList.add('is-hidden');

  window.removeEventListener("keyup", onEscPress);
  backdrop.removeEventListener("click", onBackdropClick);
}
  
  function onBackdropClick(e) {
 if (e.target === e.currentTarget) {
    onCloseModal();
  }
}


