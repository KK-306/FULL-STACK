import React from 'react';
import Chat from './components/Chat';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h1>Real-Time Chat (Socket.io)</h1>
      <Chat />
    </div>
  );
}

export default App;
