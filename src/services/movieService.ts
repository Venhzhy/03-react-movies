import axios, { type AxiosResponse } from 'axios'
import { type Movie } from '../types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string

if (!TOKEN) {
  throw new Error('VITE_TMDB_TOKEN is not defined')
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
})

interface SearchMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export async function fetchMovies(query: string): Promise<SearchMoviesResponse> {
  const config = {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  }

  const res: AxiosResponse<SearchMoviesResponse> = await axiosInstance.get(
    '/search/movie',
    config
  )
  return res.data
}
