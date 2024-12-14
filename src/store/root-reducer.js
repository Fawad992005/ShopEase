import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import categoriesReducer from "./categories/categoriesSlice";
import cartReducer from "./cart/cartSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
