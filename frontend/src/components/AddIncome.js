import React, { useState } from 'react';
import axios from 'axios';

const AddIncome = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [incomeSource, setIncomeSource] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const token = localStorage.getItem('token');

    const handleAddIncome = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://expense-tracker-2ubr.onrender.com/api/incomes', { amount, category, incomeSource, paymentMethod }, {
                headers: {
                    Authorization: token,
                },
            });
            alert('Income added successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to add income.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add Income</h2>
            <form onSubmit={handleAddIncome} className="space-y-4">

                {/* Amount */}
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Income Amount"
                        required
                    />
                </div>

                {/* Category */}
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a Category</option>
                        <option value="Salary">Salary</option>
                        <option value="Freelancing">Freelancing</option>
                        <option value="Business">Business</option>
                        <option value="Investments">Investments</option>
                        <option value="Any Other">Any Other</option>
                    </select>
                </div>

                {/* Additional input based on category */}
                {category === 'Freelancing' && (
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Freelance Project Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Freelance Project"
                        />
                    </div>
                )}

                {category === 'Business' && (
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Business Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Business Name"
                        />
                    </div>
                )}

                {category === 'Investments' && (
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Investment Type</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Investment Type (e.g., Stocks, Bonds)"
                        />
                    </div>
                )}

                {category === 'Any Other' && (
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter description"
                        />
                    </div>
                )}

                {/* Payment Method */}
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cheque">Cheque</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="mt-5">
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        Add Income
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddIncome;
