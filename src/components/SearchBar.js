import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit} className="flex items-center justify-center mb-4 ">
            <div className="rounded-lg bg-white">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="rounded-s-lg px-2 py-2 text-black border-r-2 "
                >
                    <option value="all">All</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    className="px-4 py-2 w-64 text-black "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded-e-lg">
                    Search
                </button>
            </div>
        </form>
    );
};


export default SearchBar;
