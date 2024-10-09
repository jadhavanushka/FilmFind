import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import './index.css'; // Import Tailwind CSS

const App = () => {
  const [movies, setMovies] = useState([]);

  // Function to fetch movies from OMDB
  const fetchMovies = async (query) => {
    const apiKey = process.env.OMDB_API_KEY;
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-4xl text-center mb-8 font-bold">Movie Search</h1>
      <div >
      <SearchBar onSearch={fetchMovies} />
      </div>
      <MovieList movies={movies} />
    </div>
  );
};

export default App;
