import { useState } from "react";
import React from 'react'
import api from '../utils/api'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };

      const handleRegister = async () => {
        try {
          setLoading(true)
          const res = await api.post('/api/auth/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          });
    
          localStorage.setItem('token', res.data.token);
          setMode("login");
          setLoading(false)
          toast.success("Registration successful. Please login")
          
          
          // Redirect or update the UI to indicate the user is registered and logged in
        } catch (err) {
          setLoading(false)
          console.error(err);
          toast.error("Error during registration. Please try again.");
        }
      };
    const handleLogin = async () => {
      try {
        setLoading(true)
        const res = await api.post('/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
  
        localStorage.setItem('token', res.data.token);
        
        console.log(res.data.user.role)
        // toast.success("Login successful");
        const role = res.data.user.role;
          login(role);
          setLoading(false)
          if(role === "User"){
            navigate("/dashboard");
            toast.success("Login sucessful as User")
          }else if (role === "Admin"){
            navigate("/admindashboard")
            toast.success("Login sucessful as Admin")
          }

        // Redirect or update the UI to indicate the user is logged in
      } catch (err) {
        setLoading(false)
        toast.error("Invalid email or password")
        console.error(err);
      }
    };
    
  return (
    <div>
      <Loader isLoading={loading}/>
      <div className="flex min-h-screen">
        <div className="flex flex-1 items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
            {mode === 'login' ? (
              <>
                <h1 className="mb-4 text-xl font-semibold text-left text-black">Welcome Back,</h1>
                <h2 className="mb-4 text-3xl font-bold text-left text-black">Login!</h2>
                <p className="mb-6 text-left text-sm text-black font-semibold">
                  New user?{' '}
                  <a href="#" className="text-red-500 underline" onClick={() => setMode('register')}>
                    Create an account
                  </a>
                </p>
                <form>
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="example@example.com"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="************"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="ml-2 text-gray-700">Remember this device</span>
                    </label>
                    <a href="#" className="text-sm text-red-500 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 mb-4 text-white bg-dark-green rounded-full hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-black"
                    onClick={handleLogin}
                  >
                    Sign In
                  </button>
                </form>
                <p className="text-center text-xs text-gray-600 mt-4">Terms and Conditions | Privacy Policy</p>
              </>
            ) : (
              <>
                <h1 className="mb-4 text-xl font-semibold text-left text-black">Welcome,</h1>
                <h2 className="mb-4 text-3xl font-bold text-left text-black">Sign Up!</h2>
                <p className="mb-6 text-left text-sm text-black font-semibold">
                  Already have an account?{' '}
                  <a href="#" className="text-red-500 underline" onClick={() => setMode('login')}>
                    Login here
                  </a>
                </p>
                <form>
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="name">
                      Username
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="example@example.com"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="************"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="role">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      placeholder="User or Admin"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 mb-4 text-white bg-dark-green rounded-full hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    onClick={handleRegister}
                  >
                    Sign Up
                  </button>
                </form>
                <p className="text-center text-xs text-gray-600 mt-4">Terms and Conditions | Privacy Policy</p>
              </>
            )}
          </div>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center bg-blue-700 hover:bg-blue-800 text-white p-10">
          <div>
            <div className="flex items-center mb-6">
              <h1 className="text-2xl font-bold">InnuxAI</h1>
            </div>
            <h2 className="text-4xl font-bold mb-6">Your AI Partner for Contract and Vendor Service Management</h2>
            <p className="text-lg">Streamline your workflows and enhance productivity with our AI-powered solutions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login