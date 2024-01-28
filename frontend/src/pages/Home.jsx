import React from 'react';
import useAuthStore from '../stores/authStore.js';
import Login from '../pages/Login.jsx';
import TodoList from "../components/TodoList.jsx";

const Home = () => {
  const userData = useAuthStore((state) => state.userData );

  return (
    <div className='flex-col'>
      <h2>Welcome to the To-Do App!</h2>
      {userData ? <TodoList /> : <Login />}
    </div>
  )
}

export default Home;