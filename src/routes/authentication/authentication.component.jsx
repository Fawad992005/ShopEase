import React from "react";
import SignUpForm from "../../components/Signup/signupform.component";
import SignInForm from "../../components/signin/signinform.component";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
