import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderStatus.css'; // Import the CSS file

const OrderStatus = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState(null);

  const fetchOrderStatus = async () => {
    try {
      const response = await axios.get(`/api/status/${orderId}`);
      setOrderStatus(response.data);
    } catch (error) {
      console.error('Error fetching order status:', error);
    }
  };

  useEffect(() => {
    fetchOrderStatus();
    const intervalId = setInterval(fetchOrderStatus, 5000);
    return () => clearInterval(intervalId);
  }, [orderId]);

  if (!orderStatus) {
    return <div>Loading order status...</div>;
  }

  return (
    <div className="order-status-wrapper">
      <div className="status-column">
        <h2>Order Status for Order ID: {orderId}</h2>
        <div className="status-flow">
          {orderStatus.status.map((stage, index) => (
            <div key={index} className="status-item">
              {index > 0 && (
                <div className={`status-line ${orderStatus.status[index - 1].completed ? 'completed' : 'incomplete'}`}></div>
              )}
              <div className={`status-circle ${stage.completed ? 'completed' : ''}`}>
                {stage.completed && <span className="tick">✔</span>}
              </div>
              <div className="status-info">
                <h4>{stage.stage}</h4>
                {stage.completed && <p>{stage.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="product-column">
        {orderStatus.productImage && (
          <div className="product-container">
            <div className="product-image-container">
              <img src={orderStatus.productImage} alt="Product" className="product-image" />
            </div>
            <div className="product-details">
              <h3 className="product-name">{orderStatus.productName}</h3>
              <p className="product-description">{orderStatus.productDescription}</p>
              <p className="product-price">{orderStatus.productPrice}</p>
            </div>
          </div>
        )}
        <button className="return-button">Return</button>
      </div>
    </div>
  );
};

export default OrderStatus;
