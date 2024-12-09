import React, { useState } from "react";
import "./signupform.styles.scss";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Forminput from "../form-input/form-input.component";
import Button from "../button/button.component";

const SignUpForm = () => {
  const defaultformfields = {
    displayName: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [formfields, setformfields] = useState(defaultformfields);
  const { displayName, email, password, confirmpassword } = formfields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setformfields({ ...formfields, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmpassword) {
      alert("Password dont match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      setformfields(defaultformfields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Dont Have An Account?</h2>
      <span>Sign Up With Your Email And Password</span>
      <form onSubmit={handleSubmit}>
        <Forminput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <Forminput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmpassword"
          value={confirmpassword}
        />
        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
