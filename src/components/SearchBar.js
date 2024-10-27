import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, initialQuery = '', initialType = 'all' }) => {
    const [query, setQuery] = useState(initialQuery);
    const [type, setType] = useState(initialType);

    useEffect(() => {
        setQuery(initialQuery);  // Ensure the query updates when props change
        setType(initialType);    // Ensure the type updates when props change
    }, [initialQuery, initialType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query, type);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto shadow-2xl shadow-blue-950">
            <div className="flex">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="py-2.5 px-4 text-sm font-medium text-start bg-gray-800 text-gray-100 border border-gray-600 rounded-s-lg hover:bg-gray-700 ">
                    <option value="all">All</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>
                <div className="relative w-full">
                    <input type="text"
                        placeholder="Search..."
                        className="p-2.5 w-full z-20 text-sm bg-gray-800 text-gray-50 rounded-e-lg border-s-gray-800 border-s-2 border border-gray-600"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit"
                        className="absolute top-0 end-0 py-2.5 px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800">
                        <FaSearch />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
