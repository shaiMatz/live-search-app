// LiveSearch.jsx or LiveSearch.tsx
import { useState, useEffect } from "react";

const LiveSearch = ({ movies }) => {
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const result = movies.filter(
      (movie) =>
        //filter by title and overview
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.release_date.toLowerCase().includes(query.toLowerCase()) ||
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
    setFilteredMovies(result);
  }, [query, movies]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <ul className="list-disc">
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            {movie.title}
            {movie.overview}
            {movie.release_date}
            {movie.vote_count}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default LiveSearch;
