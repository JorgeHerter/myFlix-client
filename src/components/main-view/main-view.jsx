/*import React, { useState, useEffect } from 'react'; 
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import ProfileView from '../profile-view/profile-view';
import MovieCarousel from '../movie-carousel/movie-carousel';
import SignupView from '../signup-view/signup-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import Favorites from '../favorites/favorites';
import { useParams } from 'react-router-dom';
import MovieSearch from '../movie-search/movie-search'; // <-- Import MovieSearch here

// MovieDetails Component to handle individual movie pages
const MovieDetails = ({ movies, user, token, onUserUpdate, handleFavoriteChange }) => {
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
        onFavoriteChange={handleFavoriteChange}  // Pass handleFavoriteChange to MovieView
      />
    </Col>
  );
};

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch movies data when token is available
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

  // Filter movies based on search query
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

  // useEffect to initialize and sync the UI dynamically when the user changes
  useEffect(() => {
    // Sync with localStorage whenever the user or token changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [user, token]);  // This effect runs whenever `user` or `token` changes

  // Function to update the user and sync the UI
  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  const handleFavoriteChange = (movieId) => {
    if (!user) return;
  
    // Determine if the movie is already in favorites
    const isFavorite = user.favoriteMovies.includes(movieId);
  
    // Update the favorites list accordingly
    const updatedFavorites = isFavorite
      ? user.favoriteMovies.filter(id => id !== movieId)  // Remove movie if it's already in favorites
      : [...user.favoriteMovies, movieId];  // Add movie if it's not in favorites
  
    // Update the user state with the new list of favorite movies
    const updatedUser = { ...user, favoriteMovies: updatedFavorites };
  
    // Update user in localStorage to persist the changes
    localStorage.setItem('user', JSON.stringify(updatedUser));
  
    // Update the user state in React
    setUser(updatedUser);
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
        onSearch={setSearchQuery}
        onLogout={handleLogout}
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
            element={user ? <Navigate to="/" /> : <Col md={5}><SignupView /></Col>}
          />
          
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : (
              <Col md={5}>
                <LoginView onLoggedIn={handleLogin} />
                <MovieCarousel />
              </Col>
            )}
          />

          <Route
            path="/movies/:movieId"
            element={user ? (
              <MovieDetails
                movies={movies}
                user={user}
                token={token}
                onUserUpdate={handleUserUpdate}
                handleFavoriteChange={handleFavoriteChange}
              />
            ) : (
              <Navigate to="/login" replace />
            )}
          />

          <Route
            path="/favorites"
            element={user && token ? (
              <Col>
                <Favorites
                  user={user}
                  movies={movies}
                  token={token}
                  onUserUpdate={handleUserUpdate}
                  onFavoriteChange={handleFavoriteChange}
                />
              </Col>
            ) : (
              <Navigate to="/login" replace />
            )}
          />

          <Route
            path="/users/:username"
            element={user ? (
              <Col>
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onUserUpdate={handleUserUpdate}
                />
              </Col>
            ) : (
              <Navigate to="/login" replace />
            )}
          />

<Route
  path="/movie-search"  // Change the path from /search to /movie-search
  element={<MovieSearch />} 
/>

          <Route
            path="/"
            element={user ? (
              <>
                {filteredMovies.length === 0 ? (
                  <Col>No movies found</Col>
                ) : (
                  <Row className="justify-content-center">
                    {filteredMovies.map((movie) => (
                      <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={movie._id}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          token={token}
                          onUserUpdate={handleUserUpdate}
                          onFavoriteChange={handleFavoriteChange}  // Pass handleFavoriteChange
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </>
            ) : (
              <Navigate to="/login" replace />
            )}
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;*/
import React, { useState, useEffect } from 'react'; 
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import ProfileView from '../profile-view/profile-view';
import MovieCarousel from '../movie-carousel/movie-carousel';
import SignupView from '../signup-view/signup-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import Favorites from '../favorites/favorites';
import { useParams } from 'react-router-dom';
import MovieSearch from '../movie-search/movie-search'; // <-- Import MovieSearch here

// MovieDetails Component to handle individual movie pages
const MovieDetails = ({ movies, user, token, onUserUpdate, handleFavoriteChange }) => {
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
        onFavoriteChange={handleFavoriteChange}  // Pass handleFavoriteChange to MovieView
      />
    </Col>
  );
};

export const MainView = () => {
  const storedToken = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch movies data when token is available
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

  // Filter movies based on search query
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

  // useEffect to initialize and sync the UI dynamically when the user changes
  useEffect(() => {
    // Sync with localStorage whenever the user or token changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [user, token]);

  // Function to update the user and sync the UI
  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  const handleFavoriteChange = (movieId) => {
    if (!user) return;
  
    // Determine if the movie is already in favorites
    const isFavorite = user.favoriteMovies.includes(movieId);
  
    // Update the favorites list accordingly
    const updatedFavorites = isFavorite
      ? user.favoriteMovies.filter(id => id !== movieId)  // Remove movie if it's already in favorites
      : [...user.favoriteMovies, movieId];  // Add movie if it's not in favorites
  
    // Update the user state with the new list of favorite movies
    const updatedUser = { ...user, favoriteMovies: updatedFavorites };
  
    // Update user in localStorage to persist the changes
    localStorage.setItem('user', JSON.stringify(updatedUser));
  
    // Update the user state in React
    setUser(updatedUser);
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
        onSearch={setSearchQuery}
        onLogout={handleLogout}
      />
      
      <Row className="justify-content-md-center">
        {error && (
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        )}

        <Routes>
          {/* Add this route as the first one to redirect non-authenticated users to login */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : (
              <Col md={5}>
                <LoginView onLoggedIn={handleLogin} />
                <MovieCarousel />
              </Col>
            )}
          />

          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Col md={5}><SignupView /></Col>}
          />
          
          <Route
            path="/movies/:movieId"
            element={user ? (
              <MovieDetails
                movies={movies}
                user={user}
                token={token}
                onUserUpdate={handleUserUpdate}
                handleFavoriteChange={handleFavoriteChange}
              />
            ) : (
              <Navigate to="/login" replace />
            )}
          />

          <Route
            path="/favorites"
            element={user && token ? (
              <Col>
                <Favorites
                  user={user}
                  movies={movies}
                  token={token}
                  onUserUpdate={handleUserUpdate}
                  onFavoriteChange={handleFavoriteChange}
                />
              </Col>
            ) : (
              <Navigate to="/login" replace />
            )}
          />

          <Route
            path="/users/:username"
            element={user ? (
              <Col>
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onUserUpdate={handleUserUpdate}
                />
              </Col>
            ) : (
              <Navigate to="/login" replace />
            )}
          />

          <Route
            path="/movie-search"  // Change the path from /search to /movie-search
            element={<MovieSearch />} 
          />

          <Route
            path="/"
            element={user ? (
              <>
                {filteredMovies.length === 0 ? (
                  <Col>No movies found</Col>
                ) : (
                  <Row className="justify-content-center">
                    {filteredMovies.map((movie) => (
                      <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={movie._id}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          token={token}
                          onUserUpdate={handleUserUpdate}
                          onFavoriteChange={handleFavoriteChange}  // Pass handleFavoriteChange
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </>
            ) : (
              <Navigate to="/login" replace />
            )}
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;


