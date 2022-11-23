import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm'

// follow this site 
// https://github.com/stripe/react-stripe-js/blob/master/examples/hooks/0-Card-Minimal.js
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const Payment = () => {

    // const navigation = useNavigation()
    const booking = useLoaderData()
    const { treatment, price, appointmentDate, slot } = booking
    // if (navigation.state === 'loading') {
    //     return <Loading></Loading>
    // }

    return (
        <div>
            <h3 className="text-3xl">Payment for {treatment}</h3>
            <p className='text-3xl'>Please pay <strong>${price}</strong> for your appointment on {appointmentDate} at {slot} </p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;