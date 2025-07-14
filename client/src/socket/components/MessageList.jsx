import { format } from 'date-fns';

const MessageList = ({ messages, currentUser, privateRecipient }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.sender === currentUser ? 'sent' : 'received'} ${
            message.system ? 'system' : ''
          } ${message.isPrivate ? 'private' : ''}`}
        >
          {!message.system && (
            <div className="message-header">
              <span className="sender">
                {message.sender}
                {message.isPrivate && (
                  <span className="private-label">
                    {message.sender === currentUser
                      ? ` to ${privateRecipient?.username || 'user'}`
                      : ' (private)'}
                  </span>
                )}
              </span>
              <span className="timestamp">
                {format(new Date(message.timestamp), 'HH:mm')}
              </span>
            </div>
          )}
          <div className="message-content">{message.message}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;