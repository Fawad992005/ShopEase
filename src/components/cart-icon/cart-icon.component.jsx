import React from "react";
import "./cart-icon.styles.scss";
import ShoppingIcon from "../../assets/111 shopping-bag.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cartSlice";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIscartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
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
