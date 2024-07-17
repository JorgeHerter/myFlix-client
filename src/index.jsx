<<<<<<< HEAD
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import MainView from './MainView.jsx';
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <container style={{border: "1px solid.red" }}>
        <MainView />
      </container>
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
=======
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainView from './MainView.jsx';
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <MainView />
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
>>>>>>> origin/main
root.render(<MyFlixApplication />);