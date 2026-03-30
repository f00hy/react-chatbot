import robotImage from '../assets/robot.png';
import userImage from '../assets/user.png';
import './ChatMessage.css';

function ChatMessage({ message, sender }) {
  return (
    <div className={`chat-message-${sender}`}>
      {sender === 'robot' && <img src={robotImage} className="chat-message-profile" />}
      <div className="chat-message-text">{message}</div>
      {sender === 'user' && <img src={userImage} className="chat-message-profile" />}
    </div>
  );
}

export default ChatMessage;
