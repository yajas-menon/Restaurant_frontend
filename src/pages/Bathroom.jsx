import React from 'react'
import bathroom from '../assets/bathroom-image.jpg'
import Navbar from '../components/Navbar'

const Bathroom = () => {
  return (
    <div>
    <Navbar/>
<div className="flex">
    <img src={bathroom} aria-hidden alt='vendor image' className="w-1/2 h-screen object-cover" />

    <div className="min-h-screen w-1/2 flex items-center justify-center bg-white">
      <div className="bg-white border border-slate-800 p-8 rounded-lg shadow-lg w-3/4 max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-zinc-900">Bathroom issues</h2>
        <p className="text-center text-zinc-600 mb-6 mt-2">
          . Fill out the issues related to kitchen.
        </p>
        <form >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="mb-4">
              <label htmlFor="vendorName" className="block text-zinc-700">Type of fault?</label>
              <input
                type="text"
                id="vendorName"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-zinc-700">Device Name</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              
                />
            </div>
            <div className="mb-4">
              <label htmlFor="company-name" className="block text-zinc-700">Device Code </label>
              <input
                type="text"
                id="companyName"
                placeholder="Enter your Device code"
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                
                />
            </div>
            <div className="mb-4">
              <label htmlFor="industry" className="block text-zinc-700">Description</label>
              <input
                type="text"
                id="companyName"
                placeholder="explain the issue"
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                
                />
            </div>
            <div className="mb-4">
              <label htmlFor="industry" className="block text-zinc-700">Photo of issue</label>
              <input
                type="file"
                id="companyName"
                placeholder="explain the issue"
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                accept='imgage/*'
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

export default Bathroom