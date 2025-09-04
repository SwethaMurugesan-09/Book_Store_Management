import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import BookDetail from './pages/BookDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import WishList from './pages/WishList'
import BookByGenre from './pages/BookByGenre'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from './components/Chat/Chat'
import Join from './components/Join/Join'

function App() {

  return (
    <>
      <Navbar/>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/book/:id" element={<BookDetail/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path= '/register' element={<Signup/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
        <Route path="/genre/:genre" element={<BookByGenre/>} />
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/join' element={<Join/>}/>
      </Routes>
    </>
  )
}

export default App
