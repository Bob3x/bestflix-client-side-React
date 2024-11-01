import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  return (
    <Container>
      <Row>
        <Col md={5}>
          <Card className="mt-3 mb-2">
            <Card.Img src={movie.image} alt={movie.title} />
            <Card.Body>
              <Card.Header>
                <Card.Title>
                  <strong>{movie.title}</strong>
                </Card.Title>
              </Card.Header>
              <Card.Text>
                <h5>Genre:</h5>
                <p>{movie.genre.name}</p>
                <h5>Description:</h5>
                <p>{movie.description}</p>
                <h5>Director: </h5>
                <span>{movie.director.name}</span>
                <p>Birth year: {movie.director.birth}</p>
                <h5>Bio: </h5>
                <p>{movie.director.bio}</p>
              </Card.Text>

              <Link to={`/`}>
                <Button onClick={onBackClick} variant="secondary">
                  Back
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
