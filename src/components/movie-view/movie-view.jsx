import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const MovieView = ({ movies, user, token, setUser }) => {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const movie = movies.find((m) => m._id === movieId);
    const isFavorite = user.FavoriteMovies.includes(movieId);

    const addFavorite = () => {
        setIsLoading(true);
        fetch(
            `https://my-movies-flix-app-56f9661dc035.herokuapp.com/users/${user.Username}/movies/${movieId}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add favorite movie");
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                alert("Added to favorites");
            })
            .catch((err) => {
                console.error("Error adding movie:", err);
                alert(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const removeFavorite = () => {
        setIsLoading(true);
        fetch(
            `https://my-movies-flix-app-56f9661dc035.herokuapp.com/users/${user.Username}/movies/${movieId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to remove favorite movie");
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                alert("Removed from favorites");
            })
            .catch((err) => {
                console.error("Error removing movie:", err);
                alert(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <Container>
            <Row>
                <Col md={5} className="mt-3 mb-2">
                    <Card>
                        <Card.Img src={movie.image} alt={movie.title} />
                        <Card.Header>
                            <Card.Title>
                                <strong>{movie.title}</strong>
                            </Card.Title>
                        </Card.Header>
                    </Card>
                </Col>
                <Col className="mt-3 mb-2">
                    <Card>
                        <Card.Body>
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
                            <div className="mt-2 mb-2">
                                <Button
                                    variant="secondary"
                                    onClick={isFavorite ? removeFavorite : addFavorite}
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Processing..."
                                        : isFavorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"}
                                </Button>
                            </div>
                            <Link to={`/`}>
                                <Button variant="secondary">Back</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
    ).isRequired,
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    token: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired,
};
