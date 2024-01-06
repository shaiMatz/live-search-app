import { useState, useEffect, useRef } from "react";
import MovieCard from "./Movie";
import React from 'react';

const LiveSearch = ({ movies, genres }) => {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortMethod, setSortMethod] = useState("");
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const moviesPerPage = 20; // Adjust as needed

  // Function to sort movies based on the selected sort method
  const sortMovies = (moviesList) => {
    switch (sortMethod) {
      case "releaseDateDesc":
        return moviesList.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "releaseDateAsc":
        return moviesList.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      case "rating":
        return moviesList.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return moviesList;
    }
  };

  // Function to filter and sort movies based on query, genre, and sort method
  useEffect(() => {
    const filterAndSortMovies = () => {
      let result = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          (movie.release_date &&
            movie.release_date
            .toString()
              .toLowerCase()
              .includes(query.toLowerCase())) ||
          movie.overview.toLowerCase().includes(query.toLowerCase()) ||
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

      let sortedMovies = sortMovies(result);
      setDisplayedMovies(sortedMovies.slice(0, pageNumber * moviesPerPage));
    };

    filterAndSortMovies();
  }, [query, selectedGenre, pageNumber, movies, sortMethod]);

  // Infinite scrolling logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
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

  // Update loading state when new data is fetched or filtering is done
  useEffect(() => {
    setLoading(false);
  }, [displayedMovies]);

  // Handlers for query and genre change
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
      <div className="flex flex-wrap gap-2 mb-4">
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
        <select
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value)}
          className="border p-2 rounded mb-4"
        >
          <option value="">Sort by</option>
          <option value="releaseDateDesc">Release Date (Newest First)</option>
          <option value="releaseDateAsc">Release Date (Oldest First)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>
      </div>
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
