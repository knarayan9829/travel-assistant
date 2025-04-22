import React, { useState } from 'react';
import ChatBox from './ChatBox';
import './Tabs.css'; // Import your custom CSS

const Tabs = () => {
  const [active, setActive] = useState('cohere');

  return (
    <div className="tabs-container">
      <div className="tab-header">
        <button
          onClick={() => setActive('cohere')}
          className={`tab-button ${active === 'cohere' ? 'active-tab' : ''}`}
        >
          Cohere
        </button>
        <button
          onClick={() => setActive('llama')}
          className={`tab-button ${active === 'llama' ? 'active-tab' : ''}`}
        >
          LLaMA 3
        </button>
      </div>
      <div className="chat-wrapper">
        <ChatBox model={active} />
      </div>
    </div>
  );
};

export default Tabs;
