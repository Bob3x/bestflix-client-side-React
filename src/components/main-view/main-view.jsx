import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (!token) return;

        fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched movies data:", data);
                const moviesAPI = data.map((movie) => {
                    return {
                        _id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        genre: {
                            name: movie.Genre.Name,
                            description: movie.Genre.Description,
                        },
                        director: {
                            name: movie.Director.Name,
                            bio: movie.Director.Bio,
                            birth: movie.Director.Birth,
                            death: movie.Director.Death,
                        },
                        image: movie.ImagePath,
                        featured: movie.Featured,
                    };
                });
                setMovies(moviesAPI);
            })
            .catch((error) => console.error("Error fetching movies:", error));
    }, [token]);

    const onLoggedIn = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const onLoggedOut = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    const onUpdateSuccess = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <Container>
            <BrowserRouter>
                <NavigationBar user={user} onLoggedOut={onLoggedOut} />
                <Row className="justify-content-md-center">
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <SignupView />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <LoginView onLoggedIn={onLoggedIn} />
                                        </Col>
                                    )}
                                </>
                            }
                        />

                        <Route
                            path="/users/:Username"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <Col md={5}>
                                            <ProfileView
                                                user={user}
                                                token={token}
                                                onLoggedOut={onLoggedOut}
                                                onUpdateSuccess={onUpdateSuccess}
                                            />
                                        </Col>
                                    )}
                                </>
                            }
                        />

                        <Route
                            path="/movies/:movieId"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col className="text-center text-gray-600">
                                            There are no movies!
                                        </Col>
                                    ) : (
                                        <Col md={12}>
                                            <MovieView
                                                movies={movies}
                                                user={user}
                                                token={token}
                                                setUser={setUser}
                                            />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col className="text-center text-gray-600">
                                            There are no movies!
                                        </Col>
                                    ) : (
                                        <>
                                            {movies.map((movie) => (
                                                <Col
                                                    key={movie._id}
                                                    xs={12}
                                                    md={4}
                                                    className="mb-4 mt-3"
                                                >
                                                    <MovieCard movie={movie} />
                                                </Col>
                                            ))}
                                        </>
                                    )}
                                </>
                            }
                        />
                    </Routes>
                </Row>
            </BrowserRouter>
        </Container>
    );
};

export default MainView;
