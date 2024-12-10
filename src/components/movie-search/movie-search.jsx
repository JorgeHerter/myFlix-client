import React, { useState } from "react";
import MovieCard from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const MovieSearch = () => {
  const [searchType, setSearchType] = useState("title"); // Default search type is 'title'
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      return;
    }
  
    setMovies([]); // Clear previous results
    setError(null); // Clear any previous errors
    setLoading(true);
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("You need to log in first.");
      setLoading(false);
      return;
    }
  
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  
    const encodedSearchTerm = encodeURIComponent(searchTerm);
  
    let url = "";
  
    switch (searchType) {
      case "title":
        url = `https://movie-api1-fbc239963864.herokuapp.com/movies/${encodedSearchTerm}`;
        break;
      case "genre":
        url = `https://movie-api1-fbc239963864.herokuapp.com/genre/${encodedSearchTerm}`;
        break;
      case "director":
        url = `https://movie-api1-fbc239963864.herokuapp.com/movies/director/${encodedSearchTerm}`;
        break;
      default:
        setError("Invalid search type");
        setLoading(false);
        return;
    }
  
    try {
      const response = await fetch(url, { headers });
  
      if (!response.ok) {
        switch (response.status) {
          case 404:
            setError("No movies found for the given search criteria.");
            break;
          case 401:
            setError("Unauthorized. Please log in.");
            break;
          default:
            setError(`Failed to fetch movies with status: ${response.status}`);
        }
        return;
      }
  
      const data = await response.json();
  
      // More flexible response handling
      let foundMovies = [];
      
      // Genre and director searches might return different response structures
      if (searchType === "genre" && Array.isArray(data)) {
        foundMovies = data;
      } else if (searchType === "director" && Array.isArray(data)) {
        foundMovies = data;
      } else if (data.movies && Array.isArray(data.movies)) {
        foundMovies = data.movies;
      } else if (data.title) {
        foundMovies = [data];
      }
  
      if (foundMovies.length > 0) {
        setMovies(foundMovies);
      } else {
        setError("No movies found.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("There was an error fetching the movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-search">
      <h2 className="text-center">Search for Movies</h2>

      <Form.Group controlId="searchType">
        <Form.Label>Select Search Type</Form.Label>
        <Form.Control
          as="select"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">By Title</option>
          <option value="genre">By Genre</option>
          <option value="director">By Director</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="searchTerm">
        <Form.Label>Enter Search Term</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <div className="text-center mb-4">
        <Button variant="primary" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      {movies.length > 0 && (
        <div className="movie-results mt-3 d-flex justify-content-center flex-wrap">
          {movies.map((movie) => (
            <div key={movie._id} className="movie-card m-2" style={{ maxWidth: '200px' }}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;



