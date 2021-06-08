import modalTemp from '../templates/modal.hbs'
import galleryListTemp from '../templates/gallery.hbs';
import testObject from './testObject.js';


class RenderData {
  constructor(temp, selector) {
    this.temp = temp;
    this.containerRef = document.querySelector(selector);
  }
  async render(data) {
    const markup = await this.temp(data);
    this.containerRef.innerHTML = '';
    this.containerRef.insertAdjacentHTML('beforeend', markup);
    this.addEventListeners(data);
  }
  addEventListeners(data) {
    document.querySelectorAll('.gallery-card-item').forEach(item =>
      item.addEventListener('click', e => {
        onItemClick(e, data);
      }),
    );
  }
}

//принимает шаблон hbs и СЕЛЕКТОР контейнера в котором будет рендериться
//будет переиспользоваться так же в избранном

const RenderGallery = new RenderData(galleryListTemp, '.js-gallery-container');
RenderGallery.render(testObject);


// хендлер висит на каждой item. Data - массив объектов, всех фильмов на страничке.
const onItemClick = (event, data) => {
  console.log(event.currentTarget.dataset.id); //каждая item уникальна и имеет свой айдишник!
  console.log(data); // Тут массив всех объектов - нужный ищи по dataset
  //open modal
}





