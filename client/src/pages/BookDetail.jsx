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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md text-center shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md text-center shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Not Found</h2>
          <p className="text-gray-600">Book not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-600 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-light text-white mb-6 tracking-tight">
            {book.title}
          </h1>
          
          <div className="max-w-sm">
            <input 
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors duration-200"
              type="text" 
              value={searchQuery}  
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books..."
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              
              <div className="lg:col-span-2">
                <div className="sticky top-8">
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-64 h-80 object-cover mx-auto rounded-lg border border-gray-200 shadow-sm"
                  />
                  
                  <div className="mt-8 space-y-3 max-w-64 mx-auto">
                    {book.uploadBook && !pdfError && (
                      <a 
                        href={book.uploadBook} 
                        download={`${book.title}.pdf`} 
                        className="block text-center bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                      >
                        Download PDF
                      </a>
                    )}
                    
                    {pdfError && (
                      <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-center text-sm">
                        PDF not accessible
                      </div>
                    )}
                    
                    <button 
                      onClick={handleAddToWishlist} 
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="space-y-8">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-l-4 border-gray-600 pl-4">
                      <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Author</dt>
                      <dd className="mt-1 text-xl text-gray-900">{book.author}</dd>
                    </div>
                    
                    <div className="border-l-4 border-gray-600 pl-4">
                      <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Genre</dt>
                      <dd className="mt-1 text-xl text-gray-900">{book.genre}</dd>
                    </div>
                    
                    <div className="border-l-4 border-gray-600 pl-4">
                      <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Published Year</dt>
                      <dd className="mt-1 text-xl text-gray-900">{book.publishedYear}</dd>
                    </div>
                    
                    <div className="border-l-4 border-gray-600 pl-4">
                      <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Rating</dt>
                      <dd className="mt-1 text-xl text-gray-900">{book.rating}</dd>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {book.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredBooks.length > 0 && (
          <section className="mt-16">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-8 md:p-12">
                <h2 className="text-xl font-medium text-gray-900 mb-8">
                  More books by {book.author}
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredBooks.map((b) => (
                    <div 
                      key={b._id} 
                      className="group cursor-pointer"
                      onClick={() => navigate(`/book/${b._id}`)}
                    >
                      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                        <img 
                          src={b.image} 
                          alt={b.title} 
                          className="w-full h-48 object-cover rounded border border-gray-100 mb-4"
                        />
                        <h3 className="font-medium text-gray-900 text-base mb-2 line-clamp-2 flex-1">
                          {b.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                          {b.publishedYear}
                        </p>
                        <div className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                          View Details →
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BookDetail;