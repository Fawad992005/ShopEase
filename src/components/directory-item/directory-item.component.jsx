import "./directory-item.styles.scss";
import React from "react";

const Directoryitem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <>
      <div className="directory-item-container">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        <div className="body">
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
    </>
  );
};

export default Directoryitem;
