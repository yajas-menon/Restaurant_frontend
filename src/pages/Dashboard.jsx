import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { toast } from "react-toastify";
import Loader from '../components/Loader'
import { FaSearch } from 'react-icons/fa';



const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('bulbs');
  const [metrics, setMetrics] = useState({
    issueFixed: 0,
    openIssues: 0,
    rejectedIssues: 0,
    pendingIssues: 0,
  });


  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await api.get('/api/auth/all');
        let sortedIssues = response.data.data;
        sortedIssues = sortedIssues.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setIssues(sortedIssues);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    const fetchMetrics = async () => {
      try {
        const response = await api.get('/api/auth/summary'); // New route
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchIssues();
    fetchMetrics();
  }, []);

  


  useEffect(() => {
    // Filter issues based on search term and selected section
    let filtered = issues;

    if (searchTerm) {
      filtered = filtered.filter((issue) =>
        issue.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.sectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.deviceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.remark.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSection) {
      filtered = filtered.filter(
        (issue) => issue.sectionName.toLowerCase() === selectedSection.toLowerCase()
      );
    }

    setFilteredIssues(filtered);
  }, [searchTerm, selectedSection, issues]);

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
      <div className="min-h-screen mt-16 bg-gray-900 text-white p-8">
        <h1 className="text-5xl mb-4 text-left mx-8 font-medium font-serif">Dashboard</h1>
        <hr className='mx-8' />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 mt-8">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl text-white mb-4">Issues Fixed</h2>
            <p className="text-4xl text-white">{metrics.issueFixed}</p>

          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl text-white mb-4">Open Issues</h2>
            <p className="text-4xl text-white">{metrics.openIssues}</p>

          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl text-white mb-4">Rejected Issues</h2>
            <p className="text-4xl text-white">{metrics.rejectedIssues}</p>

          </div>



        </div>
        <h1 className="text-5xl font-medium font-serif flex items-start justify-start mx-8 mt-8 mb-4">Details</h1>
        <hr className='mx-8' />
        <div className="bg-background p-4 rounded-lg shadow-md">
          <div className='flex items-end justify-end mx-8 mb-4'>

            {/* Search Bar */}
            <div className="relative mb-4 mx-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 p-2 border text-black border-gray-300 rounded-lg"
              />
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Section Dropdown */}
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="mb-4 p-2 border text-black border-gray-300 rounded-lg"
            >
              <option value="">Select</option>
              <option value="Room">Room</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Reception">Reception</option>
              <option value="Bathroom">Bathroom</option>
              <option value="Dining">Dining</option>
            </select>
          </div>

          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
  <thead>
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Section Name</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Device Name</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Description</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Remark</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Image After Repair</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Updated At</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
    {filteredIssues.map((issue) => (
      <tr key={issue._id}>
        <td className="px-6 py-4 max-w-xs break-words">{issue.sectionName || "N/A"}</td>
        <td className="px-6 py-4 max-w-xs break-words">{issue.deviceName || "N/A"}</td>
        <td className="px-6 py-4 max-w-xs break-words">{issue.description || "N/A"}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              issue.status === "Resolved"
                ? "bg-green-100 text-green-800"
                : issue.status === "Rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {issue.status || "N/A"}
          </span>
        </td>
        <td className="px-6 py-4 max-w-xs break-words">
          {issue.remark || "No Remarks"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {issue.status !== "Resolved" ? (
            <>
              <input
                type="file"
                onChange={handleFileChange}
                className="p-2 w-1/2 text-white rounded-lg"
              />
              <button
                onClick={() => handleUpload(issue._id)}
                className="mt-2 bg-blue-700 text-white p-2 rounded-lg"
              >
                Upload
              </button>
            </>
          ) : (
            "Issue is resolved"
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {issue.updatedAt ? new Date(issue.updatedAt).toLocaleDateString() : "N/A"}
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>

      </div>
    </div>
    </div>
  );
};

export default Dashboard;

