import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
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
          
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/movies")
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
                }

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
        <BrowserRouter>
            <NavigationBar user={user} onLoggedOut={onLoggedOut} />
            <Container>
                <Row className="justify-content-md-center">
                    <Routes>
                        {/* Show login if no user */}
                        <Route
                            path="/login"
                            element={
                                !user ? <LoginView onLoggedIn={onLoggedIn} /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                !user ? <SignupView onLoggedIn={onLoggedIn} /> : <Navigate to="/" />
                            }
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
                                        onLogout={onLoggedOut}
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
        </BrowserRouter>
    );
}
