import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

// change if your server runs elsewhere
const SOCKET_SERVER_URL = "http://localhost:4000";

const Chat = () => {
  const [name, setName] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // {user, text, ts?}
  const socketRef = useRef();

  useEffect(() => {
    // only connect after user provides a name
    if (!enteredName) return;

    // connect
    socketRef.current = io(SOCKET_SERVER_URL, { transports: ['websocket'] });

    // receive messages
    socketRef.current.on('message', (msg) => {
      setMessages((prev) => [...prev, { ...msg, ts: Date.now() }]);
    });

    // cleanup on unmount or when name changes
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [enteredName]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setEnteredName(name.trim());
    setName('');
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const payload = { user: enteredName, text: message.trim() };
    // emit to server
    socketRef.current.emit('chatMessage', payload);
    setMessage('');
  };

  return (
    <div style={{
      maxWidth: 800, marginTop: 10, display: 'flex', gap: 20, alignItems: 'flex-start'
    }}>
      {!enteredName ? (
        <form onSubmit={handleJoin} style={{ minWidth: 300 }}>
          <h3>Enter your name to join</h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{ width: '100%', padding: 8, marginBottom: 8 }}
          />
          <button type="submit" style={{ padding: '8px 12px' }}>Join Chat</button>
        </form>
      ) : (
        <>
          <div style={{
            flex: 1, border: '1px solid #ddd', borderRadius: 6, padding: 12, height: 400, overflowY: 'auto'
          }}>
            <h3>Room: General</h3>
            <div>
              {messages.map((m, idx) => (
                <div key={idx} style={{
                  marginBottom: 8,
                  padding: 8,
                  background: m.user === enteredName ? '#e6f7ff' : '#f7f7f7',
                  borderRadius: 6
                }}>
                  <strong>{m.user}</strong> <small style={{ color: '#666', marginLeft: 8 }}>
                    {new Date(m.ts).toLocaleTimeString()}
                  </small>
                  <div style={{ marginTop: 6 }}>{m.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: 300 }}>
            <div style={{ marginBottom: 12 }}>
              <strong>You are:</strong> {enteredName}
            </div>
            <form onSubmit={sendMessage}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                rows={4}
                style={{ width: '100%', padding: 8, resize: 'vertical' }}
              />
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <button type="submit" style={{ flex: 1, padding: 8 }}>Send</button>
                <button type="button" onClick={() => {
                  if (socketRef.current) socketRef.current.disconnect();
                  setEnteredName('');
                  setMessages([]);
                }} style={{ padding: 8 }}>Leave</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
