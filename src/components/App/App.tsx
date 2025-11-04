import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import { fetchMovies } from '../../services/movieService'
import { type Movie } from '../../types/movie'
import toast from 'react-hot-toast'
import './App.module.css';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Movie | null>(null)

  const handleSearch = async (query: string) => {
    setLoading(true)
    setError(null)
    setMovies([]) 
    try {
      const data = await fetchMovies(query)
      if (!data.results || data.results.length === 0) {
        toast('No movies found for your request.')
        setMovies([])
      } else {
        setMovies(data.results)
      }
    } catch (err) {
      setError('Error fetching movies')
      toast.error('There was an error fetching movies.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (movie: Movie) => {
    setSelected(movie)
  }

  const handleCloseModal = () => {
    setSelected(null)
  }

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selected && <MovieModal movie={selected} onClose={handleCloseModal} />}
    </div>
  )
}

export default App
