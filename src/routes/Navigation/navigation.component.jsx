import React from "react";
import { Outlet, Link } from "react-router-dom";
import Crwnlogo from "../../assets/083 crown.svg";
import "./navigation.styles.scss";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { SignOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { useSelector } from "react-redux";
import { selectcurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectcurrentUser);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={Crwnlogo} className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={SignOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
