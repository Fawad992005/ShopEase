import { createContext, useState, useEffect } from "react";

const addCartItems = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(
    (cartitem) => cartitem.id === productToAdd.id
  );

  if (existingItem) {
    return cartItems.map((cartitem) =>
      cartitem.id === productToAdd.id
        ? { ...cartitem, quantity: cartitem.quantity + 1 }
        : cartitem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removecartItem = (cartItems, cartItemToRemove) => {
  const existingItem = cartItems.find(
    (cartitem) => cartitem.id === cartItemToRemove.id
  );

  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartitem) =>
    cartitem.id === cartItemToRemove.id
      ? { ...cartitem, quantity: cartitem.quantity - 1 }
      : cartitem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartitem) => cartitem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setisCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemfromCart: () => {},
  CartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setisCartOpen] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [cartCount, setcartCount] = useState(0);
  const [CartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartitem) => {
      return total + cartitem.quantity;
    }, 0);

    setcartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCarttotal = cartItems.reduce((total, cartitem) => {
      return total + cartitem.quantity * cartitem.price;
    }, 0);

    setCartTotal(newCarttotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setcartItems(addCartItems(cartItems, productToAdd));
  };
  const removeItemFromCart = (cartItemToRemove) => {
    setcartItems(removecartItem(cartItems, cartItemToRemove));
  };
  const clearItemfromCart = (cartItemToClear) => {
    setcartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setisCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemfromCart,
    CartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
