"use client"; // Enables client-side rendering for this component

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";

// Define the MovieDetails type
type MovieDetails = {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
  imdbRating?: string;
  Genre: string;
  Director: string;
  Actors: string;
  Runtime: string;
  Released: string;
};

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle the search button click
  const handleSearch = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setMovieDetails(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(searchTerm)}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data.Response === "False" || !data) {
        throw new Error(data?.Error || "Movie not found");
      }

      setMovieDetails(data);
    } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
      setLoading(false);
    }
  };

  // Function to handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-1 text-center">Movie Search</h1>
        <p className="mb-6 text-center">Search for any movies and display details.</p>

        <div className="flex items-center mb-6">
          <Input
            type="text"
            placeholder="Enter a movie title"
            value={searchTerm}
            onChange={handleChange}
            className="flex-1 mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleSearch} className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600">
            Search
          </Button>
        </div>

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center">
            <ClipLoader color="#2563EB" size={30} />
          </div>
        )}

        {/* Error message */}
        {error && <div className="text-red-500 text-center mb-4">{error}. Please try again.</div>}

        {/* Movie details */}
        {movieDetails && (
          <div className="flex flex-col items-center">
            <div className="w-full mb-4">
              <Image
                src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "/placeholder.svg"}
                alt={movieDetails.Title}
                width={200}
                height={300}
                className="rounded-md shadow-md mx-auto"
              />
            </div>
            <div className="w-full text-center">
              <h2 className="text-2xl font-bold mb-2">{movieDetails.Title}</h2>
              <p className="text-gray-600 mb-4 italic">{movieDetails.Plot}</p>

              {/* Movie details */}
              <div className="flex justify-center items-center text-gray-500 mb-2">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span className="mr-4">{movieDetails.Year}</span>
                <StarIcon className="w-4 h-4 mr-1 fill-yellow-500" />
                <span>{movieDetails.imdbRating || "N/A"}</span>
              </div>

              <div className="flex justify-center items-center text-gray-500 mb-2">
                <span className="mr-4"><strong>Genre:</strong> {movieDetails.Genre}</span>
              </div>

              <div className="flex justify-center items-center text-gray-500 mb-2">
                <span className="mr-4"><strong>Director:</strong> {movieDetails.Director}</span>
              </div>

              <div className="flex justify-center items-center text-gray-500 mb-2">
                <span className="mr-4"><strong>Actors:</strong> {movieDetails.Actors}</span>
              </div>

              <div className="flex justify-center items-center text-gray-500 mb-2">
                <span className="mr-4"><strong>Runtime:</strong> {movieDetails.Runtime}</span>
              </div>

              <div className="flex justify-center items-center text-gray-500 mb-2">
                <span className="mr-4"><strong>Released:</strong> {movieDetails.Released}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
