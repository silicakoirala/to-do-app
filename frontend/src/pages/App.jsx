import React from 'react';
import axios from 'axios';
import "../../src/App.css";
// import SignUp from './SignUp.jsx';
// import Login from './Login.jsx';
import Home from './Home.jsx';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

const App = () => {
  return (
    <div className='flex justify-center'>
      <Home />
    </div>
  );
}

export default App;
