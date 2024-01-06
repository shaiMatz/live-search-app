import getConfig from "next/config";
import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import LiveSearch from "../components/livesearch";
import { ErrorBoundary } from "../Components/ErrorBoundary";
import {ErrorThrowingComponent } from "../Components/ErrorThrowingComponent ";
import  ErrorPage from "./_error"
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTBhMzc1N2E4NTAzNjJkMTFhZjMwYTMxODhkODJmMyIsInN1YiI6IjY1OTdlYThlNjBjNTFkMjI2Yjk3ODlhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HNWpuajeQBVS4DEd_JYEUamU1NWCEN1fHxW9DUGdJWM";

  export async function getServerSideProps() {
    const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
  
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  
    try {
          // Fetching movie and genre data
          let movies = [];
      for (let i = 1; i <= 10; i++) {
        const movieUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${i}&sort_by=popularity.desc`;
        const movieResponse = await fetch(movieUrl, options);
         // Error handling for unsuccessful responses
      if (!movieResponse.ok) {
        throw new Error(`Failed to fetch movies: ${movieResponse.status}`);
      }
      const movieData = await movieResponse.json();
      movies.push(...movieData.results); 
      }

          // Fetch genre data

      const genreResponse = await fetch(genreUrl, options);
      
      // Error handling for unsuccessful responses
     
      if (!genreResponse.ok) {
        throw new Error(`Failed to fetch genres: ${genreResponse.status}`);
      }
  
      const genreData = await genreResponse.json();
  
      return {
        props: {
          movies: movies, // Send the movie data to the page as props
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

// Define props interface for type checking
interface MyPageProps {
  movies?: any;
  genres?: any;
  error?: string;
}

export default function Home({ movies,genres, error }: MyPageProps) {
    // Display error message if there is an error
  if (error) {
    return <div>Error: {error}</div>;
  }
    // Display error message if there is an error

  return <main>
<main>
<ErrorBoundary  >
      <LiveSearch movies={movies} genres={genres} />
      </ErrorBoundary>

      {/* test for check if the _error.js is working */}
      <ErrorBoundary  FallbackComponent={ErrorPage}
      onReset={() => (location.href = '/')} >
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    </main>
  </main>
}
