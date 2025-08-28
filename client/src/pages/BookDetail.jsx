import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BookDetail = () => {

    const {id} = useParams();

    const [book, setBooks] =useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchBook = async ()=>{
            try{
                const response = await fetch(`http://localhost:5000/api/book/getBookById/${id}`);
                if(!response.ok)
                {
                    throw new Error("Can't fetch from API");
                }
                const data = await response.json();
                if(data.book){
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
        }
        fetchBook();
    },[id])

    
  useEffect(()=>{
       const fetchGenre = async()=>{
            try{
                const response = await fetch("http://localhost:5000/api/book/author");
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
    <div>
        <div className='flex flex-cols gap-6'>
            <h1>{book.title}</h1>
            <div>
                <img src={book.image}/>
                <div>{book.bookType}</div>
            </div>
            <div>
                <h2>Author: {book.author}</h2>
                <h2>Genre: {book.genre}</h2>
                <h2>Published_Year: {book.publishedYear}</h2>
                <h2>Rating: {book.rating} </h2>
                <div>Description: {book.description} </div>
            </div>
        </div>

        {/* Book by authors */}
        <div>
            <h1>Browse By Authors</h1>
        </div>
    </div>
  )
}

export default BookDetail