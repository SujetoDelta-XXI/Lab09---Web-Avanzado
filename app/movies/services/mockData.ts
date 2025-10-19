import { Movie, MovieDetails, TMDBResponse } from '../types';

// Datos de ejemplo para probar la aplicación sin API key
export const mockMovies: Movie[] = [
  {
    id: "tt0499549",
    title: "Avatar",
    overview: "Un marine parapléjico enviado al planeta Pandora en una misión única se debate entre seguir las órdenes y proteger el mundo que siente como su hogar.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
    release_date: "2009",
    vote_average: 7.9,
    year: "2009",
    imdbID: "tt0499549"
  },
  {
    id: "tt1375666",
    title: "Inception",
    overview: "Un ladrón que roba secretos corporativos a través del uso de tecnología de sueños compartidos recibe la tarea inversa de plantar una idea en la mente de un CEO.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    release_date: "2010",
    vote_average: 8.8,
    year: "2010",
    imdbID: "tt1375666"
  },
  {
    id: "tt0468569",
    title: "The Dark Knight",
    overview: "Cuando la amenaza conocida como el Joker emerge de su misterioso pasado, causa estragos y caos en la gente de Gotham.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    release_date: "2008",
    vote_average: 9.0,
    year: "2008",
    imdbID: "tt0468569"
  },
  {
    id: "tt0111161",
    title: "The Shawshank Redemption",
    overview: "Dos hombres encarcelados se unen a lo largo de varios años, encontrando consuelo y eventual redención a través de actos de decencia común.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
    release_date: "1994",
    vote_average: 9.3,
    year: "1994",
    imdbID: "tt0111161"
  },
  {
    id: "tt0109830",
    title: "Forrest Gump",
    overview: "Las presidencias de Kennedy y Johnson, los eventos de Vietnam, Watergate y otros eventos históricos se desarrollan desde la perspectiva de un hombre de Alabama con un coeficiente intelectual de 75.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    release_date: "1994",
    vote_average: 8.8,
    year: "1994",
    imdbID: "tt0109830"
  }
];

export const mockMovieDetails: MovieDetails = {
  Title: "Avatar",
  Year: "2009",
  Rated: "PG-13",
  Released: "18 Dec 2009",
  Runtime: "162 min",
  Genre: "Action, Adventure, Fantasy",
  Director: "James Cameron",
  Writer: "James Cameron",
  Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
  Plot: "Un marine parapléjico enviado al planeta Pandora en una misión única se debate entre seguir las órdenes y proteger el mundo que siente como su hogar.",
  Language: "English, Spanish",
  Country: "United States, United Kingdom",
  Awards: "Won 3 Oscars. 91 wins & 131 nominations total",
  Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
  Ratings: [
    { Source: "Internet Movie Database", Value: "7.9/10" },
    { Source: "Rotten Tomatoes", Value: "82%" },
    { Source: "Metacritic", Value: "83/100" }
  ],
  Metascore: "83",
  imdbRating: "7.9",
  imdbVotes: "1,377,441",
  imdbID: "tt0499549",
  Type: "movie",
  DVD: "22 Apr 2010",
  BoxOffice: "$785,221,649",
  Production: "N/A",
  Website: "N/A",
  Response: "True"
};

export const mockResponse: TMDBResponse = {
  page: 1,
  results: mockMovies,
  total_pages: 1,
  total_results: mockMovies.length
};