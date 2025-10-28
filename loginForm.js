import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError('⚠️ Please fill in both fields.');
      return;
    }

    // Clear error if both fields are filled
    setError('');

    // Log data to console (simulate login submission)
    console.log('Username:', username);
    console.log('Password:', password);

    // Optional: reset form
    setUsername('');
    setPassword('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 30,
        width: 300,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Login</h2>

      <div style={{ marginBottom: 15 }}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          style={{
            width: '100%',
            padding: 8,
            marginTop: 5,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{
            width: '100%',
            padding: 8,
            marginTop: 5,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
      </div>

      {error && (
        <p style={{ color: 'red', marginBottom: 10, fontSize: 14 }}>{error}</p>
      )}

      <button
        type="submit"
        style={{
          width: '100%',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: 10,
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
