import React, { useEffect, useState } from 'react'
import image from '../assets/homeimg.webp'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const backendUrl =import.meta.env.VITE_BACKEND_URL
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState([]);

  const [searchQuery, setSearchQuery] = useState(""); 

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchBooks = async() =>{
      try{
        const response = await fetch(backendUrl + "/api/book/getbook");
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
              const response = await fetch(backendUrl + "/api/book/genres");
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

 const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    const title = String(book.title || "").toLowerCase();
    const author = String(book.author || "").toLowerCase();
    const year = String(book.publishedYear || "");
    const genres = Array.isArray(book.genre)
      ? book.genre.map((g) => g.toLowerCase())
      : [];

    return (
      title.includes(query) ||
      year.includes(query) ||
      author.includes(query) ||
      genres.some((g) => g.includes(query))
    );
  });


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
            type="text" value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search book by title or genre or author or year"
          />
          <button className="cursor-pointer px-6 bg-gray-600 text-white font-semibold hover:bg-gray-700">
            Search
          </button>
        </div>
      </div>
      <h1 className='text-2xl px-25 pt-10 pb-10 font-semibold text-blue-950'>TRENDING BOOKS</h1>
      <div className='px-15 grid grid-cols-5 gap-6 items-center'>
       {error && <p className="text-red-500">{error}</p>}
          {filteredBooks.length === 0 && !error && <p>No books found.</p>}
          {filteredBooks.slice(1,11).map((book) => (
            <div key={book._id} className='px-10'>
              <img className='w-50 h-50 pb-3' src={book.image}/>
              <h2 className='text-center pb-1'>Title: {book.title}</h2>
              <h2 className='text-center pb-3'>Author: {book.author}</h2>
              <button onClick={()=>navigate(`/book/${book._id}`)}className='cursor-pointer align-center px-6 py-1 block mx-auto rounded bg-gray-600 text-white hover:bg-gray-700'>view</button>
            </div>
          ))}
      </div>

      <div>
        <h1 className='text-2xl font-semibold px-25 text-blue-950 pt-10'>BROWSE GENRES</h1>
        <div className='px-15 grid grid-cols-5 gap-6  items-center'>
          { genre.length > 0 ? (
            genre.map((genre, index)=>(
              <span className='px-10 py-10' key ={index} onClick={() => navigate(`/genre/${genre._id}`)}>
                <img className='w-50 h-50 cursor-pointer' src={genre.image}/>
                <p className='text-center text-lg'>{genre._id}</p>
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
