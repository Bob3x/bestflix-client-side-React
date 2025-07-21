import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteThunk, removeFavoriteThunk } from "../../features/favorites/favoritesSlice";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./favorite-movies.scss";

export const FavoriteMovies = ({ favoriteMovies }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const favorites = useSelector((state) => state.favorites.items);
    const user = useSelector((state) => state.user.user);

    const isFavorite = (movieId) => favorites.some((fav) => fav.movie_id === movieId);

    const toggleFavorite = async (movieId) => {
        setIsLoading(true);
        try {
            if (isFavorite) {
                await dispatch(removeFavoriteThunk({ userId: user.id, movieId })).unwrap();
            } else {
                await dispatch(addFavoriteThunk({ userId: user.id, movieId })).unwrap();
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="favorite-movies-card">
            <Card.Header>
                <h4>Favorite Movies</h4>
            </Card.Header>
            <Card.Body className="favorite-movies-body">
                {!favoriteMovies || favoriteMovies.length === 0 ? (
                    <div className="no-favorites-message">
                        <p>No favorite movies</p>
                    </div>
                ) : (
                    <div className="favorite-movies-grid">
                        {favoriteMovies.map((movie) => (
                            <div key={movie.id} className="favorite-movie-col">
                                <div className="favorite-movie-item">
                                    <Link to={`/movies/${movie.id}`} className="movie-link">
                                        <div className="movie-poster-wrapper">
                                            <img
                                                src={
                                                    movie.poster_path
                                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                        : "https://placehold.co/300x450?text=Bestflix"
                                                }
                                                alt={movie.title}
                                                className="movie-poster"
                                            />
                                        </div>
                                        <div className="movie-title-wrapper">
                                            <h6 className="movie-title">{movie.title}</h6>
                                        </div>
                                    </Link>
                                </div>
                                <button
                                    className="movie-card__favorite-btn"
                                    onClick={() => toggleFavorite(movie.id)}
                                    disabled={isLoading}
                                    aria-label={
                                        isFavorite(movie.id)
                                            ? "Remove from favorites"
                                            : "Add to favorites"
                                    }
                                >
                                    {isFavorite(movie.id) ? (
                                        <HeartFill className="heart-icon filled" />
                                    ) : (
                                        <Heart className="heart-icon" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};
