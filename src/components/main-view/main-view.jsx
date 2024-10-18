import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromMongo = data.movies.map((movie) => {
                return {
                    id: movie.key,
                    title: movie.title,
                    genre: movie.genre,
                    image: movie.img
                }
            })
            setMovies(moviesFromMongo);
        });
    }, []);
    
    const [selectedMovie, setSelectedMovie] = useState(null);
    
      
    return (
    <div>
        {selectedMovie ? (
        <MovieView
            movie = {selectedMovie}
            onBackClick = {() => setSelectedMovie(null) }
            /> 
        ): movies.length === 0 ? (
           <div>There are no movies!</div>
        ): ( movies.map((movie) => (
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
}