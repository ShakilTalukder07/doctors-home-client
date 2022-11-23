import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';



// follow this site 
// https://github.com/stripe/react-stripe-js/blob/master/examples/hooks/0-Card-Minimal.js
const CheckoutForm = ({ booking }) => {
    const [Processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [transactionId, setTransactionId] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('')
    const stripe = useStripe()
    const elements = useElements()


    const { price, email, patient, _id } = booking

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-home-server.vercel.app/create-payment-intent", {
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

        setProcessing(true);

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        };

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else {
            setCardError('')
        }
        setSuccess('')
        setProcessing(true)
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
        if (paymentIntent.status === "succeeded") {
            // store payment info in the database
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }
            // console.log(payment);

            fetch("https://doctors-home-server.vercel.app/payments", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id)
                    }
                })
        }
        setProcessing(false)
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
                    disabled={!stripe || !clientSecret || Processing}>
                    Pay
                </button>
            </form>
            <p className="text-xl text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className="text-green-600">{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;