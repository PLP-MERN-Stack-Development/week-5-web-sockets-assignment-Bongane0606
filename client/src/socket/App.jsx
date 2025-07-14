import { useSocket } from './socket/useSocket';
import { useEffect, useState } from 'react';
import Auth from './pages/Auth';
import Chat from './pages/Chat';

function App() {
  const [username, setUsername] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const {
    socket,
    isConnected,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  } = useSocket();

  useEffect(() => {
    if (authenticated && username) {
      connect(username);
    }
    return () => {
      disconnect();
    };
  }, [authenticated, username]);

  const handleLogin = (username) => {
    setUsername(username);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    disconnect();
    setUsername('');
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Chat
        username={username}
        messages={messages}
        users={users}
        typingUsers={typingUsers}
        onSendMessage={sendMessage}
        onSendPrivateMessage={sendPrivateMessage}
        onTyping={setTyping}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;