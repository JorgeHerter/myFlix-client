
import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row } from 'react-bootstrap';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // add this to your state variables

  useEffect(() => {
    fetch("https://api.example.com/movies") // replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            description: movie.description,
            genre: movie.genre,
            director: movie.director,
            poster: movie.poster
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  if (!user) {
    return (
      <>
        {view === 'login' ? (
          <col md={4}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
            }} />
          </col>
        ) : (
          <col md={4}>
            <SignupView onSignup={(user, token) => {
              setUser(user);
            }} />
          </col>
        )}
        <button onClick={() => setView(view === 'login' ? 'signup' : 'login')}>
          {view === 'login' ? 'Switch to Signup' : 'Switch to Login'}
        </button>
      </>
    );
  }

  return (
    <Row>
      {!user ? (
        <>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </>
      ) : selectedMovie ? (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      ) : movies.length === 0 ? (
        <div className="main-view">The list is empty!</div>
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
          />
        ))
      )}
      <button onClick={() => setUser(null)}>Logout</button>
    </Row>
  );
};