import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional: To style the layout

const Home = () => {
    return (
      <div className="image-container">
        <div className="image-item">
          <Link to="/page1">
            <img src="/images/packing.png" alt="Image 1" />
          </Link>
          <p>Orders to pack</p> {/* Text below the first image */}
        </div>
        
        <div className="image-item">
          <Link to="/page2">
            <img src="/images/shipment.png" alt="Image 2" />
          </Link>
          <p>Orders in shipment</p> {/* Text below the second image */}
        </div>
        
        <div className="image-item">
          <Link to="/page3">
            <img src="/images/delivery.png" alt="Image 3" />
          </Link>
          <p>Orders to deliver</p> {/* Text below the third image */}
        </div>
        
        <div className="image-item">
          <Link to="/page4">
            <img src="/images/return.png" alt="Image 4" />
          </Link>
          <p>Orders to return</p> {/* Text below the fourth image */}
        </div>
      </div>
    );
  };
  
  export default Home;