import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('bulbs');
  const [metrics, setMetrics] = useState({
    issueFixed: {
      bulbs: 0,
      wifi: 0,
      acs: 0,
      taps: 0,
    },
    openIssues: {
      bulbs: 0,
      wifi: 0,
      acs: 0,
      taps: 0,
    },
    rejectedIssues: {
      bulbs: 0,
      wifi: 0,
      acs: 0,
      taps: 0,
    },
    pendingIssues: {
      bulbs: 0,
      wifi: 0,
      acs: 0,
      taps: 0,
    },
  });
  const [sectionMetrics, setSectionMetrics] = useState({});

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get('/api/auth/metrics');
        setMetrics(response.data.metrics);

        const sectionResponse = await api.get('/api/auth/section-metrics');
        setSectionMetrics(sectionResponse.data.metrics);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  const handleChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-16 bg-gray-900 text-white p-8">
        <h1 className="text-4xl mb-8 text-center">Restaurant Issues Dashboard</h1>
        
        <div className="flex justify-end mb-4">
          <select 
            className="bg-gray-800 text-white p-2 rounded-lg"
            value={selectedMetric}
            onChange={handleChange}
          >
            <option value="bulbs">Bulbs</option>
            <option value="wifi">wifi</option>
            <option value="acs">ACs</option>
            <option value="taps">Taps</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl text-white mb-4">Issues Fixed</h2>
            <p className="text-4xl text-white">{metrics.issueFixed[selectedMetric]}</p>
            <p className="text-sm text-white">+{Math.floor(Math.random() * 100)}% from last month</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl text-white mb-4">Open Issues</h2>
            <p className="text-4xl text-white">{metrics.openIssues[selectedMetric]}</p>
            <p className="text-sm text-white">+{Math.floor(Math.random() * 100)}% from last month</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl text-white mb-4">Rejected Issues</h2>
            <p className="text-4xl text-white">{metrics.rejectedIssues[selectedMetric]}</p>
            <p className="text-sm text-white">+{Math.floor(Math.random() * 100)}% from last month</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl text-white mb-4">Pending Approval</h2>
            <p className="text-4xl text-white">{metrics.pendingIssues[selectedMetric]}</p>
            <p className="text-sm text-white">+{Math.floor(Math.random() * 100)}% from last month</p>
          </div>
          {Object.entries(sectionMetrics).map(([section, count]) => (
            <div key={section} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-2xl text-white mb-4 capitalize">{section}</h2>
              <p className="text-4xl text-white">{count}</p>
              <p className="text-sm text-white">Total Issues</p>
            </div>
          ))}
        
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
