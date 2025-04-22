import React from 'react';
import './Header.css';
import logo from '../assets/Getaw.ai Logo.svg';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-left">
        <img src={logo} alt="Logo" className="header-logo" />
      </div>
      <div className="header-right">
        <span className="header-text">Travel? Simplified.</span>
      </div>
    </div>
  );
};

export default Header;
