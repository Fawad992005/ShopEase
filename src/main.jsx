import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App.jsx";
import { UserProvider } from "./context/user.context.jsx";
import { CategoriesProvider } from "./context/categories.context.jsx";
import { CartProvider } from "./context/cart.context.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
