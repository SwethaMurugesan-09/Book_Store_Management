import React, { useEffect, useState } from 'react'
import image from '../assets/homeimg.webp'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchBooks = async() =>{
      try{
        const response = await fetch("http://localhost:5000/api/book/getbook");
        if(!response.ok)
        {
            throw new Error("failed to fetch books");
        }
        const data = await response.json();
        if (data.book) {
          setBooks(data.book);
        }
        else{
          setBooks([]);
        }
      }
      catch(err)
      {
        setError(err.message);
      }
    };
    fetchBooks();
  },[]);


  useEffect(()=>{
     const fetchGenre = async()=>{
          try{
              const response = await fetch("http://localhost:5000/api/book/genre");
              if(!response.ok)
              {
                throw new Error("Can't fetch from API");
              }
              const data = await response.json();
              if(data.genre)
              {
                  setGenre(data.genre);
              }
              else{
                setGenre([]);
              }
          }catch(err)
          {
            setError(err.message);
          }
     };
     fetchGenre();
  },[])



  return (
  <div className='shadow px-2 py-0.5'>
    <div className="relative w-full h-[400px]">
      <img className="w-full h-full object-cover blur-[1px]"
        src={image} alt="Books"/>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/30">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 py-3">
          A book is a dream you hold in your hands
        </h1>
        <div className="flex w-full max-w-md bg-white">
          <input
            className="px-4 flex-grow p-2 outline-none text-black"
            type="text"
            placeholder="Search your books"
          />
          <button className="cursor-pointer px-6 bg-gray-600 text-white font-semibold hover:bg-gray-700">
            Search
          </button>
        </div>
      </div>
      <h1 className='text-2xl px-25 py-10 text-blue-950'>TRENDING BOOKS</h1>
      <div className='px-15 grid grid-cols-5 gap-6 items-center '>
       {error && <p className="text-red-500">{error}</p>}
          {books.length === 0 && !error && <p>No books found.</p>}
          {books.map((book) => (
            <div key={book._id} className='px-10'>
              <img className='w-50 h-50' src={book.image}/>
              <h2>{book.title}</h2>
              <h4>{book.genre.join(" & ")}</h4>
              <button onClick={()=>navigate(`/${book._id}`)}className='cursor-pointer px-6 py-1 rounded bg-gray-600 text-white hover:bg-gray-700'>view</button>
            </div>
          ))}
      </div>

      <div>
        <h1 className='text-2xl px-25 py-15 text-blue-950'>BROWSE GENRES</h1>
        <div className='px-15 grid grid-cols-5 gap-6  items-center'>
          { genre.length > 0 ? (
            genre.map((genre, index)=>(
              <span className='px-10' key ={index} >
                <img className='w-50 h-50' src={genre.image}/>
                <p className=''>{genre._id}</p>
              </span>
            ))
          ):(
              <p>No genre found</p>
          )}
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default Home
