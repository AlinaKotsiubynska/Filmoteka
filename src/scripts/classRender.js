import modalTemp from '../templates/modal.hbs'
import galleryListTemp from '../templates/gallery.hbs';
import testObject from './testObject.js';
import GenresNames from './classFetchFilms.js';
import FetchFilms from './classFetchFilms.js';


class RenderData {
  constructor(temp, selector) {
    this.temp = temp;
    this.containerRef = document.querySelector(selector);
  }
  async render(data, genres) {
    try {
      const normalizeData = await this.getRenderData(data, genres);
      const markup = await this.temp(normalizeData);
      this.containerRef.innerHTML = '';
      this.containerRef.insertAdjacentHTML('beforeend', markup);
      this.addEventListeners(normalizeData);
    } catch (err) {
      console.log(err);
    }
  }
  async getRenderData(data, genres) {
    const asyncData = await data;
    const asyncGenres = await genres;
    return asyncData.map(obj => {
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

const RenderGallery = new RenderData(galleryListTemp, '.js-gallery-container');
const genresNames = GenresNames.getGenres();
RenderGallery.render(testObject, genresNames);

// const renderModal = new RenderData(modalTemp, '.modal-wrapper');
// renderModal.render(testObject);

// хендлер висит на каждой item. Data - массив объектов, всех фильмов на страничке.
const onItemClick = async (event, data) => {
  //console.log(event.currentTarget.dataset.id); //каждая item уникальна и имеет свой айдишник!
  //console.log(data); // Тут массив всех объектов - нужный ищи по dataset
  //open modal
  //await getFilm(event.currentTarget.dataset.id);

 //openModal();
  
  openModal(event.currentTarget.dataset.id)

}

async function getFilm(id) {
    const a = await FetchFilms.getFilmById(id);
    console.log(a);
   const markup =  modalTemp(a);

    const modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.insertAdjacentHTML('beforeend', markup)
}

async function openModal(filmId) {
await getFilm(filmId)

  const backdrop = document.querySelector('.backdrop');

  backdrop.classList.remove('is-hidden');

    window.addEventListener('keyup', onEscPress);
    backdrop.addEventListener('click', onBackdropClick);

   onBtnClose();
  
  function onBtnClose() {
    const btnClose = document.querySelector('.modal-btn-close');

  btnClose.addEventListener('click', () => {
    backdrop.classList.add('is-hidden');
  })
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
}



//export default RenderData


