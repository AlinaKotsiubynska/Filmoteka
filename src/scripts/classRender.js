import galleryListTemp from '../templates/gallery.hbs';

import GenresNames from './classFetchFilms.js';
import onItemClick from './modal';
import Firebase from './firebase.js';

class RenderData {
  constructor(genres) {
    this.temp = galleryListTemp;
    this.containerRef = document.querySelector('.js-gallery-container');
    this.genres = GenresNames.getGenres();
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
  addEventListeners() {
    document.querySelectorAll('.gallery-card-item').forEach(item =>
      item.addEventListener('click', event => {
        onItemClick(event);
      }),
    );
  }
}

export default new RenderData();
