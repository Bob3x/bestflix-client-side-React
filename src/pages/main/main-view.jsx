import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile/profile-view";
import { MovieView } from "../movie/movie-view";
import { MovieCard } from "../../components/movie-card/movie-card";
import { LoginView } from "../login/login-view";
import { SignupView } from "../signup/signup-view";
import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import { useFavoriteMovie } from "../../hooks/useFavoriteMovie";
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

        fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/api/movies", {
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
        setSearchQuery(query);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <BrowserRouter>
            {user && (
                <NavigationBar
                    user={user}
                    onLoggedOut={onLoggedOut}
                    onSearch={handleSearch}
                    searchQuery={searchQuery}
                />
            )}
            <Routes>
                {/* Show login if no user */}
                <Route
                    path="/api/login"
                    element={
                        !user ? <LoginView onLoggedIn={onLoggedIn} /> : <Navigate to="/api/" />
                    }
                />
                <Route
                    path="/api/signup"
                    element={
                        !user ? <SignupView onLoggedIn={onLoggedIn} /> : <Navigate to="/api/" />
                    }
                />

                <Route
                    path="/api/movies/:movieId"
                    element={
                        !user ? (
                            <Navigate to="/api/login" replace />
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
                    path="/api/users/:Username"
                    element={
                        !user ? (
                            <Navigate to="/api/login" replace />
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
                    path="/api/"
                    element={
                        !user ? (
                            <Navigate to="/api/login" replace />
                        ) : filteredMovies.length > 0 ? (
                            <Container className="content-wrapper">
                                <div className="movie-grid-container">
                                    {filteredMovies.map((movie) => (
                                        <div className="movie-grid-item" key={movie._id}>
                                            <MovieCard
                                                movie={movie}
                                                user={user}
                                                token={token}
                                                setUser={setUser}
                                                toggleFavorite={toggleFavorite}
                                                isLoading={isLoading}
                                            />
                                        </div>
                                    ))}
                                </div>
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
                <Route path="*" element={<Navigate to="/api/" replace />} />
            </Routes>
            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    show={toastState.show}
                    onClose={() => setToastState((prev) => ({ ...prev, show: false }))}
                    delay={3000}
                    autohide={true}
                    bg={toastState.variant}
                >
                    <Toast.Body className="text-white">{toastState.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </BrowserRouter>
    );
};
