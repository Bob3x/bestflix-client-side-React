import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

const MainView = () => {
    const [movies, setMovies] = useState([]);
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
                        birth: movie.Director.Birth
                    },
                    image: movie.ImagePath,
                    featured: movie.Featured
                }
            })
            setMovies(moviesAPI);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }, []);
    
    const similarMovies = selectedMovie && movies.length > 0
        ? movies.filter( (m) => m.genre.name === selectedMovie.genre.name &&
        m._id != selectedMovie._id
    )
    : [];
       
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
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => 
                    setSelectedMovie(newSelectedMovie)}
            />
            ))}
         </>
         ) : movies.length === 0 ? (
           <div>There are no movies!</div>
         ) : ( 
            similarMovies.map((movie) => (
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
