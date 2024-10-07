import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchMonthlyData = async () => {
    try {
      const response = await fetch(`https://expense-tracker-2ubr.onrender.com/api/expenses?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setTotalExpenses(data.totalExpenses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total expenses
        const expenseResponse = await fetch('https://expense-tracker-2ubr.onrender.com/api/total-expenses');
        const expenseData = await expenseResponse.json();
        setTotalExpenses(expenseData.total);

        // Fetch total income
        const incomeResponse = await fetch('https://expense-tracker-2ubr.onrender.com/api/total-income');
        const incomeData = await incomeResponse.json();
        setTotalIncome(incomeData.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg p-4">
        <div className="h-16 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-700">Expense Tracker</h1>
        </div>
        <nav className="mt-8">
          <Link to="/add-expense" className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded">
            Add Expense
          </Link>
          <Link to="/add-income" className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded">
            Add Income
          </Link>
          <Link to="/see-expenses" className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded">
            See Expenses
          </Link>
          <Link to="/see-incomes" className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded">
            See Incomes
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Date Range</h2>
          <div className="flex flex-col sm:flex-row sm:space-x-4 items-center">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <label htmlFor="startDate" className="block text-gray-700 mb-1">Start Date</label>
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label htmlFor="endDate" className="block text-gray-700 mb-1">End Date</label>
              <DatePicker
                id="endDate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <button
            onClick={fetchMonthlyData}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fetch Data
          </button>
          <p className="mt-2 text-gray-700">Total Expenses for selected period: ₹{totalExpenses}</p>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Total Expenses</h3>
              <p className="text-2xl text-red-600">₹{totalExpenses.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Total Income</h3>
              <p className="text-2xl text-green-600">₹{totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Net Balance</h3>
              <p className="text-2xl text-blue-600">₹{netBalance.toFixed(2)}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;