import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Page2 = () => {
  const { orderId } = useParams(); // Get the orderId from the route
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the specific order details using the orderId
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
        const data = await response.json();
        setOrder(data); // Store the fetched order data
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching the order:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Function to handle marking the order as 'Shipped'
  const handleShipped = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/ship`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stage: 'Shipped',
          completed: true,
        }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrder(updatedOrder); // Update the order in the state
        console.log('Order Shipped:', updatedOrder);
      } else {
        console.error('Error updating shipment status:', response.statusText);
      }
    } catch (err) {
      console.error('Error marking order as shipped:', err);
    }
  };

  // Render loading/error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="order-details">
      <h2>Order Details for {order.orderId}</h2>

      <p>Product Name: {order.productName}</p>
      <p>Product Price: {order.productPrice}</p>
      <p>Delivery Type: {order.deliveryType}</p>

      {/* Check if the "Order Confirmed" stage is completed */}
      {order.status.some(stage => stage.stage === 'Order Confirmed' && stage.completed) ? (
        <>
          <p>Status: Order Confirmed</p>

          {/* Show 'Shipped' button if "Order Confirmed" stage is true */}
          {order.status.some(stage => stage.stage === 'Shipped' && stage.completed) ? (
            <p>Status: Shipped</p> // Already shipped, so no button
          ) : (
            <button onClick={() => handleShipped(order.orderId)}>Mark as Shipped</button> // Show this button if not shipped yet
          )}
        </>
      ) : (
        <p>Status: Order Not Confirmed</p>
      )}
    </div>
  );
};

export default Page2;
