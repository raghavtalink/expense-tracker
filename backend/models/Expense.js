// models/Expense.js
const mongoose = require('mongoose');

// Create a schema for Grocery Items
const groceryItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

// Create a schema for the Expense
const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    means: {
        type: String,
        enum: ['Cash', 'UPI', 'Card', 'Other'], // Add more means as needed
        required: true
    },
    category: {
        type: String,
        enum: [
            'Food',
            'Grocery',
            'Fuel',
            'Travelling',
            'Movie Tickets',
            'Gadget',
            'Gift',
            'Clothes',
            'Investment',
            'Any Other'
        ],
        required: true
    },
    subCategory: {
        type: String,
        enum: [
            'Swiggy',
            'Zomato',
            'Cafe',
            'Movie',
            'Other' // Add more subcategories as needed
        ]
    },
    groceryItems: [groceryItemSchema], // Array of grocery items
    fuelKm: {
        type: Number,
        min: 0 // Assuming km cannot be negative
    },
    travellingFrom: {
        type: String,
        trim: true
    },
    travellingTo: {
        type: String,
        trim: true
    },
    numberOfTickets: {
        type: Number,
        min: 0 // Assuming cannot be negative
    },
    movieName: {
        type: String,
        trim: true
    },
    gadgetName: {
        type: String,
        trim: true
    },
    giftRecipient: {
        type: String,
        trim: true
    },
    giftDescription: {
        type: String,
        trim: true
    },
    clothingStore: {
        type: String,
        trim: true
    },
    clothingDescription: {
        type: String,
        trim: true
    },
    investmentSource: {
        type: String,
        trim: true
    },
    otherDescription: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    month: {
        type: Number,
        default: new Date().getMonth() + 1 // Store current month
    },
    year: {
        type: Number,
        default: new Date().getFullYear() // Store current year
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Create the Expense model
const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
