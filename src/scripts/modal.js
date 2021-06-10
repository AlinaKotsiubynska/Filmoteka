import modalTemp from '../templates/modal.hbs';
import FetchFilms from './classFetchFilms.js';

const onItemClick = async (event) => {

  await getFilm(event.currentTarget.dataset.id);

   openModal();
}

async function getFilm(filmId) {
  console.log(filmId)
    const a = await FetchFilms.getFilmById(filmId);
    console.log(a);
  const markup = modalTemp(a);

  const modalWrapper = document.querySelector('.modal-wrapper');
  modalWrapper.innerHTML = "";
  modalWrapper.insertAdjacentHTML('beforeend', markup)
}

const backdrop = document.querySelector('.backdrop');

function openModal() {

  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';

    window.addEventListener('keyup', onEscPress);
    backdrop.addEventListener('click', onBackdropClick);

   onBtnClose();
}


  function onBtnClose() {
    const btnClose = document.querySelector('.modal-btn-close');

    btnClose.addEventListener('click', () => {
      backdrop.classList.add('is-hidden');

    document.body.style.overflow = '';
    });
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
    
    document.body.style.overflow = '';
}
  
  function onBackdropClick(e) {
 if (e.target === e.currentTarget) {
    onCloseModal();
  }
  }

  export default onItemClick