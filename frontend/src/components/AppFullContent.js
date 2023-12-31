import React, { useState, useEffect } from "react";

import AppMain from "./AppMain";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import { api } from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function AppFullContent() {
  // Popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  // current user
  const [currentUser, setCurrentUser] = useState({});

  // Cards
  const [cards, setCards] = useState([]);

  // SECTION: requesting initial data from server (Edit Profile, Cards) -------------------->

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo.data);
        setCards(cards.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // SECTION CARD LIKES FUNCTIONALITY --------------------------------------------------->
  function handleCardLike(card) {
    const isLiked = card.likes.some((cardId) => cardId === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard.data : currentCard
          )
        )
      )
      .catch((err) => console.log(err));
  }

  // SECTION DELETE CARD FUNCTIONALITY --------------------------------------------------->

  // fUNCTION FROM PROJECT 14--------------------------------->
  function handleDeleteCardSubmission() {
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== selectedCard._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // SECTION: ADD CARD FUNCTIONALITY ------------------------------------------------->
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        const newCardArr = [...cards];
        newCardArr.push(newCard.data);
        setCards(newCardArr);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // SECTION: POPUPS STATE DEFINITION - SET STATE FOR OPENED STATE -------------------->

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }

  // SECTION: CLOSE POPUPS BY "ESCAPE" --------------------------------->
  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  // SECTION: UPDATE USER FUNCTIONALITY ------------------------------------------------->

  function handleUpdateUser({ name, about }) {
    api
      .editUserData({ name, about })
      .then((userInfo) => {
        setCurrentUser(userInfo.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // SECTION: UPDATE AVATAR FUNCTIONALITY ------------------------------------------------->
  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // SECTION: POPUPS STATE DEFINITION - SET STATE FOR CLOSED STATE -------------------->

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppMain
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isCardPopupOpen}
        onClose={closeAllPopups}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCardSubmission={handleDeleteCardSubmission}
        card={selectedCard}
      />
    </CurrentUserContext.Provider>
  );
}

export default AppFullContent;
