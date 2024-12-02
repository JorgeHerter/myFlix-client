import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaThumbsUp } from 'react-icons/fa';

export const MovieView = ({ movie, user, token, onUserUpdate }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState(""); // For feedback message
  const navigate = useNavigate();

  // Check if the movie is already in the user's favorites when the component mounts
  useEffect(() => {
    if (user && user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user, movie._id]);

  // Function to add movie to favorites
  const addToFavorites = (username, movieId, token) => {
    // Ensure username and movieId are not undefined or null
    if (!username || !movieId) {
      console.error('Missing username or movieId');
      return;
    }

    const apiUrl = `https://movie-api1-fbc239963864.herokuapp.com/users/${username}/movies/${movieId}`;
  
    // Send a PATCH request to the backend API
    fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,  // Pass the token if required
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MovieID: movieId  // Send movieId in the body (if needed)
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to add movie: ' + response.statusText);
        }
      })
      .then((data) => {
        // Update the user's favorites with the new list (from the API response)
        const updatedFavorites = data;  // Assuming the API response contains updated favorite list


        // Update the state and localStorage
        const updatedUser = { ...user, favoriteMovies: updatedFavorites };
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Save to localStorage

        // Update the UI and call the parent callback
        setIsFavorite(true);
        setMessage(" ");
        onUserUpdate(updatedUser); // Pass updated user data to the parent
      })
      .catch((error) => {
        console.error('Error adding to favorites:', error);
        setMessage(`Error: ${error.message}`); // Display error message
      });
  };

  return (
    <Card className="h-100">
      <Row>
        <Col md={4}>
          <Card.Img
            src={movie.imagePath}
            alt={`${movie.title} poster`}
            className="w-100"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x450.png?text=No+Image+Available";
            }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Card.Text>
              <strong>Director: </strong>
              {typeof movie.director === 'object' ? movie.director.name : movie.director}
            </Card.Text>
            <Card.Text>
              <strong>Genre: </strong>
              {typeof movie.genre === 'object' ? movie.genre.name : movie.genre}
            </Card.Text>
            <Card.Text>
              <strong>Release Year: </strong>
              {movie.releaseYear}
            </Card.Text>
            
            <div className="d-flex gap-2">
              <Button 
                variant="primary" 
                onClick={() => navigate(-1)} // Go back to previous page
              >
                Back
              </Button>
              
              <Button
                variant="success"
                onClick={() => addToFavorites(user.username, movie._id, token)} // Pass correct movie ID
                disabled={isFavorite} // Disable if already in favorites
              >
                <FaThumbsUp className="me-2" />
                {isFavorite ? "Added to Favorites" : "Add to Favorites"}
              </Button>
            </div>
            {message && <p>{message}</p>}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};


MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Ensure _id is required
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imagePath: PropTypes.string,
    director: PropTypes.oneOfType([ 
      PropTypes.string, 
      PropTypes.shape({
        name: PropTypes.string,
        birthYear: PropTypes.string
      })
    ]),
    genre: PropTypes.oneOfType([ 
      PropTypes.string, 
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string
      })
    ]),
    releaseYear: PropTypes.oneOfType([ 
      PropTypes.string, 
      PropTypes.number
    ])
  }).isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onUserUpdate: PropTypes.func.isRequired
};

export default MovieView;
