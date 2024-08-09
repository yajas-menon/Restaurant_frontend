import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import GraphComponent1 from '../components/GraphComponent1'


const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('bulbs');
  const [metrics, setMetrics] = useState({
    issueFixed: {
      bulbs: 12,
      wifi: 10,
      acs: 15,
      taps: 8,
    },
    openIssues: {
      bulbs: 2,
      wifi: 1,
      acs: 4,
      taps: 3,
    },
    rejectedIssues: {
      bulbs: 1,
      wifi: 0,
      acs: 3,
      taps: 4,
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
        console.log(response)
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
        <h1 className="text-5xl mb-4 text-left mx-8 font-medium font-serif">Dashboard</h1>
          <hr className='mx-8'/>
        <div className="flex justify-end mb-4 mt-8">
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

          <select
            className="bg-gray-800 text-white p-2 rounded-lg mx-2"
            value={selectedMetric}
            onChange={handleChange}
          >
            <option value="bulbs">Kitchen</option>
            <option value="wifi">Bathroom</option>
            <option value="acs">Reception</option>
            <option value="taps">Room</option>
            <option value="taps">Dining</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl text-white mb-4">Issues Fixed</h2>
            <p className="text-4xl text-white">{metrics.issueFixed[selectedMetric]}</p>
            
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl text-white mb-4">Open Issues</h2>
            <p className="text-4xl text-white">{metrics.openIssues[selectedMetric]}</p>
            
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl text-white mb-4">Rejected Issues</h2>
            <p className="text-4xl text-white">{metrics.rejectedIssues[selectedMetric]}</p>
            
          </div>

          

        </div>
        <div className="mb-6 mt-6">
            <GraphComponent1 />
          </div>
          
      </div>
    </div>
  );
};

export default Dashboard;
