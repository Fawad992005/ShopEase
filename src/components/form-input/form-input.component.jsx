import React from "react";
import "./form-input.styles.scss";

const Forminput = ({ label, ...otherprops }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherprops} />
      {label && (
        <label
          className={`${
            otherprops.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Forminput;
