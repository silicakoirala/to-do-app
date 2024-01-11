import React, { useState } from 'react';

function Todo({ todo, onClick }) {
  return (
    <li className={todo.isDone && 'line-through'} >
      <label>
        <input className='mr-2'
          type="checkbox"
          name={todo.title}
          checked={todo.isDone}
          onClick={onClick}
        />
        {todo.title}
      </label>
    </li>
  )
}

export default Todo;