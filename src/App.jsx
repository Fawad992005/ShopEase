import Home from "./routes/Home/home.component";
import Navigation from "./routes/Navigation/navigation.component";
import { Route, Routes } from "react-router-dom";
import Shop from "./routes/Shop/shop.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/Checkout/checkout.component";
import { useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { setcurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setcurrentUser(user));
    });

    return unsubscribe;
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
