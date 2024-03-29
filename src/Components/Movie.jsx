// Import necessary hooks from React
import { useState } from "react";
import React from 'react';

// Component to display individual movie details
const MovieCard = ({ movie }) => {
  const [showFullOverview, setShowFullOverview] = useState(false);

  const toggleOverviewDisplay = () => {
    setShowFullOverview(!showFullOverview);
  };

  // Render the movie card
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img
        className="w-full"
        loading="lazy" 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`Poster of ${movie.title}`}
      />
      <div className="px-6 py-4">
        <p className="font-bold text-xl mb-2">{movie.title}</p>
        <p className="text-gray-400 text-base">
          {showFullOverview
            ? movie.overview
            : `${movie.overview.substring(0, 100)}...`}
          {movie.overview.length > 100 && (
            <button
              onClick={toggleOverviewDisplay}
              className="text-blue-500 text-sm ml-2"
            >
              {showFullOverview ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Release Date: {movie.release_date}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Rating: {movie.vote_average}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
