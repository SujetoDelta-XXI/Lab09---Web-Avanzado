# 🎬 Aplicación de Películas - Next.js con OMDB API

Una aplicación completa de películas que demuestra el uso correcto de **SSR** y **CSR** en Next.js 15 usando OMDB API.

## 🚀 Características

### 1. Página Principal (SSR)
- **Ruta**: `/movies`
- **Tecnología**: Server Side Rendering
- **Funcionalidad**: Muestra películas populares
- **Por qué SSR**: Los datos se necesitan inmediatamente para SEO y rendimiento inicial

### 2. Búsqueda (CSR)
- **Ruta**: `/movies/search`
- **Tecnología**: Client Side Rendering con `'use client'`
- **Funcionalidad**: Búsqueda interactiva en tiempo real
- **Por qué CSR**: Necesita interactividad sin recargar la página

### 3. Detalles de Película
- **Tecnología**: Modal con CSR
- **Funcionalidad**: Información completa de cada película
- **Hooks utilizados**: `useState`, `useEffect`

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Axios** - Cliente HTTP
- **OMDB API** - Open Movie Database (1000 requests gratuitos/día)

## 📁 Estructura del Proyecto

```
app/movies/
├── components/
│   ├── MovieCard.tsx      # Tarjeta de película reutilizable
│   └── MovieModal.tsx     # Modal de detalles (CSR)
├── services/
│   ├── omdb.ts           # Servicios de OMDB API
│   └── mockData.ts       # Datos de ejemplo
├── search/
│   └── page.tsx          # Página de búsqueda (CSR)
├── types.ts              # Tipos TypeScript
├── page.tsx              # Página principal (SSR)
└── README.md             # Esta documentación
```

## 🔧 Configuración

1. **Obtener API Key de OMDB**:
   - Visita [OMDB API](https://www.omdbapi.com/apikey.aspx)
   - Crea una cuenta gratuita (1000 requests/día)
   - Obtén tu API key por email

2. **Configurar variables de entorno**:
   Edita `.env.local`:
   ```
   NEXT_PUBLIC_OMDB_API_KEY=tu_api_key_aqui
   ```

3. **Instalar dependencias**:
   ```bash
   npm install
   ```

4. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## 📋 Criterios de Evaluación Cumplidos

### ✅ Uso correcto de 'use client' directive
- **CSR**: `/movies/search/page.tsx` usa `'use client'` para interactividad
- **SSR**: `/movies/page.tsx` NO usa `'use client'` para renderizado del servidor

### ✅ Uso de async/await
- **SSR**: `getPopularMovies()` en la página principal
- **CSR**: `searchMovies()` y `getMovieDetails()` en búsqueda y modal

### ✅ UI atractiva con Tailwind CSS
- Diseño responsive con grid system
- Tarjetas de películas con hover effects
- Modal elegante para detalles
- Colores y tipografía consistentes

### ✅ Manejo de hooks useState y useEffect
- `useState`: Manejo de estado de búsqueda, películas, loading, errores
- `useEffect`: Búsqueda con debounce, carga de detalles, parámetros URL

### ✅ Justificación de CSR vs SSR

#### **SSR en Página Principal** (`/movies`)
- **Razón**: Las películas populares deben estar disponibles inmediatamente
- **Beneficios**: Mejor SEO, carga inicial más rápida, contenido visible sin JavaScript
- **Implementación**: Función async en componente del servidor

#### **CSR en Búsqueda** (`/movies/search`)
- **Razón**: Necesita interactividad en tiempo real sin recargar
- **Beneficios**: Búsqueda instantánea, mejor UX, estado persistente
- **Implementación**: `'use client'` + hooks de React

## 🎯 Funcionalidades Implementadas

### Página Principal (SSR)
- ✅ Lista de películas populares
- ✅ Renderizado del servidor
- ✅ Manejo de errores
- ✅ Navegación a búsqueda

### Búsqueda (CSR)
- ✅ Input de búsqueda interactivo
- ✅ Resultados en tiempo real
- ✅ Debounce para optimizar requests
- ✅ Sin recargar la página
- ✅ Estados de loading y error

### Detalles de Película
- ✅ Modal con información completa
- ✅ Navegación desde ambas páginas
- ✅ Datos adicionales (géneros, presupuesto, etc.)
- ✅ Imágenes optimizadas

## 🔄 Flujo de Navegación

1. **Inicio**: Usuario visita `/movies` (SSR)
2. **Explorar**: Ve películas populares cargadas del servidor
3. **Buscar**: Hace clic en "Buscar Películas" → `/movies/search` (CSR)
4. **Interactuar**: Escribe en el buscador, ve resultados en tiempo real
5. **Detalles**: Hace clic en una película → Modal con detalles completos

## 🚀 Próximas Mejoras

- [ ] Paginación en resultados
- [ ] Filtros por género y año
- [ ] Favoritos con localStorage
- [ ] Modo oscuro
- [ ] Compartir películas
- [ ] Reseñas de usuarios

## 📚 Recursos

- [Next.js App Router](https://nextjs.org/docs/app)
- [OMDB API Documentation](https://www.omdbapi.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hooks](https://react.dev/reference/react)

## 🔗 URLs de OMDB API

- **Documentación**: https://www.omdbapi.com
- **Generar API key**: https://www.omdbapi.com/apikey.aspx
- **URL base**: `http://www.omdbapi.com/?apikey=[yourkey]&`
- **Búsqueda general**: `https://www.omdbapi.com/?apikey=f1def80d&s=marvel`
- **Búsqueda por título y año**: `https://www.omdbapi.com/?apikey=f1def80d&t=suits&y=2012`
- **Búsqueda por ID**: `https://www.omdbapi.com/?apikey=f1def80d&i=tt3784006`