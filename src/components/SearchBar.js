import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query) {
            onSearch(query);
        }
    };

    return (
        <div className="text-center">
            <input
                type="text"
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='px-3 py-2 text-gray-800'
            />
            <button
                onClick={handleSearch}
                className='px-5 py-2 text-white bg-blue-900'>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
