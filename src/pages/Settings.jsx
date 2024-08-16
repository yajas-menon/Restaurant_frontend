
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function Component() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const totalUsers = pendingUsers.length;
    const usersPerPage = 5; 
    const startIndex = 1; 
    const endIndex = Math.min(usersPerPage, totalUsers);
    const navigate = useNavigate();
    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            const res = await api.get('/api/auth/allusers');
            setPendingUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const approveUser = async (userId) => {
        try {
            await api.post('/api/auth/approve', { userId });
            toast.success('User approved');
            fetchPendingUsers(); // Refresh the list
        } catch (err) {
            console.error(err);
        }
    };

    const rejectUser = async (userId) => {
        try {
            const response = await api.post('/api/auth/reject', { userId });
            toast.success(response.data.msg || 'User removed');
            fetchPendingUsers(); // Refresh the list
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Error removing user';
            toast.error(errorMsg);
            console.error(err);
        }
    };
    

    const confirmRemove = (userId) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => rejectUser(userId)
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
        };
  

    return (
        <div>
    <Navbar />
    <div className="mx-8 mt-20 rounded-lg shadow-sm">
        <button onClick={() => { navigate(-1) }} className="bg-blue-500 text-white py-2 px-6 rounded-full items-start justify-start mt-4 hover:bg-blue-700">Go Back</button>
        <div className="p-4">
            <h2 className="text-3xl font-medium">User Approvals</h2>
            <p className="text-sm text-gray-500">Review and manage user accounts.</p>
        </div>
        <div className="p-4">
            {totalUsers > 0 ? (
                <table className="min-w-full divide-y divide-zinc-200">
                    <thead>
                        <tr className="">
                            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingUsers.map(user =>
                            <tr className="border-b" key={user._id}>
                                <td className="px-6 py-4 max-w-xs break-words">{user.name}</td>
                                <td className="px-6 py-4 max-w-xs break-words">{user.email}</td>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                                    {user.isApproved ===false && (
                                        
                                        <button className="bg-white font-medium text-black border border-black py-1 px-2 rounded-md mt-2 mx-2 hover:bg-gray-200" onClick={() => approveUser(user._id)}>
                                            Approve
                                        </button>
                                    )}
                                    <button className="bg-red-500 text-white font-medium py-1 px-2 rounded mt-2 hover:bg-red-700" onClick={() => confirmRemove(user._id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">No users to display</p>
                </div>
            )}
        </div>
        <div className="border-t border-gray-200 p-4 text-xs text-gray-500">
            Showing <strong>{startIndex}-{endIndex}</strong> of <strong>{totalUsers}</strong> users
        </div>
    </div>
</div>

    );
}

