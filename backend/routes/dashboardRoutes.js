// dashboardRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Adjust the path based on your project structure
const Income = require('../models/Income'); // Adjust the path based on your project structure

// Get total expenses
router.get('/total-expenses', async (req, res) => {
    try {
        const total = await Expense.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);
        res.json({ total: total[0]?.total || 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get total income
router.get('/total-income', async (req, res) => {
    try {
        const total = await Income.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);
        res.json({ total: total[0]?.total || 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; // Export the router
