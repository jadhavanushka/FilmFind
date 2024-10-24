import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; 

const Navbar = ({ onSearch, initialQuery, initialType }) => {
  return (
    <nav className="border-b-2 border-b-gray-800 p-4 flex flex-col md:flex-row justify-center md:justify-between gap-4 items-center lg:px-20">
      <Link to="/" className="text-white text-2xl font-bold">
        FilmFind
      </Link>
      
      <div className="w-full md:w-auto">
      <SearchBar onSearch={onSearch} initialQuery={initialQuery} initialType={initialType} />
      </div>
    </nav>
  );
};

export default Navbar;
