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
            <span>Description: </span>
            <span>{movie.description}</span> 
        </div>
        <div>
            <span>Genre: </span>
            <span>{movie.genre.name}</span>
            <span>{movie.genre.description}</span> 
        </div>
        <div>
            <span>Director: </span>
            <span>{movie.director.name}</span>
            <span>{movie.director.birth}</span>
            <span>{movie.director.bio}</span> 
        </div>
        <button onClick={onBackClick}>Back</button>
    </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape ({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }).isRequired,
        Director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birth: PropTypes.string,
            death: PropTypes.string
        }).isRequired,
        image: PropTypes.string.isRequired,
        featured: PropTypes.bool.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
