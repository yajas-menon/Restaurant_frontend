import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from '../components/Loader'


export default function Component() {
    
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
                        <a href="/issue/Room" className="absolute inset-0 z-10" prefetch={false}>
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
                        <a href="/issue/Kitchen" className="absolute inset-0 z-10" prefetch={false}>
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
                        <a href="/issue/Reception" className="absolute inset-0 z-10" prefetch={false}>
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
                        <a href="/issue/Bathroom" className="absolute inset-0 z-10" prefetch={false}>
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
                        <a href="/issue/Dining" className="absolute inset-0 z-10" prefetch={false}>
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


