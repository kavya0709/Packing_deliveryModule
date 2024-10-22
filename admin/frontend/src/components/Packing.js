import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Packing = () => {
  const { orderId } = useParams(); // Get the orderId from the URL parameters
  const [order, setOrder] = useState(null); // State to hold the order data
  const [error, setError] = useState(null); // State to track any error
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    if (!orderId) {
        setError("Order ID is missing."); // Set error if orderId is undefined
        return; // Exit the effect if orderId is not available
      }
      
      const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
        if (!response.ok) {
          const errorText = await response.text(); // Read the response as text for more detail
          console.error("Error response:", errorText); // Log the error response
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrder(data); // Set the fetched order data
      } catch (error) {
        setError(error.message); // Set the error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchOrderDetails(); // Fetch the order details when the component mounts
  }, [orderId]);

  // Render error message if error exists
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render loading state while fetching order data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render order details if order data is successfully fetched
  return (
    <div className="packing-container">
      <h2>Packing Page</h2>
      <h3>Order ID: {order.orderId}</h3>
      <div className="product-details">
        <div className="product-image">
          <img 
            src={order.productImage} 
            alt={order.productName} 
            style={{ width: '300px', height: 'auto' }} 
          />
        </div>
        <div className="product-description">
          <h4>Product Description:</h4>
          <p>{order.productDescription}</p>
        </div>
      </div>
      <p>Your order is being packed.</p>
    </div>
  );
};

export default Packing;
