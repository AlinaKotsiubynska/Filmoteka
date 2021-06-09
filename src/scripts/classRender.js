import galleryListTemp from '../templates/gallery.hbs';
import testObject from './testObject.js';
import GenresNames from './classFetchFilms.js';

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

  addEventListeners(data) {
    document.querySelectorAll('.gallery-card-item').forEach(item =>
      item.addEventListener('click', event => {
        onItemClick(event, data);
      }),
    );
  }
}

//принимает шаблон hbs и СЕЛЕКТОР контейнера в котором будет рендериться
//будет переиспользоваться так же в избранном
const genresNames = GenresNames.getGenres();
const films = GenresNames.getTrendingFilms();
const RenderGallery = new RenderData(galleryListTemp, '.js-gallery-container', genresNames);
RenderGallery.render(films);

// хендлер висит на каждой item. Data - массив объектов, всех фильмов на страничке.
const onItemClick = (event, data) => {
  console.log(event.currentTarget.dataset.id); //каждая item уникальна и имеет свой айдишник!
  console.log(data); // Тут массив всех объектов - нужный ищи по dataset
  //open modal
};

export default new RenderData(galleryListTemp, '.js-gallery-container', genresNames);
