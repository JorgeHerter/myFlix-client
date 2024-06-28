import React from 'react';

const MovieCard = ({ movie, selectMovie }) => {
  return (
    <div onClick={() => selectMovie(movie)}>
      <h2>{movie.title}</h2>
      <img src={movie.poster} alt={movie.title} />
    </div>
  );
};

export default MovieCard;