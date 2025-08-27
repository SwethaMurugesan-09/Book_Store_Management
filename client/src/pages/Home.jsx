import React from 'react'
import image from '../assets/homeimg.webp'

const Home = () => {
  return (
  <div>
    <div className="relative w-full h-[400px]">
      <img className="w-full h-full object-cover blur-[1px]"
        src={image} alt="Books"/>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/30">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
          A book is a dream you hold in your hands
        </h1>
        <div className="flex w-full max-w-md bg-white rounded overflow-hidden shadow">
          <input
            className="flex-grow p-2 outline-none text-black"
            type="text"
            placeholder="Search your books"
          />
          <button className="px-4 bg-blue-600 text-white font-semibold hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default Home
