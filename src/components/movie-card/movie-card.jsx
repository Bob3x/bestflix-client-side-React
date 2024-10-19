import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
        onClick={() => {
            onMovieClick(movie, onMovieClick);
        }} 
        >
            {movie.title}
        </div>
    );
}