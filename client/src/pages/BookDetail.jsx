import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const BookDetail = () => {
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const [book, setBook] = useState(null);  
    const [error, setError] = useState(null);
    const [authorBooks, setAuthorBooks] = useState([]);
    const [numPages, setNumPages] = useState(null);
    const [pdfError, setPdfError] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const response = await fetch(backendUrl + `/api/book/getBookById/${id}`);
                if (!response.ok) {
                    throw new Error("Can't fetch from API");
                }
                const data = await response.json();
                if (data.book) {
                    setBook(data.book);
                } else {
                    setBook(null);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    useEffect(() => {
        const fetchAuthorBook = async () => {
            if (!book?.author) return;
            try {
                const response = await fetch(backendUrl + `/api/book/author/${encodeURIComponent(book.author)}`);
                if (!response.ok) {
                    throw new Error("Can't fetch books by Author");
                }
                const data = await response.json();
                if (data.books) {
                    setAuthorBooks(data.books.filter((b) => b._id !== id));
                } else {
                    setAuthorBooks([]);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchAuthorBook();
    }, [book, id]);

    const checkPdfAccess = async () => {
        try {
            const response = await fetch(book.uploadBook, { method: 'HEAD' });
            if (!response.ok) {
                setPdfError(true);
                console.error('PDF not accessible:', response.status);
            }
        } catch (error) {
            setPdfError(true);
            console.error('PDF access error:', error);
        }
    };

    useEffect(() => {
        if (book?.uploadBook) {
            checkPdfAccess();
        }
    }, [book]);

    if (loading) return <div className="p-4">Loading book details...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
    if (!book) return <div className="p-4">Book not found</div>;

    return (
        <div>
            <div className='flex flex-cols gap-6'>
                <h1>{book.title}</h1>
                <div>
                    <img src={book.image} alt={book.title} />
                    <div>
                        <h2>{book.bookType}:</h2>

                        {book.uploadBook ? (
                            <div className="">
                                {pdfError ? (
                                    <div>
                                        <p className="text-red-500 mb-4">PDF file is not accessible</p>
                                        <p className="">URL: {book.uploadBook}</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div>
                                            <a
                                                href={book.uploadBook}
                                                download={`${book.title}.pdf`}>Download PDF
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
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
                    {authorBooks.map((b) => (
                        <div key={b._id}>
                            <img src={b.image} alt={b.title} />
                            <h2>Genre: {b.genre}</h2>
                            <button onClick={() => navigate(`/book/${b._id}`)}>view</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BookDetail
