// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import AddIncome from './components/AddIncome'; // Import AddIncome
import SeeExpenses from './components/SeeExpenses';
import SeeIncomes from './components/SeeIncomes'; // Import SeeIncomes
import Register from './components/Register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/add-income" element={<AddIncome />} />
                <Route path="/see-expenses" element={<SeeExpenses />} />
                <Route path="/see-incomes" element={<SeeIncomes />} />
            </Routes>
        </Router>
    );
};

export default App;
