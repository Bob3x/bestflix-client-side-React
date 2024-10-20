import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

const MainView = () => {
    const storedUser = JSON.parce(localStorage.getItem("user"));
    const storedToken = localStarage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
            // let similarMovies = movies.filter(
            //     (m) => m.Genre.Name === movie.Genre.Name
            // );
       
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
                    genre: movie.Genre,
                    description: movie.Description,
                    director: movie.Director, 
                    image: movie.ImagePath,
                    featured: movie.Featured
                }
            })
            setMovies(moviesAPI);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }, [token]);
    
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
        <MovieView
            movie = {selectedMovie}
            onBackClick = {() => setSelectedMovie(null)}
            /> 
           
        ) : movies.length === 0 ? (
           <div>There are no movies!</div>
        ) : ( 
            similarMovies.map((movie) => (
                <MovieCard 
                key = {movie.id}
                movie = {movie}
                onMovieClick = {(newSimilarMovie) => 
                    setSelectedMovie(newSimilarMovie)}
                />
            ))
        )}
    </div>
);
};

export default MainView;