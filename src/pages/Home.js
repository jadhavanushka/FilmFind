import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  const fetchMovies = async (query, type = 'all', page = 1) => {
    setLoading(true);
    setError('');
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    let url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    // Append filter to the API URL
    if (type !== 'all')
      url += `&type=${type}`;

    if (page) url += `&page=${page}`;

    try {
      const response = await axios.get(url);
      if (response.data.Response === 'False') {
        setError(response.data.Error);
      } else {
        setMovies(response.data.Search || []);
        setTotalResults(parseInt(response.data.totalResults));
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  // Handle search query and filter
  const handleSearch = (query, type) => {
    setQuery(query);
    setType(type);
    setPage(1);
    fetchMovies(query, type, 1);
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchMovies(query, type, newPage);
  };

  const handlePreviousPage = () => {
    const newPage = page - 1;
    if (newPage > 0) {
      setPage(newPage);
      fetchMovies(query, type, newPage);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center mb-8 font-bold">Movie Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className='text-center'>Loading...</p>}
      {error && <p className='text-center'>{error}</p>}
      <MovieList movies={movies} />

      {totalResults > 0 &&
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="py-2.5 px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 
            hover:bg-blue-800 disabled:bg-gray-700 disabled:border-gray-700 disabled:text-gray-300 rounded-lg">
            Previous
          </button>
          <span className="text-md">
            Page {page} of {Math.ceil(totalResults / 10)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page * 10 >= totalResults}
            className="py-2.5 px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 
            hover:bg-blue-800 disabled:bg-gray-700 disabled:border-gray-700 disabled:text-gray-300 rounded-lg">
            Next
          </button>
        </div>
      }
    </div>
  );
};

export default Home;
