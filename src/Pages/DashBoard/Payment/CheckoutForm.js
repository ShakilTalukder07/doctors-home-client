import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';


// follow this site 
// https://github.com/stripe/react-stripe-js/blob/master/examples/hooks/0-Card-Minimal.js
const CheckoutForm = ({ booking }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const { price, email, patient } = booking


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }

        setIsLoading(true);

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        };

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else {
            setCardError('')
        }

        setIsLoading(false)


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    }
                }
            }
        );

        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm mt-4 btn-accent'
                    type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <div className="text-xl text-red-500">{cardError}</div>
        </>
    );
};

export default CheckoutForm;