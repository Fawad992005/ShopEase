import React from "react";
import "./button.styles.scss";

const Button = ({ children, buttontype, ...otherprops }) => {
  const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted",
  };
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttontype]}`}
      {...otherprops}
    >
      {children}
    </button>
  );
};

export default Button;
