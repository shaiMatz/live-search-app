import { useRef, useState, useEffect } from "react";
import MovieCard from "./Movie";

// Debounce function to limit the frequency of API calls
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const LiveSearch = ({ movies, genres }) => {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const moviesPerPage = 20; // Adjust the number of movies to display per page
  const indexOfLastMovie = pageNumber * moviesPerPage;
  const currentMovies = movies.slice(0, indexOfLastMovie);

  useEffect(() => {
    setDisplayedMovies(currentMovies);
  }, [pageNumber, movies]);

  // Intersection Observer to trigger loading more movies
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true); // Start loading
          setPageNumber((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading]);
  useEffect(() => {
    // After updating displayedMovies or filtering logic
    setLoading(false); // Stop loading
  }, [displayedMovies]);
  // Update the displayed movies based on query and selected genre
  useEffect(() => {
    const filterMovies = () => {
      let result = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          (movie.release_date &&
            movie.release_date
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase())) ||
          movie.overview.toLowerCase().includes(query.toLowerCase()) ||
          movie.vote_count
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          movie.vote_average
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase())
      );

      if (selectedGenre) {
        result = result.filter((movie) =>
          movie.genre_ids.includes(parseInt(selectedGenre))
        );
      }

      // After filtering, update displayedMovies
      setDisplayedMovies(result.slice(0, pageNumber * moviesPerPage));
    };

    filterMovies();
  }, [query, selectedGenre, pageNumber, movies]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Render the LiveSearch component
  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            className="border p-3 rounded w-full h-12 text-lg"
            placeholder="Search movies..."
          />
          <div className="absolute top-0 right-0 mt-3 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="border p-2 rounded mb-4"
      >
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {loading && <div className="loader"></div>}
        <div ref={loader} />
      </div>
    </div>
  );
};

export default LiveSearch;
