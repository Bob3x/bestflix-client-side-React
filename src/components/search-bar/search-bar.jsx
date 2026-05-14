import React from "react";
import PropTypes from "prop-types";
import "./search-bar.scss";

export const SearchBar = ({ value, onChange }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form className="form__searchbar" onSubmit={handleSubmit} role="search">
            <input
                type="text"
                placeholder="Search here"
                className="form-control__searchbar"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-label="Search movies"
            />
        </form>
    );
};

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
