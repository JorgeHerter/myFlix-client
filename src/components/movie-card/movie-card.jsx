import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const {
    _id,
    title,
    director,
    genre,
    description,
    releaseYear,
    imagePath,
  } = movie;

  const getDirectorInfo = (director) => {
    if (typeof director === 'object' && director !== null) {
      return {
        name: director.name || "Unknown Director",
        birthYear: director.birthYear || "Unknown"
      };
    }
    return {
      name: director || "Unknown Director",
      birthYear: "Unknown"
    };
  };

  const getGenreInfo = (genre) => {
    if (typeof genre === 'object' && genre !== null) {
      return {
        name: genre.name || "Unknown Genre",
        description: genre.description || "No genre description available"
      };
    }
    return {
      name: genre || "Unknown Genre",
      description: "No genre description available"
    };
  };

  const directorInfo = getDirectorInfo(director);
  const genreInfo = getGenreInfo(genre);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imagePath}
        onError={(e) => {
          e.target.src = "/path/to/placeholder/image.jpg";
        }}
        alt={`Poster of ${title}`}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Director:</strong> {directorInfo.name} <br />
          <span>Birth Year: {directorInfo.birthYear}</span>
        </Card.Text>
        <Card.Text>
          <strong>Genre:</strong> {genreInfo.name} <br />
        </Card.Text>
        <Card.Text>
          <strong>Description:</strong> {description}
        </Card.Text>
        <Card.Text>
          <strong>Release Year:</strong> {releaseYear}
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(_id)}`}>
          <Button variant="primary" aria-label={`Open details of ${title}`}>
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        birthYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      })
    ]),
    genre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string
      })
    ]),
    description: PropTypes.string,
    releaseYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    imagePath: PropTypes.string,
  }).isRequired
};

export default MovieCard;

