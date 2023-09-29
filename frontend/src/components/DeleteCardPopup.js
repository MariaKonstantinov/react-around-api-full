import React from "react";
import PopupWithForm from "../components/PopupWithForm.js";

function DeleteCardPopup({ isOpen, onClose, onDeleteCardSubmission }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCardSubmission();
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Are you sure?"
      buttonText="Yes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
