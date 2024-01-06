import { render, screen } from '@testing-library/react';
import Movie from './Movie';
import React from 'react';

describe('Movie Component', () => {
  const mockMovie = {
    title: 'Example Movie',
    overview: 'This is an example overview.',
    poster_path: '/example.jpg',
    release_date: '2021-01-01',
    vote_average: 8.5,
  };

  it('renders movie information', () => {
    render(<Movie movie={mockMovie} />);
    expect(screen.getByText(/example movie/i)).toBeInTheDocument();
    expect(screen.getByText(/this is an example overview./i)).toBeInTheDocument();
    expect(screen.getByText(/2021-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/8.5/i)).toBeInTheDocument();
  });

    it('renders movie poster', () => {
        render(<Movie movie={mockMovie} />);
        expect(screen.getByAltText(/example movie/i)).toBeInTheDocument();
    });

    




});
