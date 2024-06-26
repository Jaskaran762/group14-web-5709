import React, { useEffect, useState } from 'react';
import './ViewExpense.css'; // Import the CSS file
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
const ViewExpense = () => {
    const [expense, setExpense] = useState({});
    const { expenseId } = useParams();
    const navigate = useNavigate();
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
    }
    const errorNotification = (message) => {
        Swal.fire({
            title: "Expense did not retireved!",
            text: message,
            icon: "error"
        })
    }
    useEffect(() => {
        const fetchExpense = async () => {
            try {
                let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/expense/get/${expenseId}`, { headers });
                if (res.data.isSuccess) {
                    setExpense(res.data.expense)
                } else {
                    throw new Error(res.data.message);
                }
            } catch (err) {
                errorNotification(err.message);
            }
        }
        fetchExpense()
    }, [])
    const handleUpdate = () => {
        navigate(`/editexpense/${expense._id}`)
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure you want to delete it!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#4c4b42",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        });
    
        if (result.isConfirmed) {
            try {
                let res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/expense/delete/${expenseId}`, { headers });
                if(res.data.isSuccess){
                Swal.fire({
                    title: 'Deleted!',
                    icon: 'success',
                    message:res.data.message,
                    confirmButtonColor: '#4c4b42',
                    cancelButtonColor: '#6e6d66'
                });
                } else {
                    throw new Error(res.data.message);
                }   
            } catch (err) {
                Swal.fire({
                    title: "Expense did not delete!",
                    text: err.message,
                    icon: "error"
                })
            }
        } else {
            Swal.fire({ title: 'Cancelled!', icon: 'error', confirmButtonColor: '#4c4b42' });
        }
    };
    


    return (
        <div className="view-expense-container">
            <h2>Expense Details</h2>
            <p className="expense-detail"><strong>Expense Name:</strong> {expense.expenseName}</p>
            <p className="expense-detail"><strong>Expense Type:</strong> {expense.expenseType}</p>
            <p className="expense-detail"><strong>Expense Amount:</strong> ${expense.expenseAmount}</p>
            <p className="expense-detail"><strong>Payment Medium:</strong> {expense.paymentMedium}</p>
            {expense.expenseDescription && (
                <p className="expense-detail">
                    <strong>Description:</strong> {expense.expenseDescription}
                </p>
            )}
            <p className="expense-detail"><strong>Category:</strong> {expense.expenseCategory}</p>
            <div className="buttons-container">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default ViewExpense;
