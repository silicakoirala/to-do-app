import React, { useState } from 'react';
import Authservices from '../services/authServices';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const user = await Authservices.signup(username, password);
      console.log('Signup successful!', user);
    } catch {
      console.error('Signup failed:', error.message);
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
      </label>
      <br />
      <label> Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  )
}

export default SignUp;