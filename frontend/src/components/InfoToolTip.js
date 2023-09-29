import React, { useEffect } from "react";
import Popup from "./Popup.js";
import successfulIcon from "../images/successful.svg";
import failIcon from "../images/fail.svg";

function InfoToolTip({ isOpen, onClose, action, name }) {
  const success = action === "successful";

  useEffect(() => {
    if (isOpen) {
      const clock = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(clock);
    }
  });

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <img
        className="tooltip__icon"
        src={success ? successfulIcon : failIcon}
        alt={`${success ? "successful" : "unsuccessful"} attempt`}
      />
      <p className="tooltip__message">
        {success
          ? `Success! You have now been registered.`
          : `Oops, something went wrong! Please try again.`}
      </p>
    </Popup>
  );
}

export default InfoToolTip;
