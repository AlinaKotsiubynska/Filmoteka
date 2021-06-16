import Splide from '@splidejs/splide';
import sliderTempl from '../templates/slider.hbs';
import FilmsAPI from './classFetchFilms.js';

async function sliderMaker(page) {
  const arrayOfFilms = await FilmsAPI.getTrendingFilms(page);

  console.log(arrayOfFilms);

  const markup = sliderTempl(arrayOfFilms.results);

  const sliderWrapper = document.querySelector('.splide__list');

  sliderWrapper.insertAdjacentHTML('beforeend', markup);

  var splide = new Splide('.splide', {
    perPage: '7',
    //   perMove: 2,
    focus: '1',

    //   focus: 2,
    //   gap: '5em',
    arrows: false,
    //   pagination: false,
    autoplay: true,
    interval: 2000,
    fixedWidth: 350,
    height: 210,
    gap: 10,
    rewind: true,
    cover: true,
    pagination: false,
    focus: 'center',

    breakpoints: {
      768: {
        perPage: 2,
        fixedWidth: 400,
      },
    },
  });

  splide.mount();
}
sliderMaker(4);
