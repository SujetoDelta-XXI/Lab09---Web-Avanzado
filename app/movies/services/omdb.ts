import axios from 'axios';
import { Movie, MovieDetails, TMDBResponse, OMDBSearchResponse, OMDBMovie } from '../types';
import { mockResponse, mockMovieDetails, mockMovies } from './mockData';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'demo_key';
const BASE_URL = 'https://www.omdbapi.com';

// Cliente axios configurado
const omdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY
  }
});

// Verificar si la API key está configurada
if (API_KEY === 'demo_key') {
  console.warn('⚠️  OMDB API key no configurada. Por favor configura NEXT_PUBLIC_OMDB_API_KEY en .env.local');
}

// Función para normalizar películas de OMDB a nuestro formato
function normalizeMovie(omdbMovie: OMDBMovie): Movie {
  return {
    id: omdbMovie.imdbID,
    title: omdbMovie.Title,
    overview: `Película del año ${omdbMovie.Year}`, // OMDB no tiene overview en búsquedas
    poster_path: omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : null,
    release_date: omdbMovie.Year,
    vote_average: 0, // Se obtiene en detalles
    year: omdbMovie.Year,
    imdbID: omdbMovie.imdbID
  };
}

// Servicio para obtener películas populares (usando búsqueda de Marvel como ejemplo)
export async function getPopularMovies(page: number = 1): Promise<TMDBResponse> {
  // Si no hay API key válida, usar datos de ejemplo
  if (API_KEY === 'demo_key') {
    console.log('🎬 Usando datos de ejemplo (configura tu API key de OMDB para datos reales)');
    return Promise.resolve(mockResponse);
  }

  try {
    // OMDB no tiene endpoint de "populares", usamos búsquedas predefinidas
    const popularSearches = ['marvel', 'star wars', 'batman', 'superman', 'spider'];
    const searchTerm = popularSearches[Math.floor(Math.random() * popularSearches.length)];
    
    const response = await omdbClient.get<OMDBSearchResponse>('/', {
      params: { 
        s: searchTerm,
        page: page,
        type: 'movie'
      }
    });

    if (response.data.Response === 'False') {
      // Si no hay resultados, usar datos de ejemplo
      return mockResponse;
    }

    const normalizedMovies = response.data.Search.map(normalizeMovie);

    return {
      page: page,
      results: normalizedMovies,
      total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
      total_results: parseInt(response.data.totalResults)
    };
  } catch (error: any) {
    console.error('Error fetching popular movies:', error);
    
    if (error.response?.status === 401) {
      console.log('🎬 API key inválida, usando datos de ejemplo');
      return mockResponse;
    }
    
    // En caso de cualquier error, usar datos de ejemplo
    return mockResponse;
  }
}

// Servicio para buscar películas
export async function searchMovies(query: string, page: number = 1): Promise<TMDBResponse> {
  // Si no hay API key válida, filtrar datos de ejemplo
  if (API_KEY === 'demo_key') {
    const filteredMovies = mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview.toLowerCase().includes(query.toLowerCase())
    );
    
    return Promise.resolve({
      page: 1,
      results: filteredMovies,
      total_pages: 1,
      total_results: filteredMovies.length
    });
  }

  try {
    const response = await omdbClient.get<OMDBSearchResponse>('/', {
      params: { 
        s: query,
        page: page,
        type: 'movie'
      }
    });

    if (response.data.Response === 'False') {
      return {
        page: page,
        results: [],
        total_pages: 0,
        total_results: 0
      };
    }

    const normalizedMovies = response.data.Search.map(normalizeMovie);

    return {
      page: page,
      results: normalizedMovies,
      total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
      total_results: parseInt(response.data.totalResults)
    };
  } catch (error: any) {
    console.error('Error searching movies:', error);
    
    if (error.response?.status === 401) {
      // Fallback a datos de ejemplo si la API key es inválida
      const filteredMovies = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.overview.toLowerCase().includes(query.toLowerCase())
      );
      
      return {
        page: 1,
        results: filteredMovies,
        total_pages: 1,
        total_results: filteredMovies.length
      };
    }
    
    throw new Error('Error al buscar películas');
  }
}

// Servicio para obtener detalles de una película
export async function getMovieDetails(movieId: string): Promise<MovieDetails> {
  // Si no hay API key válida, usar datos de ejemplo
  if (API_KEY === 'demo_key') {
    const mockMovie = mockMovies.find(movie => movie.imdbID === movieId);
    if (mockMovie) {
      return Promise.resolve({
        ...mockMovieDetails,
        Title: mockMovie.title,
        Year: mockMovie.year,
        imdbID: mockMovie.imdbID,
        Poster: mockMovie.poster_path || mockMovieDetails.Poster,
        Plot: mockMovie.overview
      });
    }
    return Promise.resolve(mockMovieDetails);
  }

  try {
    const response = await omdbClient.get<MovieDetails>('/', {
      params: { 
        i: movieId,
        plot: 'full'
      }
    });

    if (response.data.Response === 'False') {
      // Fallback a datos de ejemplo
      return mockMovieDetails;
    }

    return response.data;
  } catch (error: any) {
    console.error('Error fetching movie details:', error);
    
    if (error.response?.status === 401) {
      // Fallback a datos de ejemplo
      const mockMovie = mockMovies.find(movie => movie.imdbID === movieId);
      if (mockMovie) {
        return {
          ...mockMovieDetails,
          Title: mockMovie.title,
          Year: mockMovie.year,
          imdbID: mockMovie.imdbID,
          Poster: mockMovie.poster_path || mockMovieDetails.Poster,
          Plot: mockMovie.overview
        };
      }
      return mockMovieDetails;
    }
    
    throw new Error('Error al cargar los detalles de la película');
  }
}

// Utilidades para imágenes
export function getImageUrl(path: string | null): string {
  if (!path || path === 'N/A') return '/placeholder-movie.svg';
  return path; // OMDB devuelve URLs completas
}

export function getBackdropUrl(path: string | null): string {
  return getImageUrl(path); // OMDB no tiene backdrops separados
}