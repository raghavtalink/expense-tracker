import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Chart.js for bar charts
import { DatePicker } from 'antd'; // Ant Design DatePicker for date selection
import moment from 'moment'; // For date manipulation
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the components you will use in your app
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SeeExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const token = localStorage.getItem('token');
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://expense-tracker-2ubr.onrender.com/api/expenses', {
          headers: {
            Authorization: token,
          },
        });
        setExpenses(response.data);
        setFilteredExpenses(response.data); // Initialize with all expenses
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpenses();
  }, [token]);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = expenses.filter(expense => {
        const expenseDate = moment(expense.date);
        return expenseDate.isBetween(startDate, endDate, null, '[]');
      });
      setFilteredExpenses(filtered);
    } else {
      setFilteredExpenses(expenses);
    }
  }, [startDate, endDate, expenses]);

  // Calculate average, highest, and lowest expenditures
  const calculateStats = () => {
    const total = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    const average = total / filteredExpenses.length || 0;
    const highest = Math.max(...filteredExpenses.map(expense => expense.amount), 0);
    const lowest = Math.min(...filteredExpenses.map(expense => expense.amount), Infinity);
    return { total, average, highest, lowest };
  };

  const { total, average, highest, lowest } = calculateStats();

  // Prepare data for the bar chart
  const chartData = {
    labels: filteredExpenses.map(expense => moment(expense.date).format('YYYY-MM-DD')),
    datasets: [
      {
        label: 'Expenses',
        data: filteredExpenses.map(expense => expense.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl mb-4 text-center">Your Expenses</h1>

      {/* Date Range Picker */}
      <div className="mb-5">
        <DatePicker
          placeholder="Start Date"
          onChange={(date) => setStartDate(date)}
          className="mr-2"
        />
        <DatePicker
          placeholder="End Date"
          onChange={(date) => setEndDate(date)}
        />
      </div>

      {/* Stats Display */}
      <div className="flex justify-around mb-5">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold">Total Expenditure</h3>
          <p>${total.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold">Average Expenditure</h3>
          <p>${average.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold">Highest Expenditure</h3>
          <p>${highest.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold">Lowest Expenditure</h3>
          <p>${lowest === Infinity ? 'N/A' : lowest.toFixed(2)}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-5">
        <h2 className="text-2xl mb-4 text-center">Expenses Over Time</h2>
        <Bar
          ref={chartRef}
          data={chartData}
          options={{ responsive: true }}
          onAnimationComplete={() => {
            if (chartRef.current) {
              chartRef.current.destroy();
            }
          }}
        />
      </div>

      {/* Expenses Table */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Payment Method</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense._id}>
              <td className="border p-2">${expense.amount}</td>
              <td className="border p-2">{expense.category}</td>
              <td className="border p-2">{expense.paymentMethod}</td>
              <td className="border p-2">{moment(expense.date).format('YYYY-MM-DD HH:mm')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeExpenses;