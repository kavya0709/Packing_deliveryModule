import React, { useState, useEffect } from 'react';
import './WelcomePage.css'; // Import the CSS for animations

const WelcomePage = ({ onSubmit }) => {
  const [orderId, setOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Trigger the input field to appear after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowInput(true), 1000); // Show input box after 1 second
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId.trim() === '') {
      setErrorMessage('Please enter a valid Order ID.');
      return;
    }
    onSubmit(orderId);
  };

  return (
    <div className="welcome-page">
      <h1 className="welcome-message">Welcome to Order Tracking</h1>
      {/* Conditionally show the input form after the animation delay */}
      {showInput && (
        <form onSubmit={handleSubmit} className="fade-in">
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={handleInputChange}
            className="order-input"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="submit-button">Track Order</button>
        </form>
      )}
    </div>
  );
};

export default WelcomePage;
