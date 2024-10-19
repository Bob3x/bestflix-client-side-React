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
        </div>
    );
}

MovieCard.PropTypes = {
    movie: PropTypes.shape ({
        _id: PropTypes.string.isRequired,
        TItle: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string,
            Death: PropTypes.string
        }).isRequired,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}