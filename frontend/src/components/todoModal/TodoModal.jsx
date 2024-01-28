// src/components/TodoModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

/* handleSubmitTodo: This function is called when the user clicks the "Save" or "Add Todo" button. It calls the onSubmit prop function, 
passing the current values of title and body. After submission, it clears the title and body, and then closes the modal using the onRequestClose 
prop function.

The TodoModal component itself represents a modal dialog for editing or adding a todo. It includes input fields for the title and body,
 buttons for saving or canceling, and is styled using Tailwind CSS classes. The component uses the Modal component from the 'react-modal'
  library to manage the modal state and rendering.*/
const TodoModal = ({ initialTodo, isOpen, onRequestClose, onSubmit }) => {
  const [title, setTitle] = useState(initialTodo?.title ?? ''); // Initialize state for title, using nullish coalescing operator
  const [body, setBody] = useState(initialTodo?.body ?? ''); // Initialize state for body, using nullish coalescing operator

  const handleSubmitTodo = () => {
    onSubmit({
      title: title, 
      body: body,
    });
    setTitle(''); // Clearing title after sending data
    setBody(''); // Clearing body after sending data
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen} // Prop indicating whether the modal is open
      onRequestClose={onRequestClose} // Callback function to close the modal
      contentLabel={`${initialTodo ? 'Edit' : 'Add'} Todo Modal`} // Accessible label for the modal content
      ariaHideApp={false} // Disabling aria-hidden for better accessibility
      className="modal-dialog" // Custom CSS class for the modal
      style={{
        content: {
          transform: 'translate(0%, 50%)', // Custom styling for modal position
        },
      }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">{initialTodo ? 'Edit' : 'Add'} Todo</h3>
          {/* Input field for the title */}
          <label className="block mb-2" htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2"
            />
          </label>

          {/* Textarea for the body */}
          <label className="block mb-2" htmlFor="body">
            Body:
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border p-2"
            ></textarea>
          </label>

          {/* Button to submit the todo */}
          <button
            onClick={handleSubmitTodo}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2">
            {initialTodo ? 'Save' : "Add Todo"}
          </button>
          {/* Button to cancel and close the modal */}
          <button
            onClick={onRequestClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TodoModal;


