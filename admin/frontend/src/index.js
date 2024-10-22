// src/index.js or src/main.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import App from './App'; // Your main app component

// Get the root element by ID and use createRoot to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
