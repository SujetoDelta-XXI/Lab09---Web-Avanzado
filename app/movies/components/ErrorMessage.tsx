'use client';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="text-center py-20">
      <div className="glass rounded-2xl p-8 max-w-md mx-auto border border-red-400/20">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          ⚠️
        </div>
        <h3 className="text-xl font-bold text-white mb-4">¡Oops! Algo salió mal</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">{message}</p>
        <button
          onClick={handleRetry}
          className="gradient-secondary px-6 py-3 rounded-xl text-white font-semibold hover-lift transition-all hover:shadow-lg hover:shadow-pink-500/25"
        >
          🔄 Reintentar
        </button>
      </div>
    </div>
  );
}