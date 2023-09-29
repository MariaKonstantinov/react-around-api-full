import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlaceSubmit({
      name: values.newCardFormImageTitleInput || "",
      link: values.newCardFormImageLinkInput || "",
    });
  };

  return (
    <PopupWithForm
      name="new-card"
      title="New card"
      buttonText="Create"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <fieldset className="form__fieldset">
        <input
          type="text"
          required
          className={`form__input popup__input popup__input_type_image-title ${
            errors.newCardFormImageTitleInput && "form__input_type_error"
          }`}
          name="newCardFormImageTitleInput"
          placeholder="Title"
          minLength="1"
          maxLength="30"
          id="card-add-form-title-input"
          onChange={handleChange}
          value={values.newCardFormImageTitleInput || ""}
        />

        <span
          className={`form__input-error ${
            errors.newCardFormImageTitleInput && "form__input-error_visible"
          }`}
          id="card-add-form-title-input-error"
        >
          {errors.newCardFormImageTitleInput}
        </span>

        <input
          type="url"
          required
          className={`form__input popup__input popup__input_type_image-link ${
            errors.newCardFormImageLinkInput && "form__input_type_error"
          }`}
          name="newCardFormImageLinkInput"
          placeholder="Image link"
          id="card-add-form-link-input"
          onChange={handleChange}
          value={values.newCardFormImageLinkInput || ""}
        />

        <span
          id="card-add-form-link-input-error"
          className={`form__input-error ${
            errors.newCardFormImageLinkInput && "form__input-error_visible"
          }`}
        >
          {errors.newCardFormImageLinkInput}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
