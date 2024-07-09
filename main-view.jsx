
import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { set } from 'mongoose';
import { SignupView } from '../signup-view/signup-view';

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
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }} />
            ) : (
                <SignupView onSignup={(user, token) => {
                    setUser(user);
                    setToken(token);
                }} />
            )}
            <button onClick={() => setView(view === 'login' ? 'signup' : 'login')}>
                {view === 'login' ? 'Switch to Signup' : 'Switch to Login'}
            </button>
        </>
    );
}

  /*if (!user) {
    return (
        <>
    <LoginView onLoggedIn={(user, token) =>{
        setUser(user);
        setToken(token);
    }} />;
    or
    <SignupView/>
    );
  }*/

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <>
        <div>
            {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
            }}
            />
            ))}
        </div>
        <button onClick={() => {setUser(null); }}>Logout</button>
    </>
  );
};