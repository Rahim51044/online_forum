// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import React from 'react';
// import Stripe from 'stripe';

// const CheckoutForm = () => {
//      const stripe = useStripe();
//   const elements = useElements();

//      const handleSubmit = async (event) => {
//     // Block native form submission.
//     event.preventDefault();
//         if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }
//      const card = elements.getElement(CardElement);

//     if (card == null) {
//       return;
//     }
//       // Use your card Element with other Stripe.js APIs
//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//       type: 'card',
//       card,
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//     }



//      }
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: '#aab7c4',
//               },
//             },
//             invalid: {
//               color: '#9e2146',
//             },
//           },
//         }}
//       />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//         </div>
//     );
// };

// export default CheckoutForm;








// import { useState } from "react";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import Swal from "sweetalert2";

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [cardError, setCardError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setCardError("");

//     if (!stripe || !elements) return;

//     const card = elements.getElement(CardElement);
//     if (!card) {
//       setCardError("Card details not found.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 🧾 For testing: No backend, just createPaymentMethod
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card,
//       });

//       if (error) {
//         setCardError(error.message);
//         Swal.fire("Payment Error", error.message, "error");
//       } else {
//         console.log("✅ [PaymentMethod]", paymentMethod);
//         setSuccess(true);
//         Swal.fire("Success", "Payment method created!", "success");
//       }
//     } catch (err) {
//       console.error(err);
//       setCardError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Checkout 💳</h2>
//       <p className="text-center mb-6 text-gray-600">Enter your card info to proceed.</p>

//       {success ? (
//         <div className="text-center text-green-600 font-semibold">
//           ✅ Payment method successfully created!
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <CardElement
//             className="p-4 border rounded"
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#424770",
//                   "::placeholder": { color: "#aab7c4" },
//                 },
//                 invalid: { color: "#9e2146" },
//               },
//             }}
//           />
//           {cardError && (
//             <p className="text-sm text-red-600 text-center -mt-2">{cardError}</p>
//           )}
//           <button
//             type="submit"
//             className="btn btn-primary w-full"
//             disabled={!stripe || loading}
//           >
//             {loading ? "Processing..." : "Pay"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default CheckoutForm;



// import { useState } from "react";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAuth from "../../../hooks/useAuth";

// const Membership = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const [cardError, setCardError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setCardError("");

//     if (!stripe || !elements) return;

//     const card = elements.getElement(CardElement);
//     if (!card) {
//       setCardError("Card details not found.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1️⃣ Create Payment Intent from backend (500 = $5.00)
//       const res = await axiosSecure.post("/create-payment-intent", {
//         amount: 500,
//       });

//       const clientSecret = res.data.clientSecret;

//       // 2️⃣ Confirm Card Payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card,
//           billing_details: {
//             name: user.displayName,
//             email: user.email,
//           },
//         },
//       });

//       if (result.error) {
//         setCardError(result.error.message);
//         Swal.fire("Payment Failed", result.error.message, "error");
//         setLoading(false);
//         return;
//       }

//       if (result.paymentIntent.status === "succeeded") {
//         // 3️⃣ Update user to Gold Member in DB
//         await axiosSecure.patch(`/users/membership/${user.email}`);

//         setSuccess(true);
//         Swal.fire("Success", "You are now a Gold Member!", "success");
//       }
//     } catch (err) {
//       console.error(err);
//       setCardError("Something went wrong. Try again.");
//       Swal.fire("Error", "Something went wrong. Try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Become a Gold Member 🏆</h2>
//       <p className="text-center mb-6 text-gray-600">
//         Pay <span className="font-semibold text-blue-600">500 Taka</span> to unlock unlimited posting and get a <span className="text-yellow-600 font-bold">Gold badge</span>.
//       </p>

//       {success ? (
//         <div className="text-center text-green-600 font-semibold">
//           ✅ You are now a Gold Member!
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <CardElement
//             className="p-4 border rounded"
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#424770",
//                   "::placeholder": { color: "#aab7c4" },
//                 },
//                 invalid: { color: "#9e2146" },
//               },
//             }}
//           />
//           {cardError && (
//             <p className="text-sm text-red-600 text-center -mt-2">{cardError}</p>
//           )}
//           <button
//             type="submit"
//             className="btn btn-primary w-full"
//             disabled={!stripe || loading}
//           >
//             {loading ? "Processing..." : "Pay ৳500"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Membership;




import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const Membership = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1️⃣ Create Payment Intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: 500, // 500 = $5.00
      });

      const clientSecret = res.data.clientSecret;

      // 2️⃣ Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user.email,
            name: user.displayName,
          },
        },
      });

      if (result.error) {
        Swal.fire("Payment Error", result.error.message, "error");
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // 3️⃣ Update membership
        await axiosSecure.patch(`/users/membership/${user.email}`);
        setSuccess(true);
        Swal.fire("Success", "You are now a Gold Member!", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Become a Gold Member 🏆</h2>
      <p className="text-center mb-6 text-gray-600">Pay $5 to unlock unlimited posting and get a Gold badge.</p>

      {success ? (
        <div className="text-center text-green-600 font-semibold">You are now a Gold Member!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement className="p-4 border rounded" />
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Pay $5"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Membership;
