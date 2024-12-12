import { createContext, useReducer } from "react";
import { createAction } from "../utils/firebase/reducer/reducer.utils";
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

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  CartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartreducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartCount, cartItems, CartTotal, isCartOpen }, dispatch] =
    useReducer(cartreducer, INITIAL_STATE);

  const updatecartitemReducer = (newcartItems) => {
    const newCarttotal = cartItems.reduce((total, cartitem) => {
      return total + cartitem.quantity * cartitem.price;
    }, 0);

    const newCartCount = cartItems.reduce((total, cartitem) => {
      return total + cartitem.quantity;
    }, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newcartItems,
        cartCount: newCartCount,
        CartTotal: newCarttotal,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newcartItems = addCartItems(cartItems, productToAdd);
    updatecartitemReducer(newcartItems);
  };
  const removeItemFromCart = (cartItemToRemove) => {
    const newcartItems = removecartItem(cartItems, cartItemToRemove);
    updatecartitemReducer(newcartItems);
  };
  const clearItemfromCart = (cartItemToClear) => {
    const newcartItems = clearCartItem(cartItems, cartItemToClear);
    updatecartitemReducer(newcartItems);
  };

  const setisCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
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
