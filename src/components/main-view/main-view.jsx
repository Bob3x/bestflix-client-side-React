import { useEffect } from "react";
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

export const MainView = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.user);
    const { movies } = useSelector((state) => state.movies);
    console.log("Movies state:", movies);
    useEffect(() => {
        if (!token) return;
        dispatch(fetchMoviesThunk(token));
    }, [token, dispatch]);

    return (
        <>
            {user && (
                <NavigationBar
                    user={user}
                    onLoggedOut={() => {
                        dispatch(logout());
                        localStorage.clear();
                    }}
                />
            )}
            <Container>
                <Row className="justify-content-md-center">
                    <Routes>
                        {/* Show login if no user */}
                        <Route
                            path="/login"
                            element={!user?.username ? <LoginView /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/signup"
                            element={!user?.username ? <SignupView /> : <Navigate to="/" />}
                        />

                        <Route
                            path="/movies/:movieId"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <MovieView movies={movies} user={user} token={token} />
                                )
                            }
                        />

                        <Route
                            path="/users/:Username"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <ProfileView
                                        user={user}
                                        token={token}
                                        movies={movies}
                                        onLogout={() => {
                                            dispatch(logout());
                                            localStorage.clear();
                                        }}
                                        setUser={user}
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
                                                key={movie._id}
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                lg={3}
                                            >
                                                <MovieCard movie={movie} />
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
