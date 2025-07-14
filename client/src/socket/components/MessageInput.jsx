import { useEffect } from 'react';

const MessageInput = ({
  message,
  setMessage,
  onSendMessage,
  onKeyDown,
  onTyping,
  privateRecipient,
}) => {
  useEffect(() => {
    onTyping(message.length > 0);
  }, [message]);

  return (
    <div className="message-input">
      {privateRecipient && (
        <div className="private-message-info">
          Sending private message to {privateRecipient.username}
          <button onClick={() => setPrivateRecipient(null)}>×</button>
        </div>
      )}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={
          privateRecipient
            ? `Message ${privateRecipient.username}...`
            : 'Message everyone...'
        }
      />
      <button onClick={onSendMessage} disabled={!message.trim()}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;