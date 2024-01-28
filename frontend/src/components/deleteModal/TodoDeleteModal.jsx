import React from 'react';
import Modal from 'react-modal';
/* 
handleDeleteTodo: This function is called when the user clicks the "Delete" button. It calls the onDelete prop function to delete the 
todo and then closes the modal using the onRequestClose prop function.

The DeleteModal component itself represents a modal dialog for confirming the deletion of a todo. It includes a title, a confirmation message, 
and buttons for confirming or canceling the deletion. The component uses the Modal component from the 'react-modal' library to manage the modal state and rendering.*/
const DeleteModal = ({ isOpen, onRequestClose, onDelete }) => {
  const handleDeleteTodo = () => {
    onDelete();                               // Call the onDelete prop function to delete the todo
    onRequestClose();                         // Close the modal
  };

  return (
    <Modal
      isOpen={isOpen}                         // Prop indicating whether the modal is open
      onRequestClose={onRequestClose}         // Callback function to close the modal
      contentLabel="Delete Todo"              // Accessible label for the modal content
      ariaHideApp={false}                     // Disabling aria-hidden for better accessibility
      className="modal-dialog"                // Custom CSS class for the modal
      style={{
        content: {
          transform: 'translate(0%, 50%)',    // Custom styling for modal position
        },
      }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Delete Todo</h3>
          <p className="mb-8 text-l"> Are you sure? </p>
          {/* Button to confirm and delete the todo */}

          <button
            onClick={handleDeleteTodo}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2">
            Delete
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
  )
}

export default DeleteModal;

