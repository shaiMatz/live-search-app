import getConfig from "next/config";
import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import Livesearch from "../components/livesearch";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTBhMzc1N2E4NTAzNjJkMTFhZjMwYTMxODhkODJmMyIsInN1YiI6IjY1OTdlYThlNjBjNTFkMjI2Yjk3ODlhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HNWpuajeQBVS4DEd_JYEUamU1NWCEN1fHxW9DUGdJWM";

export async function getServerSideProps() {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

  //set the options for the request
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  //make the request
  try {
    const response = await fetch(url, options);
    //check if the response is ok
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    //get the data
    const data = await response.json();
    //return the data as props
    return {
      props: {
        data, // Send the data to the page as props
      },
    };
    //catch any errors
  } catch (error) {
    console.error("Error fetching data:", error);
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    //return the error as props so the page can use it
    return {
      props: {
        error: errorMessage,
      },
    };
  }
}

interface MyPageProps {
  data?: any;
  error?: string;
}

export default function Home({ data, error }: MyPageProps) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  return <main>
    <Livesearch movies={data.results} />

  </main>;
}
