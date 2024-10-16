import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Fight Club",
            image: "https://www.imdb.com/title/tt0137523/mediaviewer/rm1412004864/?ref_=tt_ov_i",
            genre: "Drama"
        },
        {
            id: 2,
            title: "The Lord of the Rings: The Fellowship of the Ring",
            image: "https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976/?ref_=tt_ov_i",
            genre: "Adventure"
        },
        {
            id: 3,
            title: "The Matrix",
            image: "https://www.imdb.com/title/tt0133093/mediaviewer/rm525547776/?ref_=tt_ov_i",
            genre: "Action"
        }

    ])
    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (<MovieView
            movie = {selectedMovie}
            onBackClick = {() => {
                setSelectedMovie(null);
            }}
            />
        );
    }
}
if (movies.length === 0) {
    return <div>There are no movies!</div>
}
return (
    <div>
        {movies.map((movie) => {
            return ( 
                <MovieCard 
                key = {movie.id}
                movie = {movie}
                onMovieClick = {(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            );
        })}
    </div>
);