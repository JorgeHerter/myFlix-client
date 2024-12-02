import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaThumbsDown } from 'react-icons/fa';

const Favorites = ({ user, movies, token, onUserUpdate, onFavoriteChange }) => {
  const [message, setMessage] = useState('');
  const [isRemoving, setIsRemoving] = useState(false);
  const [favoritesList, setFavoritesList] = useState(user.favoriteMovies || []);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure the initial favorites list is loaded from user object (or localStorage if needed)
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.favoriteMovies) {
      setFavoritesList(savedUser.favoriteMovies);
    }
  }, []);

  // Function to remove a movie from favorites
  const removeFromFavorites = async (movieId) => {
    if (!token) {
      setMessage('You need to log in to remove favorites.');
      return;
    }

    setMessage('');
    setIsRemoving(true);

    try {
      // Send DELETE request to the server to remove the movie from the user's favorites
      const response = await fetch(
        `https://movie-api1-fbc239963864.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove movie from favorites');
      }

      // Remove the movie from the favorites list locally
      const updatedFavorites = favoritesList.filter(id => id !== movieId);
      setFavoritesList(updatedFavorites);

      // Sync updated favorites with localStorage and parent component
      const updatedUser = { ...user, favoriteMovies: updatedFavorites };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      onUserUpdate(updatedUser); // Inform parent component of the update

      setMessage('Movie removed from favorites!');
      onFavoriteChange(movieId); // Notify parent of the favorite change
    } catch (error) {
      console.error('Error removing from favorites:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsRemoving(false);
    }
  };

  // If no favorites, show a message
  if (!favoritesList || favoritesList.length === 0) {
    return (
      <Col>
        <Alert variant="info">You have no favorite movies yet. Add some!</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
      </Col>
    );
  }

  return (
    <Col>
      <h2>Your Favorite Movies</h2>
      {message && <Alert variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}

      <Row>
        {movies
          .filter(movie => favoritesList.includes(movie._id))
          .map(movie => (
            <Col key={movie._id} sm={12} md={6} lg={4} className="mb-4">
              <div className="card h-100">
                <img
                  src={movie.imagePath || 'https://via.placeholder.com/300x450'}
                  alt={movie.title}
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{movie.title}</h5>
                  
                  <div className="mt-auto">
                    <Button 
                      variant="primary" 
                      onClick={() => navigate(`/movies/${movie._id}`)}
                      className="me-2 mb-2"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeFromFavorites(movie._id)}
                      disabled={isRemoving}
                      className="mb-2"
                    >
                      {isRemoving ? 'Removing...' : (
                        <>
                          <FaThumbsDown className="me-2" />
                          Remove from Favorites
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Col>
  );
};

Favorites.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onFavoriteChange: PropTypes.func.isRequired,
};

export default Favorites;









  



















