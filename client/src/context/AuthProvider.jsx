import React, { createContext, useContext, useEffect, useState } from 'react'
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => { 

  const backendUrl =import.meta.env.VITE_BACKEND_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [email, setEmail] = useState(''); 
  const [userId, setUserId] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoadingAuth(false);
  }, []);


const login = async (email, password) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("auth-token", data.token);
        setIsAuthenticated(true);
        setEmail(data.user.email);
        setUserId(data.user._id);
        toast.success("Login successful!");
        navigate("/"); 
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };


  const logout = () => {
    localStorage.removeItem('auth-token');
    setEmail('');
    setUserId('');
    setIsAuthenticated(false);
    navigate('/');
  };
return(
    <AuthContext.Provider value={{ isAuthenticated, isLoadingAuth, email, userId, login, logout }}>
    {children}
    </AuthContext.Provider>
);
}