import Link from 'next/link';
import MoviesGrid from './components/MoviesGrid';
import ErrorMessage from './components/ErrorMessage';
import { getPopularMovies } from './services/omdb';
import { Movie } from './types';

// Esta página usa SSR (Server Side Rendering)
// Los datos se obtienen en el servidor antes de enviar la página al cliente
export default async function MoviesPage() {
  let movies: Movie[] = [];
  let error: string | null = null;

  try {
    // Fetch de datos en el servidor usando async/await
    const response = await getPopularMovies(1);
    movies = response.results;
  } catch (err) {
    error = 'Error al cargar las películas populares';
    console.error('Error fetching movies:', err);
  }

  return (
    <div className="min-h-screen">
      {/* Header moderno con glassmorphism */}
      <header className="glass-dark sticky top-0 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-2xl">
                🎬
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white neon-text">
                  CineVerse
                </h1>
                <p className="text-gray-300 text-sm">Descubre películas increíbles</p>
              </div>
            </div>
            <Link
              href="/movies/search"
              className="gradient-accent px-6 py-3 rounded-xl text-white font-semibold hover-lift transition-all hover:shadow-lg hover:shadow-cyan-500/25"
            >
              🔍 Buscar Películas
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-4 neon-text">
                Películas Más Populares
              </h2>
              <p className="text-gray-300 text-lg">
                Descubre las películas más increíbles del momento
              </p>
              <div className="w-24 h-1 gradient-accent mx-auto mt-4 rounded-full"></div>
            </div>

            <MoviesGrid movies={movies} />

            {movies.length === 0 && !error && (
              <div className="text-center py-20">
                <div className="glass rounded-2xl p-12 max-w-md mx-auto">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-gray-300 text-lg">No se encontraron películas</p>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer moderno */}
      <footer className="glass-dark border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-lg">
                🎬
              </div>
              <span className="text-white font-semibold">CineVerse</span>
            </div>
            <p className="text-gray-400 text-sm">
              Datos proporcionados por <span className="text-blue-400">OMDB API</span> (Open Movie Database)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}