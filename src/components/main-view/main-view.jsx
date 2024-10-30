import { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
       
    useEffect(() => {
        if (!token) return;

        fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
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
            setMovies(moviesAPI);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }, [token]);

    const similarMovies = selectedMovie && movies.length > 0
        ? movies.filter((m) => m.genre.name === selectedMovie.genre.name && 
        m._id != selectedMovie._id)
    : [];

    if (!user) {
        return (
            <Col>
            <LoginView 
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            /> 
            <p className="FrontViewText">or</p>
            <SignupView />
            </Col>
        );
    }
    return (
        <div className="d-grid p-4">
    <Button variant="primary" 
        onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
        }} >Logout</Button>

        {selectedMovie ? (
            <div>
            <Col md={8}>
        <MovieView
            movie = {selectedMovie}
            onBackClick = {() => setSelectedMovie(null)}
            />
            </Col>
            <h2 className="text-xl font-bold mt-6 mb-4">Similar Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarMovies.map((movie) => (
                <Col className="mb-5" key={movie._id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                  />
                </Col>
            ))}
            </div>
        </div>
        ) : movies.length === 0 ? (
           <div className="text-center text-gray-600">There are no movies!</div>
        ) : ( 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
            {movies.map((movie) => (
                <MovieCard 
                key = {movie._id}
                movie = {movie}
                onMovieClick = {(newSelectedMovie) => 
                    setSelectedMovie(newSelectedMovie)}
                />
            ))}
            </div>
        )}
    </div>
);
};

export default MainView;
