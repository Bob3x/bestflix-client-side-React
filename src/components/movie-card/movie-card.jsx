import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
        onClick={() => {
            onMovieClick(movie, onMovieClick)
        }} 
        >
        <img src = {movie.image}
        alt = {movie.title} 
        />
        <h3>{movie.title}</h3>
        <span>F: {movie.featured}</span>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape ({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birth: PropTypes.string,
            death: PropTypes.string
        }).isRequired,
        image: PropTypes.string.isRequired,
        featured: PropTypes.bool.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};

