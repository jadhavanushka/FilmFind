import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();  // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);

  // Fetch movie details when the component loads
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = process.env.REACT_APP_OMDB_API_KEY;
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row ">
      <img src={movie.Poster} alt={`${movie.Title} Poster`} className="mx-4 mb-4" />
      <div className='flex flex-col w-2/3'>
        <h2 className="text-3xl font-bold mb-4">{movie.Title} ({movie.Year})</h2>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
