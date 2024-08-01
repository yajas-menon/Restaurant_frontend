import React, { useState } from 'react'
import Navbar from '../components/Navbar'
// import reception from '../assets/reception-image.jpg'
import api from '../utils/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reception = () => {
  const [formData, setFormData] = useState({
    faultType: '',
    deviceName: '',
    deviceCode: '',
    description: '',
    issuePhoto: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, issuePhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('faultType', formData.faultType);
    data.append('deviceName', formData.deviceName);
    data.append('deviceCode', formData.deviceCode);
    data.append('description', formData.description);
    data.append('issuePhoto', formData.issuePhoto);

    try {
      const response = await api.post('/api/auth/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success("Issue Submitted Successfully")
    } catch (error) {
      console.error('Error submitting issue:', error);
    }
  };
  return (
    <div>
        <Navbar/>
    <div className="flex">
        {/* <img src={reception} aria-hidden alt='vendor image' className="w-1/2 h-screen object-cover" /> */}

        <div className="min-h-screen w-1/2 flex items-center justify-center bg-white">
          <div className="bg-white border border-slate-800 p-8 rounded-lg shadow-lg w-3/4 max-w-2xl">
            <h2 className="text-4xl font-bold text-center text-zinc-900">Reception Issues</h2>
            <p className="text-center text-zinc-600 mb-6 mt-2">
              . Fill out the issues related to kitchen.
            </p>
            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="mb-4">
                <label htmlFor="faultType" className="block text-zinc-700">Type of fault?</label>
                <input
                  type="text"
                  name="faultType"
                  placeholder="Enter the type of fault"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.faultType}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="deviceName" className="block text-zinc-700">Device Name</label>
                <input
                  type="text"
                  name="deviceName"
                  placeholder="Enter the device name"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.deviceName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="deviceCode" className="block text-zinc-700">Device Code</label>
                <input
                  type="text"
                  name="deviceCode"
                  placeholder="Enter the device code"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.deviceCode}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-zinc-700">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Explain the issue"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="issuePhoto" className="block text-zinc-700">Photo of issue</label>
                <input
                  type="file"
                  name="issuePhoto"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="w-44 bg-black text-white text-primary-foreground py-2 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary">
                Submit
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
                    </div>
  )
}

export default Reception