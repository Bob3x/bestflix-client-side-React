import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}`}
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
    }, []);
    
    const [selectedMovie, setSelectedMovie] = useState(null);
       
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
            movies.map((movie) => (
                <MovieCard 
                key = {movie.id}
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