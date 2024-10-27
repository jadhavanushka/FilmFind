import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const SearchResults = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('all');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const searchQuery = searchParams.get('q') || '';
        const searchType = searchParams.get('type') || 'all';
        const currentPage = parseInt(searchParams.get('page')) || 1;

        setQuery(searchQuery);
        setType(searchType);
        setPage(currentPage);

        if (searchQuery) {
            fetchMovies(searchQuery, searchType, currentPage);
        }
    }, [searchParams]);

    const fetchMovies = async (query, type = 'all', page = 1) => {
        setMovies([]);
        setLoading(true);
        setError('');
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;
        let url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}&page=${page}`;

        // Append type filter to the API URL
        if (type !== 'all') {
            url += `&type=${type}`;
        }

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

    const handleSearch = (query, type) => {
        setSearchParams({ q: query, type, page: 1 });
    };

    const handleNextPage = () => {
        const newPage = page + 1;
        setSearchParams({ q: query, type, page: newPage });
    };

    const handlePreviousPage = () => {
        const newPage = page - 1;
        if (newPage > 0) {
            setSearchParams({ q: query, type, page: newPage });
        }
    };

    const handleTabSwitch = (newType) => {
        setSearchParams({ q: query, type: newType, page: 1 });
    };

    return (
        <div>
            {/* Navbar with search functionality */}
            <Navbar onSearch={handleSearch} initialQuery={query} initialType={type} />

            {/* Tabs for switching types */}
            <div className="flex justify-center items-start mt-2 md:mt-4 ">
                <button
                    className={`px-4 py-2 ${type === 'all' ? 'border-b-4 border-b-blue-700 text-white' : 'text-gray-300'}`}
                    onClick={() => handleTabSwitch('all')}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 ${type === 'movie' ? 'border-b-4 border-b-blue-700 text-white' : 'text-gray-300'}`}
                    onClick={() => handleTabSwitch('movie')}
                >
                    Movies
                </button>
                <button
                    className={`px-4 py-2 ${type === 'series' ? 'border-b-4 border-b-blue-700 text-white' : 'text-gray-300'}`}
                    onClick={() => handleTabSwitch('series')}
                >
                    Series
                </button>
            </div>

            {/* Display the list of movies */}
            <div className="pt-0 pb-8 flex flex-col items-center">
                {loading && <Loader />}
                {movies.length > 0 ? (
                    <div>
                        <MovieList movies={movies} />

                        <div className="flex justify-center items-center gap-4 mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={page === 1}
                                className="py-2.5 px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 
            hover:bg-blue-800 disabled:bg-gray-700 disabled:border-gray-700 disabled:text-gray-400 rounded-lg">
                                Previous
                            </button>
                            <span className="text-md">
                                Page {page} of {Math.ceil(totalResults / 10)}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={page * 10 >= totalResults}
                                className="py-2.5 px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 
            hover:bg-blue-800 disabled:bg-gray-700 disabled:border-gray-700 disabled:text-gray-400 rounded-lg">
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    !loading &&
                    <p className='absolute top-1/2 py-2.5 px-4 border border-gray-700 text-gray-300 bg-gray-800 rounded-lg shadow-2xl shadow-blue-950'>
                        {error || "No results found!"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
