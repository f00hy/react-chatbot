import { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css';

function App() {
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome-message">Welcome to Chatbot! Send a message to get started.</p>
      )}
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default App;
