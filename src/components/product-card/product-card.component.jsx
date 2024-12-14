import "./product-card.component.scss";
import Button from "../button/button.component";
import { addItemToCart } from "../../store/cart/cartSlice";
import { useDispatch } from "react-redux";

import React from "react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { name, imageUrl, price } = product;
  const addProductToCart = () => {
    dispatch(addItemToCart(product));
  };
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button buttontype="inverted" onClick={addProductToCart}>
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductCard;
