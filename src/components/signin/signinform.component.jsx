import React, { useState } from "react";
import "./signinform.styles.scss";
import {
  signInAuthUserWithEmailAndPassword,
  signinWithGooglePopUp,
} from "../../utils/firebase/firebase.utils";
import Forminput from "../form-input/form-input.component";
import Button from "../button/button.component";

const SignInForm = () => {
  const defaultformfields = {
    email: "",
    password: "",
  };
  const [formfields, setformfields] = useState(defaultformfields);
  const { email, password } = formfields;

  const signinWithGoogle = async () => {
    await signinWithGooglePopUp();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformfields({ ...formfields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      setformfields(defaultformfields);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("Wrong Password");
      }
      if (error.code === "auth/user-not-found") {
        alert("User not found");
      }
      console.log(error);
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Already Have An Account?</h2>
      <span>Sign In With Your Email And Password</span>
      <form onSubmit={handleSubmit}>
        <Forminput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <Forminput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button onClick={signinWithGoogle} buttontype="google" type="button">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
