import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="p-3 m-2 w-1/6">
      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
      <h3 className='font-medium mt-2'>{movie.Title} ({movie.Year})</h3>
      <p className='text-sm text-gray-300'>{movie.Type}</p>
    </div>
  );
};

export default MovieCard;
