import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Membership from './Membership';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);


const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <Membership></Membership>
        </Elements>
    );
};

export default Payment;