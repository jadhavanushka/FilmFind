import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch movies with filters
  const fetchMovies = async (query, type = 'movie') => {
    setLoading(true);
    setError('');
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    let url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    // Append filter to the API URL
    if (type !== 'all') 
      url += `&type=${type}`;

    try {
      const response = await axios.get(url);
      if (response.data.Response === 'False') {
        setError(response.data.Error);
      } else {
        setMovies(response.data.Search || []);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-4xl text-center mb-8 font-bold">Movie Search</h1>
      <SearchBar onSearch={fetchMovies} />
      {loading && <p className='text-center'>Loading...</p>}
      {error && <p className='text-center'>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
