import React, { useContext } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function AppMain(props) {
  // current user object derived from the context
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="main">
      {/* PROFILE */}
      <div className="profile">
        <div
          className="profile__avatar-container"
          onClick={props.onEditAvatarClick}
        >
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="user profile image"
          />
          <div className="profile__image-overlay"></div>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfileClick}
              type="button"
              className="button button_type_edit"
              aria-label="edit"
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>

        <button
          onClick={props.onAddPlaceClick}
          type="button"
          className="button button_type_add"
          aria-label="add"
        ></button>
      </div>

      {/* CARDS */}
      <section className="cards">
        <ul className="cards__grid">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AppMain;
