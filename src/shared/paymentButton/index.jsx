import { Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function PaymentButton() {
  const [googlePayClient, setGooglePayClient] = useState(null);

  useEffect(() => {
    if (window.google && window.google.payments) {
      const client = new window.google.payments.api.PaymentsClient({ environment: "TEST" });
      setGooglePayClient(client);
    } else {
      console.error("Google Pay SDK not loaded");
    }
  }, []);

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["VISA", "MASTERCARD"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleMerchantId",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPrice: "10.00",
      currencyCode: "USD",
    },
  };

  const handleClick = async () => {
    if (!googlePayClient) {
      console.error("Google Pay Client not initialized");
      return;
    }

    try {
      const isReady = await googlePayClient.isReadyToPay(paymentRequest);
      if (isReady.result) {
        const paymentData = await googlePayClient.loadPaymentData(paymentRequest);
        console.log("Payment Success:", paymentData);
      } else {
        alert("Google Pay is not available");
      }
    } catch (error) {
      console.error("Google Pay Error:", error);
    }
  };

  return (
    <>
    <Link onClick={handleClick} className="!text-[12px] cursor-pointer">$ 10</Link>
    </>

    
  );
}

export default PaymentButton;
