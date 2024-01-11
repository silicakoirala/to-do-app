import './App.css';
import axios from 'axios';
import TodoList from './components/TodoList';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;
