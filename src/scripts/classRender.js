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
    } catch (err) {
      console.log(err);
    }
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
    const tokenId = localStorage.getItem('id');
    fetch(`https://auth-filmoteka-default-rtdb.europe-west1.firebasedatabase.app/films.json?auth=${tokenId}`)
      .then(res => res.json())
      .then(d => {
        console.log(Object.values(d));
        const libGalRef = document.querySelector('.js-lib-gallery-container');
        const markup = libGalleryListTemp(Object.values(d));
        libGalRef.insertAdjacentHTML('beforeend', markup);
      });
  }
  addData(film) {
    const tokenId = localStorage.getItem('id');
    fetch(
      `https://auth-filmoteka-default-rtdb.europe-west1.firebasedatabase.app/films.json?auth=${tokenId}`,
      options.addFilm(film),
    )
      .then(res => res.json())
      .then(d => console.log(d));
  }

  addEventListeners() {
    document.querySelectorAll('.gallery-card-item').forEach(item =>
      item.addEventListener('click', event => {
        onItemClick(event);
      }),
    );
  }
}

//принимает шаблон hbs и СЕЛЕКТОР контейнера в котором будет рендериться
//будет переиспользоваться так же в избранном
const genresNames = GenresNames.getGenres();
const films = GenresNames.getTrendingFilms();
const RenderGallery = new RenderData(galleryListTemp, '.js-gallery-container', genresNames);
if (localStorage.getItem('id')) {
  RenderGallery.rederWithAuth();
} else {
  RenderGallery.render(films);
}

export default new RenderData(galleryListTemp, '.js-gallery-container', genresNames);
