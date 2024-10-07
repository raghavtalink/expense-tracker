import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-200 text-gray-800' : '';
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg p-4">
        <div className="h-16 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-700">Expense Tracker</h1>
        </div>
        <nav className="mt-8">
          <Link to="/dashboard" className={`block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded ${isActive('/dashboard')}`}>
            Dashboard
          </Link>
          <Link to="/add-expense" className={`block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded ${isActive('/add-expense')}`}>
            Add Expense
          </Link>
          <Link to="/add-income" className={`block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded ${isActive('/add-income')}`}>
            Add Income
          </Link>
          <Link to="/see-expenses" className={`block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded ${isActive('/see-expenses')}`}>
            See Expenses
          </Link>
          <Link to="/see-incomes" className={`block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded ${isActive('/see-incomes')}`}>
            See Incomes
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;