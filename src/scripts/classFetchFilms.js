import spinner from './spinner';

class FilmsAPI {

  constructor(key) {
    this.baseURL = 'https://api.themoviedb.org/3'
    this.key = key;
    this.pageNumb = 1;
    this.fetchBy = 'trending';
  }

  async getGenres() {
    try {
      const response = await fetch(`${this.baseURL}/genre/list?api_key=${this.key}`);
      const genres = await response.json();
      return genres.genres;
    } catch (error) {
      console.log(error);
    }
  }
  
  async getFilmById(filmId) {
    try {
      const response = await fetch(`${this.baseURL}/movie/${filmId}?api_key=${this.key}`)
      const film = await response.json();
      return film
    } catch (error) {
      console.log(error);
    }
  }

  async getFilmsByQuery(query, page = this.pageNumb) {
    if (this.fetchBy !== 'query') {
      this.fetchBy = 'query';
    }
    spinner.show();
    try {
      const response = await fetch(`${this.baseURL}/search/movie?api_key=${this.key}&query=${query}&page=${page}`)
      const films = await response.json();
      spinner.hide();
      this.updatePageNumb(page);
      return films
    } catch (error) {
      console.log(error);
    }
  }

  async getTrendingFilms(page = this.pageNumb) {
    if (this.fetchBy !== 'trending') {
      this.fetchBy = 'trending';
    }
    spinner.show();
    try {
      const response = await fetch(`${this.baseURL}/trending/movie/day?api_key=${this.key}&page=${page}`)
      this.updatePageNumb(page);
      spinner.hide();
      const films = await response.json();
      return films
    } catch (error) {
      console.log(error);
    }
  }

  async getFilmTrailers(id) {
  try {
    const response = await fetch(`${this.baseURL}/movie/${id}/videos?api_key=${this.key}&language=en-US`);
    const trailer = await response.json();
    return trailer
  }
  catch (error) {
      console.log(error);
    }
}

  resetPageNumb() {
    this.pageNumb = 1;
  }

  updatePageNumb(page) {
    this.pageNumb = page;
  }
}

export default new FilmsAPI('28349e2a7add56dc6493ba9645697aa9');
