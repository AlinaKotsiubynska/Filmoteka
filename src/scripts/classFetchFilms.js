class FilmsAPI {
  constructor(key) {
    this.key = key;
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
    
}



export default new FilmsAPI('28349e2a7add56dc6493ba9645697aa9')
