import React, { useContext } from "react";
import "./cart-icon.styles.scss";
import ShoppingIcon from "../../assets/111 shopping-bag.svg";
import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
  const { setisCartOpen, isCartOpen, cartCount } = useContext(CartContext);

  const toggleIscartOpen = () => {
    setisCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container">
      <img
        src={ShoppingIcon}
        alt=""
        className="shopping-icon"
        onClick={toggleIscartOpen}
      />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
