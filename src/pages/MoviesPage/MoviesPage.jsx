import { useState, useEffect, useCallback } from "react";
import { searchMovies } from "../../services/apiService.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = useCallback(
    async (searchQuery) => {
      if (!searchQuery) {
        setMovies([]);
        return;
      }

      try {
        const response = await searchMovies(searchQuery);
        setMovies(response.data.results);

        setSearchParams({ name: searchQuery });
      } catch (error) {
        console.error("Error searching for movies:", error);
      }
    },
    [setSearchParams]
  );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.search.value;

    handleSearch(searchQuery);

    form.reset();
  };

  useEffect(() => {
    const searchQuery = searchParams.get("name");

    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchParams, handleSearch]);

  return (
    <div className={styles.moviesContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={query}
          onChange={handleQueryChange}
          className={styles.searchInput}
          placeholder="Search for movies..."
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
