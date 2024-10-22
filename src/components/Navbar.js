import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; 

const Navbar = ({ onSearch, initialQuery, initialType }) => {
  return (
    <nav className="border-b-2 border-b-gray-800 p-4 flex justify-between items-center lg:px-20">
      <Link to="/" className="text-white text-2xl font-bold">
        FilmFind
      </Link>
      
      <div className="hidden md:block">
      <SearchBar onSearch={onSearch} initialQuery={initialQuery} initialType={initialType} />
      </div>
    </nav>
  );
};

export default Navbar;
