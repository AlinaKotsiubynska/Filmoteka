import libGalleryListTemp from '../templates/lib-gallery.hbs';
import Firebase from './classFirebase.js';
import onItemClick from './modal';
import renderPagination from './renderPagination.js';

class RenderLibrary {
  constructor() {
    this.btnContainerRef = document.querySelector('.btn-container');
    this.WatchedBtnRef = this.btnContainerRef.querySelector('.btn-watched');
    this.QueueBtnRef = this.btnContainerRef.querySelector('.btn-queue');
    this.libGalleryRef = document.querySelector('.js-lib-gallery-container');
  }
  async render(label = 'watched') {
    if (label === 'watched' || label === 'queue') {
      const films = await Firebase.getSorted(label);
      const markup = libGalleryListTemp(films);
      this.libGalleryRef.innerHTML = '';
      if (typeof films === 'string') {
        this.libGalleryRef.innerHTML = `${films}`;
      } else if (!films.length) {
        this.libGalleryRef.innerHTML = `You don't have any movies in ${label.toUpperCase()} yet`;
      } else {
        this.allFilms = films;

        this.renderPage(1);
      }
    }
  }

  renderPage(pageNumber) {
    let indexFrom = pageNumber - 1 + 6 * (pageNumber - 1);
    if (pageNumber > 1) {
      indexFrom -= pageNumber - 1;
    }
    const indexTo = pageNumber * 6;
    const films = this.allFilms.slice(indexFrom, indexTo);

    const markup = libGalleryListTemp(films);
    this.libGalleryRef.innerHTML = '';
    this.libGalleryRef.insertAdjacentHTML('afterbegin', markup);
    this.addEventListeners();

    const totalPages = Math.ceil(this.allFilms.length / 6);

    renderPagination({
      total_pages: totalPages,
      page: pageNumber,
    });
  }

  onPaginationClick(e) {
    const pageNumber = e.target.dataset.navigation;

    this.renderPage(Number(pageNumber));
  }

  onBtnsClick(event) {
    const label = event.target.id;
    this.render(label);
    this.focusOnBtn(label);
  }
  succes() {
    this.btnContainerRef.addEventListener('click', e => {
      this.onBtnsClick(e);
    });
    this.disabledBtn(false);
    this.render();
  }
  error() {
    this.disabledBtn(true);
    this.WatchedBtnRef.classList.remove('current-btn');
    this.QueueBtnRef.classList.remove('current-btn');
    this.libGalleryRef.innerHTML = 'Please log in to access your library.';
  }
  addEventListeners() {
    document.querySelectorAll('.gallery-card-item').forEach(item =>
      item.addEventListener('click', event => {
        onItemClick(event);
      }),
    );

    const refPagination = document.querySelector('#pagination');
    refPagination.addEventListener('click', this.onPaginationClick.bind(this));
  }
  focusOnBtn(label) {
    if (label === 'watched') {
      this.WatchedBtnRef.classList.add('current-btn');
      this.QueueBtnRef.classList.remove('current-btn');
      return;
    }
    this.QueueBtnRef.classList.add('current-btn');
    this.WatchedBtnRef.classList.remove('current-btn');
  }
  disabledBtn(boolean) {
    this.WatchedBtnRef.disabled = boolean;
    this.QueueBtnRef.disabled = boolean;
  }
}

const RenderLib = new RenderLibrary();
const succes = RenderLib.succes.bind(RenderLib);
const error = RenderLib.error.bind(RenderLib);

Firebase.onAuthChanged(succes, error);
