import { useState } from 'react';
import dayjs from 'dayjs';
import { Chatbot } from 'supersimpledev';
import loadingSpinnerGif from '../assets/loading-spinner.gif';
import './ChatInput.css';

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }

    setIsLoading(true);
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        time: dayjs().format('h:mm A'),
        id: chatMessages.length + 1,
      },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={loadingSpinnerGif} className="loading-spinner" />,
        sender: 'robot',
        time: null,
        id: newChatMessages.length + 1,
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        time: dayjs().format('h:mm A'),
        id: newChatMessages.length + 1,
      },
    ]);

    setIsLoading(false);
  }

  function clearMessages() {
    setChatMessages([]);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        type="text"
        placeholder="Ask Chatbot anything..."
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
      <button className="clear-button" onClick={clearMessages}>
        Clear
      </button>
    </div>
  );
}

export default ChatInput;
