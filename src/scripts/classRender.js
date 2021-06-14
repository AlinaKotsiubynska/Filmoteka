import galleryListTemp from '../templates/gallery.hbs';
import libGalleryListTemp from '../templates/lib-gallery.hbs';
import GenresNames from './classFetchFilms.js';
import onItemClick from './modal';
import options from './baseSettingsClassAuth.js';

class RenderData {
  constructor(temp, selector, genres) {
    this.temp = temp;
    this.containerRef = document.querySelector(selector);
    this.genres = genres;
  }
  async render(data) {
    try {
      const normalizeData = await this.getRenderData(data);
      const markup = await this.temp(normalizeData);
      this.containerRef.innerHTML = '';
      this.containerRef.insertAdjacentHTML('beforeend', markup);
      this.addEventListeners(normalizeData);
    } catch {}
  }
  async getRenderData(data) {
    const asyncData = await data;
    const asyncGenres = await this.genres;
    return asyncData.results.map(obj => {
      return {
        ...obj,
        genre: this.getGenre(obj.genre_ids, asyncGenres),
      };
    });
  }
  getGenre(arrGenresIds, arrGenresObj) {
    const genreArr = arrGenresIds.map((element, inx, arr) => {
      arrGenresObj.forEach(obj => {
        if (obj.id === element) {
          if (inx !== arr.length - 1) {
            element = obj.name + ',';
          } else {
            element = obj.name;
          }
        }
      });
      return element;
    });
    return genreArr;
  }
  rederWithAuth() {
    this.fetchWithToken()
      .then(data => {
        const keys = Object.keys(data);
        if (keys[0] === 'error') {
          document.querySelector('.js-lib-gallery-container').innerHTML = 'Вы не авторизированы';
          localStorage.removeItem('id');
          return;
        }
        this.renderForAuth(data);
      })
      .catch(err => {
        if (document.querySelector('.js-lib-gallery-container')) {
          document.querySelector('.js-lib-gallery-container').innerHTML = 'Фильмов нет';
        }
      });
  }
  addData(film) {
    this.fetchWithToken(film);
  }
  renderWatched() {
    this.fetchWithToken().then(data => this.renderOnClick(data, 'watched'));
  }
  renderQueue() {
    this.fetchWithToken().then(data => this.renderOnClick(data, 'queue'));
  }
  renderOnClick(data, lebel) {
    const films = Object.values(data);
    const filterFilm = films.filter(el => el.added === lebel);
    this.renderForAuth(filterFilm);
  }
  fetchWithToken(film) {
    const tokenId = localStorage.getItem('id');
    if (!film) {
      return fetch(`${options.fetchUrl}?auth=${tokenId}`).then(res => res.json());
    } else {
      fetch(`${options.fetchUrl}?auth=${tokenId}`, options.addFilm(film)).catch(err => console.log(err));
    }
  }
  renderForAuth(data) {
    const arrayData = Object.values(data);
    const unique = Array.from(new Set(arrayData.map(JSON.stringify))).map(JSON.parse);
    const libGalRef = document.querySelector('.js-lib-gallery-container');
    const markup = libGalleryListTemp(unique);
    libGalRef.innerHTML = '';
    libGalRef.insertAdjacentHTML('beforeend', markup);
  }

  addEventListeners() {
    document.querySelectorAll('.gallery-card-item').forEach(item =>
      item.addEventListener('click', event => {
        onItemClick(event);
      }),
    );
  }
}

const genresNames = GenresNames.getGenres();
const films = GenresNames.getTrendingFilms();
const RenderGallery = new RenderData(galleryListTemp, '.js-gallery-container', genresNames);
if (localStorage.getItem('id')) {
  RenderGallery.rederWithAuth();
} else {
  try {
    document.querySelector('.js-lib-gallery-container').innerHTML = 'Вы не авторизированы';
    RenderGallery.render(films);
  } catch {}
}

export default new RenderData(galleryListTemp, '.js-gallery-container', genresNames);
