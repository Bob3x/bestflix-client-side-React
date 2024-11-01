import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ favoriteMovieList }) => {
  return (
    <div>
      favoriteMovieList.length === 0 ? (<p>No favorite movies</p>) : (
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movie) => (
        <div key={movie._id}>
          <img src={movie.image} />
          <Link to={"/movies/${movies._id"}>
            <h4>{movie.title}</h4>
            <Button variant="secondary">Movie Info</Button>
          </Link>
        </div>
      ))}
      )
    </div>
  );
};

FavoriteMovies.prototype = {
  FavoriteMovies: PropTypes.array.isRequired,
};
