import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import bootstrap CSS
import './index.scss';  // Import your custom styles
import { MainView } from './components/main-view/main-view';  // Adjust the path as needed
import Container from 'react-bootstrap/Container';  // Import Container from react-bootstrap

// Main application component
const MyFlixApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// Render the app into the root div in your HTML
const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<MyFlixApplication />);
