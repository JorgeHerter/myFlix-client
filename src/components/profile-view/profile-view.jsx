/*import { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProfileView = ({ onProfileUpdated }) => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      setUsername(user.username);
      setEmail(user.email);
      setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "");
    } else {
      setError("User not found in localStorage.");
    }
  }, []);

  // Handle form submission to update user profile
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userData) {
      setError("No user data available.");
      return;
    }

    setLoading(true);
    setError("");

    const updatedData = { username, email, dateOfBirth };
    const url = `https://movie-api1-fbc239963864.herokuapp.com/users/${userData.username}`;

    console.log("API URL:", url);
    console.log("Form data being sent:", updatedData);

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error("Error Response:", errorData);
            throw new Error(`Failed to update profile. Status: ${response.status}. Message: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        console.log("Profile updated successfully:", data);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          onProfileUpdated(data.user);
        } else {
          setError("Failed to update profile.");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(`Error updating profile: ${err.message}`);
        console.error("Error:", err);
      });
  };

  // If user data is not loaded yet, show loading message
  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="profile-view d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <h2>{userData.name ? `${userData.name}'s Profile` : 'Profile'}</h2>
        <div className="user-info mt-4">
          <h3>User Information</h3>
          <div className="info-item">
            <strong>Username:</strong> {userData.username || 'Not available'}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {userData.email || 'Not available'}
          </div>
          <div className="info-item">
            <strong>Birthday:</strong> {userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : 'Not provided'}
          </div>
        </div>

        <h3 className="mt-5">Update Profile</h3>
        {error && <Alert variant="danger">{error}</Alert>}

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

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="formDateOfBirth">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ProfileView;*/
import { useState, useEffect } from "react";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProfileView = ({ onProfileUpdated }) => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For success message

  const navigate = useNavigate();

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      setUsername(user.username);
      setEmail(user.email);
      setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "");
    } else {
      setError("User not found in localStorage.");
    }
  }, []);

  // Handle form submission to update user profile
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userData) {
      setError("No user data available.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message before submitting

    const updatedData = { username, email, dateOfBirth };
    const url = `https://movie-api1-fbc239963864.herokuapp.com/users/${userData.username}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(`Failed to update profile. Status: ${response.status}. Message: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.user) {
          // Save the updated user data to localStorage and update the profile
          localStorage.setItem("user", JSON.stringify(data.user));
          onProfileUpdated(data.user);
          setSuccessMessage("Profile updated successfully!"); // Set success message
          setUserData(data.user); // Update the UI with new data
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(`Error updating profile: ${err.message}`);
      });
  };

  // If user data is not loaded yet, show loading message
  if (!userData) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <span>Loading user data...</span>
      </div>
    );
  }

  return (
    <div className="profile-view d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center" style={{ maxWidth: "600px", width: "100%" }}>
        <h2>{userData.name ? `${userData.name}'s Profile` : 'Profile'}</h2>

        {/* Display user information */}
        <div className="user-info mt-4">
          <h3>User Information</h3>
          <div className="info-item">
            <strong>Username:</strong> {userData.username || 'Not available'}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {userData.email || 'Not available'}
          </div>
          <div className="info-item">
            <strong>Birthday:</strong> {userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : 'Not provided'}
          </div>
        </div>

        {/* Display error or success messages */}
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Display success message */}

        <h3 className="mt-5">Update Profile</h3>

        {/* Form to update user profile */}
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

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="formDateOfBirth">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading} className="mt-4">
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ProfileView;






