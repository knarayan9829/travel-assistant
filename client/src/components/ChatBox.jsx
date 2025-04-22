import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { sendToCohere, sendToLlama } from '../api/api';
import './ChatBox.css';

const ChatBox = ({ model }) => {
  const { userData } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [llamaHistory, setLlamaHistory] = useState([]);
  const [cohereHistory, setCohereHistory] = useState([]);

  const messages = model === 'llama' ? llamaHistory : cohereHistory;
  const setMessages = model === 'llama' ? setLlamaHistory : setCohereHistory;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    const apiFunc = model === 'cohere' ? sendToCohere : sendToLlama;
    const reply = await apiFunc({
      ...userData,
      message: input,
      history: updatedMessages,
    });

    setMessages([...updatedMessages, { role: 'bot', content: reply }]);
    setIsTyping(false);
  };

  return (
    <div>
      <div className="chat-container">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.role === 'bot' && (
              <img src="/assistant-avatar.png" className="avatar" alt="Bot" />
            )}
            <div className="bubble">{msg.content}</div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <img src="/assistant-avatar.png" className="avatar" alt="Bot" />
            <div className="bubble">Typing...</div>
          </div>
        )}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} className="bg-green-600 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
};

export default ChatBox;
