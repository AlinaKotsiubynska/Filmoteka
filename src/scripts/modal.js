import modalTemp from '../templates/modal.hbs';
import FetchFilms from './classFetchFilms.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import firebase from './classFirebase.js';
// import LibRender from './classRenderAuthUsers';
// const galleryRender = new LibRender()

const onItemClick = async event => {
  const id = event.currentTarget.dataset.id;
  await getFilm(id);
  if (localStorage.getItem('userId') === 'null') {
    disableButtons()
  } else {
    enebleButtons()
  }
  openModal(id);
};

function getCurrentHref() {
  const current = document.querySelector('.current');
  return current.href;
  
}

async function getFilm(filmId) {
  const page = getCurrentHref();
  let film = {};

  if (page.includes('index')) {
    film = await FetchFilms.getFilmById(filmId);
  } else {
    film = await firebase.getObject(filmId);
  }

  const markup = modalTemp(film);

  const modalWrapper = document.querySelector('.modal-wrapper');
  modalWrapper.innerHTML = '';
  modalWrapper.insertAdjacentHTML('beforeend', markup);
  
  if (localStorage.getItem('userId') !== 'null') {
    const fetchFilm = await FetchFilms.getFilmById(filmId);
    const firebaseFilm = await firebase.getObject(filmId);
    if (fetchFilm.id === firebaseFilm?.id) {
      currentButtonChoice(firebaseFilm);
    }
  }

  modalWrapper.querySelector('.btn-add-watch').addEventListener('click', () => {
    onWatchBtnClick(film, filmId);
  });
  modalWrapper.querySelector('.btn-add-queue').addEventListener('click', () => {
    onQueueBtnClick(film, filmId);
  });
}

const backdrop = document.querySelector('.backdrop');

function openModal(id) {
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
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function onCloseModal() {
  backdrop.classList.add('is-hidden');

  window.removeEventListener('keyup', onEscPress);
  backdrop.removeEventListener('click', onBackdropClick);

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
      const trailerUrl = await postData(id);

      const trailerYoutube = basicLightbox.create(`
		<iframe width="560" height="315" src=${trailerUrl} frameborder="0" allowfullscreen></iframe>
  `);
      trailerYoutube.show();
    } catch (error) {
      console.log(error);
    }
  });
}

async function onWatchBtnClick(filmData, filmId) {
  const page = getCurrentHref();
  const filterFilmData = {
    ...filmData,
    added: 'watched',
    trailer: await postData(filmId),
  };

  firebase.addObject(filmId, filterFilmData);
  if (!page.includes('index')) {
    // galleryRender.render('queue')
    const currentFilm = document.querySelector('[data-id="'+filmId+'"]')
    currentFilm.remove()
    if (!document.querySelector('.gallery-list').innerHTML.trim()) {
      document.querySelector('.gallery-list').innerHTML = `You don't have any movies in ${'queue'.toUpperCase()}`
    }
    // console.log(document.querySelector('.gallery-list').innerHTML);
  }
  
  onCloseModal()
}
async function onQueueBtnClick(filmData, filmId) {
  const page = getCurrentHref();
  const filterFilmData = {
    ...filmData,
    added: 'queue',
    trailer: await postData(filmId),
  };
    if (!page.includes('index')) {
    // galleryRender.render('watched')
      const currentFilm = document.querySelector('[data-id="'+filmId+'"]')
      currentFilm.remove()
      if (!document.querySelector('.gallery-list').innerHTML.trim()) {
      document.querySelector('.gallery-list').innerHTML = `You don't have any movies in ${'watched'.toUpperCase()}`
    }
      
  }
  firebase.addObject(filmId, filterFilmData);
  onCloseModal()
}
async function postData(filmId) {
  const response = await FetchFilms.getFilmTrailers(filmId);
  let trailerKey = await response.results[0].key;

  if (filmId === '581726') {
    trailerKey = await response.results[2].key;
  }
  if (filmId === '423108') {
    trailerKey = await response.results[5].key;
  }

  return `https://www.youtube.com/embed/${trailerKey}`;
}

function currentButtonChoice({ added }) {
  const btnWatchRef = document.querySelector('.btn-add-watch');
  const btnQueueRef = document.querySelector('.btn-add-queue');
  if (added === 'watched') {
    btnWatchRef.classList.add('active-btn');
    btnWatchRef.textContent = 'added in watched';
    btnWatchRef.disabled = true;
  } else if (added === 'queue') {
    btnQueueRef.classList.add('active-btn');
    btnQueueRef.textContent = 'added in queue';
    btnQueueRef.disabled = true;
  }

}

function disableButtons() {
  const btnWatchRef = document.querySelector('.btn-add-watch');
  const btnQueueRef = document.querySelector('.btn-add-queue');
  const message = document.querySelector('.unknown-user-message');
  btnQueueRef.disabled = true;
  btnWatchRef.disabled = true;
  message.classList.remove('is-hidden')
}

function enebleButtons() {
  const btnWatchRef = document.querySelector('.btn-add-watch');
  const btnQueueRef = document.querySelector('.btn-add-queue');
  const message = document.querySelector('.unknown-user-message');
  btnQueueRef.disabled = false;
  btnWatchRef.disabled = false;
  message.classList.add('is-hidden')
}
export default onItemClick;
