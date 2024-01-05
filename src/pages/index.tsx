import getConfig from "next/config";
import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import LiveSearch from "../components/livesearch";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTBhMzc1N2E4NTAzNjJkMTFhZjMwYTMxODhkODJmMyIsInN1YiI6IjY1OTdlYThlNjBjNTFkMjI2Yjk3ODlhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HNWpuajeQBVS4DEd_JYEUamU1NWCEN1fHxW9DUGdJWM";

  export async function getServerSideProps() {
    const movieUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
  
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  
    try {
      const movieResponse = await fetch(movieUrl, options);
      const genreResponse = await fetch(genreUrl, options);
  
      if (!movieResponse.ok) {
        throw new Error(`Failed to fetch movies: ${movieResponse.status}`);
      }
      if (!genreResponse.ok) {
        throw new Error(`Failed to fetch genres: ${genreResponse.status}`);
      }
  
      const movieData = await movieResponse.json();
      const genreData = await genreResponse.json();
  
      return {
        props: {
          movies: movieData.results, // Send the movie data to the page as props
          genres: genreData.genres,  // Send the genre data to the page as props
        },
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      let errorMessage = "An error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return {
        props: {
          error: errorMessage,
        },
      };
    }
  }

interface MyPageProps {
  movies?: any;
  genres?: any;
  error?: string;
}

export default function Home({ movies,genres, error }: MyPageProps) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  return <main>
<main>
      <LiveSearch movies={movies} genres={genres} />
    </main>
  </main>;
}
