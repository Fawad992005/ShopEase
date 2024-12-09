import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItems from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
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
