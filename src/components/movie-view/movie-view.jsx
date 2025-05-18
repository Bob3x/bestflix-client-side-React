import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import PropTypes from "prop-types";
import { useFavoriteMovie } from "../hooks/useFavoriteMovie";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
    const { movieId } = useParams();
    const { toggleFavorite, isLoading, toastState, setToastState } = useFavoriteMovie(
        user,
        token,
        setUser
    );

    const movie = movies.find((m) => m._id === movieId);

    if (!movies.length) {
        return (
            <Container>
                <div className="text-center mt-5">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Container>
        );
    }

    if (!movie) {
        return (
            <Container>
                <div className="text-center mt-5">
                    <h2 className="text-light">Movie not found</h2>
                    <Link to="/">
                        <Button variant="primary" className="mt-3">
                            Back to Movies
                        </Button>
                    </Link>
                </div>
            </Container>
        );
    }

    const isFavorite = user.FavoriteMovies.includes(movieId);
    const handleFavoriteClick = (e) => {
        e.preventDefault();
        toggleFavorite(movie._id, isFavorite);
    };

    return (
        <Container className="movie-view">
            <Row className="justify-content-center">
                <Col md={12} lg={12} className="movie-back-button">
                    <Link to={`/api/`}>
                        <Button variant="secondary" className="back-button">
                            Back
                        </Button>
                    </Link>
                </Col>
                <Col md={4} lg={4} className="mt-3 mb-2">
                    <Card className="movie-view__poster-card">
                        <Card.Img
                            src={movie.image}
                            alt={movie.title}
                            className="movie-view__poster-image"
                        />
                        <Card.Header className="movie-view__header">
                            <Card.Title className="movie-view__title">{movie.title}</Card.Title>
                            <div className="movie-view__actions">
                                <button
                                    className="movie-card__favorite-btn"
                                    onClick={handleFavoriteClick}
                                    disabled={isLoading}
                                    aria-label={
                                        isFavorite ? "Remove from favorites" : "Add to favorites"
                                    }
                                >
                                    {isFavorite ? (
                                        <HeartFill className="heart-icon filled" />
                                    ) : (
                                        <Heart className="heart-icon" />
                                    )}
                                </button>
                            </div>
                        </Card.Header>
                    </Card>
                </Col>
                <Col md={8} lg={8} className="movie-vew__details">
                    <Card className="movie-view__details-card">
                        <Card.Body className="movie-view__body">
                            <Stack gap={4}>
                                <div className="movie-view__info-section">
                                    <Card.Subtitle className="movie-view__subtitle">
                                        Description
                                    </Card.Subtitle>
                                    <div className="movie-view__text">{movie.description}</div>
                                </div>

                                <hr />

                                <div className="movie-view__info-section">
                                    <Card.Subtitle className="movie-view__subtitle">
                                        Director
                                    </Card.Subtitle>
                                    <div className="movie-view__director">
                                        <h4 className="movie-view__director-name">
                                            {movie.director.name}
                                        </h4>
                                        <p className="movie-view__director-birth">
                                            Birth year: {movie.director.birth}
                                        </p>
                                        <p className="movie-view__director-bio">
                                            {movie.director.bio}
                                        </p>
                                    </div>
                                </div>
                                <div className="movie-view__info-section">
                                    <Card.Subtitle className="movie-view__subtitle">
                                        Genre
                                    </Card.Subtitle>
                                    <div className="movie-view__text">{movie.genre.name}</div>
                                </div>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    show={toastState.show}
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
