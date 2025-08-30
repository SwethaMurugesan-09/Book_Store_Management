import React from 'react'
import image from '../../assets/image1.jpg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

const Navbar = () => {

    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
  return (
    <div className='shadow px-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <div className='flex justify-between items-center'>
          <img className=" py-2 w-17 h-20" src={image} />
          <p className='px-3 cursor-pointer' onClick={() => navigate("/")}>Classic Reads</p>
        </div>
        <div className='flex justify-between items-center'>
          <button className='px-2 cursor-pointer' onClick={()=> navigate("/wishlist")}>Wishlist</button>
          <h1>|</h1>
          {isAuthenticated ? (
            <button
              className='px-2 cursor-pointer'
              onClick={logout}
            >
              Logout
            </button>
          ) : (
          <button className='px-2 cursor-pointer' onClick={()=> navigate("/login")}>login</button>
          )}
        </div>
      </div>
    </div>
  ) 
}

export default Navbar