import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from '../components/Loader'


export default function Component() {
    const [issues, setIssues] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedIssueId, setSelectedIssueId] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchIssues = async () => {
    //         try {
    //             const response = await api.get('/api/auth/all');
    //             setIssues(response.data.data);
    //         } catch (error) {
    //             console.error('Error fetching issues:', error);
    //         }
    //     };

    //     fetchIssues();
    // }, []);

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


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (issueId) => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('resolvedPhoto', selectedFile);

        try {
            setLoading(true)
            await api.post(`/api/auth/resolve/${issueId}`, formData);
            setLoading(false)
            toast.success('Photo uploaded successfully! Please wait while the admin reviews and approves it');
            // Optionally, fetch issues again to update the list
            const response = await api.get('/api/auth/all');
            setIssues(response.data.data);
        } catch (error) {
            setLoading(false)
            console.error('Error uploading photo:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Loader isLoading={loading} />
            <div>
                <h1 className="text-4xl font-bold flex items-start justify-start mx-8 mt-28"> Report an issue</h1>
                <button onClick={() => { navigate(-1) }} className="bg-blue-500 text-white py-2 px-6 rounded-full items-start justify-start mx-8 mt-4 hover:bg-blue-700">Go Back</button>
                <hr class="h-px mx-8 my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <section className="grid mx-8 grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 lg:p-6">
                    <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                        <a href="/issue/room" className="absolute inset-0 z-10" prefetch={false}>
                            <span className="sr-only">View</span>
                        </a>
                        <div className="bg-card rounded-md p-4 flex items-center justify-center">
                            <BedIcon className="w-8 h-8 text-card-foreground" />
                        </div>
                        <div className="p-4 bg-background">
                            <h3 className="text-xl font-bold">Room</h3>
                            <p className="text-sm text-muted-foreground">Cozy and comfortable rooms for a restful day.</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                        <a href="/issue/kitchen" className="absolute inset-0 z-10" prefetch={false}>
                            <span className="sr-only">View</span>
                        </a>
                        <div className="bg-primary rounded-md p-4 flex items-center justify-center">
                            <CookingPotIcon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div className="p-4 bg-background">
                            <h3 className="text-xl font-bold">Kitchen</h3>
                            <p className="text-sm text-muted-foreground">Fully equipped with modern appliances.</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                        <a href="/issue/reception" className="absolute inset-0 z-10" prefetch={false}>
                            <span className="sr-only">View</span>
                        </a>
                        <div className="bg-secondary rounded-md p-4 flex items-center justify-center">
                            <ReceiptIcon className="w-8 h-8 text-secondary-foreground" />
                        </div>
                        <div className="p-4 bg-background">
                            <h3 className="text-xl font-bold">Reception</h3>
                            <p className="text-sm text-muted-foreground">Welcoming and comfortable lobby area.</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                        <a href="/issue/bathroom" className="absolute inset-0 z-10" prefetch={false}>
                            <span className="sr-only">View</span>
                        </a>
                        <div className="bg-muted rounded-md p-4 flex items-center justify-center">
                            <BathIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="p-4 bg-background">
                            <h3 className="text-xl font-bold">Bathroom</h3>
                            <p className="text-sm text-muted-foreground">Spacious and well-appointed bathrooms.</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                        <a href="/issue/dining" className="absolute inset-0 z-10" prefetch={false}>
                            <span className="sr-only">View</span>
                        </a>
                        <div className="bg-card rounded-md p-4 flex items-center justify-center">
                            <TableIcon className="w-8 h-8 text-card-foreground" />
                        </div>
                        <div className="p-4 bg-background">
                            <h3 className="text-xl font-bold">Dining</h3>
                            <p className="text-sm text-muted-foreground">Enjoy delectable meals in our dining area.</p>
                        </div>
                    </div>
                </section>
                <hr class="h-px mx-8 my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <h1 className="text-4xl font-bold flex items-start justify-start mx-8 mt-8">Details</h1>
                <div className="mx-8 bg-background p-4 rounded-lg shadow-md">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-zinc-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Section Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Device Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Device Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Image After Repair</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                                {issues.map(issue => (
                                    <tr key={issue._id}>
                                        <td className="px-6 py-4 max-w-xs break-words">{issue.sectionName}</td>
                                        <td className="px-6 py-4 max-w-xs break-words">{issue.deviceName}</td>
                                        <td className="px-6 py-4 max-w-xs break-words">{issue.deviceCode}</td>
                                        <td className="px-6 py-4 max-w-xs break-words">{issue.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${issue.status === 'Resolved' ? 'bg-green-100 text-green-800' : issue.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                        {issue.status !== 'Resolved' && (
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input type="file" onChange={handleFileChange} />
                                                <button onClick={() => handleUpload(issue._id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Upload Resolved Photo</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

function BedIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 4v16" />
            <path d="M2 8h18a2 2 0 0 1 2 2v10" />
            <path d="M2 17h20" />
            <path d="M6 8v9" />
        </svg>
    )
}

function BathIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
            <line x1="10" x2="8" y1="5" y2="7" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <line x1="7" x2="7" y1="19" y2="21" />
            <line x1="17" x2="17" y1="19" y2="21" />
        </svg>
    )
}


function CookingPotIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 12h20" />
            <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
            <path d="m4 8 16-4" />
            <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
        </svg>
    )
}


function ReceiptIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
            <path d="M12 17.5v-11" />
        </svg>
    )
}


function TableIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3v18" />
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M3 15h18" />
        </svg>
    )
}


