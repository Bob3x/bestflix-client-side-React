import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteThunk, removeFavoriteThunk } from "../../features/favorites/favoritesSlice";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "./movie-view.scss";

export const MovieView = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const movies = useSelector((state) => state.movies.movies);
    const favorites = useSelector((state) => state.favorites.items);

    const [isLoading, setIsLoading] = React.useState(false);
    const [toastState, setToastState] = React.useState({
        show: false,
        message: "",
        type: "success"
    });

    const movie = movies.find((m) => m.id === movieId);

    const isFavorite = favorites.some((fav) => fav.movie_id === movieId);

    const handleFavoriteClick = async (e) => {
        e.preventDefault();
        if (!user?.id) return;

        setIsLoading(true);
        try {
            if (isFavorite) {
                dispatch(removeFavoriteThunk({ userId: user.id, movieId }));
            } else {
                dispatch(addFavoriteThunk({ userId: user.id, movieId }));
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            setToastState({
                show: true,
                message: "Failed to update favorite status.",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

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
                        <Button variant="secondary" className="back-button">
                            Back to Movies
                        </Button>
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <Container className="movie-view">
            <Row className="justify-content-center">
                <Col md={12} lg={12} className="movie-back-button">
                    <Link to={`/`}>
                        <Button variant="secondary" className="back-button">
                            Back
                        </Button>
                    </Link>
                </Col>
                <Col md={4} lg={4} className="mt-3 mb-2">
                    <Card className="movie-view__poster-card">
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
                        <Card.Img
                            src={movie.image || "https://placehold.co/300x450?text=No+Image"}
                            alt={movie.title}
                            className="movie-view__poster-image"
                        />
                    </Card>
                </Col>
                <Col md={8} lg={8} className="movie-view__details">
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
                                            {movie.directorName}
                                        </h4>
                                        <p className="movie-view__director-birth">
                                            Birth year: {movie.directorBirth}
                                        </p>
                                        <p className="movie-view__director-bio">
                                            {movie.directorBio}
                                        </p>
                                    </div>
                                </div>
                                <div className="movie-view__info-section">
                                    <Card.Subtitle className="movie-view__subtitle">
                                        Genre
                                    </Card.Subtitle>
                                    <div className="movie-view__text">{movie.genre}</div>
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
