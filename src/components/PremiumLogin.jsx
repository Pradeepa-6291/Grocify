import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function PremiumLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    pincode: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (isLogin) {
        // Login existing user
        console.log('Attempting login with:', { email: formData.email });
        response = await api.loginUser({
          email: formData.email,
          password: formData.password
        });
        console.log('Login response:', response);
      } else {
        // Register new user
        console.log('Attempting registration with:', { email: formData.email, firstName: formData.firstName });
        response = await api.registerUser({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          pincode: formData.pincode
        });
        console.log('Registration response:', response);
      }
      
      if (response && response.token) {
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('token', response.token);
        alert(isLogin ? 'Login successful!' : 'Registration successful!');
        navigate('/');
      } else {
        alert('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert(error.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-indigo-500 to-violet-600 flex items-center justify-center py-16 px-8 relative overflow-hidden">
      {/* Background Blur Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Hero Text */}
        <div className="text-center mb-8">
          <h1 className="text-white font-semibold text-3xl mb-2">Welcome Back to GrociFy</h1>
          <p className="text-purple-100 text-lg">Login to continue shopping fresh groceries</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <Link to="/" className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors">
              ← Back to Home
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Enter your credentials to access your account' : 'Join the GrociFy family today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                      required={!isLogin}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                    required={!isLogin}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Your address"
                    rows="2"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 resize-none"
                    required={!isLogin}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                    required={!isLogin}
                  />
                </div>
              </>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                  Forgot Password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-grocify-purple to-grocify-blue hover:from-grocify-blue hover:to-grocify-teal text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-grocify-purple/50 animate-pulse hover:animate-none"
            >
              {isLogin ? '🔐 Sign In' : '🎉 Create Account'}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-violet-600 hover:text-violet-700 font-semibold"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 rounded-xl border-2 border-grocify-orange bg-gradient-to-r from-white to-grocify-yellow/10 text-sm font-bold text-grocify-orange hover:from-grocify-orange hover:to-grocify-yellow hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                🔍 Google
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 rounded-xl border-2 border-grocify-blue bg-gradient-to-r from-white to-grocify-blue/10 text-sm font-bold text-grocify-blue hover:from-grocify-blue hover:to-grocify-teal hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                📘 Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}