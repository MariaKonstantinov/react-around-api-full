import React, { useContext } from "react";
import binIcon from "../images/trash-button.svg";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // current user object derived from the context
  const currentUser = useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current card
  const isOwn = card.owner._id === currentUser._id;

  // Creating a variable which we'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `button_type_trash ${
    isOwn ? "button_type_trash" : "button_type_trash_disabled"
  }`;

  // Checking if the card was liked by the current user
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  // Creating a variable which we'll then set in `className` for the like button
  const cardLikeButtonClassName = `button_style_like ${
    isLiked && "button_style_like-active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      <button
        type="button"
        className={`button ${cardDeleteButtonClassName}`}
        aria-label="delete card button"
        onClick={handleDeleteClick}
        // key={card._id}
      >
        <img
          src={binIcon}
          alt="trash button"
          className="button button_type_trash"
        />
      </button>
      <img
        onClick={handleClick}
        src={card.link}
        alt="user card image"
        className="card__image"
      />
      <div className="card__content">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-container">
          <button
            type="button"
            className={`button button_style_like ${cardLikeButtonClassName}`}
            aria-label="like button"
            onClick={handleLikeClick}
          ></button>
          <div className="card__likes">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
