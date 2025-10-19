'use client';

import { useEffect, useState } from 'react';
import { MovieDetails } from '../types';
import { getMovieDetails, getImageUrl } from '../services/omdb';

interface MovieModalProps {
  movieId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovieModal({ movieId, isOpen, onClose }: MovieModalProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (movieId && isOpen) {
      fetchMovieDetails();
    }
  }, [movieId, isOpen]);

  const fetchMovieDetails = async () => {
    if (!movieId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const details = await getMovieDetails(movieId);
      setMovie(details);
    } catch (err) {
      setError('Error al cargar los detalles de la película');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-dark rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        {loading && (
          <div className="flex items-center justify-center p-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg">Cargando detalles...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              ⚠️
            </div>
            <p className="text-red-400 text-lg mb-6">{error}</p>
            <button
              onClick={onClose}
              className="gradient-secondary px-6 py-3 rounded-xl text-white font-semibold hover-lift transition-all"
            >
              Cerrar
            </button>
          </div>
        )}

        {movie && (
          <div className="relative">
            {/* Header con poster de fondo */}
            <div className="relative h-80 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 overflow-hidden rounded-t-3xl">
              {movie.Poster && movie.Poster !== 'N/A' && (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-full object-cover opacity-20"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-12 h-12 glass-dark rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                ✕
              </button>

              {/* Title overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-4xl font-bold text-white mb-2 neon-text">
                  {movie.Title}
                </h1>
                <div className="flex flex-wrap gap-3">
                  <span className="glass px-3 py-1 rounded-full text-white text-sm font-medium">
                    ⭐ {movie.imdbRating}/10
                  </span>
                  <span className="gradient-accent px-3 py-1 rounded-full text-white text-sm font-medium">
                    {movie.Year}
                  </span>
                  <span className="gradient-primary px-3 py-1 rounded-full text-white text-sm font-medium">
                    {movie.Runtime}
                  </span>
                  <span className="gradient-secondary px-3 py-1 rounded-full text-white text-sm font-medium">
                    {movie.Rated}
                  </span>
                </div>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Poster */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={getImageUrl(movie.Poster)}
                      alt={movie.Title}
                      className="w-64 h-96 object-cover rounded-2xl shadow-2xl mx-auto lg:mx-0"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20"></div>
                  </div>
                </div>

                {/* Información */}
                <div className="flex-1 space-y-6">
                  {/* Géneros */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 gradient-accent rounded-full mr-3"></span>
                      Géneros
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.Genre.split(', ').map((genre, index) => (
                        <span
                          key={index}
                          className="glass px-4 py-2 rounded-xl text-white text-sm border border-white/10"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sinopsis */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 gradient-primary rounded-full mr-3"></span>
                      Sinopsis
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{movie.Plot}</p>
                  </div>

                  {/* Director y Actores */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-2 flex items-center">
                        <span className="w-2 h-2 gradient-secondary rounded-full mr-2"></span>
                        Director
                      </h4>
                      <p className="text-gray-300">{movie.Director}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2 flex items-center">
                        <span className="w-2 h-2 gradient-accent rounded-full mr-2"></span>
                        Actores Principales
                      </h4>
                      <p className="text-gray-300">{movie.Actors}</p>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass rounded-xl p-4 text-center border border-white/10">
                      <p className="text-gray-400 text-sm mb-1">Estreno</p>
                      <p className="text-white font-semibold">{movie.Released}</p>
                    </div>
                    <div className="glass rounded-xl p-4 text-center border border-white/10">
                      <p className="text-gray-400 text-sm mb-1">País</p>
                      <p className="text-white font-semibold">{movie.Country}</p>
                    </div>
                    <div className="glass rounded-xl p-4 text-center border border-white/10">
                      <p className="text-gray-400 text-sm mb-1">Idioma</p>
                      <p className="text-white font-semibold">{movie.Language}</p>
                    </div>
                    {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                      <div className="glass rounded-xl p-4 text-center border border-white/10">
                        <p className="text-gray-400 text-sm mb-1">Taquilla</p>
                        <p className="text-white font-semibold">{movie.BoxOffice}</p>
                      </div>
                    )}
                  </div>

                  {/* Premios */}
                  {movie.Awards && movie.Awards !== 'N/A' && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <span className="w-2 h-2 gradient-secondary rounded-full mr-3"></span>
                        Premios y Reconocimientos
                      </h3>
                      <div className="glass rounded-xl p-4 border border-yellow-400/20">
                        <p className="text-gray-300">{movie.Awards}</p>
                      </div>
                    </div>
                  )}

                  {/* Ratings */}
                  {movie.Ratings && movie.Ratings.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <span className="w-2 h-2 gradient-primary rounded-full mr-3"></span>
                        Calificaciones
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {movie.Ratings.map((rating, index) => (
                          <div
                            key={index}
                            className="glass rounded-xl p-4 text-center border border-white/10"
                          >
                            <p className="text-gray-400 text-sm mb-1">{rating.Source}</p>
                            <p className="text-white font-bold text-lg">{rating.Value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}