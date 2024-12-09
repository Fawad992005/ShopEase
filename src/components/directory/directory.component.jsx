import "./directory.styles.scss";
import Categoryitem from "../category-item/category-item.component";
import React from "react";

const Directory = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Categoryitem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
