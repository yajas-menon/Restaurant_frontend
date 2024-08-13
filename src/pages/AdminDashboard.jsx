import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
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
            setLoading(true)
            await api.post(`/api/auth/update-status/${issueId}`, { status });
            setLoading(false)
            toast.success(`Issue ${status.toLowerCase()} successfully!`);
            const response = await api.get('/api/auth/all');
            setIssues(response.data.data);
        } catch (error) {
            setLoading(false)
            toast.error(`Error updating status to ${status}:`, error);
        }
    };

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };
    return (
        <div>
            <Navbar />
            <Loader isLoading={loading} />
            <div className="mx-4 md:mx-8 mt-20 md:mt-28 bg-background p-4 rounded-lg shadow-md">
                <h1 className="text-2xl md:text-4xl font-medium">Maintenance Tasks</h1>
                <p className="text-sm md:text-base text-gray-500">Review and approve maintenance tasks.</p>
                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                        <div className="relative max-w-screen-lg max-h-screen p-4e">
                            <img src={selectedImage} alt="Enlarged" className="max-w-full rounded-lg object-contain" />
                            <button onClick={closeImageModal} className="absolute top-2 right-2 font-semibold text-white text-2xl bg-black bg-opacity-50 rounded-full hover:bg-gray-800 px-4 py-2">✕</button>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-200 mt-4 md:mt-8">
                        <thead>
                            <tr>
                                <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Device Code</th>
                                <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Description</th>
                                <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Before Maintenance</th>
                                <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">After Maintenance</th>
                                <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Approval</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                            {issues.map(issue => (
                                <tr key={issue._id}>
                                    <td className="px-6 py-4 max-w-xs break-words">{issue.deviceCode}</td>
                                    <td className="px-6 py-4 max-w-xs break-words">{issue.description}</td>
                                    <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                                        {issue.issuePhoto && (
                                            <img
                                                src={issue.issuePhoto}
                                                alt="Issue"
                                                className="w-12 h-12 md:w-16 md:h-16 rounded-full cursor-pointer"
                                                onClick={() => openImageModal(issue.issuePhoto)}
                                            />
                                        )}
                                    </td>
                                    <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                                        {issue.resolvedPhoto && (
                                            <img
                                                src={issue.resolvedPhoto}
                                                alt="Resolved Issue"
                                                className="w-12 h-12 md:w-16 md:h-16 mt-2 rounded-full cursor-pointer"
                                                onClick={() => openImageModal(issue.resolvedPhoto)}
                                            />
                                        )}
                                    </td>
                                    <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                                        {issue.status === 'Pending Approval' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(issue._id, 'Resolved')}
                                                    className="bg-white font-medium text-black border border-black py-1 px-2 rounded-md mt-2 mx-2 hover:bg-gray-200"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(issue._id, 'Rejected')}
                                                    className="bg-red-500 text-white font-medium py-1 px-2 rounded mt-2 hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default AdminDashboard