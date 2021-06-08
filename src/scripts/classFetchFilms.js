class FilmsAPI {
  constructor(key) {
    this.key = key;
    this.page = 1;
    this.getGenres();
  }

  async getGenres() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/list?api_key=${this.key}`)
      const genres = await response.json();
      this.genres = genres.genres;
    } catch (error) {
      console.log(error);
    }
  }
  
  async getFilmById(filmId) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${this.key}`)
      const film = await response.json();
      return film
    } catch (error) {
      console.log(error);
    }
  }

  async getFilmsByQuery(query) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.key}&query=${query}&page=${this.page}`)
      const films = await response.json();
      return films
    } catch (error) {
      console.log(error);
    }
  }

  async getTrendingFilms() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${this.key}&page=${this.page}`)
      const films = await response.json();
      return films
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FilmsAPI('28349e2a7add56dc6493ba9645697aa9')
