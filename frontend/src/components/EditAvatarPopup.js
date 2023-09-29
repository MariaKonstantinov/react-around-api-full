import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.editAvatarFormImageLinkInput || "",
    });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Change Profile Picture"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <fieldset className="form__fieldset">
        <input
          type="url"
          required
          className={`form__input popup__input popup__input_type_image-link ${
            errors.editAvatarFormImageLinkInput && "form__input_type_error"
          }`}
          name="editAvatarFormImageLinkInput"
          placeholder="Profile Image link"
          id="avatar-edit-form-link-input"
          onChange={handleChange}
          value={values.editAvatarFormImageLinkInput || ""}
        />

        <span
          className={`form__input-error ${
            errors.editAvatarFormImageLinkInput && "form__input-error_visible"
          }`}
          id="avatar-edit-form-link-input-error"
        >
          {errors.editAvatarFormImageLinkInput}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
