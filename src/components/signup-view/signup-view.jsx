import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import icons for password visibility
import './signup-view.css'; // Import the CSS file

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const userData = { username, password, email, dateOfBirth };

    try {
      const response = await fetch('https://movie-api1-fbc239963864.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors ? data.errors.map(err => err.msg).join(', ') : data.message || 'Something went wrong!');
      }

      setSuccess('Registration successful!');
      // Reset form fields after submission
      setUsername('');
      setPassword('');
      setEmail('');
      setDateOfBirth('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="signup-container">
      <Form onSubmit={handleSubmit} className="signup-form">
        <h2 className="text-center mb-4">Sign Up</h2>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control-custom"
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3 position-relative">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type={passwordVisible ? 'text' : 'password'} // Toggle input type based on visibility state
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control-custom"
          />
          <div 
            className="password-toggle-icon"
            onClick={togglePasswordVisibility} // Toggle visibility on icon click
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control-custom"
          />
        </Form.Group>

        <Form.Group controlId="dateOfBirth" className="mb-3">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            className="form-control-custom"
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading} className="w-100 btn-custom">
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
      </Form>
    </div>
  );
};

export default SignupView;


