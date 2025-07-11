import React from "react";
import PropTypes from "prop-types";
import "./search-bar.scss";

export const SearchBar = () => {
    return (
        <form className="form__searchbar">
            <input type="text" placeholder="Search here" className="form-control__searchbar" />
        </form>
    );
};
