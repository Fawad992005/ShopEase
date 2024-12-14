import React from "react";
import { useNavigate } from "react-router-dom";
import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItems from "../cart-item/cart-item.component";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const Go_To_Checkout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItems key={item.id} cartItem={item} />
        ))}
        <Button onClick={Go_To_Checkout}>Go To CheckOut</Button>
      </div>
    </div>
  );
};

export default CartDropdown;
