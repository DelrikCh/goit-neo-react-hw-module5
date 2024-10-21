import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../services/apiService.js";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetchMovieDetails(movieId);
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div className={styles.movieDetailsContainer}>
      <button
        onClick={() =>
          navigate(
            location.state?.from?.pathname + location.state?.from?.search ||
              "/movies"
          )
        }
        className={styles.backButton}
      >
        ← Go back
      </button>
      {movieDetails && (
        <>
          <div className={styles.movieInfo}>
            <div className={styles.moviePoster}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
            </div>
            <div className={styles.movieDetails}>
              <h1>
                {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
              </h1>
              <p>
                <strong>User Score:</strong>{" "}
                {Math.round(movieDetails.vote_average * 10)}%
              </p>
              <h2>Overview</h2>
              <p>{movieDetails.overview}</p>
              <h3>Genres</h3>
              <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
          </div>

          <div className={styles.additionalInfo}>
            <h2>Additional information</h2>
            <ul>
              <li>
                <Link to="cast" state={{ from: location.state?.from }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to="reviews" state={{ from: location.state?.from }}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <Outlet />
        </>
      )}
    </div>
  );
}

export default MovieDetailsPage;
