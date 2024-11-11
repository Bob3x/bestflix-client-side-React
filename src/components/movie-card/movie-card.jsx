import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Row>
            <Col md={10}>
                <Card>
                    <Card.Img variant="top" src={movie.image} alt={movie.title} />
                    <Card.Body>
                        <Card.Title>
                            <strong>{movie.title}</strong>
                        </Card.Title>
                        <Card.Text>
                            <p>Genre: {movie.genre.name}</p>
                            {movie.description}
                        </Card.Text>
                        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                            <Button variant="link">Open</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birth: PropTypes.string,
            death: PropTypes.string,
        }).isRequired,
        image: PropTypes.string.isRequired,
        featured: PropTypes.bool.isRequired,
    }),
};

