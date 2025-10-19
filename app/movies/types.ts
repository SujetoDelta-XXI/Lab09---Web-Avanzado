// Tipos para la aplicación de películas usando OMDB API
export interface OMDBMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface OMDBSearchResponse {
  Search: OMDBMovie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

// Interface normalizada para compatibilidad con componentes existentes
export interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  year: string;
  imdbID: string;
}

// Interface de respuesta normalizada
export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}