import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';

const DonationPage = () => {
    const [donationAmount, setDonationAmount] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!window.Razorpay) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => console.log("Razorpay SDK Loaded");
            script.onerror = () => console.error("Failed to load Razorpay SDK");
            document.body.appendChild(script);
        }
    }, []);

    const handlePayment = async () => {
        if (!donationAmount || donationAmount <= 0) {
            setError("Please enter a valid donation amount.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: Number(donationAmount)}), // Convert INR to paise
            });

            const order = await response.json();
            if (!order.id) throw new Error("Failed to create order.");

            if (!window.Razorpay) {
                setError("Razorpay SDK not loaded. Please refresh the page.");
                setLoading(false);
                return;
            }

            const options = {
                key: 'rzp_test_XTJdZH5bDA49ku', // Replace with your Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: 'Blessings Children Home',
                description: 'Donation',
                order_id: order.id,
                handler: async (response) => {
                    console.log(response);
                    await verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
                },
                prefill: {
                    name: 'Donor Name',
                    email: 'donor@example.com',
                    contact: '9999999999',
                },
                theme: { color: '#3399cc' },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const verifyPayment = async (orderId, paymentId, signature) => {
        try {
            const response = await fetch('http://localhost:5000/verify-razorpay-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, paymentId, signature }),
            });

            const result = await response.json();
            if (result.success) {
                alert("Payment Verified Successfully!");
            } else {
                setError("Payment verification failed.");
            }
        } catch (error) {
            setError("Error verifying payment.");
        }
    };

    return (
        <section id="donate" className="py-16 px-4 max-w-3xl mx-auto mt-24">
            <motion.div variants={fadeIn('up', 0.3)} className="text-center mb-12">
                <motion.h2 variants={textVariant(0.2)} className="text-3xl md:text-4xl font-bold mb-4">
                    Make a Donation
                </motion.h2>
                <motion.p variants={fadeIn('up', 0.4)} className="text-gray-600 text-lg">
                    Your generous contribution can make a significant difference.
                </motion.p>
            </motion.div>

            <motion.div variants={fadeIn('up', 0.5)}>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Donation Amount (INR)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                type="number"
                                name="amount"
                                id="amount"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handlePayment}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Donate Now'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </motion.div>
        </section>
    );
};

export default DonationPage;
