import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const API_RAT =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODcyNDJkN2ZlNWQ3YzBmY2I1MTU2MzJhY2QyNzBlMSIsIm5iZiI6MTcyOTQ5NjA1MC4yMzkzMTQsInN1YiI6IjY3MTYwMmY5YmQ5MWM4MzgyOWQ3NGRiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MpYpYwrpdkkxRrL02YvWDmaJi_hp6dJBgSyFHnZRd7M";
const TOKEN = `Bearer ${API_RAT}`;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN,
  },
  timeout: 10000,
});

export const fetchMovieDetails = (movieId) => {
  return apiClient.get(`/movie/${movieId}`);
};

export const fetchMovieCast = (movieId) => {
  return apiClient.get(`/movie/${movieId}/credits`);
};

export const fetchMovieReviews = (movieId) => {
  return apiClient.get(`/movie/${movieId}/reviews`);
};

export const searchMovies = (query) => {
  return apiClient.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
};

export const fetchTrendingMovies = () => {
  return apiClient.get("/trending/movie/day");
};
