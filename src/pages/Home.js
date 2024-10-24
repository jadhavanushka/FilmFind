import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const navigate = useNavigate();

  const handleSearch = (searchQuery, searchType) => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
      setType(searchType);
      navigate(`/search?q=${searchQuery}&type=${searchType}`);
    }
  };

  return (
    <div className="flex flex-col min-h-[80vh] text-white justify-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-8 it text-center">FilmFind</h1>
      <div className='mx-4'>
        <SearchBar onSearch={handleSearch} initialQuery={query} initialType={type} />
      </div>
    </div>
  );
};

export default Home;
