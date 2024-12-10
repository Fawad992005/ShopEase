import "./directory.styles.scss";
import Directoryitem from "../directory-item/directory-item.component";
import React from "react";

const Directory = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Directoryitem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
