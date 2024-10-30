import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap"

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card>
            <Card.Img variant="top" src = {movie.image} alt = {movie.title} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Button onClick={() => {onMovieClick(movie, onMovieClick)}} variant="link">
                    Open</Button> 
            </Card.Body>
        </Card>
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
