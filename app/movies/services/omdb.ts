import axios from 'axios';
import { Movie, MovieDetails, TMDBResponse, OMDBSearchResponse, OMDBMovie } from '../types';
import { mockResponse, mockMovieDetails, mockMovies } from './mockData';

// ✅ Configuración de la API
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || '460854f2';
const BASE_URL = 'https://www.omdbapi.com/';

// Cliente Axios configurado correctamente
const omdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// ⚠️ Advertencia si no hay API key configurada
if (!process.env.NEXT_PUBLIC_OMDB_API_KEY) {
  console.warn('⚠️  No se encontró NEXT_PUBLIC_OMDB_API_KEY. Usando clave por defecto.');
}

// 🔄 Normaliza los datos del API OMDB al formato Movie
function normalizeMovie(omdbMovie: OMDBMovie): Movie {
  return {
    id: omdbMovie.imdbID,
    title: omdbMovie.Title,
    overview: `Película del año ${omdbMovie.Year}`,
    poster_path: omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : null,
    release_date: omdbMovie.Year,
    vote_average: 0,
    year: omdbMovie.Year,
    imdbID: omdbMovie.imdbID,
  };
}

// 🎬 Obtener películas populares (simulación con palabras clave)
export async function getPopularMovies(page: number = 1): Promise<TMDBResponse> {
  try {
    const popularSearches = ['marvel', 'star wars', 'batman', 'superman', 'spider'];
    const searchTerm = popularSearches[Math.floor(Math.random() * popularSearches.length)];

    console.log(`🔎 Cargando películas populares: ${searchTerm}`);

    const response = await omdbClient.get<OMDBSearchResponse>('/', {
      params: { s: searchTerm, page, type: 'movie' },
    });

    if (response.data.Response === 'False') {
      console.warn('⚠️ Sin resultados, usando mockResponse');
      return mockResponse;
    }

    const normalizedMovies = response.data.Search.map(normalizeMovie);

    return {
      page,
      results: normalizedMovies,
      total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
      total_results: parseInt(response.data.totalResults),
    };
  } catch (error: any) {
    console.error('❌ Error al obtener películas populares:', error.message);
    return mockResponse;
  }
}

// 🔍 Buscar películas
export async function searchMovies(query: string, page: number = 1): Promise<TMDBResponse> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  try {
    console.log(`🔎 Buscando películas con query: "${query}"`);

    const response = await omdbClient.get<OMDBSearchResponse>('/', {
      params: { s: query.trim(), page, type: 'movie' },
    });

    if (response.data.Response === 'False') {
      console.log('ℹ️ Sin resultados en OMDB.');
      return {
        page,
        results: [],
        total_pages: 0,
        total_results: 0,
      };
    }

    const normalizedMovies = response.data.Search.map(normalizeMovie);

    console.log(`✅ ${normalizedMovies.length} resultados encontrados.`);

    return {
      page,
      results: normalizedMovies,
      total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
      total_results: parseInt(response.data.totalResults),
    };
  } catch (error: any) {
    console.error('❌ Error al buscar películas:', error.message);

    // Si la API falla, se devuelven datos simulados
    const filteredMovies = mockMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      page: 1,
      results: filteredMovies,
      total_pages: 1,
      total_results: filteredMovies.length,
    };
  }
}

// 🎞️ Obtener detalles de una película
export async function getMovieDetails(movieId: string): Promise<MovieDetails> {
  try {
    console.log(`📄 Cargando detalles de película ID: ${movieId}`);

    const response = await omdbClient.get<MovieDetails>('/', {
      params: { i: movieId, plot: 'full' },
    });

    if (response.data.Response === 'False') {
      console.warn('⚠️ Detalles no disponibles, usando mockMovieDetails.');
      return mockMovieDetails;
    }

    return response.data;
  } catch (error: any) {
    console.error('❌ Error al obtener detalles:', error.message);
    return mockMovieDetails;
  }
}

// 🖼️ Utilidades para imágenes
export function getImageUrl(path: string | null): string {
  if (!path || path === 'N/A') return '/placeholder-movie.svg';
  return path;
}

export function getBackdropUrl(path: string | null): string {
  return getImageUrl(path);
}
