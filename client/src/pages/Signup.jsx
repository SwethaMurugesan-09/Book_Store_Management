import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  
  const backendUrl =import.meta.env.VITE_BACKEND_URL
  
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
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  return (
    <div>
        <div>
          <form onSubmit={handleSignup}>
               <div>
                <label htmlFor='email' className=''>Email: </label>
                <input type='email' placeholder='Enter you email' id='email' value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
               <div>
                <label htmlFor='text' className=''>Username: </label>
                <input type='text' placeholder='Enter you name' id='name' value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <label htmlFor='password' className=''>Password:</label>
                <input type='password' placeholder='Enter your password' id= 'password' value = {password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <label htmlFor='number' className=''>Phone Number:</label>
                <input type='text' placeholder='Enter your number' id= 'number' value = {number}
                  onChange={(e) => setNumber(e.target.value)} />
              </div>
              <button onClick={() =>handleSignup()}>Register</button>
              <div>Already have an account?<span className='cursor-pointer' onClick={()=>navigate("/login")}>Login</span></div>
          </form>
        </div>
    </div>
  )
}

export default Signup