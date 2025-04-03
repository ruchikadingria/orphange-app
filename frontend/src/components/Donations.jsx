import React, { useState, useEffect } from 'react';
import './Donations.css';
import { FaUserCircle, FaUserAstronaut, FaUserTie, FaUserNinja, FaUserSecret } from 'react-icons/fa';

const Donations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalDonationAmount, setTotalDonationAmount] = useState(0);

    useEffect(() => {
        const fetchDonations = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/get-donations');
                if (!response.ok) {
                    throw new Error('Failed to fetch donations.');
                }
                const data = await response.json();
                setDonations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    useEffect(() => {
        // Calculate total donation amount when donations data is available
        if (donations.length > 0) {
            const total = donations.reduce((sum, donation) => sum + Number(donation.donationAmount), 0); // Convert to number
            setTotalDonationAmount(total);
        }
    }, [donations]);

    if (loading) {
        return <p>Loading donations...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (donations.length === 0) {
        return <p>No donations have been made yet.</p>;
    }

    const icons = [FaUserCircle, FaUserAstronaut, FaUserTie, FaUserNinja, FaUserSecret];

    // Duplicate donations to fill the screen
    const duplicatedDonations = [...donations, ...donations];

    return (
        <div className="donations-container">
            <h2 className="donations-title">Donations</h2>
            <div className="sliding-donations">
                <div className="donations-track">
                    {duplicatedDonations.map((donation, index) => (
                        <div key={donation._id + index} className="donation-card">
                            <div className="person-icon">
                                {React.createElement(icons[index % icons.length], { className: 'profile-icon' })}
                            </div>
                            <div className="donation-details">
                                <p className="donor-name">{donation.donorName}</p>
                                <p className="donation-message">
                                    Donated ₹{donation.donationAmount}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="total-donations">Total Donation Collected: ₹{totalDonationAmount}</p>
        </div>
    );
};

export default Donations;