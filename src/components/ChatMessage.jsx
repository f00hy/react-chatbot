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
      <div className="bg-gray-100 pt-4 pb-3 px-4 rounded-xl mx-3 mb-4 max-w-xs wrap-break-word">
        {message}
        {time && <div className="text-sm text-gray-500 mt-1 text-right">{time}</div>}
      </div>
    </div>
  );
}

export default ChatMessage;
