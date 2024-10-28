import React, { useEffect, useState } from 'react';
import './Page1.css'; // Optional: For styling
import { useNavigate } from 'react-router-dom';

const Page1 = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleConfirm = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/confirm`, { method: 'PATCH' });
      if (response.ok) {
        const updatedOrder = await response.json();
        console.log('Updated Order:', updatedOrder);
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
    navigate(`/packing/12345`);
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
            <tr
            key={order._id}
            className={order.deliveryType === 'express' ? 'express-order' : 'normal-order'}
          >
          
              <td>{order.orderId}</td>
              <td>{order.productName}</td>
              <td>{order.productPrice}</td>
              <td>{order.deliveryType}</td>
              <td>
                {order.status.some(stage => stage.stage === 'Order Confirmed' && stage.completed) ? (
                  <span>Order Confirmed</span>
                ) : (
                  <button onClick={() => handleConfirm(order.orderId)}>Confirm</button>
                )}
              </td>
              <td>
                <button onClick={() => handlePack(order.orderId)}>Click to Pack</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page1;
