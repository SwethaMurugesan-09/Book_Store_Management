import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-950 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-950 mb-2">Welcome Back</h2>
            <p className="text-blue-700">Sign in to your account to continue</p>
          </div>

          <div className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
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
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
{/* 
              <div className="flex justify-end">
                <button type="button" className="text-sm text-blue-950 hover:text-blue-800 font-medium transition-colors duration-200">
                  Forgot password?
                </button>
              </div> */}
              <button 
                type='submit' 
                className='w-full bg-gradient-to-r from-blue-900 to-blue-950 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:from-blue-800 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg'
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="mx-4 text-sm text-gray-500 font-medium">or</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-blue-800 text-sm">Don't have an account? </span>
              <button 
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-950 hover:text-blue-800 font-semibold text-sm transition-colors duration-200 hover:underline"
              >
                Create one here
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-xs text-blue-700">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login