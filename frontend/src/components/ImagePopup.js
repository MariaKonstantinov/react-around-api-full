import React from "react";

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div
      className={`popup popup_type_zoom-card ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__window popup__zoom-wrapper">
        <button
          className="button button_type_close button_type_zoom-card"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
        <img
          className="popup__zoom-image"
          src={card.link}
          alt="zoomed user image"
        />
        <p className="popup__zoom-title">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
