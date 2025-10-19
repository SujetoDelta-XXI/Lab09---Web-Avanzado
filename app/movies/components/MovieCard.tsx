import { Movie } from '../types';
import { getImageUrl } from '../services/omdb';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const formatDate = (year: string) => {
    return year;
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div 
      className="glass rounded-2xl overflow-hidden cursor-pointer hover-lift transition-all group hover-glow border border-white/10"
      onClick={() => onClick(movie)}
    >
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-movie.svg';
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Rating badge */}
        {movie.vote_average > 0 && (
          <div className="absolute top-4 right-4 glass-dark px-3 py-2 rounded-xl text-white text-sm font-semibold backdrop-blur-md">
            <span className="text-yellow-400">⭐</span> {formatRating(movie.vote_average)}
          </div>
        )}

        {/* Year badge */}
        <div className="absolute top-4 left-4 gradient-accent px-3 py-1 rounded-full text-white text-xs font-bold">
          {formatDate(movie.year)}
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-2xl text-white shadow-2xl pulse-glow">
            ▶️
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 line-clamp-2 text-white group-hover:text-blue-300 transition-colors">
          {movie.title}
        </h3>
        
        <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {movie.overview}
        </p>

        {/* Action indicator */}
        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Ver detalles</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}