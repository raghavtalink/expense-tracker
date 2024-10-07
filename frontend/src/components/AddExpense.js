import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardLayout from './DashboardLayout';
import axios from 'axios';

const AddExpense = () => {
    const [amount, setAmount] = useState('');
    const [means, setMeans] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [groceryItems, setGroceryItems] = useState([{ item: '', quantity: '' }]);
    const [fuelKm, setFuelKm] = useState('');
    const [date, setDate] = useState(new Date());
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [ticketCount, setTicketCount] = useState('');
    const [movieName, setMovieName] = useState('');
    const [gadgetName, setGadgetName] = useState('');
    const [giftItem, setGiftItem] = useState('');
    const [clothesType, setClothesType] = useState('');
    const [investmentType, setInvestmentType] = useState('');
    const [otherDescription, setOtherDescription] = useState('');

    const handleGroceryChange = (index, e) => {
        const newGroceryItems = [...groceryItems];
        newGroceryItems[index][e.target.name] = e.target.value;
        setGroceryItems(newGroceryItems);
    };

    const addGroceryItem = () => {
        setGroceryItems([...groceryItems, { item: '', quantity: '' }]);
    };

    const removeGroceryItem = (index) => {
        const newGroceryItems = groceryItems.filter((_, i) => i !== index);
        setGroceryItems(newGroceryItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the expense data
        const expenseData = {
            amount: parseFloat(amount),
            means,
            category,
            subCategory: subCategory || undefined,
            groceryItems: category === 'Grocery' ? groceryItems : [],
            fuelKm: category === 'Fuel' ? parseFloat(fuelKm) : undefined,
            travellingFrom: category === 'Travelling' ? from : undefined,
            travellingTo: category === 'Travelling' ? to : undefined,
            numberOfTickets: category === 'Movie Tickets' ? parseInt(ticketCount) : undefined,
            movieName: category === 'Movie Tickets' ? movieName : undefined,
            gadgetName: category === 'Gadget' ? gadgetName : undefined,
            giftDescription: category === 'Gift' ? giftItem : undefined,
            clothingDescription: category === 'Clothes' ? clothesType : undefined,
            investmentSource: category === 'Investment' ? investmentType : undefined,
            otherDescription: category === 'Any Other' ? otherDescription : undefined,
            date: date.toISOString() // Include the date if needed
        };

        console.log('Expense Data:', expenseData); // Log the data being sent

        try {
            const response = await axios.post('https://expense-tracker-2ubr.onrender.com/api/expenses', expenseData, {
                headers: {
                    Authorization: localStorage.getItem('token'), // Ensure the token is sent correctly
                },
            });

            if (response.status === 201) {
                alert('Expense added successfully!');
                // Reset form fields
                setAmount('');
                setMeans('');
                setCategory('');
                setSubCategory('');
                setGroceryItems([{ item: '', quantity: '' }]);
                setFuelKm('');
                setDate(new Date());
                setFrom('');
                setTo('');
                setTicketCount('');
                setMovieName('');
                setGadgetName('');
                setGiftItem('');
                setClothesType('');
                setInvestmentType('');
                setOtherDescription('');
            }
        } catch (error) {
            console.error('Error adding expense:', error.response?.data || error.message);
            alert('Failed to add expense. Please try again.');
        }
    };

    return (
        <DashboardLayout>
            <div className="p-4 max-w-full mx-auto bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        {/* Amount Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="amount">Amount (₹)</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter amount"
                                required
                            />
                        </div>

                        {/* Date Picker */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Date</label>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Means of Expenditure */}
                        <div className="mb-4">
                            <span className="block text-gray-700 text-sm font-semibold mb-2">Means of Expenditure</span>
                            <div className="flex space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="Cash"
                                        checked={means === 'Cash'}
                                        onChange={(e) => setMeans(e.target.value)}
                                        className="form-radio text-blue-500"
                                    />
                                    <span className="ml-2">Cash</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="UPI"
                                        checked={means === 'UPI'}
                                        onChange={(e) => setMeans(e.target.value)}
                                        className="form-radio text-blue-500"
                                    />
                                    <span className="ml-2">UPI</span>
                                </label>
                            </div>
                        </div>

                        {/* Category Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Food">Food</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Fuel">Fuel</option>
                                <option value="Travelling">Travelling</option>
                                <option value="Movie Tickets">Movie Tickets</option>
                                <option value="Gadget">Gadget</option>
                                <option value="Gift">Gift</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Investment">Investment</option>
                                <option value="Any Other">Any Other</option>
                            </select>
                        </div>

                        {/* Sub-Category Logic */}
                        {category === 'Food' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Food Subcategory</label>
                                <select
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Subcategory</option>
                                    <option value="Movie">Movie</option>
                                    <option value="Swiggy">Swiggy</option>
                                    <option value="Zomato">Zomato</option>
                                    <option value="Cafe">Cafe</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        )}

                        {/* Grocery Items */}
                        {category === 'Grocery' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Grocery Items</label>
                                {groceryItems.map((groceryItem, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            name="item"
                                            value={groceryItem.item}
                                            onChange={(e) => handleGroceryChange(index, e)}
                                            placeholder="Item"
                                            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                                        />
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={groceryItem.quantity}
                                            onChange={(e) => handleGroceryChange(index, e)}
                                            placeholder="Quantity (KGs)"
                                            className="w-1/4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeGroceryItem(index)}
                                            className="text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addGroceryItem}
                                    className="mt-2 text-blue-500 font-semibold"
                                >
                                    Add Grocery Item
                                </button>
                            </div>
                        )}

                        {/* Fuel Logic */}
                        {category === 'Fuel' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">KM Driven</label>
                                <input
                                    type="number"
                                    value={fuelKm}
                                    onChange={(e) => setFuelKm(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter KM driven"
                                />
                            </div>
                        )}

                        {/* Travelling Logic */}
                        {category === 'Travelling' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">From</label>
                                <input
                                    type="text"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    placeholder="From"
                                />
                                <label className="block text-gray-700 text-sm font-semibold mb-2">To</label>
                                <input
                                    type="text"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="To"
                                />
                            </div>
                        )}

                        {/* Movie Tickets Logic */}
                        {category === 'Movie Tickets' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Number of Tickets</label>
                                <input
                                    type="number"
                                    value={ticketCount}
                                    onChange={(e) => setTicketCount(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    placeholder="Number of Tickets"
                                />
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Movie Name</label>
                                <input
                                    type="text"
                                    value={movieName}
                                    onChange={(e) => setMovieName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Movie Name"
                                />
                            </div>
                        )}

                        {/* Gadget Logic */}
                        {category === 'Gadget' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Gadget Purchased</label>
                                <input
                                    type="text"
                                    value={gadgetName}
                                    onChange={(e) => setGadgetName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Gadget Name"
                                />
                            </div>
                        )}

                        {/* Gift Logic */}
                        {category === 'Gift' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Gift Item</label>
                                <input
                                    type="text"
                                    value={giftItem}
                                    onChange={(e) => setGiftItem(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Gift Item"
                                />
                            </div>
                        )}

                        {/* Clothes Logic */}
                        {category === 'Clothes' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Clothes Type</label>
                                <input
                                    type="text"
                                    value={clothesType}
                                    onChange={(e) => setClothesType(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Clothes Type"
                                />
                            </div>
                        )}

                        {/* Investment Logic */}
                        {category === 'Investment' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Investment Type</label>
                                <input
                                    type="text"
                                    value={investmentType}
                                    onChange={(e) => setInvestmentType(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Investment Type (e.g. Stocks, Mutual Funds)"
                                />
                            </div>
                        )}

                        {/* Any Other Items */}
                        {category === 'Any Other' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
                                <input
                                    type="text"
                                    value={otherDescription}
                                    onChange={(e) => setOtherDescription(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter description of the expense"
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                Add Expense
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AddExpense;