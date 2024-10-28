import React, { useState } from 'react';
import WelcomePage from './components/WelcomePages/WelcomePage';
import OrderStatus from './components/OrderStatus/OrderStatus';
import './App.css';

const App = () => {
  const [validatedOrderId, setValidatedOrderId] = useState(null);

  const handleOrderSubmit = (orderId) => {
    setValidatedOrderId(orderId);
  };

  return (
    <div className="App">
      {!validatedOrderId ? (
        <WelcomePage onSubmit={handleOrderSubmit} />
      ) : (
        <OrderStatus orderId={validatedOrderId} />
      )}
    </div>
  );
};

export default App;
