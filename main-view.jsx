
import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { set } from 'mongoose';
import { SignupView } from '../signup-view/signup-view';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // add this to your state variables

  useEffect(() => {
    fetch("https://api.example.com/movies") // replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.doces.map((movie) => {
          return {
            id: doc.key,
            title: doc.title,
            image: doc.image,
            description: movie.description,
            genre: movie.genre,
            director: movie.director,
            poster: movie.poster
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  return (
    <BrowserRouter>
      <Row ClassName="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
              element={
              <>
                { user ? (
                  <Navigate to = "/"/>
                )
                : (
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
                { user ? (
                  <Navigate to = "/"/>
                )
                : (
                  <Col md={5}>
                  <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
          </>
          }
          />
          <Route
            path="/movies/:movieId"
              element={
                <>
                { user ? (
                  <Navigate to ="login" replace/>
                ) : books.length === 0 ? (
                  <Col>The List is Empty!</Col>
                ) : (
                  <Col>
                    <MovieView movies={movies} />
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
                    <Navigate to = "/login" replace/>
                  ) : books.length === 0 ? (
                    <Col>The List is Empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                  </>
                }
              />
        </Routes>
      </Row>
    </BrowserRouter>
  )
};