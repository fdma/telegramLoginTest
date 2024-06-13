// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    telegram.ready();

    telegram.onEvent('auth', (data) => {
      axios.post('http://localhost:3001/auth', data)
        .then(response => setUser(response.data))
        .catch(error => console.error(error));
    });

    telegram.showAuth();
  }, []);

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>Welcome, {user.telegramId}</h1>
          <p>Your points: {user.points}</p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
