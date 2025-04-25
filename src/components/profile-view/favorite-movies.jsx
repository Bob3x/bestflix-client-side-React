import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ favoriteMovieList }) => {
    return (
        <div>
            {!favoriteMovieList || favoriteMovieList.length === 0 ? (
                <p>No favorite movies</p>
            ) : (
                <>
                    <h2>Favorite Movies</h2>
                    <div className="d-flex flex-wrap">
                        {favoriteMovieList.map((movie) => (
                            <div key={movie._id} className="p-2">
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="img-fluid"
                                    style={{ width: "100px", height: "150px", objectFit: "cover" }}
                                />
                                <Link to={`/api/movies/${movie._id}`}>
                                    <h4 style={{ fontSize: "1rem" }}>{movie.title}</h4>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
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
