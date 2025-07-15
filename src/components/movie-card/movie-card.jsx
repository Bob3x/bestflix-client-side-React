import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "./movie-card.scss";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteThunk, removeFavoriteThunk } from "../../features/favorites/favoritesSlice";

export const MovieCard = ({ movie }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const favorites = useSelector((state) => state.favorites.items);

    const [showTooltip, setShowTooltip] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isFavorite = favorites.some((fav) => fav.movie_id === movie.id);

    const toggleFavorite = async (movieId) => {
        if (!user?.id) {
            console.warn("⚠️ Must be logged in");
            setShowTooltip(true);
            return;
        }

        setIsLoading(true);

        try {
            if (isFavorite) {
                await dispatch(removeFavoriteThunk({ userId: user.id, movieId })).unwrap();
            } else {
                await dispatch(addFavoriteThunk({ userId: user.id, movieId })).unwrap();
            }
            setShowTooltip(false); // Hide tooltip after action
            // optional: refresh favorites or show toast here
        } catch (error) {
            console.error("❌ Favorite toggle failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="movie-card">
            <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="movie-card__image-link">
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
                        onClick={() => toggleFavorite(movie.id)}
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

MovieCard.defaultProps = {
    user: null,
    token: "",
    setUser: () => {}
};
