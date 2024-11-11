import React, { useState } from "react";
import PropTypes from "prop-types";

export const SearchBar = ({ moviesAPI, onFilter }) => {
    const [searchInput, setSearchInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Movies API Data:", moviesAPI);

        const searchTerm = searchInput.toLowerCase().trim();
        console.log("Search Input:", searchInput);
        try {
            const filteredMovies = moviesAPI.filter((movie) => {
                const titleMatch = movie.title?.toLowerCase().includes(searchTerm);
                const descMatch = movie.description?.toLowerCase().includes(searchTerm);
                const genreMatch = movie.genre.name?.toLowerCase().includes(searchTerm);
                const directorMatch = movie.director.name?.toLowerCase().includes(searchTerm);

                // Return true if any field matches
                return titleMatch || descMatch || genreMatch || directorMatch;
            });

            console.log("Filtered Movies:", filteredMovies.length);
            onFilter(filteredMovies);
        } catch (error) {
            console.error("Movie not found", error);
        }
    };

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
            />
            <button type="submit">Search</button>
        </form>
    );
};

SearchBar.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            genre: PropTypes.shape({
                name: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
            image: PropTypes.string.isRequired,
            featured: PropTypes.bool.isRequired,
        })
    ).isRequired,
    moviesAPI: PropTypes.array,
    filteredMovies: PropTypes.array,
    onFilter: PropTypes.func.isRequired,
};
