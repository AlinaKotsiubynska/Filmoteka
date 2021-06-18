import FilmsAPI from './classFetchFilms.js';

const searchInput = document.querySelector('.search-input');

const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
  let movieSearch = searchInput.value;
  
  FilmsAPI.getFilmsByQuery(movieSearch);
})
