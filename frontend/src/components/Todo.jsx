import React, { useState } from 'react';
import axios from 'axios';
import TodoModalButton from './todoModal/TodoModalButton';
import { AiTwotoneDelete } from "react-icons/ai";
import DeleteModalButton from './deleteModal/deleteModalButton.jsx';

/* onClick: This function is passed as a prop (onClick) to the checkbox input. It is called when the checkbox is clicked,
and it is typically used to toggle the "isDone" property of the todo, marking it as done 
or not done.

onEdit: This function is passed as a prop (onEdit) to the TodoModalButton. It is called when the user submits changes 
in the TodoModal for editing. It typically updates the title and body of the todo.

onDelete: This function is passed as a prop (onDelete) to the DeleteModalButton. It is called when the user confirms 
the deletion of the todo, and it typically removes the todo from the list.

The Todo component itself represents a single todo item, with a checkbox for marking it as done, a label displaying 
the title and body, and buttons for editing and deleting the todo. The styling includes conditional formatting 
for completed todos with a line-through effect. */
function Todo({ todo, onClick, onEdit, onDelete }) {
  return (
    // List item representing a single todo, with conditional styling for completed todos
    <li className={`flex px-4 py-2 my-2 bg-gray-100 rounded-md items-center ${todo.isDone && 'line-through'}`} >

      {/* Checkbox for marking a todo as done */}
      <input
        id={todo.id}
        className='form-checkbox h-5 w-10 text-blue-600'
        type="checkbox"
        name={todo.title}
        defaultChecked={todo.isDone}
        onClick={onClick}
      />

      {/* Label for the todo,  including a TodoModalButton for editing */}
      <label
        htmlFor={todo.id} // Use 'htmlFor' instead of 'for' for accessibility
        className='form-checkbox-label ml-1 mr-auto block text-gray-500 font-medium items-center'>
        {/* TodoModalButton for editing, showing title and body */}
        <TodoModalButton
          initialTodo={todo}
          onSubmit={onEdit}
          buttonTitle={
            <div className={`flex flex-col ${todo.isDone && 'line-through'}`}>
              <b className='flex justify-left'>{todo.title}</b>
              <p className='flex justify-left text-gray-400'>{todo.body}</p>
            </div>}
        >
        </TodoModalButton>
      </label>

      {/* DeleteModalButton for deleting a todo */}
      <DeleteModalButton
        onDelete={onDelete}
        icon={<AiTwotoneDelete />}
      />
    </li>
  )
}

export default Todo;


