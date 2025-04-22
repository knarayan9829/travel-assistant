import React, { useState } from 'react';
import Tabs from './components/Tabs';
import Header from './components/Header';
import LandingSection from './components/LandingSection';
import './index.css';

const App = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Header />
      <div className="max-w-6xl mx-auto mt-8">
        {!submitted ? (
          <LandingSection onComplete={() => setSubmitted(true)} />
        ) : (
          <Tabs />
        )}
      </div>
    </div>
  );
};

export default App;
