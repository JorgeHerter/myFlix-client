/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaThumbsUp } from 'react-icons/fa';

export const MovieView = ({ movie, user, token, onUserUpdate }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState(""); // For feedback message
  const navigate = useNavigate();

  // Function to add movie to favorites
  const addToFavorites = (username, movieId, token) => {
    // Log the values to check if they are correct
    console.log('Username:', username);
    console.log('Movie ID:', movieId);
  
    // Ensure username and movieId are not undefined or null
    if (!username || !movieId) {
      console.error('Missing username or movieId');
      return;
    }
  
    const apiUrl = `https://movie-api1-fbc239963864.herokuapp.com/users/${username}/movies/${movieId}`;
  
    // Log the API URL to check if it's formed correctly
    console.log('API URL:', apiUrl);
  
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
        console.log('Movie added to favorites', data);
        const updatedUser = {
          ...user,
          FavoriteMovies: data
        };
        onUserUpdate (updatedUser);
        // You can update UI state or inform the user here if you want
        setIsFavorite(true); // Indicating the movie has been added to favorites
      })
      .catch((error) => {
        console.error('Error adding to favorites:', error);
        alert(`Error: ${error.message}`);
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
  onUserUpdate: PropTypes.func
};

export default MovieView;*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaThumbsUp } from 'react-icons/fa';

export const MovieView = ({ movie, user, token, onUserUpdate }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState(""); // For feedback message
  const navigate = useNavigate();

  // Function to add movie to favorites
  const addToFavorites = (username, movieId, token) => {
    // Log the values to check if they are correct
    console.log('Username:', username);
    console.log('Movie ID:', movieId);
  
    // Ensure username and movieId are not undefined or null
    if (!username || !movieId) {
      console.error('Missing username or movieId');
      return;
    }
  
    const apiUrl = `https://movie-api1-fbc239963864.herokuapp.com/users/${username}/movies/${movieId}`;
  
    // Log the API URL to check if it's formed correctly
    console.log('API URL:', apiUrl);
  
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
        console.log('Movie added to favorites', data);
        // Update user state with new favorite list
        const updatedUser = {
          ...user,
          FavoriteMovies: data // Assuming the response data contains updated list of favorite movies
        };
        
        // Save updated user data to localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Call the callback function to update user data in parent component
        onUserUpdate(updatedUser);

        // Update UI state
        setIsFavorite(true); // Indicating the movie has been added to favorites
        setMessage("Movie added to favorites!"); // Success message
      })
      .catch((error) => {
        console.error('Error adding to favorites:', error);
        setMessage(`Error: ${error.message}`); // Error feedback
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

            {/* Display the success or error message */}
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
  onUserUpdate: PropTypes.func
};

export default MovieView;


