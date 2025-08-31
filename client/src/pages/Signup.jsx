import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(backendUrl + '/api/user/register', {
        method: 'POST',
         headers: { 
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
          name: username,
          email,
          password,
          number,
        }),
      });
       const data = await response.json();
      if (response.ok) {
        alert('User registered successfully!');
        console.log("Registered user:", data);
         navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-950 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-950 mb-2">Create Account</h2>
            <p className="text-blue-700">Join us today and get started</p>
          </div>
          <div className="px-8 pb-8">
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-blue-950 mb-2'>
                  Email Address
                </label>
                <div className="relative">
                  <input 
                    type='email' 
                    placeholder='Enter your email' 
                    id='email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3  rounded-lg transition-colors duration-200 placeholder-gray-400"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor='name' className='block text-sm font-medium text-blue-950 mb-2'>
                  Full Name
                </label>
                <div className="relative">
                  <input 
                    type='text' 
                    placeholder='Enter your full name' 
                    id='name' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3  rounded-lg transition-colors duration-200 placeholder-gray-400"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-blue-950 mb-2'>
                  Password
                </label>
                <div className="relative">
                  <input 
                    type='password' 
                    placeholder='Enter your password' 
                    id='password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3  rounded-lg transition-colors duration-200 placeholder-gray-400"
                    required
                    minLength={6}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-1 text-xs text-blue-600">Password must be at least 6 characters long</p>
              </div>

              <div>
                <label htmlFor='number' className='block text-sm font-medium text-blue-950 mb-2'>
                  Phone Number
                </label>
                <div className="relative">
                  <input 
                    type='text' 
                    placeholder='Enter your phone number' 
                    id='number' 
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full px-4 py-3  rounded-lg transition-colors duration-200 placeholder-gray-400"
                    required
                    pattern='^\d{10}$'
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-1 text-xs text-blue-600">Enter 10-digit phone number</p>
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="text-sm text-blue-800">
                  I agree to the{' '}
                  <button type="button" className="text-blue-950 hover:text-blue-800 font-semibold underline">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-blue-950 hover:text-blue-800 font-semibold underline">
                    Privacy Policy
                  </button>
                </label>
              </div>

              <button 
                type="submit"
                className='w-full bg-gradient-to-r from-blue-900 to-blue-950 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:from-blue-800 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg'
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="mx-4 text-sm text-gray-500 font-medium">or</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-blue-800 text-sm">Already have an account? </span>
              <button 
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-950 hover:text-blue-800 font-semibold text-sm transition-colors duration-200 hover:underline"
              >
                Sign in here
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-blue-700">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup