import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; // তোমার form component

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Membership = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Become a Member</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Membership;
