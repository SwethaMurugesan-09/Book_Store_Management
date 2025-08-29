import React from 'react'
import image from '../../assets/image1.jpg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();
  
  return (
    <div className='shadow px-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <div className='flex justify-between items-center'>
          <img className=" py-2 w-17 h-20" src={image} />
          <p className='px-3 cursor-pointer'>Classic Reads</p>
        </div>
        <div className='flex justify-between items-center'>
          <button className='px-2 cursor-pointer'>Wishlist</button>
          <h1>|</h1>
          <button className='px-2 cursor-pointer' onClick={()=> navigate("/login")}>login</button>
        </div>
      </div>
    </div>
  ) 
}

export default Navbar