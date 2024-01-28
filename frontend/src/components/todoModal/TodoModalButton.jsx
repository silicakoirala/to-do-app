import React, { useState } from 'react';
import TodoModal from './TodoModal';
// import Modal from 'react-modal';

/* Explanation of the functions within the TodoModalButton component:

openModal: This function sets the isModalOpen state to true, making the modal visible.

closeModal: This function sets the isModalOpen state to false, hiding the modal.

handleSubmitTodo: This function is called when the user submits the todo from the TodoModal component.
 It calls the onSubmit prop function with the submitted todo and then closes the modal.

The TodoModalButton component itself represents a button that, when clicked, opens a modal for adding or editing a todo. 
It includes an icon, a button title, and is conditionally styled based on whether an initialTodo is provided. 
The modal is managed by the TodoModal component, and the onSubmit prop function is used to handle the submission of the todo.*/
const TodoModalButton = ({
  initialTodo,
  icon,
  buttonTitle,
  onSubmit
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the visibility of the modal

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle submitting a todo to the parent component
  const handleSubmitTodo = (todo) => {
    onSubmit(todo); // Call the onSubmit prop function with the submitted todo

    // Close the modal
    closeModal();
  };

  return (
    <div className={!initialTodo && "container mx-auto mt-8"}>
      {/* Button to open the modal */}
      <button onClick={openModal}
        className={!initialTodo && "bg-blue-500 rounded-md hover:bg-blue-700 text-white font-bold py-2 px-4"}
      >
        <div className='flex items-center'>
          {icon}
          <span className='pl-2'>
            {buttonTitle}
          </span>
        </div>
      </button>

      {/* TodoModal component to handle todo input */}
      <TodoModal
        initialTodo={initialTodo}
        isOpen={isModalOpen} 
        onRequestClose={closeModal}
        onSubmit={handleSubmitTodo}
      />
    </div>
  );
};

export default TodoModalButton;


