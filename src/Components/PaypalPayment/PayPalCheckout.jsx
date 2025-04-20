// src/components/PayPalCheckout.jsx
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ amount, onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "Ad8VunDlqEu71bC-vSB9QJmR5S7VhzZCHgGMC-Ff7_GXZysKuVcyNUIR7kWytCu5SSacNs6B_gsNzcNv" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
            onSuccess(details); // Send data to backend if needed
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
