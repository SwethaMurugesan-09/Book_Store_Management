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
    <div>
        <div>
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor='email' className=''>Email: </label>
                <input type='email' placeholder='Enter you email' id='email' value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label htmlFor='password' className=''>Password:</label>
                <input type='password' placeholder='Enter your password' id= 'password' value = {password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type='submit' className=''>Login</button>
              <div>Don't have an account?<span className='cursor-pointer' onClick={()=>navigate("/register")}>Register</span></div>
            </form>
        </div>
    </div>
  )
}

export default Login