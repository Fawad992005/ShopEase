import React from "react";
import "./button.styles.scss";

const Button = ({ children, buttontype, isLoading, ...otherprops }) => {
  const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted",
  };

  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttontype]} ${
        isLoading ? "loading" : ""
      }`}
      {...otherprops}
      disabled={isLoading} // Disable the button when loading
    >
      {isLoading ? (
        <span className="loading loading-bars loading-sm"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
