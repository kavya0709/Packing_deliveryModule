import React, { useEffect, useState } from 'react';
import './Page1.css'; // Optional: For styling
import { useNavigate } from 'react-router-dom';

const Page1 = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the backend
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders'); // Ensure this path matches your backend API
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrders();
  }, []);

  // Function to update the status of the order
  const handleConfirm = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/confirm`, { method: 'PATCH' });
  
      if (response.ok) {
        const updatedOrder = await response.json(); // Get the updated order data
        console.log('Updated Order:', updatedOrder); // Log the updated order data
  
        // Update the local state to reflect the change
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.orderId === orderId ? updatedOrder.order : order
          )
        );
      } else {
        console.error('Error confirming order:', response.statusText);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  const handlePack = (orderId) => {
    navigate(`/packing/${orderId}`);
  };
  

  return (
    <div className="table-container">
      <h2>Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Delivery Type</th>
            <th>Status</th>
            <th>Packing</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderId}</td>
              <td>{order.productName}</td>
              <td>{order.productPrice}</td>
              <td>{order.deliveryType}</td>
              <td>
                {order.status.some(stage => stage.stage === 'Order Confirmed' && stage.completed) ? (
                  <span>Order Confirmed</span> // Show this if the order is confirmed
                ) : (
                  <button onClick={() => handleConfirm(order.orderId)}>Confirm</button> // Show button if not confirmed                 
                  /*hardcode 12345 instead of order.orderId inside handlePack*/

                )}
              </td>
              <td>
                {/*hardcode 12345 instead of  inside handlePack*/}
                <button onClick={() => handlePack(order.orderId)}>Click to Pack</button> {/* Button to pack */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page1;
