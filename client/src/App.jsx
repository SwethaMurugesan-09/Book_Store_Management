import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import BookDetail from './pages/BookDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import WishList from './pages/WishList'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/book/:id" element={<BookDetail/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path= '/register' element={<Signup/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
      </Routes>
    </>
  )
}

export default App
