import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Alert } from 'react-bootstrap';

const Favorites = ({ user, movies, onFavoriteChange }) => {
  const [message, setMessage] = useState('');
  const favoriteMovies = user?.FavoriteMovies || [];  // Ensure it's an empty array if not defined

  // If the user has no favorite movies, display a message
  if (favoriteMovies.length === 0) {
    return (
      <Col>
        <Alert variant="info">You have no favorite movies yet. Add some!</Alert>
      </Col>
    );
  }

  // Handle toggling favorite (removing a movie from favorites)
  const handleFavoriteToggle = async (movieId) => {
    console.log('Removing movie with ID:', movieId);

    // Step 1: Optimistically update the UI (remove the movie from favorites)
    onFavoriteChange(movieId, 'remove');  // Optimistically remove the movie from the UI

    try {
      console.log('Attempting to remove favorite movie. User:', user.username, 'Token:', user.token);
      
      // Step 2: Make the DELETE request to remove the movie from the backend
      const response = await fetch(
        `https://movie-api1-fbc239963864.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,  // Send JWT token to authenticate the user
          },
        }
      );

      // Log the response from the API
      console.log('API Response:', response.status, response.statusText);

      if (!response.ok) {
        // Handle errors like Unauthorized (401) or not found (404)
        if (response.status === 401) {
          console.error('Error: Unauthorized request. Token might be invalid.');
          setMessage('Unauthorized: Please log in again.');
        } else {
          console.error('Error: Failed to remove movie. Status:', response.status);
          setMessage('Error removing favorite movie.');
        }

        // If API call failed, revert optimistic update
        onFavoriteChange(movieId, 'add');
        return;
      }

      // Step 3: Get the updated list of favorite movies from the response
      const updatedFavorites = await response.json();
      console.log('Updated favorites from server:', updatedFavorites);

      // Step 4: Update the UI with the updated list of favorites
      onFavoriteChange(updatedFavorites);  // Pass the updated favorites list to the parent component

    } catch (error) {
      // Step 5: Handle any errors that occurred during the fetch request
      console.error('Error removing favorite movie:', error);
      setMessage('Error removing favorite movie.');
      // Optionally revert the UI change if the API call fails
      onFavoriteChange(movieId, 'add');  // Revert the optimistic UI change on failure
    }
  };

  return (
    <Col>
      <h2>Your Favorite Movies</h2>

      
      {message && <Alert variant="danger">{message}</Alert>}

      <Row>
        {movies
          .filter((movie) => favoriteMovies.includes(movie._id))  // Only show movies that are in favorites
          .map((movie) => (
            <Col key={movie._id} sm={12} md={6} lg={4} className="mb-4">
              <div className="card">
                
                <img
                  src={movie.imagePath || 'https://via.placeholder.com/200'}  // Fallback if imagePath is missing
                  alt={movie.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.description}</p>
                  <Button
                    variant="danger"
                    onClick={() => handleFavoriteToggle(movie._id)}  // Trigger remove from favorites
                  >
                    <span role="img" aria-label="thumbs-down">👎</span> Remove from Favorites
                  </Button>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Col>
  );
};

export default Favorites;









