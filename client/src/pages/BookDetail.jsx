import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const BookDetail = () => {

    const {id} = useParams();
    const backendUrl =import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate();
    const [book, setBooks] =useState([]);
    const [error, setError] = useState(null);
    const [authorBooks, setAuthorBooks] = useState([]);

    useEffect(()=>{
        const fetchBook = async ()=>{
            try{
                const response = await fetch(backendUrl + `/api/book/getBookById/${id}`);
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
       const fetchAuthorBook = async()=>{      
        if (!book?.author) return;
            try{
                const response = await fetch(backendUrl + `/api/book/author/${encodeURIComponent(book.author)}`);
                if(!response.ok)
                {
                  throw new Error("Can't fetch books by Author");
                }
                const data = await response.json();
                if(data.books)
                {
                    setAuthorBooks(data.books.filter((b) => b._id!==id));
                }
                else{
                  setAuthorBooks([]);
                }
            }catch(err)
            {
              setError(err.message);
            }
       };
       fetchAuthorBook();
    },[book, id]);
  


  return (
    <div>
        <div className='flex flex-cols gap-6'>
            <h1>{book.title}</h1>
            <div>
                <img src={book.image}/>
                <div>{book.bookType}</div>
                <button>Add to WishList</button>
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
            <h1>More books by {book.author}</h1>
            <div>
                {authorBooks.map((b)=>(
                    <div>
                        <img src={b.image}/>
                        <h2>Genre: {b.genre}</h2>
                        <button onClick={()=>navigate(`/book/${b._id}`)}>view</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BookDetail