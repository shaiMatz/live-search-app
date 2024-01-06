import { render, screen } from '@testing-library/react';
import Movie from './Movie';
import React from 'react';

describe('Movie Component', () => {
  const mockMovie = {
    "adult": false,
    "backdrop_path": "/vdpE5pjJVql5aD6pnzRqlFmgxXf.jpg",
    "id": 906126,
    "title": "Society of the Snow",
    "original_language": "es",
    "original_title": "La sociedad de la nieve",
    "overview": "On October 13, 1972, Uruguayan Air Force Flight 571, chartered to take a rugby team to Chile, crashes into a glacier in the heart of the Andes.",
    "poster_path": "/k7rEpZfNPB35FFHB00ZhXHKTL7X.jpg",
    "media_type": "movie",
    "genre_ids": [
      18,
      36
    ],
    "popularity": 334.459,
    "release_date": "2023-12-13",
    "video": false,
    "vote_average": 8,
    "vote_count": 128
  };

  it('renders movie information', () => {
    render(<Movie movie={mockMovie} />);
    expect(screen.getByText(/Society of the Snow/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp("On October 13, 1972, Uruguayan Air Force Flight 571", "i"))).toBeInTheDocument();
    expect(screen.getByText(/2023-12-13/i)).toBeInTheDocument();
    expect(screen.getByText(/8/i)).toBeInTheDocument();
  });

    it('renders movie poster', () => {
        render(<Movie movie={mockMovie} />);
        expect(screen.getByAltText(/Society of the Snow/i)).toBeInTheDocument();
    });

    //This test confirms that the movie poster image is rendered with the correct src attribute.
    it('renders movie poster', () => {
        render(<Movie movie={mockMovie} />);
        const posterImage = screen.getByAltText(/Society of the Snow/i);
        expect(posterImage).toBeInTheDocument();
        // Assuming the base URL is "https://image.tmdb.org/t/p/w500"
        expect(posterImage).toHaveAttribute('src', `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`);
      });
      




});
