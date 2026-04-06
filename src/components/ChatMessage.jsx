import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import robotImage from '../assets/robot.png';
import userImage from '../assets/user.png';

function ChatMessage({ message, sender, time }) {
  return (
    <div className={`flex items-start ${sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
      <img
        src={sender === 'user' ? userImage : robotImage}
        className="w-11 h-11 shrink-0 rounded-full object-cover"
        alt={sender}
      />
      <div
        className={`mx-3 mb-4 rounded-xl bg-gray-100 px-4 pt-4 pb-3 ${sender === 'user' ? 'max-w-xs' : 'max-w-lg'}`}
      >
        <div className="overflow-x-auto wrap-break-word [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {typeof message === 'string' ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
          ) : (
            message
          )}
        </div>
        {time && <div className="text-sm text-gray-500 mt-1 text-right">{time}</div>}
      </div>
    </div>
  );
}

export default ChatMessage;
