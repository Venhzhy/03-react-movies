import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import css from './MovieModal.module.css'
import { type Movie } from '../../types/movie'

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original'

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow 
    }
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
        {movie.backdrop_path && (
          <img
            src={`${IMAGE_BASE}${movie.backdrop_path}`}
            alt={movie.title}
            className={css.image}
          />
        )}
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default MovieModal
