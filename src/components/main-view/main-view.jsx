/*import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import Favorites from '../favorites/favorites';  // Import the Favorites component
import ProfileView from '../profile-view/profile-view';

const MovieDetails = ({ movies, user, token, onUserUpdate }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <Col>Movie not found</Col>;
  }

  return (
    <Col md={8}>
      <MovieView
        movie={movie}
        user={user}
        token={token}
        onUserUpdate={onUserUpdate}
        onFavoriteChange={(favorites) => {
          console.log('Favorites updated:', favorites);
        }}
      />
    </Col>
  );
};

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://movie-api1-fbc239963864.herokuapp.com/movies',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        
        const formattedMovies = data.map(movie => ({
          ...movie,
          releaseYear: String(movie.releaseYear || 'Unknown'),
          director: typeof movie.director === 'object' ? movie.director : {
            name: movie.director || 'Unknown Director',
            birthYear: 'Unknown'
          },
          genre: typeof movie.genre === 'object' ? movie.genre : {
            name: movie.genre || 'Unknown Genre',
            description: 'No description available'
          }
        }));

        setMovies(formattedMovies);
        setFilteredMovies(formattedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [token]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchQuery, movies]);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  if (loading) {
    return (
      <Col className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <BrowserRouter>
      <NavigationBar 
        user={user} 
        onLogout={handleLogout}
        onSearch={setSearchQuery}
      />
      
      <Row className="justify-content-md-center">
        {error && (
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        )}

        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={handleLogin} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <MovieDetails
                    movies={movies}
                    user={user}
                    token={token}
                    onUserUpdate={handleUserUpdate}
                  />
                )}
              </>
            }
          />

          <Route
            path="/favorites"
            element={
              <Col>
                {!user ? (
                <Navigate to="/login" replace />
                ) : (
                <Favorites
                user={user}
                movies={movies}
                onFavoriteChange={handleFavoriteChange}  // Ensure this is passed correctly
          />
        )}
          </Col>
            }
          />  

          <Route
            path="/users/:username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      onUserUpdate={handleUserUpdate}
                      onLoggedOut={handleLogout}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    {filteredMovies.length === 0 ? (
                      <Col>No movies found</Col>
                    ) : (
                      <Row className="justify-content-center">
                        {filteredMovies.map((movie) => (
                          <Col 
                            xs={12} 
                            sm={6} 
                            md={4} 
                            lg={3} 
                            className="mb-4" 
                            key={movie._id}
                          >
                            <MovieCard
                              movie={movie}
                              user={user}
                              token={token}
                              onUserUpdate={handleUserUpdate}
                            />
                          </Col>
                        ))}
                      </Row>
                    )}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;*/
import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import Favorites from '../favorites/favorites';  // Import the Favorites component
import ProfileView from '../profile-view/profile-view';

// MovieDetails Component to handle individual movie pages
const MovieDetails = ({ movies, user, token, onUserUpdate }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <Col>Movie not found</Col>;
  }

  return (
    <Col md={8}>
      <MovieView
        movie={movie}
        user={user}
        token={token}
        onUserUpdate={onUserUpdate}
        onFavoriteChange={(movieId) => {
          console.log('Favorite status changed for movie ID:', movieId);
        }}
      />
    </Col>
  );
};

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://movie-api1-fbc239963864.herokuapp.com/movies',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        
        const formattedMovies = data.map(movie => ({
          ...movie,
          releaseYear: String(movie.releaseYear || 'Unknown'),
          director: typeof movie.director === 'object' ? movie.director : {
            name: movie.director || 'Unknown Director',
            birthYear: 'Unknown'
          },
          genre: typeof movie.genre === 'object' ? movie.genre : {
            name: movie.genre || 'Unknown Genre',
            description: 'No description available'
          }
        }));

        setMovies(formattedMovies);
        setFilteredMovies(formattedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [token]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchQuery, movies]);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleFavoriteChange = (movieId) => {
    const updatedFavorites = [...(user.FavoriteMovies || [])];  // Ensure it's an array
    const movieIndex = updatedFavorites.indexOf(movieId);

    if (movieIndex === -1) {
      // Add to favorites
      updatedFavorites.push(movieId);
    } else {
      // Remove from favorites
      updatedFavorites.splice(movieIndex, 1);
    }

    const updatedUser = { ...user, FavoriteMovies: updatedFavorites };
    handleUserUpdate(updatedUser);
  };

  if (loading) {
    return (
      <Col className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <BrowserRouter>
      <NavigationBar 
        user={user} 
        onLogout={handleLogout}
        onSearch={setSearchQuery}
      />
      
      <Row className="justify-content-md-center">
        {error && (
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        )}

        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={handleLogin} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <MovieDetails
                    movies={movies}
                    user={user}
                    token={token}
                    onUserUpdate={handleUserUpdate}
                  />
                )}
              </>
            }
          />

          <Route
            path="/favorites"
            element={
              <Col>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Favorites
                    user={user}
                    movies={movies}
                    onFavoriteChange={handleFavoriteChange}  // Pass the correct handler
                  />
                )}
              </Col>
            }
          />  

          <Route
            path="/users/:username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      onUserUpdate={handleUserUpdate}
                      onLoggedOut={handleLogout}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    {filteredMovies.length === 0 ? (
                      <Col>No movies found</Col>
                    ) : (
                      <Row className="justify-content-center">
                        {filteredMovies.map((movie) => (
                          <Col 
                            xs={12} 
                            sm={6} 
                            md={4} 
                            lg={3} 
                            className="mb-4" 
                            key={movie._id}
                          >
                            <MovieCard
                              movie={movie}
                              user={user}
                              token={token}
                              onUserUpdate={handleUserUpdate}
                              onFavoriteChange={handleFavoriteChange} // Handle favorites here
                            />
                          </Col>
                        ))}
                      </Row>
                    )}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
