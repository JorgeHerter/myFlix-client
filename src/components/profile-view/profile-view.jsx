/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spinner, Alert } from "react-bootstrap";

const ProfileView = ({ user, token, onUserUpdate, onError }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isFetchingFavorites, setIsFetchingFavorites] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Fetch user's favorite movies when the component mounts or user changes
  useEffect(() => {
    if (user && user.username) {
      fetchFavoriteMovies();
    }
  }, [user]);

  // Fetch favorite movies from the API
  const fetchFavoriteMovies = async () => {
    try {
      console.log("Fetching favorite movies for user:", user.username);  // Debugging: log user info

      const url = `https://movie-api1-fbc239963864.herokuapp.com/users/${user.username}/movies`;
      console.log("Request URL:", url);  // Log the full URL for the API request

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched favorite movies:", response.data);  // Debugging: log response

      setFavoriteMovies(response.data); // Assuming response.data is the list of favorite movies
    } catch (error) {
      console.error("Error fetching favorite movies:", error);  // Log error details
      setFetchError("Failed to fetch favorite movies.");

      // Call the onError function if it's provided
      if (typeof onError === "function") {
        onError("Error fetching favorite movies");
      } else {
        console.error("onError is not a function");  // Debugging: Check if onError is defined
      }
    } finally {
      setIsFetchingFavorites(false);
    }
  };

  // Add a movie to the user's favorites
  const handleAddToFavorites = async (movieID) => {
    try {
      console.log("Adding movie to favorites:", movieID);  // Debugging: log movie ID

      const response = await axios.patch(
        `https://movie-api1-fbc239963864.herokuapp.com/users/${user.username}/movies/${movieID}`,
        { MovieID: movieID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated favorite movies after adding:", response.data);  // Debugging: log response after update

      setFavoriteMovies(response.data);  // Update the favorites list with the new data
      onUserUpdate(response.data);  // Pass the updated user data to the parent component
    } catch (error) {
      console.error("Error adding movie to favorites:", error);  // Log error details
      if (typeof onError === "function") {
        onError("Failed to add movie to favorites.");
      } else {
        console.error("onError is not a function");
      }
    }
  };

  // Remove a movie from the user's favorites
  const handleRemoveFromFavorites = async (movieID) => {
    try {
      console.log("Removing movie from favorites:", movieID);  // Debugging: log movie ID

      const response = await axios.delete(
        `https://movie-api1-fbc239963864.herokuapp.com/users/${user.username}/movies/${movieID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated favorite movies after removal:", response.data);  // Debugging: log response after update

      setFavoriteMovies(response.data);  // Update the favorites list after removal
      onUserUpdate(response.data);  // Pass the updated user data to the parent component
    } catch (error) {
      console.error("Error removing movie from favorites:", error);  // Log error details
      if (typeof onError === "function") {
        onError("Failed to remove movie from favorites.");
      } else {
        console.error("onError is not a function");
      }
    }
  };

  return (
    <div className="profile-view">
      <h2>{user.name}'s Profile</h2>

      <div className="favorite-movies">
        <h3>Favorite Movies</h3>

        {isFetchingFavorites ? (
          <div>
            <p>Loading favorite movies...</p>
            <Spinner animation="border" />
          </div>
        ) : fetchError ? (
          <Alert variant="danger">{fetchError}</Alert> // Show error message
        ) : favoriteMovies.length === 0 ? (
          <p>No favorite movies yet.</p>  // Message if there are no favorite movies
        ) : (
          <ul>
            {favoriteMovies.map((movie) => (
              <li key={movie._id}>
                <strong>{movie.title}</strong> ({movie.releaseYear})
                <Button
                  onClick={() => handleRemoveFromFavorites(movie._id)}
                  variant="danger"
                  size="sm"
                  className="ml-2"
                >
                  Remove from Favorites
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="movie-actions">
]
      </div>
    </div>
  );
};

export default ProfileView;
import React from "react";
import { Alert } from "react-bootstrap";

const ProfileView = ({ user }) => {
  return (
    <div className="profile-view">
      <h2>{user.name}'s Profile</h2>
      
      <div className="user-info mt-4">
        <h3>User Information</h3>
        <div className="info-item">
          <strong>Username:</strong> {user.username}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="info-item">
          <strong>Birthday:</strong> {user.birthday ? new Date(user.birthday).toLocaleDateString() : 'Not provided'}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;*/
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const ProfileView = ({ user }) => {
  // Local state for managing bio input
  const [bio, setBio] = useState('');
  const [submittedBio, setSubmittedBio] = useState('');

  // Handle bio input changes
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  // Handle form submission to display bio
  const handleBioSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    setSubmittedBio(bio); // Set submitted bio to display
    setBio(''); // Clear the input field
  };

  // Check if user is defined and load data
  if (!user) {
    return <Alert variant="danger">User data not available.</Alert>;
  }

  return (
    <div className="profile-view">
      <h2>{user.name ? `${user.name}'s Profile` : 'Profile'}</h2>
      
      {/* User Information Section */}
      <div className="user-info mt-4">
        <h3>User Information</h3>
        <div className="info-item">
          <strong>Username:</strong> {user.username || 'Not available'}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {user.email || 'Not available'}
        </div>
        <div className="info-item">
          <strong>Birthday:</strong> {user.birthday ? new Date(user.birthday).toLocaleDateString() : 'Not provided'}
        </div>
      </div>

      {/* Bio Section */}
      <div className="bio-section mt-4">
        <h3>Your Bio</h3>
        {/* Bio display */}
        {submittedBio ? (
          <div className="bio-display">
            <p>{submittedBio}</p>
          </div>
        ) : (
          <div className="bio-input">
            <Form onSubmit={handleBioSubmit}>
              <Form.Group controlId="bio">
                <Form.Label>Enter your Bio</Form.Label>
                <Form.Control
                  type="text"
                  value={bio}
                  onChange={handleBioChange}
                  placeholder="Write something about yourself"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit Bio
              </Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;


