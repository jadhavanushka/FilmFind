import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

  const isValidData = (data) => data && data !== "N/A";

  if (!movie) {
    return <div className='text-center'>Loading...</div>;
  }

  return (
    <div className="flex flex-col ">
      <div className='flex justify-between mb-6'>
        <div>
          <h2 className="text-5xl font-medium mb-4">{movie.Title}</h2>
          <div className='flex gap-3 text-gray-300'>
            {isValidData(movie.Year) && <p>{movie.Year}</p>}
            {isValidData(movie.Rated) && <p>{movie.Rated}</p>}
            {isValidData(movie.Runtime) && <p>{movie.Runtime}</p>}
          </div>
        </div>

        <Link to={`https://www.imdb.com/title/${movie.imdbID}`} className="hidden md:block">
          {isValidData(movie.imdbRating) &&
            <div className='flex flex-col text-gray-300 items-start'>
              <p className='text-sm font-medium'>IMDb RATING</p>
              <p className='text-xl'><span className='text-white font-medium text-2xl'>{movie.imdbRating}</span>/10</p>
              <p className='text-sm'>{movie.imdbVotes}</p>
            </div>
          }
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {isValidData(movie.Poster) && (
          <img src={movie.Poster} alt={`${movie.Title} Poster`} className="" />
        )}

        <div className='flex flex-col w-full md:w-2/3 text-gray-300'>
          <div className='flex flex-wrap gap-2 mt-2 mb-4'>
            {isValidData(movie.Genre) && movie.Genre.split(', ').map((genre, index) => (
              <span key={index} className="border border-gray-400 text-white px-3 py-1 rounded-full text-sm">
                {genre}
              </span>
            ))}
          </div>

          {isValidData(movie.Plot) && <p className='mb-4 text-white'> {movie.Plot}</p>}

          <Link to={`https://www.imdb.com/title/${movie.imdbID}`} className="block md:hidden">
            {isValidData(movie.imdbRating) &&
              <div className='flex text-gray-300 items-center gap-2 mb-4'>
                <p className='text-sm font-bold'>IMDb RATING</p>
                <p className='text-sm'><span className='text-white font-medium text-lg'>{movie.imdbRating}</span>/10</p>
                <p className='text-sm'>{movie.imdbVotes}</p>
              </div>
            }
          </Link>

          {isValidData(movie.Director) && <p className='mb-3 pt-3 border-t-2 border-gray-800'>
            <span className='text-white mb-4 mr-1 font-bold'>Director</span> {movie.Director}</p>}
          {isValidData(movie.Writer) && <p className='mb-3 pt-3 border-t-2 border-gray-800'>
            <span className='text-white mb-4 mr-1 font-bold'>Writers</span> {movie.Writer}</p>}
          {isValidData(movie.Actors) && <p className='mb-3 pt-3 border-t-2 border-gray-800'>
            <span className='text-white mb-4 mr-1 font-bold'>Stars</span> {movie.Actors}</p>}
          {isValidData(movie.Language) && <p className='mb-3 pt-3 border-t-2 border-gray-800'>
            <span className='text-white mb-4 mr-1 font-bold'>Language</span> {movie.Language}</p>}
          {isValidData(movie.totalSeasons) && <p className='mb-3 pt-3 border-t-2 border-gray-800'>
            <span className='text-white mb-4 mr-1 font-bold'>Seasons</span> {movie.totalSeasons}</p>}
          {isValidData(movie.Released) && <p className='mb-3 pt-3 border-t-2 border-gray-800'>
            <span className='text-white mb-4 mr-1 font-bold'>Released</span> {movie.Released}</p>}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
