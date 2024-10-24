import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="flex flex-col w-1/3 md:w-1/5 p-2 lg:p-4 mb-2">
      <Link to={`/movie/${movie.imdbID}`} className="block text-center">
        <img src={movie.Poster} alt={`${movie.Title} Poster`} className='rounded-lg' />
        <h3 className='font-medium mt-2'>{movie.Title}</h3>
        <p className='text-sm text-gray-300'>({movie.Year})</p>
      </Link>
    </div>
  );
};

export default MovieCard;
