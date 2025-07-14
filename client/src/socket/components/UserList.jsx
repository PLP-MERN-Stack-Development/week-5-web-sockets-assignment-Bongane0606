const UserList = ({ users, currentUser, onSelectUser, selectedUser }) => {
  return (
    <div className="user-list">
      <h3>Online Users ({users.length})</h3>
      <ul>
        <li
          className={!selectedUser ? 'active' : ''}
          onClick={() => onSelectUser(null)}
        >
          Everyone
        </li>
        {users
          .filter((user) => user.username !== currentUser)
          .map((user) => (
            <li
              key={user.id}
              className={selectedUser?.id === user.id ? 'active' : ''}
              onClick={() => onSelectUser(user)}
            >
              {user.username}
              {selectedUser?.id === user.id && (
                <span className="private-badge">Private</span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;