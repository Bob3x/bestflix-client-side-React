import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../../pages/profile/profile-view";
import { MovieView } from "../../pages/movie/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../../pages/login/login-view";
import { SignupView } from "../../pages/signup/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { fetchMoviesThunk } from "../../features/movies/moviesSlice";
import { fetchGenresThunk } from "../../features/genres/genresSlice";

export const MainView = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [localUser, setUser] = useState(user);
    const { movies } = useSelector((state) => state.movies);
    const genres = useSelector((state) => state.genres?.genres) || [];

    useEffect(() => {
        dispatch(fetchMoviesThunk());
        dispatch(fetchGenresThunk());
    }, [dispatch]);

    useEffect(() => {
        setUser(user);
    }, [user]);

    const handleLoggedOut = () => {
        dispatch(logout());
        localStorage.clear();
    };

    return (
        <>
            {user && <NavigationBar user={user.id} onLoggedOut={handleLoggedOut} />}
            <Container>
                <Row className="justify-content-md-center">
                    <Routes>
                        {/* Show login if no user */}
                        <Route
                            path="/login"
                            element={!user?.email ? <LoginView /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/signup"
                            element={!user?.email ? <SignupView /> : <Navigate to="/" />}
                        />

                        <Route
                            path="/movies/:movieId"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <MovieView movies={movies} genres={genres} />
                                )
                            }
                        />

                        <Route
                            path="/users/:id"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <ProfileView
                                        userId={user.id}
                                        onLoggedOut={handleLoggedOut}
                                        setUser={setUser}
                                    />
                                )
                            }
                        />
                        <Route
                            path="/"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Row className="justify-content-md-center">
                                        {movies.map((movie) => (
                                            <Col
                                                className="mb-4"
                                                key={movie.id}
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                lg={3}
                                            >
                                                <MovieCard movie={movie} genres={genres || []} />
                                            </Col>
                                        ))}
                                    </Row>
                                )
                            }
                        />
                    </Routes>
                </Row>
            </Container>
        </>
    );
};
