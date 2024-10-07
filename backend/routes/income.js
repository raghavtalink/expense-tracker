// backend/routes/income.js

const express = require('express');
const Income = require('../models/Income');
const authenticate = require('../middleware/auth'); // Assuming you have an authentication middleware
const router = express.Router();

// Add Income
router.post('/', authenticate, async (req, res) => {
    const { amount, category, paymentMethod } = req.body;
    const income = new Income({ amount, category, paymentMethod, userId: req.user.id });

    try {
        await income.save();
        res.status(201).json({ message: 'Income added successfully!', income });
    } catch (error) {
        res.status(400).json({ message: 'Failed to add income.', error });
    }
});

// Get Incomes for a User
router.get('/', authenticate, async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user.id });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch incomes.', error });
    }
});

module.exports = router;
