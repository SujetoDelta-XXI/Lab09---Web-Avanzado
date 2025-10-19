import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <main className="text-center max-w-4xl mx-auto">
        {/* Logo y título principal */}
        <div className="mb-12">
          <div className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 pulse-glow">
            🎬
          </div>
          <h1 className="text-6xl font-bold text-white mb-4 neon-text">
            CineVerse
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Aplicación moderna de películas con Next.js 15
          </p>
          <div className="w-32 h-1 gradient-accent mx-auto rounded-full"></div>
        </div>

        {/* Características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-2xl p-6 border border-white/10 hover-lift transition-all">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">SSR & CSR</h3>
            <p className="text-gray-300 text-sm">
              Implementación correcta de Server Side Rendering y Client Side Rendering
            </p>
          </div>
          
          <div className="glass rounded-2xl p-6 border border-white/10 hover-lift transition-all">
            <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
              🎨
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Diseño Moderno</h3>
            <p className="text-gray-300 text-sm">
              UI atractiva con Tailwind CSS, glassmorphism y efectos de neón
            </p>
          </div>
          
          <div className="glass rounded-2xl p-6 border border-white/10 hover-lift transition-all">
            <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
              🔍
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">OMDB API</h3>
            <p className="text-gray-300 text-sm">
              Integración con OMDB API para datos reales de películas
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-6 items-center justify-center flex-col sm:flex-row">
          <a
            className="gradient-primary px-8 py-4 rounded-2xl text-white font-bold text-lg hover-lift transition-all hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-3"
            href="/movies"
          >
            🎬 Explorar CineVerse
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          
          <a
            className="glass px-8 py-4 rounded-2xl text-white font-semibold hover-lift transition-all border border-white/20"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            📚 Documentación Next.js
          </a>
        </div>

        {/* Tecnologías utilizadas */}
        <div className="mt-16">
          <p className="text-gray-400 text-sm mb-4">Construido con:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="glass px-4 py-2 rounded-full text-white text-sm border border-white/10">Next.js 15</span>
            <span className="glass px-4 py-2 rounded-full text-white text-sm border border-white/10">TypeScript</span>
            <span className="glass px-4 py-2 rounded-full text-white text-sm border border-white/10">Tailwind CSS</span>
            <span className="glass px-4 py-2 rounded-full text-white text-sm border border-white/10">OMDB API</span>
          </div>
        </div>
      </main>
      {/* Footer minimalista */}
      <footer className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-gray-500 text-sm">
          Desarrollado con ❤️ usando Next.js 15
        </p>
      </footer>
    </div>
  );
}
