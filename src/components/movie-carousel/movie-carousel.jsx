// MovieCarousel.js (React Component)

/*import React, { useEffect, useState } from 'react';

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    // Fetch movie posters
    fetch('/movies/public')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);
  
  return (
    <div id="movieCarousel" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {movies.map((movie, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={movie.title}>
            <img src={movie.imagePath || 'https://via.placeholder.com/150'} className="d-block w-100" alt={movie.title} />
          </div>
        ))}
      </div>
      <a className="carousel-control-prev" href="#movieCarousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#movieCarousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default MovieCarousel;*/
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for carousel
import { Carousel, Alert, Spinner } from 'react-bootstrap'; // React Bootstrap components

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]); // To store fetched movies
  const [error, setError] = useState(null);  // To track error messages
  const [loading, setLoading] = useState(true); // To track loading state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies from the API
        const response = await fetch('https://movie-api1-fbc239963864.herokuapp.com/movies/public');
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies'); // Throw error if status is not OK
        }

        const data = await response.json();

        // Format the movies data (if needed)
        const formattedMovies = data.map(movie => ({
          ...movie,
          //releaseYear: String(movie.releaseYear || 'Unknown'),
          //director: movie.director || 'Unknown Director',
          //genre: movie.genre || 'Unknown Genre',
        }));

        setMovies(formattedMovies); // Set the movies to state
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies'); // Update error message state
      } finally {
        setLoading(false); // Set loading state to false once fetching is complete
      }
    };

    fetchMovies(); // Call the fetchMovies function
  }, []); // 

  return (
    <div className="movie-carousel">
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {error && !loading && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Carousel>
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <Carousel.Item key={movie.title}>
                <img
                  className="d-block w-100"
                  src={movie.imagePath || 'https://via.placeholder.com/150'}
                  //alt={movie.title}
                />
              </Carousel.Item>
            ))
          ) : (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/150"
                alt="Placeholder"
              />
              <Carousel.Caption>
                <h5>No movies available</h5>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      )}
    </div>
  );
};

export default MovieCarousel;
/*import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for carousel
import { Carousel, Alert, Spinner } from 'react-bootstrap'; // React Bootstrap components

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]); // To store fetched movies
  const [error, setError] = useState(null);  // To track error messages
  const [loading, setLoading] = useState(true); // To track loading state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies from the API
        const response = await fetch('https://movie-api1-fbc239963864.herokuapp.com/movies/public');
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies'); // Throw error if status is not OK
        }

        const data = await response.json();

        // Format the movies data (if needed)
        const formattedMovies = data.map(movie => ({
          ...movie,
          //releaseYear: String(movie.releaseYear || 'Unknown'),
          //director: movie.director || 'Unknown Director',
          //genre: movie.genre || 'Unknown Genre',
        }));

        setMovies(formattedMovies); // Set the movies to state
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies'); // Update error message state
        onLogout(); // Logout the user if there's an error
      } finally {
        setLoading(false); // Set loading state to false once fetching is complete
      }
    };

    fetchMovies(); // Call the fetchMovies function
  }); // Include onLogout in the dependency array

  return (
    <div className="movie-carousel">
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {error && !loading && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Carousel>
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <Carousel.Item key={movie.title}>
                <img
                  className="d-block w-100"
                  src={movie.imagePath || 'https://via.placeholder.com/150'}
                  alt={movie.title}
                />
              </Carousel.Item>
            ))
          ) : (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/150"
                alt="Placeholder"
              />
              <Carousel.Caption>
                <h5>No movies available</h5>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      )}
    </div>
  );
};

export default MovieCarousel;*/



