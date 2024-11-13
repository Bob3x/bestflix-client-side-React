import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import PropTypes from "prop-types";

export const MovieView = ({ movies, user, token, setUser }) => {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");

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
                    "Content-Type": "application/json"
                }
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
                setToastVariant("success");
                setToastMessage("Movie added to favorites!");
                setShowToast(true);
            })
            .catch((err) => {
                console.error("Error adding movie:", err);
                setToastVariant("danger");
                setToastMessage(err.message);
                setShowToast(true);
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
                    "Content-Type": "application/json"
                }
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to remove favorite movie");
                }
                const updatedUser = {
                    ...user,
                    FavoriteMovies: user.FavoriteMovies.filter((_id) => _id !== movieId)
                };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setToastVariant("success");
                setToastMessage("Movie removed from favorites!");
                setShowToast(true);
            })
            .catch((err) => {
                console.error("Error removing movie:", err);
                setToastVariant("danger");
                setToastMessage(err.message);
                setShowToast(true);
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
                        <Card.Body className="movie-details">
                            <Stack gap={3}>
                                <div>
                                    <Card.Subtitle className="text-primary mb-2">
                                        Genre
                                    </Card.Subtitle>
                                    <div className="ms-2">{movie.genre.name}</div>
                                </div>

                                <div>
                                    <Card.Subtitle className="text-primary mb-2">
                                        Description
                                    </Card.Subtitle>
                                    <div className="ms-2">{movie.description}</div>
                                </div>

                                <hr />

                                <div>
                                    <Card.Subtitle className="text-primary mb-2">
                                        Director
                                    </Card.Subtitle>
                                    <div className="ms-2">
                                        <Card.Title className="mb-1 fw-bold">
                                            {movie.director.name}
                                        </Card.Title>
                                        <Card.Text className="text-muted small mb-2">
                                            Birth year: {movie.director.birth}
                                        </Card.Text>
                                        <Card.Text>{movie.director.bio}</Card.Text>
                                    </div>
                                </div>
                            </Stack>
                            <div className="mt-2 mb-2 d-flex gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={isFavorite ? removeFavorite : addFavorite}
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Processing..."
                                        : isFavorite
                                        ? "Remove from favorites"
                                        : "Add to favorites"}
                                </Button>
                                <Link to={`/`}>
                                    <Button variant="secondary">Back</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={3000}
                    autohide
                    bg={toastVariant}
                >
                    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
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
        })
    ).isRequired,
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
    })
};
