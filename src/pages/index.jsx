import React, { useState } from 'react';
import Form from '../components/Form';
import Tabs from '../components/Tabs';
import './landing.css'; // ✅ Make sure this path is correct

import logo from '../assets/logo.svg';
import heroImage from '../assets/Getaw.ai Image Landing.png';

const Home = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="landing-section">
      <div className="gradient-bg">
        <header className="landing-header">
          <img src={logo} alt="Getaw.ai Logo" className="logo" />
        </header>
        <div className="landing-content">
          <div className="left-pane">
            <h1 className="headline">Your AI Travel Companion</h1>
            <p className="subtext">Plan smart. Travel better. Get personalized travel ideas powered by AI.</p>
            {!submitted ? <Form onComplete={() => setSubmitted(true)} /> : <Tabs />}
          </div>
          <div className="right-pane">
            <img src={heroImage} alt="Getaw.ai Illustration" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
