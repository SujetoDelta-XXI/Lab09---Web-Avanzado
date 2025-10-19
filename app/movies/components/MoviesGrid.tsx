'use client';

import { useRouter } from 'next/navigation';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface MoviesGridProps {
  movies: Movie[];
}

export default function MoviesGrid({ movies }: MoviesGridProps) {
  const router = useRouter();

  const handleMovieClick = (movie: Movie) => {
    // Navegar a la página de búsqueda con el ID de la película
    router.push(`/movies/search?movieId=${movie.imdbID}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={handleMovieClick}
        />
      ))}
    </div>
  );
}