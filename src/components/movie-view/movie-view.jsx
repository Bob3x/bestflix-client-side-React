import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import PropTypes from "prop-types";
import { useFavoriteMovie } from "../hooks/useFavoriteMovie";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
    const { movieId } = useParams();
    const { toggleFavorite, isLoading, toastState, setToastState } = useFavoriteMovie(
        user,
        token,
        setUser
    );

    const movie = movies.find((m) => m._id === movieId);
    const isFavorite = user.FavoriteMovies.includes(movieId);

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
                                    onClick={isFavorite}
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
            {/* ...existing code... */}
            <Button
                variant="secondary"
                onClick={() => toggleFavorite(movieId, isFavorite)}
                disabled={isLoading}
            >
                {isLoading
                    ? "Processing..."
                    : isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"}
            </Button>
            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    show={showToast.show}
                    onClose={() => setToastState((prev) => ({ ...prev, show: false }))}
                    delay={3000}
                    autohide
                    bg={toastState.variant}
                >
                    <Toast.Body className="text-white">{toastState.message}</Toast.Body>
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
