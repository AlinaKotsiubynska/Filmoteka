import modalTemp from '../templates/modal.hbs';
import FetchFilms from './classFetchFilms.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const onItemClick = async (event) => {
const id = event.currentTarget.dataset.id
  await getFilm(id);

  openModal(id);
}

async function getFilm(filmId) {
  //console.log(filmId)
    const a = await FetchFilms.getFilmById(filmId);
    //console.log(a);
  const markup = modalTemp(a);

  const modalWrapper = document.querySelector('.modal-wrapper');
  modalWrapper.innerHTML = "";
  modalWrapper.insertAdjacentHTML('beforeend', markup)
}

const backdrop = document.querySelector('.backdrop');

function openModal(id) {
  console.log('id', id)
  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';

  window.addEventListener('keyup', onEscPress);
  backdrop.addEventListener('click', onBackdropClick);

  trailer(id);
  
  toFixedNumber();

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

function toFixedNumber() {

const fixedPopularity = document.querySelector('.js-fixed');
  fixedPopularity.textContent = parseFloat(fixedPopularity.textContent).toFixed(1);
}

function trailer(id) {
  
  const icon = document.querySelector('.modal-trailer');

  icon.addEventListener('click', async () => {

    try {
      const response = await FetchFilms.getFilmTrailers(id);
      const trailerKey = await response.results[2].key;
      
      const trailerYoutube = basicLightbox.create(`
		<iframe width="560" height="315" src='https://www.youtube.com/embed/${trailerKey}' frameborder="0" allowfullscreen></iframe>
  `)
    trailerYoutube.show()
    }
    catch (error) {
console.log(error)
    }
  
  });
    
}


  export default onItemClick
