import React from "react";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProfileView = ({ user }) => {
  // Check if user is defined and load data
  if (!user) {
    return <Alert variant="danger">User data not available.</Alert>;
  }

  const navigate = useNavigate();  // Initialize the navigate function to go back

  return (
    <div className="profile-view d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <h2>{user.name ? `${user.name}'s Profile` : 'Profile'}</h2>

        {/* User Information Section */}
        <div className="user-info mt-4">
          <h3>User Information</h3>
          <div className="info-item">
            <strong>Username:</strong> {user.username || 'Not available'}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {user.email || 'Not available'}
          </div>
          <div className="info-item">
            <strong>Birthday:</strong> {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
          </div>
        </div>

        {/* Blue Back Button */}
        <div className="mt-4">
          <Button variant="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;




