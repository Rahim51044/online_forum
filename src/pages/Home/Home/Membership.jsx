// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm"; // তোমার form component

// const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

// const Membership = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Become a Member</h2>
//       <Elements stripe={stripePromise}>
//         <CheckoutForm />
//       </Elements>
//     </div>
//   );
// };

// export default Membership;




import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; // তোমার form component

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Membership = () => {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-900 text-black rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
        Become a Member
      </h2>

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Membership;
