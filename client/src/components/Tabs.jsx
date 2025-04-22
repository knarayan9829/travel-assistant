import React, { useState } from 'react';
import ChatBox from './ChatBox';

const Tabs = () => {
  const [active, setActive] = useState('cohere');

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setActive('cohere')} className={active === 'cohere' ? 'font-bold' : ''}>Cohere</button>
        <button onClick={() => setActive('llama')} className={active === 'llama' ? 'font-bold' : ''}>LLaMA 3</button>
      </div>
      <ChatBox model={active} />
    </div>
  );
};

export default Tabs;
