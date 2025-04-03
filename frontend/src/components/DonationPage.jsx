// React Frontend (DonationPage.js)
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';

const DonationPage = () => {
    const [donationAmount, setDonationAmount] = useState('');
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!window.Razorpay) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => console.log('Razorpay SDK Loaded');
            script.onerror = () => console.error('Failed to load Razorpay SDK');
            document.body.appendChild(script);
        }
    }, []);

    const handlePayment = async () => {
        if (!donationAmount || donationAmount <= 0) {
            setError('Please enter a valid donation amount.');
            return;
        }
        if (!donorName) {
            setError('Please enter your name.');
            return;
        }
        if (!donorEmail) {
            setError('Please enter your email.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await storeDonationData();

            const response = await fetch('http://localhost:5000/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: Number(donationAmount), name: donorName, email: donorEmail }),
            });

            const order = await response.json();
            if (!order.id) throw new Error('Failed to create order.');

            if (!window.Razorpay) {
                setError('Razorpay SDK not loaded. Please refresh the page.');
                setLoading(false);
                return;
            }

            const options = {
                key: 'rzp_test_XTJdZH5bDA49ku',
                amount: order.amount,
                currency: order.currency,
                name: 'Blessings Children Home',
                description: 'Donation',
                order_id: order.id,
                handler: async (response) => {
                    console.log(response);
                    const verified = await verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);

                    if (verified) {
                        alert('Payment Successful');
                    }
                    clearForm();
                },
                prefill: {
                    name: donorName,
                    email: donorEmail,
                    contact: '999999999',
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
                return true;
            } else {
                setError('');
                return false;
            }
        } catch (error) {
            setError('Error verifying payment.');
            return false;
        }
    };

    const storeDonationData = async () => {
        try {
            const response = await fetch('http://localhost:5000/store-donation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    donorName: donorName,
                    donorEmail: donorEmail,
                    donationAmount: donationAmount,
                }),
            });

            const result = await response.json();
            if (!result.success) {
                setError('Failed to store donation data.');
            }
        } catch (error) {
            setError('Error storing donation data: ' + error.message);
        }
    };

    const clearForm = () => {
        setDonationAmount('');
        setDonorName('');
        setDonorEmail('');
    };

    return (
        <section id="donate" className="py-2 px-2 max-w-3xl mx-auto mt-19">
            <motion.div variants={fadeIn('up', 0.3)} className="text-center mb-12">
                <motion.h2 variants={textVariant(0.2)} className="text-3xl md:text-4xl font-bold mb-4">
                    Make a Donation
                </motion.h2>
                <motion.p variants={fadeIn('up', 0.4)} className="text-gray-600 text-lg">
                    Your generous contribution can make a significant difference.
                </motion.p>
            </motion.div>

            <motion.div variants={fadeIn('up', 0.5)}>
                <div className="bg-white p-8 rounded-lg shadow-md mx-auto" style={{ width: '80%' }}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Donor Name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                                value={donorName}
                                onChange={(e) => setDonorName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Donor Email
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                                value={donorEmail}
                                onChange={(e) => setDonorEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Donation Amount (INR)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                type="number"
                                name="amount"
                                id="amount"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
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
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
                            style={{ backgroundColor: '#219D80' }}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Proceed'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </motion.div>
        </section>
    );
};

export default DonationPage;