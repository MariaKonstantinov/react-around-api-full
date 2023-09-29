import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Subscription to the context
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  // After loading the current user from the API, their data will be used in managed components

  useEffect(() => {
    if (!isOpen) {
      resetForm({
        profileFormNameInput: currentUser.name || "",
        profileFormJobInput: currentUser.about || "",
      });
    }
  }, [currentUser, isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: values.profileFormNameInput || "",
      about: values.profileFormJobInput || "",
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Edit profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <fieldset className="form__fieldset">
        <input
          type="text"
          required
          className={`form__input popup__input popup__input_type_name ${
            errors.profileFormNameInput && "form__input_type_error"
          }`}
          name="profileFormNameInput"
          onChange={handleChange}
          value={values.profileFormNameInput || ""}
          placeholder="Your name"
          minLength="2"
          maxLength="40"
          id="profile-edit-form-name-input"
        />

        <span
          id="profile-edit-form-name-input-error"
          className={`form__input-error ${
            errors.profileFormNameInput && "form__input-error_visible"
          }`}
        >
          {errors.profileFormNameInput}
        </span>

        <input
          type="text"
          required
          className={`form__input popup__input popup__input_type_job ${
            errors.profileFormJobInput && "form__input_type_error"
          }`}
          name="profileFormJobInput"
          onChange={handleChange}
          value={values.profileFormJobInput || ""}
          placeholder="Your job"
          minLength="2"
          maxLength="200"
          id="profile-edit-form-job-input"
        />

        <span
          id="profile-edit-form-job-input-error"
          className={`form__input-error ${
            errors.profileFormJobInput && "form__input-error_visible"
          }`}
        >
          {errors.profileFormJobInput}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
