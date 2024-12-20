import React from 'react';
import { Container } from 'react-bootstrap';  // Import only once
import { createRoot } from 'react-dom/client';
import MainView from './MainView'; // Adjust the path if necessary
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'; // Ensure this path is correct

const MyFlixApplication = () => {
  return (
    <Container className="my-flix" fluid>
      <MainView />
    </Container>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<MyFlixApplication />);

