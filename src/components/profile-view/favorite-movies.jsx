import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./favorite-movies.scss";

export const FavoriteMovies = ({ favoriteMovieList }) => {
    return (
        <Card className="favorite-movies-card">
            <Card.Header>
                <h4>Favorite Movies</h4>
            </Card.Header>
            <Card.Body className="favorite-movies-body">
                {!favoriteMovieList || favoriteMovieList.length === 0 ? (
                    <div className="no-favorites-message">
                        <p>No favorite movies</p>
                    </div>
                ) : (
                    <div className="favorite-movies-grid">
                        {favoriteMovieList.map((movie) => (
                            <div key={movie._id} className="favorite-movie-col">
                                <div className="favorite-movie-item">
                                    <Link to={`/api/movies/${movie._id}`} className="movie-link">
                                        <div className="movie-poster-wrapper">
                                            <img
                                                src={movie.image}
                                                alt={movie.title}
                                                className="movie-poster"
                                            />
                                        </div>
                                        <div className="movie-title-wrapper">
                                            <h6 className="movie-title">{movie.title}</h6>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

FavoriteMovies.propTypes = {
    favoriteMovieList: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired
        })
    ).isRequired
};
