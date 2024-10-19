import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('all');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query, type);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="py-2.5 px-4 text-sm font-medium text-start text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 ">
                    <option value="all">All</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>
                <div className="relative w-full">
                    <input type="text"
                        placeholder="Search..." 
                        className="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" 
                    className="absolute top-0 end-0 py-2.5 px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800">
                        <FaSearch></FaSearch>
                    </button>
                </div>
            </div>
        </form>
    );
};


export default SearchBar;
