import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
// import { Chatbot } from 'supersimpledev';
import { GoogleGenAI } from '@google/genai';
import loadingSpinnerGif from '../assets/loading-spinner.gif';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const model = import.meta.env.VITE_GEMINI_MODEL;

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const ai = useMemo(() => new GoogleGenAI({ apiKey }), []);

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
        message: <img src={loadingSpinnerGif} className="h-7 -my-1" />,
        sender: 'robot',
        time: null,
        id: newChatMessages.length + 1,
      },
    ]);

    // const response = await Chatbot.getResponseAsync(inputText);
    // setChatMessages([
    //   ...newChatMessages,
    //   {
    //     message: response,
    //     sender: 'robot',
    //     time: dayjs().format('h:mm A'),
    //     id: newChatMessages.length + 1,
    //   },
    // ]);

    const response = await ai.models.generateContentStream({
      model,
      contents: inputText,
      config: {
        systemInstruction:
          'You are a helpful assistant that can answer questions and help with tasks.',
      },
    });

    let responseText = '';
    for await (const chunk of response) {
      responseText += chunk.text;
      setChatMessages([
        ...newChatMessages,
        {
          message: responseText,
          sender: 'robot',
          time: dayjs().format('h:mm A'),
          id: newChatMessages.length + 1,
        },
      ]);
    }

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
    <div className="flex gap-3 mb-8">
      <input
        className="px-4 py-2.5 rounded-xl border border-gray-500 text-base grow focus:outline-none focus:ring-1 focus:ring-gray-500"
        type="text"
        placeholder="Ask Chatbot anything..."
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
      />
      <button
        className="px-5 py-2.5 rounded-xl text-base cursor-pointer bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
        onClick={sendMessage}
      >
        Send
      </button>
      <button
        className="px-5 py-2.5 rounded-xl text-base cursor-pointer bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-200"
        onClick={clearMessages}
      >
        Clear
      </button>
    </div>
  );
}

export default ChatInput;
