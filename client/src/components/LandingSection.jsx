import React from 'react';
import Form from './Form';
import './LandingSection.css';
import landingImage from '../assets/Getaw.ai Image Landing.png';

const LandingSection = ({ onComplete }) => {
  return (
    <div className="landing-wrapper">
      <div className="landing-form">
        <Form onComplete={onComplete} />
      </div>
      <div className="landing-image-container">
        <img src={landingImage} alt="Travel Visual" className="landing-image" />
      </div>
    </div>
  );
};

export default LandingSection;
