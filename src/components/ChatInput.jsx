import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import loadingSpinnerGif from '../assets/loading-spinner.gif'
import './ChatInput.css'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    setInputText("");

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: chatMessages.length + 1
      },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={loadingSpinnerGif} className="loading-spinner" />,
        sender: "robot",
        id: newChatMessages.length + 1
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: newChatMessages.length + 1
      },
    ]);
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        type="text"
        placeholder="Ask Chatbot anything..."
        onChange={saveInputText}
        value={inputText}
      />
      <button
        className="send-button"
        onClick={sendMessage}
      >Send</button>
    </div>
  );
}

export default ChatInput;
