import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const BookByGenre = () => {
  const { genre } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/book/genre/${genre}`);
        if (!response.ok) {
          throw new Error("Failed to fetch books for this genre");
        }
        const data = await response.json();
        setBooks(data.books || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBooks();
  }, [genre, backendUrl]);

  return (
    <div className="p-6">
      <h1 className=''>
        Books in "{genre}" Genre
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      {books.length === 0 && !error && <p>No books found for this genre.</p>}
      
      <div className="grid grid-cols-5 gap-6">
        {books.map((book) => (
          <div key={book._id} className="p-4 border rounded-lg shadow hover:shadow-lg">
            <img 
              src={book.image} 
              alt={book.title} 
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.genre.join(", ")}</p>
            <button 
              onClick={() => navigate(`/book/${book._id}`)} 
              className="mt-2 px-4 py-1 rounded bg-gray-600 text-white hover:bg-gray-700"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookByGenre;
