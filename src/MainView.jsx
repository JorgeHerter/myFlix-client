import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import { MovieCard } from './MovieCard';
import { movieData } from './movieData';

const MovieCard = ({ movie, selectMovie }) => (
    <div onClick={() => selectMovie(movie)}>
        <h2>{movie.title}</h2>
    </div>
);

const MovieView = ({ movie, goBack }) => (
    <div>
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <img src={movie.poster} alt={movie.title} />
        <p>{movie.genre}</p>
        <p>{movie.director}</p>
        <button onClick={goBack}>Back</button>
    </div>
);

const MainView = () => {

    const [movies, setMovies] = useState(movieData);


    // Simulate a data fetch
setTimeout(() => {
    setMovies(prevMovies => [
      ...prevMovies,
      {
        title: 'New Movie',
        description: 'This is a new movie.',
        genre: 'New Genre',
        director: 'New Director',
        poster: 'https://link-to-new-movie-poster.jpg'
      }
    ]);
  }, 2000);

    const [selectedMovie, setSelectedMovie] = useState(null);

    //const selectMovie = movie => setSelectedMovie(movie);
    //const goBack = () => setSelectedMovie(null);

    if (selectedMovie) {
        return (
          <MovieView bookmovie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
      }

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
        <div>
            {selectedMovie
                ? <MovieView movie={selectedMovie} goBack={goBack} />
                : movies.map(movie => (
                    <MovieCard key={movie.title} movie={movie} selectMovie={selectMovie} />
                ))
            }
        </div>
    );
    
};

ReactDOM.render(<MainView />, document.getElementById('root'));