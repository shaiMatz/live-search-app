import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
      },
      {
        "adult": false,
        "backdrop_path": "/9h15FWJFZstTGLTUVbToCEFdH9F.jpg",
        "id": 227004,
        "title": "The Brothers Sun",
        "original_language": "en",
        "original_title": "The Brothers Sun",
        "overview": "When a mysterious enemy targets his family, a Taipei triad member heads to Los Angeles to protect his strong-willed mother and oblivious younger brother.",
        "poster_path": "/3DqCpvu2A1euAR0kkcoxtfSiW7A.jpg",
        "media_type": "tv",
        "genre_ids": [
          18,
          80
        ],
        "popularity": 147.4,
        "first_air_date": "2024-01-04",
        "vote_average": 8.6,
        "vote_count": 19,
        "origin_country": [
          "US"
        ]
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
      target: { value: mockMovies[0].title },
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

  //This test checks if the movie overview text is rendered correctly for each movie.
  it("renders movie overviews", () => {
    render(<LiveSearch movies={mockMovies} genres={mockGenres} />);
    expect(screen.getByText(new RegExp(mockMovies[0].overview.split(' ').slice(0, 3).join(' '), 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockMovies[1].overview.split(' ').slice(0, 3).join(' '), 'i'))).toBeInTheDocument();
  });

  //This test ensures that a message is displayed when there are no results for a search query.
  it("displays no results message for an unmatched search", () => {
    render(<LiveSearch movies={mockMovies} genres={mockGenres} />);
    fireEvent.change(screen.getByPlaceholderText(/search movies.../i), {
      target: { value: "Non-existent Movie" },
    });
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  //Test Error Handling and Edge Cases - Undefined Movies Data
  it('handles undefined movies data gracefully', () => {
    render(<LiveSearch movies={[]} genres={mockGenres} />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });
   
  
//Test Loading Indicator Functionality
  it('shows loading indicator when fetching more movies', () => {
    render(<LiveSearch movies={mockMovies} genres={mockGenres} />);
    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    expect
  
});

it('renders genre filter when genres are provided', () => {
    render(<LiveSearch movies={mockMovies} genres={mockGenres} />);
    expect(screen.getByText(/Select Genre/i)).toBeInTheDocument();
  });
  
  it('does not render genre filter when no genres are provided', () => {
    render(<LiveSearch movies={mockMovies} genres={[]} />);
    expect(screen.queryByText(/Select Genre/i)).not.toBeInTheDocument();
  });
  
  

});
