import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";

const BookDetail = () => {
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { userId, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [pdfError, setPdfError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/api/book/getBookById/${id}`);
        if (!res.ok) throw new Error("Can't fetch book");
        const data = await res.json();
        setBook(data.book || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchAuthorBooks = async () => {
      if (!book?.author) return;
      try {
        const res = await fetch(`${backendUrl}/api/book/author/${encodeURIComponent(book.author)}`);
        if (!res.ok) throw new Error("Can't fetch author's books");
        const data = await res.json();
        setAuthorBooks(data.books.filter((b) => b._id !== id));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAuthorBooks();
  }, [book, id]);

  useEffect(() => {
    const checkPdfAccess = async () => {
      if (!book?.uploadBook) return;
      try {
        const res = await fetch(book.uploadBook, { method: 'HEAD' });
        if (!res.ok) setPdfError(true);
      } catch {
        setPdfError(true);
      }
    };
    checkPdfAccess();
  }, [book]);

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/user/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ userId, bookId: book._id }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to add to wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

    const filteredBooks = authorBooks.filter((b) => {
      const query = searchQuery.toLowerCase();
      const title = String(b.title || "").toLowerCase();
      const year = String(b.publishedYear || "").toLowerCase();

      return title.includes(query) || year.includes(query);
    });


  if (loading) return <div className="p-4">Loading book...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!book) return <div className="p-4">Book not found</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <input className="px-4 flex-grow p-2 outline-none text-black"
        type="text" value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search book by title or genre or author or year"/>
      <div className="flex flex-cols gap-6">
        <div>
          <img src={book.image} alt={book.title} />
          {book.uploadBook && !pdfError && (
            <a href={book.uploadBook} download={`${book.title}.pdf`} className="block mt-2 text-blue-600">
              Download PDF
            </a>
          )}
          {pdfError && <p className="text-red-500">PDF not accessible</p>}
          <button onClick={handleAddToWishlist} className="bg-blue-600 text-white px-4 py-2 mt-3 rounded">
            Add to Wishlist
          </button>
        </div>
        <div>
          <h2>Author: {book.author}</h2>
          <h2>Genre: {book.genre}</h2>
          <h2>Published Year: {book.publishedYear}</h2>
          <h2>Rating: {book.rating}</h2>
          <p>{book.description}</p>
        </div>
      </div>

      {/* Author books */}
      <div className="mt-6">
        <h1>More books by {book.author}</h1>
        <div>
          {filteredBooks.map((b) => (
            <div key={b._id}>
              <img src={b.image} alt={b.title} />
              <p>{b.title} ({b.publishedYear})</p>
              <button onClick={() => navigate(`/book/${b._id}`)}>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
