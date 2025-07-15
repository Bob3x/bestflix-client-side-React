import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./favorite-movies.scss";

export const FavoriteMovies = ({ favoriteMovies }) => {
    return (
        <Card className="favorite-movies-card">
            <Card.Header>
                <h4>Favorite Movies</h4>
            </Card.Header>
            <Card.Body className="favorite-movies-body">
                {!favoriteMovies || favoriteMovies.length === 0 ? (
                    <div className="no-favorites-message">
                        <p>No favorite movies</p>
                    </div>
                ) : (
                    <div className="favorite-movies-grid">
                        {favoriteMovies.map((movie) => (
                            <div key={movie.id} className="favorite-movie-col">
                                <div className="favorite-movie-item">
                                    <Link to={`/movies/${movie.id}`} className="movie-link">
                                        <div className="movie-poster-wrapper">
                                            <img
                                                src={
                                                    movie.image ||
                                                    "https://placehold.co/300x450?text=Bestflix"
                                                }
                                                alt={movie.title}
                                                className="movie-poster"
                                            />
                                        </div>
                                        <div className="movie-title-wrapper">
                                            <h6 className="movie-title">{movie.title}</h6>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};
