// MovieCarousel.js (React Component)

import React, { useEffect, useState } from 'react';

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

export default MovieCarousel;
