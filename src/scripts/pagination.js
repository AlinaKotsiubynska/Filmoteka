import FilmsAPI from './classFetchFilms.js';
import classRender from './classRender.js';
import debounce from 'lodash.debounce';
import renderPagination from './renderPagination.js';

function initDefaultPage() {
  const arrOfFilms = FilmsAPI.getTrendingFilms(1);

  classRender.render(arrOfFilms);

  arrOfFilms.then(renderPagination);
}

function onPaginationClick(e) {
  e.preventDefault();

  const pageNumber = e.target.dataset.navigation;

  let arrOfFilms = [];
  if (FilmsAPI.fetchBy === 'query') {
    arrOfFilms = FilmsAPI.getFilmsByQuery(searchInput.value, pageNumber);
  } else {
    arrOfFilms = FilmsAPI.getTrendingFilms(pageNumber);
  }

  classRender.render(arrOfFilms);

  arrOfFilms.then(renderPagination);
}

function onSearch(e) {
  e.preventDefault();

  const value = e.target.value;
  if (value === '') {
    initDefaultPage();
    return;
  }

  executeSearch(value);
}

function executeSearch(searchBy) {
  const arrOfFilms = FilmsAPI.getFilmsByQuery(searchBy, 1);

  classRender.render(arrOfFilms);

  arrOfFilms.then(renderPagination);
}

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', debounce(onSearch, 1000));

const refPagination = document.querySelector('#pagination');
refPagination.addEventListener('click', onPaginationClick);

initDefaultPage();
