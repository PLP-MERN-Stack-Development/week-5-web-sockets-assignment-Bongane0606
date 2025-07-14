import { useState, useRef, useEffect } from 'react';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';
import MessageInput from '../components/MessageInput';

const Chat = ({
  username,
  messages,
  users,
  typingUsers,
  onSendMessage,
  onSendPrivateMessage,
  onTyping,
  onLogout,
}) => {
  const [message, setMessage] = useState('');
  const [privateRecipient, setPrivateRecipient] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      if (privateRecipient) {
        onSendPrivateMessage(privateRecipient.id, message);
      } else {
        onSendMessage(message);
      }
      setMessage('');
      onTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTyping = (isTyping) => {
    onTyping(isTyping);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat App</h2>
        <div className="user-info">
          <span>Hello, {username}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>
      <div className="chat-main">
        <UserList
          users={users}
          currentUser={username}
          onSelectUser={setPrivateRecipient}
          selectedUser={privateRecipient}
        />
        <div className="chat-content">
          <MessageList
            messages={messages}
            currentUser={username}
            privateRecipient={privateRecipient}
          />
          <div className="typing-indicator">
            {typingUsers.length > 0 && (
              <p>{typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...</p>
            )}
          </div>
          <MessageInput
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
            onKeyDown={handleKeyDown}
            onTyping={handleTyping}
            privateRecipient={privateRecipient}
          />
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Chat;