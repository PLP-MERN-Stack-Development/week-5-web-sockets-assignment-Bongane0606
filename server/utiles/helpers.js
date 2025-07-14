const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const validateUsername = (username) => {
  return typeof username === 'string' && username.trim().length >= 3;
};

module.exports = {
  formatTimestamp,
  validateUsername,
};