import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckoutForm from "../../shared/paymentButton/checkout-form";
import { loadStripe } from "@stripe/stripe-js";
import { usePaymentProcessingQuery } from "../../features/payment/paymentSlice";

const PaymentPage = ({ programDetailsId }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIP_SECRET_KEY);

  const { data } = usePaymentProcessingQuery(programDetailsId);

  const appearance = {
    theme: "flat",
  };

  // Pass the appearance object to the Elements instance
  // const elements = stripe.elements({ clientSecret, appearance });

  return (
    <div className="p-9">
      {data?.client_secret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: data?.client_secret,
            theme: "stripe",
            loader: "auto",
            appearance: appearance,
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
