import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from './Todo.jsx';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get("/todos");
    setTodos(res.data.todos);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">To do list</h1>
      {todos.map((todo) => {
        return <Todo
          key={todo._id}
          todo={todo}
          onClick={() => {
            
           }} />
      })}
    </div>
  );

  // return (
  //   <div>
  //     <h1 className="text-xl font-bold">To do list</h1>
  //     <ul>
  //       {
  //         [...todos].sort((a, b) => { return (!a.isDone && b.isDone) ? -1 : 1 }).map((todo) => {
  //           return <Todo
  //             todo={todo}
  //             key={todo._id}
  //             onClick={() => {
  //               setTodos(
  //                 todos.map((t) => {
  //                   if (t._id !== todo._id) return t;

  //                   return {
  //                     ...t,
  //                     isDone: !t.isDone
  //                   };
  //                 })
  //               )
  //             }}
  //           />;
  //         })
  //       }
  //     </ul>
  //   </div>
  // )
}

export default TodoList;