import axios from 'axios';
import { Movie, MovieDetails, TMDBResponse } from '../types';
import { mockResponse, mockMovieDetails, mockMovies } from './mockData';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'demo_key';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Verificar si la API key está configurada
if (API_KEY === 'demo_key') {
  console.warn('⚠️  TMDB API key no configurada. Por favor configura NEXT_PUBLIC_TMDB_API_KEY en .env.local');
}

// Cliente axios configurado
const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'es-ES'
  }
});

// Servicio para obtener películas populares (SSR)
export async function getPopularMovies(page: number = 1): Promise<TMDBResponse> {
  // Si no hay API key válida, usar datos de ejemplo
  if (API_KEY === 'demo_key') {
    console.log('🎬 Usando datos de ejemplo (configura tu API key de TMDB para datos reales)');
    return Promise.resolve(mockResponse);
  }

  try {
    const response = await tmdbClient.get<TMDBResponse>('/movie/popular', {
      params: { page }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching popular movies:', error);
    
    if (error.response?.status === 401) {
      console.log('🎬 API key inválida, usando datos de ejemplo');
      return mockResponse;
    }
    
    throw new Error('Error al cargar las películas populares');
  }
}

// Servicio para buscar películas (CSR)
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
    const response = await tmdbClient.get<TMDBResponse>('/search/movie', {
      params: { query, page }
    });
    return response.data;
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
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  // Si no hay API key válida, usar datos de ejemplo
  if (API_KEY === 'demo_key') {
    const mockMovie = mockMovies.find(movie => movie.id === movieId);
    if (mockMovie) {
      return Promise.resolve({
        ...mockMovieDetails,
        ...mockMovie
      });
    }
    return Promise.resolve(mockMovieDetails);
  }

  try {
    const response = await tmdbClient.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching movie details:', error);
    
    if (error.response?.status === 401) {
      // Fallback a datos de ejemplo
      const mockMovie = mockMovies.find(movie => movie.id === movieId);
      if (mockMovie) {
        return {
          ...mockMovieDetails,
          ...mockMovie
        };
      }
      return mockMovieDetails;
    }
    
    throw new Error('Error al cargar los detalles de la película');
  }
}

// Utilidades para imágenes
export function getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) return '/placeholder-movie.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path: string | null): string {
  return getImageUrl(path, 'w1280');
}