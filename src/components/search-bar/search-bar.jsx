import React, { useState, useEffect } from "react";

export const SearchBar = ({ moviesAPI, onFilter }) => {
    const [searchInput, setSearchInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredMovies = moviesAPI.filter(
            (movie) => movie.Title && movie.Title.toLowerCase().includes(searchInput.toLowerCase())
        );
        onFilter(filteredMovies);
    };

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="Search here"
                    onChange={handleChange}
                    value={searchInput}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};
