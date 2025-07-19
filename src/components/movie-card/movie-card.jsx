import React, { useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "./movie-card.scss";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchFavoritesThunk,
    addFavoriteThunk,
    removeFavoriteThunk
} from "../../features/favorites/favoritesSlice";

export const MovieCard = ({ movie, genres }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const favorites = useSelector((state) => state.favorites.items);

    const [showTooltip, setShowTooltip] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isFavorite = favorites.some((fav) => fav.movie_id === Number(movie.id));

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
            await dispatch(fetchFavoritesThunk(user.id)).unwrap();
            setShowTooltip(false); // Hide tooltip after action
            // optional: refresh favorites or show toast here
        } catch (error) {
            console.error("❌ Favorite toggle failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getFirstGenreName = () => {
        if (!movie.genre_ids || !genres) return "";
        const firstGenreId = movie.genre_ids[0];
        const genreObj = genres.find((g) => g.id === firstGenreId);
        return genreObj ? genreObj.name : "";
    };

    return (
        <Card className="movie-card">
            <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="movie-card__image-link">
                <Card.Img
                    variant="top"
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://placehold.co/300x450?text=No+Image"
                    }
                    alt={movie.title}
                    className="movie-card__image"
                />
            </Link>
            <Card.Body className="movie-card__content">
                <Card.Text className="movie-card__genre">
                    {genres.length === 0 ? "Loading genre..." : getFirstGenreName()}
                </Card.Text>
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
                            {movie.overview}
                        </Tooltip>
                    }
                >
                    <Card.Text className="movie-card__description">{movie.overview}</Card.Text>
                </OverlayTrigger>
            </Card.Body>
        </Card>
    );
};
