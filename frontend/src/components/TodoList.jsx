import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from './Todo.jsx';
import TodoModalButton from './todoModal/TodoModalButton.jsx';
import { FaPlus } from "react-icons/fa6";

/*Explanation of the functions within the TodoList component:

getTodos: This function uses Axios to make a GET request to fetch todos from the backend (/todos). 
          It updates the component state (todos) with the retrieved data.

addTodo: This function uses Axios to make a POST request to add a new todo to the backend (/todos).
           It then updates the component state by spreading the existing todos and adding the new todo.

updateTodo: This function uses Axios to make a PUT request to update a specific todo on the backend 
            (/todos/${todo.id}).It then updates the component state with the modified todo.

deleteTodo: This function uses Axios to make a DELETE request to remove a specific todo from the 
            backend (/todos/${todo.id}).It updates the component state by creating a new array that excludes the deleted todo.

toggleTodo: This function uses Axios to make a PUT request to toggle the "isDone" property of a specific todo on the backend 
              (/todos/${todo.id}). It then updates the component state with the modified todo.

The TodoList component itself represents a container for a list of todos, 
including a title, a button for adding new todos, and a dynamically
 rendered list of todos using the Todo component. */
const TodoList = () => {
  const [todos, setTodos] = useState([]); // Create a state to store all the todos

  // Function to fetch todos from the backend
  const getTodos = async () => {
    try {
      const res = await axios.get("/todos", {
        withCredentials: true
      }); // Get response from localhost:3000/todos

      if (!res.data.success) {
        console.log(res.data.message);
        return;
      }

      setTodos(res.data.data); // Update state with the fetched todos
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos(); // Run the getTodos function only once when the component mounts
  }, []);

  // Function to add a new todo
  const addTodo = async (newTodo) => {
    try {
      const res = await axios.post("/todos", newTodo);

      if (!res.data.success) {
        console.log(res.data.message);
        return;
      }

      setTodos([res.data.data, ...todos]); // Spread existing todos into a new array and add the new todo
    } catch (error) {
      console.log(error);
    }
  };

  // Function to update a todo
  const updateTodo = async (todo) => {
    try {
      const res = await axios.put(`/todos/${todo.id}`, todo);

      if (!res.data.success) {
        console.log(res.data.message);
        return;
      }

      // Update todos with the modified todo
      const updatedTodos = todos.map((t) => {
        if (todo.id !== t.id) return t;
        return res.data.data;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  }

  // Function to delete a todo
  const deleteTodo = async (todo) => {
    try {
      const res = await axios.delete(`/todos/${todo.id}`);

      if (!res.data.success) {
        console.log(res.data.message);
        return;
      }

      // Remove the deleted todo from the todos array
      const updatedTodos = [...todos].filter((t) => t.id !== todo.id);

      setTodos(updatedTodos);

    } catch (error) {
      console.log(error);
    }

  };

  // Function to toggle the "isDone" property of a todo

  const toggleTodo = async (todo) => {
    try {
      const res = await axios.put(`/todos/${todo.id}`, { ...todo, isDone: !todo.isDone });

      if (!res.data.success) {
        console.log(res.data.message);
        return;
      }

      // Update todos with the modified todo
      const updatedTodos = todos.map((t) => {
        if (todo.id !== t.id) return t;
        return res.data.data;
      });

      setTodos(updatedTodos);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 w-full md:w-1/2">
      <div className="flex justify-between items-baseline">
        <h1 className="text-3xl ml-1 block font-bold">TO DO LIST</h1>
        <div>
          <TodoModalButton
            icon={<FaPlus />}
            buttonTitle='Add Todo'
            onSubmit={addTodo}
          />
        </div>
      </div>

      {/* Render the list of todos using the Todo component */}
      <ul>
        {[...todos].sort((a, b) => a.isDone - b.isDone).map((todo) => {
          return <Todo
            key={todo.id}
            todo={todo}
            onClick={() => toggleTodo(todo)}
            onEdit={(updatedTodo) => updateTodo({ ...todo, ...updatedTodo })}
            onDelete={() => deleteTodo(todo)}
          />
        })}
      </ul>
    </div>
  );
}

export default TodoList;


