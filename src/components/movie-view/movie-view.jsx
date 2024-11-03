import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const movie = movies.find((m) => m._id === movieId);

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const isFavorite = user.FavoriteMovies.includes(movieId);
      setIsFavorite(isFavorite);
    }
  }, [movieId, user]);

  const addFavorite = () => {
    fetch(
      "https://my-movies-flix-app-56f9661dc035.herokuapp.com/users/${user.Username}/${movieId}",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(true);
        console.log("Added movie:", response, data);
      })
      .catch((err) => {
        console.error("Error adding movie:", err);
      });
  };

  const removeFavorite = () => {
    fetch(
      "https://my-movies-flix-app-56f9661dc035.herokuapp.com/users/${user.Username}/${movieId}",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("user".JSON.stringify(data));
        setIsFavorite(false);
        console.log("Added favorite movie:", data);
      })
      .catch((err) => {
        console.error("Error deleting movie:", err);
      });
  };

  return (
    <Container>
      <Row>
        <Col md={5}>
          <Card className="mt-3 mb-2">
            <Card.Img src={movie.image} alt={movie.title} />
            <Card.Body>
              <Card.Header>
                <Card.Title>
                  <strong>{movie.title}</strong>
                </Card.Title>
              </Card.Header>
              <Card.Text>
                <h5>Genre:</h5>
                <p>{movie.genre.name}</p>
                <h5>Description:</h5>
                <p>{movie.description}</p>
                <h5>Director: </h5>
                <span>{movie.director.name}</span>
                <p>Birth year: {movie.director.birth}</p>
                <h5>Bio: </h5>
                <p>{movie.director.bio}</p>
              </Card.Text>
              <Link to={`/`}>
                <Button variant="secondary">Back</Button>
              </Link>
              <div className="mt-2">
                {isFavorite ? (
                  <Button variant="danger" onClick={removeFavorite}>
                    Remove
                  </Button>
                ) : (
                  <Button variant="primary" onClick={addFavorite}>
                    Add to favorites
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string,
      death: PropTypes.string,
    }).isRequired,
    image: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
