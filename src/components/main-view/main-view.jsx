import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";

const MainView = () => {
    const storedUser = JSON.parce(localStorage.getItem("user"));
    const storedToken = localStarage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
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
            <LoginView 
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token)
                }}
            />
        );
    }
    <button 
        onClick={() => {
            setUser(null);
            setToken(null)
        }}>Logout</button>;

    
    return (
    <div>
        {selectedMovie ? (
        <>
        <MovieView
            movie = {selectedMovie}
            onBackClick = {() => setSelectedMovie(null)}
            />
            <h2>Similar Movies</h2>
            {similarMovies.map((movie) => (
                <MovieCard 
                  key={movie_id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                  />
            ))}
        </>
        ) : movies.length === 0 ? (
           <div>There are no movies!</div>
        ) : ( 
            movies.map((movie) => (
                <MovieCard 
                key = {movie._id}
                movie = {movie}
                onMovieClick = {(newSelectedMovie) => 
                    setSelectedMovie(newSelectedMovie)}
                />
            ))
        )}
    </div>
);
};

export default MainView;