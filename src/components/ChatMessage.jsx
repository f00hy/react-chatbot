import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import robotImage from '../assets/robot.png';
import userImage from '../assets/user.png';

function ChatMessage({ message, sender, time }) {
  return (
    <div className={`flex items-start ${sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
      <img
        src={sender === 'user' ? userImage : robotImage}
        className="w-11 h-11 rounded-full object-cover shrink-0"
        alt={sender}
      />
      <div className="bg-gray-100 pt-4 pb-3 px-4 rounded-xl mx-3 mb-4 max-w-md wrap-break-word">
        {typeof message === 'string' ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
        ) : (
          message
        )}
        {/* {message} */}
        {time && <div className="text-sm text-gray-500 mt-1 text-right">{time}</div>}
      </div>
    </div>
  );
}

export default ChatMessage;
