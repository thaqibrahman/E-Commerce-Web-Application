import React, { useState } from 'react';
import ItemList from './components/ItemList';

function App() {
  const [user, setUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const register = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      const data = await res.json();
      if (res.ok) setUser(data.username);
      else alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      const data = await res.json();
      if (res.ok) setUser(data.username);
      else alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Online Auction Platform</h1>
      
      {!user ? (
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Login or Register</h3>
          <input 
            type="text" 
            placeholder="Username" 
            value={usernameInput} 
            onChange={(e) => setUsernameInput(e.target.value)} 
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)} 
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button onClick={login} style={{ marginRight: '10px', padding: '5px 10px' }}>Login</button>
          <button onClick={register} style={{ padding: '5px 10px' }}>Register</button>
        </div>
      ) : (
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Welcome, {user}!</h3>
          <button onClick={() => setUser(null)} style={{ padding: '5px 10px' }}>Logout</button>
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />
      
      <h2>Available Items</h2>
      <ItemList currentUser={user} />
    </div>
  );
}

export default App;
