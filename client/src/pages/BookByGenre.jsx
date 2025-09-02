import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookByGenre = () => {
  const { genre } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/book/genre/${genre}`);
        if (!response.ok) throw new Error("Failed to fetch books for this genre");
        const data = await response.json();
        setBooks(data.books || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBooks();
  }, [genre, backendUrl]);

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.genre.some((g) => g.toLowerCase().includes(query))
    );
  });

  return (
    <div className="book-by-genre p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Books in "{genre}" Genre
      </h1>

      <div className="flex justify-center mb-8">
        <input
          className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-gray-600"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search book by title or genre"
        />
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}
      {filteredBooks.length === 0 && !error && (
        <p className="text-center text-gray-600">No books found for this genre.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white flex flex-col"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-3">{book.genre.join(", ")}</p>
            
            <div className="mt-auto">
              <button
                onClick={() => navigate(`/book/${book._id}`)}
                className="cursor-pointer w-full py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookByGenre;
