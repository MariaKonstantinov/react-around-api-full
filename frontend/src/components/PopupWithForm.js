import React from "react";
import Popup from "./Popup.js";

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  buttonText,
  children,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={name} onSubmit={onSubmit}>
        {children}

        <button type="submit" className="button button_type_submit">
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
