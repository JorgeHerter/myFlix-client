/*import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn, onLoggedOut }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const data = { username, password };

        fetch("https://movie-api1-fbc239963864.herokuapp.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setLoading(false);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
                setUsername("");
                setPassword("");
            } else {
                setError("Invalid username or password");
            }
        })
        .catch((e) => {
            setLoading(false);
            setError(`Something went wrong: ${e.message}`);
        });
    };
   
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        onLoggedOut(); // Call the logout handler
    };

    const isLoggedIn = !!localStorage.getItem("user"); // Check if user is logged in

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h3>Welcome back!</h3>
                    <Button variant="danger" onClick={handleLogout}>
                        Log Out
                    </Button>
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                            disabled={loading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="5"
                            disabled={loading}
                        />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? "Logging In..." : "Log In"}
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default LoginView;*/
/*import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MovieCarousel from '../movie-carousel/movie-carousel'; // Correct path relative to the current file

export const LoginView = ({ onLoggedIn, onLoggedOut }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = { username, password };

    fetch("https://movie-api1-fbc239963864.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          setUsername("");
          setPassword("");
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(`Something went wrong: ${e.message}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    onLoggedOut(); // Call the logout handler
  };

  const isLoggedIn = !!localStorage.getItem("user"); // Check if user is logged in

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h3>Welcome back!</h3>
          <Button variant="danger" onClick={handleLogout}>
            Log Out
          </Button>

          <MovieCarousel />
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="5"
              disabled={loading}
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default LoginView;*/
/*import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MovieCarousel from "../movie-carousel/movie-carousel"; // Correct path relative to the current file

export const LoginView = ({ onLoggedIn, onLoggedOut }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = { username, password };

    fetch("https://movie-api1-fbc239963864.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          setUsername("");
          setPassword("");
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(`Something went wrong: ${e.message}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    onLoggedOut(); // Call the logout handler
  };

  const isLoggedIn = !!localStorage.getItem("user"); // Check if user is logged in

  return (
    <div className="container-fluid">
      {isLoggedIn ? (
        <div>
          <h3>Welcome back!</h3>
          <Button variant="danger" onClick={handleLogout}>
            Log Out
          </Button>

          <div className="mt-4">
            <MovieCarousel />
          </div>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
          <Form.Group controlId="formUsername" className="mb-3 w-50">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3 w-50">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="5"
              disabled={loading}
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button variant="primary" type="submit" disabled={loading} className="w-50 w-sm-75 w-md-50 w-lg-25">
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </Form>
      )}

      
      {isLoggedIn && (
        <div className="mt-4 d-flex justify-content-center">
          <div className="w-50 w-sm-75 w-md-50 w-lg-25">
            
            <MovieCarousel />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginView;*/
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MovieCarousel from '../movie-carousel/movie-carousel'; // Correct path relative to the current file

export const LoginView = ({ onLoggedIn, onLoggedOut }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = { username, password };

    fetch("https://movie-api1-fbc239963864.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          setUsername("");
          setPassword("");
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(`Something went wrong: ${e.message}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    onLoggedOut(); // Call the logout handler
  };

  const isLoggedIn = !!localStorage.getItem("user"); // Check if user is logged in

  return (
    <div className="container-fluid">
      {isLoggedIn ? (
        <div>
          <h3>Welcome back!</h3>
          <Button variant="danger" onClick={handleLogout}>
            Log Out
          </Button>

          {/* Render the MovieCarousel component after login */}
          <div className="mt-4">
            <MovieCarousel onLogout={handleLogout} />
          </div>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
          <Form.Group controlId="formUsername" className="mb-3 w-50">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3 w-50">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="5"
              disabled={loading}
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button variant="primary" type="submit" disabled={loading} className="w-50">
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default LoginView;


