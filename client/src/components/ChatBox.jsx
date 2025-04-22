import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { sendToCohere, sendToLlama } from '../api/api';
import './ChatBox.css';
import avatar from '../assets/assistant-avatar.png';

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
              <img src={avatar} className="avatar" alt="Bot" />
            )}
            <div className="bubble">{msg.content}</div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <img src={avatar} className="avatar" alt="Bot" />
            <div className="bubble">Typing...</div>
          </div>
        )}
      </div>

      <div className="chat-input-grid">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="chat-send-button">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
