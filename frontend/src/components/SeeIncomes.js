// src/components/SeeIncomes.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeeIncomes = () => {
    const [incomes, setIncomes] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/incomes', {
                    headers: {
                        Authorization: token,
                    },
                });
                setIncomes(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchIncomes();
    }, [token]);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl mb-4">Your Incomes</h1>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Payment Method</th>
                    </tr>
                </thead>
                <tbody>
                    {incomes.map((income) => (
                        <tr key={income._id}>
                            <td className="border p-2">{income.amount}</td>
                            <td className="border p-2">{income.category}</td>
                            <td className="border p-2">{income.paymentMethod}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeeIncomes;
