function MessageDisplay({ message, type, onHide }) {
  if (!message) return null;

  return (
    <div className={`message ${type}`}>
      {message}
    </div>
  );
}

export default MessageDisplay;
