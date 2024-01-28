import React, { useState } from 'react';
import useAuthStore from '../stores/authStore';

const Login = () => {
  const authStore = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await authStore.login();
  };

  return (
    <form className="flex-col" onSubmit={handleLogin}>
      <h3 className='font-'>Login</h3>
      <label>
        Email:
        <input
          name="email"
          type="email"
          value={authStore.loginData.email}
          onChange={authStore.updateLoginData}
        ></input>
      </label>
      <br />
      <label>
        Password:
        <input
          name="password"
          type="password"
          value={authStore.loginData.password}
          onChange={authStore.updateLoginData}
        ></input>
      </label>
      <br />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login;