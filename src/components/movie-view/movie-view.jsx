import React from "react";
import PropTypes from "prop-types";

export const MovieView = ({movie, onBackClick}) => {
    return (
        <div>
         <div>
            <img 
            src={movie.image} 
            alt={movie.title}
            /> 
         </div>
        <div>
            <span>Title: </span>
            <span>{movie.title}</span> 
        </div>
        <div>
            <span>Genre: </span>
            <span>{movie.genre.name}</span>
            <span>{movie.genre.description}</span> 
        </div>
        <div>
            <span>Description: </span>
            <span>{movie.description}</span> 
        </div>
        <div>
            <span>Director: </span>
            <span>{movie.director.name} {movie.director.birth}</span>
            <span>{movie.director.bio}</span> 
        </div>
        <button onClick={onBackClick}>Back</button>
        </div>
    );
};

MovieView.propTypes = {
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
};