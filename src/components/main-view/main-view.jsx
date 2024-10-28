import { useState, useEffect } from "react";
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
        <div className="p-4">
            <LoginView 
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            />
            <div className="text-center my-4">or</div>
            <SignupView />
        </div>
        );
    }
    }, []);
         
    return (
        <div className="p-4">
    <button 
        onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
        }} className="bg-blue-500 text-white ph-4 py-2 rounded mb-4 hover:bg-blue-600">Logout</button>

        {selectedMovie ? (
        <div>
        <MovieView
            movie = {selectedMovie}
            onBackClick = {() => setSelectedMovie(null)}
            />
            <h2 className="text-xl font-bold mt-6 mb-4">Similar Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarMovies.map((movie) => (
                <MovieCard 
                  key={movie_id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                  />
            ))}
            </div>
        </div>
        ) : movies.length === 0 ? (
           <div className="text-center text-gray-600">There are no movies!</div>
        ) : ( 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
            {movies.map((movie) => (
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
                key = {movie._id}
                movie = {movie}
                onMovieClick = {(newSelectedMovie) => 
                    setSelectedMovie(newSelectedMovie)}
                />

            ))}
            </div>
        )}
    </div>
        ))
    )}
</div>
);
};

export default MainView;
