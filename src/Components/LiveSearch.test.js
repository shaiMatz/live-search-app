import { render, screen, fireEvent } from "@testing-library/react";
import LiveSearch from "./LiveSearch";
import React from "react";

// Mock the IntersectionObserver globally to avoid errors in Jest environment
global.IntersectionObserver = class {
  constructor() {}

  disconnect() {}

  observe() {}

  takeRecords() {}

  unobserve() {}
};

// Mock data for movies and genres
describe("LiveSearch Component", () => {
  const mockMovies = [
    {
      id: 1,
      title: "Inception",
      overview:
        "A thief who steals corporate secrets through the use of dream-sharing technology...",
      poster_path: "/inception.jpg",
      release_date: "2010-07-16",
      vote_average: 8.3,
      genre_ids: [28, 878],
    },
    {
      id: 2,
      title: "Interstellar",
      overview:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival...",
      poster_path: "/interstellar.jpg",
      release_date: "2014-11-07",
      vote_average: 8.6,
      genre_ids: [12, 18, 878],
    },
  ];
  const mockGenres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
  ];

  // Test case to check if the LiveSearch component renders without crashing
  it("renders without crashing", () => {
    render(<LiveSearch movies={mockMovies} genres={mockGenres} />);
    expect(
      screen.getByPlaceholderText(/search movies.../i)
    ).toBeInTheDocument();
  });

  // Test case to check if the movie titles are rendered correctly
  it("renders movie titles", () => {
    render(<LiveSearch movies={mockMovies} genres={mockGenres} />);
    expect(screen.getByText(mockMovies[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockMovies[1].title)).toBeInTheDocument();
  });

  // Test case to check if the movie titles are filtered correctly
  it("filters movie titles", () => {
    render(<LiveSearch movies={mockMovies} genres={mockGenres} />);
    fireEvent.change(screen.getByPlaceholderText(/search movies.../i), {
      target: { value: "Inception" },
    });
    expect(screen.getByText(mockMovies[0].title)).toBeInTheDocument();
    expect(screen.queryByText(mockMovies[1].title)).not.toBeInTheDocument();
  });

  // Test case to check if the movie genres are rendered correctly
  it("renders movie genres", () => {
    render(<LiveSearch movies={mockMovies} genres={mockGenres} />);
    expect(screen.getByText(mockGenres[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockGenres[1].name)).toBeInTheDocument();
  });
  
});
