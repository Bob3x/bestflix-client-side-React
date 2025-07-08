import React from "react";
import PropTypes from "prop-types";
import "./search-bar.scss";

export const SearchBar = ({ searchQuery, onSearch }) => {
    return (
        <form className="form__searchbar">
            <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="form-control__searchbar"
            />
        </form>
    );
};

SearchBar.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
};
