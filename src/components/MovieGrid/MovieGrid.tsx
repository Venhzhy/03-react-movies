import React from 'react'
import styles from './MovieGrid.module.css'
import { type Movie } from '../../types/movie'

interface MovieGridProps {
  movies: Movie[]
  onSelect: (movie: Movie) => void
}

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  if (!movies || movies.length === 0) return null

  return (
    <ul className={styles.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div
            className={styles.card}
            onClick={() => onSelect(m)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSelect(m)
            }}
          >
            <img
              className={styles.image}
              src={m.poster_path ? `${IMAGE_BASE}${m.poster_path}` : '/placeholder.png'}
              alt={m.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MovieGrid
