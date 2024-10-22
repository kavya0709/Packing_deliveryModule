import React from 'react';
//import './Header.css'; // You can add styling here or inline
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>
        <Link to="/orders">Orders to Pack</Link> {/* Link to Orders page */}
      </h1>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#f4f4f4', // Customize the background color as needed
  padding: '10px',
};

const titleStyle = {
  margin: '0',
  padding: '0',
  fontSize: '24px',
};

export default Header;
