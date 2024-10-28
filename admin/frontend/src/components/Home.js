import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Make sure to include the CSS file for styling

const Home = () => {
    return (
      <div className="home-container">
        <h1 className="header-title">Manage Your Orders</h1> {/* Header title */}
        
        <div className="image-box">
          <div className="image-item">
            <Link to="/page1">
              <img src="/images/packing.png" alt="Orders to pack" />
            </Link>
            <p>Orders to pack</p>
          </div>
          
          <div className="image-item">
            <Link to="/page2">
              <img src="/images/shipment.png" alt="Orders in shipment" />
            </Link>
            <p>Orders in shipment</p>
          </div>
          
          <div className="image-item">
            <Link to="/page3">
              <img src="/images/delivery.png" alt="Orders to deliver" />
            </Link>
            <p>Orders to deliver</p>
          </div>
          
          <div className="image-item">
            <Link to="/page4">
              <img src="/images/return.png" alt="Orders to return" />
            </Link>
            <p>Orders to return</p>
          </div>
        </div>
      </div>
    );
};

export default Home;
