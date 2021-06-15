import libGalleryListTemp from '../templates/lib-gallery.hbs';
import Firebase from './firebase.js';

class RenderLibrary {
  constructor() {
    this.btnContainerRef = document.querySelector('.btn-container');
    this.libGalleryRef = document.querySelector('.js-lib-gallery-container');
  }
  async render(label = 'watched') {
    if (label === 'watched' || label === 'queue') {
      const films = await Firebase.getObjects(label);
      const markup = libGalleryListTemp(films);
      this.libGalleryRef.innerHTML = '';
      this.libGalleryRef.insertAdjacentHTML('afterbegin', markup);
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
}

const RenderLib = new RenderLibrary();
const succes = RenderLib.succes.bind(RenderLib);
const error = RenderLib.error.bind(RenderLib);

Firebase.onAuthStateChanged(succes, error);
