import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useFavoriteMovie } from "../../hooks/useFavoriteMovie";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, setUser }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const { toggleFavorite, isLoading } = useFavoriteMovie(user, token, setUser);
    const isFavorite =
        user && Array.isArray(user.FavoriteMovies)
            ? user.FavoriteMovies.includes(movie._id)
            : false;

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        toggleFavorite(movie._id, isFavorite);
    };

    return (
        <Card className="movie-card">
            <Link
                to={`/movies/${encodeURIComponent(movie._id)}`}
                className="movie-card__image-link"
            >
                <Card.Img
                    variant="top"
                    src={movie.image}
                    alt={movie.title}
                    className="movie-card__image"
                />
            </Link>
            <Card.Body className="movie-card__content">
                <Card.Text className="movie-card__genre">{movie.genre?.name || ""}</Card.Text>
                <div className="movie-card__title-wrapper">
                    <Card.Title className="movie-card__title">
                        <strong>{movie.title}</strong>
                    </Card.Title>
                    <button
                        className="movie-card__favorite-btn"
                        onClick={handleFavoriteClick}
                        disabled={isLoading}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? (
                            <HeartFill className="heart-icon filled" />
                        ) : (
                            <Heart className="heart-icon" />
                        )}
                    </button>
                </div>

                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip className="movie-card__description-tooltip">
                            {movie.description}
                        </Tooltip>
                    }
                >
                    <Card.Text className="movie-card__description">{movie.description}</Card.Text>
                </OverlayTrigger>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
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
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    token: PropTypes.string,
    setUser: PropTypes.func
};

MovieCard.defaultProps = {
    user: null,
    token: "",
    setUser: () => {}
};
