'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { searchMovies } from '../services/omdb';
import { Movie } from '../types';

// Esta página usa CSR (Client Side Rendering) con 'use client'
// Permite interactividad en tiempo real sin recargar la página
export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();

  // useEffect para manejar el movieId de la URL (cuando vienen de la página principal)
  useEffect(() => {
    const movieId = searchParams.get('movieId');
    if (movieId) {
      setSelectedMovieId(movieId);
      setIsModalOpen(true);
    }
  }, [searchParams]);

  // useEffect para búsqueda automática con debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      setMovies([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = async () => {
    if (query.trim().length < 2) return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchMovies(query.trim());
      setMovies(response.results);
    } catch (err) {
      setError('Error al buscar películas');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovieId(movie.imdbID);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovieId(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header moderno */}
      <header className="glass-dark sticky top-0 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link
              href="/movies"
              className="flex items-center space-x-3 hover-lift transition-all"
            >
              <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center text-xl">
                🔍
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white neon-text">
                  Buscador CineVerse
                </h1>
                <p className="text-gray-300 text-sm">Encuentra cualquier película</p>
              </div>
            </Link>
            <Link
              href="/movies"
              className="glass px-6 py-3 rounded-xl text-white font-semibold hover-lift transition-all border border-white/20"
            >
              ← Volver a Populares
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Barra de búsqueda moderna */}
        <div className="mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="glass rounded-2xl p-2 border border-white/20">
                <input
                  type="text"
                  placeholder="Buscar películas... (mínimo 2 caracteres)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 text-lg bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-2xl">
                  🔍
                </div>
                {loading && (
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 gradient-accent rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 gradient-secondary rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div>
          {error && (
            <div className="text-center py-12">
              <div className="glass rounded-2xl p-8 max-w-md mx-auto border border-red-400/20">
                <div className="text-4xl mb-4">❌</div>
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            </div>
          )}

          {query.trim().length > 0 && query.trim().length < 2 && (
            <div className="text-center py-12">
              <div className="glass rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-4xl mb-4">✏️</div>
                <p className="text-gray-300">Escribe al menos 2 caracteres para buscar</p>
              </div>
            </div>
          )}

          {query.trim().length >= 2 && movies.length === 0 && !loading && !error && (
            <div className="text-center py-12">
              <div className="glass rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No se encontraron resultados</h3>
                <p className="text-gray-300">No hay películas para "<span className="text-blue-400">{query}</span>"</p>
              </div>
            </div>
          )}

          {movies.length > 0 && (
            <>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-2 neon-text">
                  Resultados para "{query}"
                </h2>
                <p className="text-gray-300">
                  {movies.length} película{movies.length !== 1 ? 's' : ''} encontrada{movies.length !== 1 ? 's' : ''}
                </p>
                <div className="w-24 h-1 gradient-accent mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={handleMovieClick}
                  />
                ))}
              </div>
            </>
          )}

          {query.trim().length === 0 && (
            <div className="text-center py-20">
              <div className="glass rounded-2xl p-12 max-w-lg mx-auto">
                <div className="text-8xl mb-6">🎬</div>
                <h2 className="text-3xl font-bold text-white mb-4 neon-text">
                  Busca tu película favorita
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Escribe el nombre de una película en el buscador de arriba y descubre información increíble
                </p>
                <div className="flex justify-center space-x-2 mt-6">
                  <div className="w-2 h-2 gradient-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 gradient-accent rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 gradient-secondary rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal de detalles */}
      <MovieModal
        movieId={selectedMovieId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}