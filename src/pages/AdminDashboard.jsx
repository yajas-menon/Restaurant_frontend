import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await api.get('/api/auth/all');
                setIssues(response.data.data);
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();
    }, []);


    const handleStatusUpdate = async (issueId, status) => {
        try {
            await api.post(`/api/auth/update-status/${issueId}`, { status });
            toast.success(`Issue ${status.toLowerCase()} successfully!`);
            const response = await api.get('/api/auth/all');
            setIssues(response.data.data);
        } catch (error) {
            toast.error(`Error updating status to ${status}:`, error);
        }
    };
    return (
        <div>
            
            <Navbar />
            <div className="mx-8 bg-background p-4 rounded-lg shadow-md">
                <h1 className='text-4xl font-medium'>Maintenance Tasks</h1>
                <p className='text-gray-500'>Review and approve maintenance tasks.</p>
                <table className="min-w-full divide-y divide-zinc-200 mt-8">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Before Maintainence</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">After Maintainence</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Approval</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                        {issues.map(issue => (
                            <tr key={issue._id}>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    {issue.issuePhoto && (
                                        <a href={issue.issuePhoto} target="_blank" rel="noopener noreferrer">
                                            <img src={issue.issuePhoto} alt="Issue" className="w-16 h-16 rounded-full" />
                                        </a>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {issue.resolvedPhoto && (
                                        <a href={issue.resolvedPhoto} target="_blank" rel="noopener noreferrer">
                                            <img src={issue.resolvedPhoto} alt="Resolved Issue" className="w-16 h-16 mt-2 rounded-full" />
                                        </a>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {issue.status === 'Pending Approval' && (
                                        <>
                                            <button onClick={() => handleStatusUpdate(issue._id, 'Resolved')} className="bg-white font-medium text-black border border-black py-1 px-2 rounded-md mt-2 mx-2 hover:bg-gray-200">Approve</button>
                                            <button onClick={() => handleStatusUpdate(issue._id, 'Rejected')} className="bg-red-500 text-white font-medium py-1 px-2 rounded mt-2 hover:bg-red-700">Reject</button>
                                        </>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminDashboard