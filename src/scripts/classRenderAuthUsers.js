import libGalleryListTemp from '../templates/lib-gallery.hbs';
import Firebase from './classFirebase.js';
import onItemClick from './modal';

class RenderLibrary {
  constructor() {
    this.btnContainerRef = document.querySelector('.btn-container');
    this.libGalleryRef = document.querySelector('.js-lib-gallery-container');
  }
  async render(label = 'watched') {
    if (label === 'watched' || label === 'queue') {
      const films = await Firebase.getSorted(label);
      const markup = libGalleryListTemp(films);
      this.libGalleryRef.innerHTML = '';
      this.libGalleryRef.insertAdjacentHTML('afterbegin', markup);
      this.addEventListeners();
    }
  }
  onBtnsClick(event) {
    const label = event.target.id;
    this.render(label);
  }
  succes() {
    this.btnContainerRef.addEventListener('click', e => {
      this.onBtnsClick(e);
    });
    this.render();
  }
  error() {
    this.libGalleryRef.innerHTML = 'аторизируйтесь';
  }
  addEventListeners() {
    document.querySelectorAll('.gallery-card-item').forEach(item =>
      item.addEventListener('click', event => {
        onItemClick(event);
      }),
    );
  }
}

const RenderLib = new RenderLibrary();
const succes = RenderLib.succes.bind(RenderLib);
const error = RenderLib.error.bind(RenderLib);

Firebase.onAuthChanged(succes, error);
