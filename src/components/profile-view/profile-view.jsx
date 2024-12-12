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
/*import { useState, useEffect } from "react";
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

        
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>} 

        <h3 className="mt-5">Update Profile</h3>

        
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

export default ProfileView;*/
/*import { useState, useEffect } from "react";
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
    console.log("useEffect: Loading user data from localStorage");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log("useEffect: Found user in localStorage:", user);
      setUserData(user);
      setUsername(user.username);
      setEmail(user.email);
      setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "");
    } else {
      console.log("useEffect: No user found in localStorage");
      setError("User not found in localStorage.");
    }
  }, []);

  // Handle form submission to update user profile
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit: Form submitted");

    if (!userData) {
      console.log("handleSubmit: No user data available");
      setError("No user data available.");
      return;
    }

    console.log("handleSubmit: Updating user data with", { username, email, dateOfBirth });
    setLoading(true);
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message before submitting

    const updatedData = { username, email, dateOfBirth };
    const url = `https://movie-api1-fbc239963864.herokuapp.com/users/${userData.username}`;

    console.log("handleSubmit: Sending PUT request to", url);
    
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        console.log("handleSubmit: Response received", response);
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.log("handleSubmit: Error in response", errorData);
            throw new Error(`Failed to update profile. Status: ${response.status}. Message: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("handleSubmit: Profile updated successfully", data);
        setLoading(false);
        if (data.user) {
          // Save the updated user data to localStorage and update the profile
          console.log("handleSubmit: Saving updated user data to localStorage");
          localStorage.setItem("user", JSON.stringify(data.user));
          onProfileUpdated(data.user); // Notify parent about the updated profile
          setSuccessMessage("Profile updated successfully!"); // Set success message
          setUserData(data.user); // Update the UI with new data
        }
      })
      .catch((err) => {
        console.log("handleSubmit: Error updating profile", err);
        setLoading(false);
        setError(`Error updating profile: ${err.message}`);
      });
  };

  // If user data is not loaded yet, show loading message
  if (!userData) {
    console.log("ProfileView: User data not loaded yet, showing loading...");
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <span>Loading user data...</span>
      </div>
    );
  }

  console.log("ProfileView: Rendering profile with user data", userData);

  return (
    <div className="profile-view d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center" style={{ maxWidth: "600px", width: "100%" }}>
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

        
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>} 

        <h3 className="mt-5">Update Profile</h3>

        
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
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (!storedUser || !storedToken) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      setUserData(user);
      setUsername(user.username);
      setEmail(user.email);
      setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "");
    } catch (parseError) {
      console.error("Error parsing user data:", parseError);
      setError("Invalid user data. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userData) {
      setError("No user data available. Please log in again.");
      return;
    }

    if (
      username === userData.username && 
      email === userData.email && 
      dateOfBirth === (userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split("T")[0] : "")
    ) {
      setError("No changes detected. Please modify at least one field.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const updatedData = { 
        username, 
        email, 
        dateOfBirth: new Date(dateOfBirth).toISOString() 
      };

      const response = await fetch(`https://movie-api1-fbc239963864.herokuapp.com/users/${userData.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.message === "Username already taken") {
          throw new Error("This username is already in use. Please choose a different username.");
        } else if (responseData.message === "User not found") {
          throw new Error("Your user account could not be found. Please log in again.");
        } else {
          throw new Error(responseData.message || "An unexpected error occurred during profile update.");
        }
      }

      if (responseData.user) {
        localStorage.setItem("user", JSON.stringify(responseData.user));
        
        setUserData(responseData.user);
        setUsername(responseData.user.username);
        setEmail(responseData.user.email);
        setDateOfBirth(responseData.user.dateOfBirth ? 
          new Date(responseData.user.dateOfBirth).toISOString().split("T")[0] : 
          ""
        );

        onProfileUpdated(responseData.user);
        setSuccessMessage("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <span>Loading user data...</span>
      </div>
    );
  }

  return (
    <div className="profile-view container">
      <div className="text-center">  {/* Centers text content */}
        <h2>Update Profile</h2>
        
        {/* Error and Success Messages */}
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}> {/* Centers form and sets max width */}
          {/* Username Field */}
          <Form.Group className="text-start"> {/* Keeps form labels left-aligned for better readability */}
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              disabled={loading}
            />
            <Form.Text className="text-muted">
              Current username: {userData.username}
            </Form.Text>
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="text-start">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          {/* Date of Birth Field */}
          <Form.Group className="text-start">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
            className="mt-3"
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </Form>

        {/* New section to display updated username and email */}
        <div className="mt-4 p-3 border rounded mx-auto" style={{ maxWidth: '400px' }}>
          <h3>Current Profile Information</h3>
          <div className="mb-2">
            <strong>Username:</strong> {username}
          </div>
          <div>
            <strong>Email:</strong> {email}
          </div>
        </div>
      </div>
    </div>
  );

};

export default ProfileView;