import { useState, useEffect } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import robotImage from './assets/robot.png';

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const numMessages = Math.ceil(chatMessages.length / 2);
  const title = `Chatbot${numMessages > 0 ? ` (${numMessages})` : ''}`;

  return (
    <>
      <title>{title}</title>
      <link rel="icon" type="image/png" href={robotImage} />

      <div className="mx-auto flex h-dvh max-w-2xl flex-col">
        {chatMessages.length === 0 ? (
          <p className="text-gray-500 grow items-center justify-center flex">
            Welcome to Chatbot! Send a message to get started.
          </p>
        ) : (
          <ChatMessages chatMessages={chatMessages} />
        )}
        <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
      </div>
    </>
  );
}

export default App;
