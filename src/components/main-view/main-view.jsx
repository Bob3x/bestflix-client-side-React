import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { useFavoriteMovie } from "../hooks/useFavoriteMovie";
import { ToastContainer, Toast } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
    const storedUser = (() => {
        try {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        } catch (e) {
            console.error("Error parsing stored user:", e);
            localStorage.removeItem("user");
            return null;
        }
    })();

    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const { toggleFavorite, isLoading, toastState, setToastState } = useFavoriteMovie(
        user,
        token,
        setUser
    );

    useEffect(() => {
        if (!token) return;

        fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/movies", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        // Token expired
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                        throw new Error("Token expired - please login again");
                    }
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched movies data:", data);
                const moviesAPI = data.map((movie) => {
                    return {
                        _id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        genre: {
                            name: movie.Genre.Name,
                            description: movie.Genre.Description
                        },
                        director: {
                            name: movie.Director.Name,
                            bio: movie.Director.Bio,
                            birth: movie.Director.Birth,
                            death: movie.Director.Death
                        },
                        image: movie.ImagePath,
                        featured: movie.Featured
                    };
                });
                setMovies(moviesAPI);
            })
            .catch((error) => console.error("Error fetching movies:", error));
    }, [token]);

    const onLoggedIn = (user, token) => {
        console.log("User logged in:", user);
        console.log("Token received:", token);
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const onLoggedOut = () => {
        console.log("User logged out");
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    const handleSearch = (query) => {
        console.log("Searched Movies:", searchQuery);
        setSearchQuery(query);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <BrowserRouter>
            {user && (
                <NavigationBar user={user} onLoggedOut={onLoggedOut} onSearch={handleSearch} />
            )}
            <Routes>
                {/* Show login if no user */}
                <Route
                    path="/login"
                    element={!user ? <LoginView onLoggedIn={onLoggedIn} /> : <Navigate to="/" />}
                />
                <Route
                    path="/signup"
                    element={!user ? <SignupView onLoggedIn={onLoggedIn} /> : <Navigate to="/" />}
                />

                <Route
                    path="/movies/:movieId"
                    element={
                        !user ? (
                            <Navigate to="/login" replace />
                        ) : (
                            <MovieView
                                movies={movies}
                                user={user}
                                token={token}
                                setUser={setUser}
                            />
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
                                setUser={setUser}
                                token={token}
                                movies={movies}
                                onLoggedOut={onLoggedOut}
                            />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        !user ? (
                            <Navigate to="/login" replace />
                        ) : filteredMovies.length > 0 ? (
                            <Container fluid className="movies-container">
                                <Container className="content-wrapper">
                                    <Row className="justify-content-md-center g-2">
                                        {filteredMovies.map((movie) => (
                                            <Col
                                                className="mb-4"
                                                key={movie._id}
                                                xs={12}
                                                sm={6}
                                                md={3}
                                                lg={3}
                                            >
                                                <MovieCard
                                                    movie={movie}
                                                    user={user}
                                                    token={token}
                                                    setUser={setUser}
                                                    toggleFavorite={toggleFavorite}
                                                    isLoadeing={isLoading}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </Container>
                        ) : (
                            <Row className="justify-content-md-center">
                                <Col>
                                    <p>No movies found</p>
                                </Col>
                            </Row>
                        )
                    }
                />
            </Routes>
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
        </BrowserRouter>
    );
};
