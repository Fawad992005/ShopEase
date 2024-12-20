import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectcurrentUser } from "../../store/user/user.selector";
import Button from "../button/button.component";
import "./payment-form.styles.scss";
// import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import React from "react";

const PaymentForm = () => {
  const [isProcessing, setisProcessing] = useState(false);
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectcurrentUser);
  const stripe = useStripe();
  const elements = useElements();
  const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted",
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setisProcessing(true);
    try {
      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "POST", // Use uppercase 'POST ' for consistency
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }), // Sending the request body
        }
      );

      const responseData = await response.json(); // Parse the response as JSON

      const {
        paymentIntent: { client_secret },
      } = responseData;

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser ? currentUser.email : "Guest",
          },
        },
      });

      setisProcessing(false);

      if (paymentResult.error) {
        alert(paymentResult.error);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          alert("Payment successfull");
        }
      }
    } catch (error) {
      console.log("Error during payment request:", error);
    }
  };
  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button
          buttontype={BUTTON_TYPE_CLASSES.inverted}
          isLoading={isProcessing}
        >
          Pay Now
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
