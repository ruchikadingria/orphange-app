// Node.js/Express Backend (server.js)
require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const mongoose = require('mongoose');
const winston = require('winston');

const app = express();
app.use(cors());
app.use(express.json());

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'server.log' })],
});

const uri = process.env.MONGODB_URI;

mongoose
    .connect(uri)
    .then(() => logger.info('Connected to MongoDB Atlas (orphange database)'))
    .catch((err) => logger.error('Error connecting to MongoDB Atlas (orphange database):', err));

const donationSchema = new mongoose.Schema(
    {
        donorName: String,
        donorEmail: String,
        donationAmount: String,
        date: { type: Date, default: Date.now },
    },
    { collection: 'donations' }
);

const Donation = mongoose.model('Donation', donationSchema);

const contactSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
  },
  { collection: 'message' } // Explicitly set collection name
);

const Contact = mongoose.model('Contact', contactSchema);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/create-razorpay-order', async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount) || amount <= 0) {
            logger.warn('Invalid amount received');
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `order_rcptid_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        logger.info('Razorpay order created:', order);
        res.json(order);
    } catch (error) {
        logger.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/verify-razorpay-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            logger.warn('Invalid payment verification request');
            return res.status(400).json({ success: false, message: 'Invalid request parameters' });
        }

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature === razorpay_signature) {
            logger.info('Payment verified:', { razorpay_order_id, razorpay_payment_id });
            res.json({ success: true, message: 'Payment verified' });
        } else {
            logger.warn('Payment verification failed:', { razorpay_order_id, razorpay_payment_id });
            res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        logger.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/store-donation', async (req, res) => {
    try {
        const { donorName, donorEmail, donationAmount } = req.body;
        if (!donorName || !donorEmail || !donationAmount) {
            logger.warn('Invalid donation data received');
            return res.status(400).json({ success: false, message: 'Invalid donation data' });
        }
        const newDonation = new Donation({ donorName, donorEmail, donationAmount });
        await newDonation.save();
        logger.info('Donation data saved:', newDonation);
        res.json({ success: true, message: 'Donation data saved successfully' });
    } catch (error) {
        logger.error('Error saving donation data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
app.get('/get-donations', async (req, res) => {
  try {
      const donations = await Donation.find().sort({ date: -1 }); // Sort by date descending
      res.json(donations);
  } catch (error) {
      logger.error('Error fetching donations:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Basic input validation
    if (!firstName || !lastName || !email || !message) {
      logger.warn('Invalid contact form data received');
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      logger.warn('Invalid email format');
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    await newContact.save();

    logger.info('Contact form data saved:', newContact);
    res.status(201).json({ message: 'Message saved successfully!' });
  } catch (error) {
    logger.error('Error saving contact form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(5000, () => logger.info('Server running on port 5000'));