const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth'); // Auth middleware for protected routes

const router = express.Router();

// Add Expense
router.post('/', auth, async (req, res) => {
    const {
        amount,
        means,
        category,
        subCategory,
        groceryItems,
        fuelKm,
        travellingFrom,
        travellingTo,
        numberOfTickets,
        movieName,
        gadgetName,
        giftRecipient,
        giftDescription,
        clothingStore,
        clothingDescription,
        investmentSource,
        otherDescription
    } = req.body;

    // Validate required fields
    if (amount == null || means == null || category == null) {
        return res.status(400).send({ error: 'Amount, means, and category are required.' });
    }

    // Create a new expense
    const expense = new Expense({
        amount,
        means,
        category,
        subCategory,
        groceryItems,
        fuelKm,
        travellingFrom,
        travellingTo,
        numberOfTickets,
        movieName,
        gadgetName,
        giftRecipient,
        giftDescription,
        clothingStore,
        clothingDescription,
        investmentSource,
        otherDescription,
        userId: req.user.id // Link expense to the authenticated user
    });

    try {
        await expense.save();
        res.status(201).send(expense);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while saving the expense. Please try again.' });
    }
});

// Get Expenses
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.send(expenses);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching expenses. Please try again.' });
    }
});

// Get Expense by ID
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findOne({ _id: id, userId: req.user.id });
        if (!expense) {
            return res.status(404).send({ error: 'Expense not found.' });
        }
        res.send(expense);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching the expense. Please try again.' });
    }
});

// Update Expense
router.patch('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'amount',
        'means',
        'category',
        'subCategory',
        'groceryItems',
        'fuelKm',
        'travellingFrom',
        'travellingTo',
        'numberOfTickets',
        'movieName',
        'gadgetName',
        'giftRecipient',
        'giftDescription',
        'clothingStore',
        'clothingDescription',
        'investmentSource',
        'otherDescription'
    ];
    
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const expense = await Expense.findOne({ _id: id, userId: req.user.id });
        if (!expense) {
            return res.status(404).send({ error: 'Expense not found.' });
        }

        updates.forEach((update) => (expense[update] = req.body[update]));
        await expense.save();
        res.send(expense);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the expense. Please try again.' });
    }
});

// Delete Expense
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!expense) {
            return res.status(404).send({ error: 'Expense not found.' });
        }
        res.send(expense);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the expense. Please try again.' });
    }
});

router.get('/', auth, async (req, res) => {
    const { startDate, endDate } = req.query;

    const filters = { userId: req.user.id };
    
    if (startDate && endDate) {
        filters.createdAt = {
            $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
            $lte: new Date(new Date(endDate).setHours(23, 59, 59))
        };
    }

    try {
        const expenses = await Expense.find(filters);
        res.send({
            totalExpenses: expenses.reduce((acc, expense) => acc + expense.amount, 0),
            expenses
        });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching expenses.' });
    }
});


module.exports = router;
