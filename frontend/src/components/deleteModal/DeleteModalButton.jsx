import React from 'react';
import DeleteModal from './TodoDeleteModal.jsx';
import { useState } from 'react';

/* openModal: This function sets the isModalOpen state to true, making the modal visible.

closeModal: This function sets the isModalOpen state to false, hiding the modal.

handleDeleteTodo: This function is called when the user confirms the deletion in the DeleteModal component. 
It calls the onDelete prop function to delete the todo and then closes the modal using the closeModal function.

The DeleteModalButton component itself represents a button that, when clicked, opens a modal for confirming the
 deletion of a todo. It includes an icon and uses the DeleteModal component to handle the confirmation and deletion process. */
const DeleteModalButton = ({
  onDelete,
  icon,
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

  // Function to handle deleting a todo
  const handleDeleteTodo = () => {
    onDelete(); // Call the onDelete prop function to delete the todo
    closeModal(); // Close the modal
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={openModal}>
        {icon}
      </button>

      {/* DeleteModal component to confirm todo deletion */}
      <DeleteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default DeleteModalButton;





