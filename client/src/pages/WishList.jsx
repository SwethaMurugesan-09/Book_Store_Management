import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import emptycart from '../assets/emptycart.png';
const WishList = () => {
  const { userId, isAuthenticated } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isAuthenticated) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/api/user/profile`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setWishlist(data.user.wishList || []);
        } else {
          toast.error(data.message || "Failed to load wishlist");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching wishlist");
      }
      setLoading(false);
    };
    fetchWishlist();
  }, [isAuthenticated, backendUrl]);

  const handleRemove = async (bookId) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/wishlist/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ userId, bookId }),
      });

      const data = await response.json();
      if (response.ok) {
        setWishlist((prev) => prev.filter((item) => item._id !== bookId));
        toast.error(data?.message || "Book removed from wishlist!");
      } else {
        toast.error(data?.message || "Failed to remove book");
      }
    } catch (error) {
      toast.error("Error removing book");
      console.error(error);
    }
  };

  if (loading) return <div>Loading wishlist...</div>;

  return (
    <div className="p-6">
      {wishlist.length === 0 ? (
        <div>
        <p className="text-4xl font-medium text-center pt-10 text-blue-950">No books in wishlist</p>
        <img className='mx-auto w-180 h-110' src={emptycart} />
        </div>
      ) : (
        <div>
          <h1 className='text-3xl font-medium text-center pb-10 text-blue-950'>Your Cart</h1>
        <div className="grid grid-cols-4 gap-6 pb-5">
          {wishlist.map((item) => (
            <div key={item._id} className="p-4 w-75 rounded-lg shadow-sm">
              <img src={item.image} alt={item.title} className="w-65 h-55 object-cover mb-4 rounded" />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.author}</p>
              <div className="mt-4 flex justify-between">
                <div className="px-4 py-1 bg-gray-600 cursor-pointer text-white rounded hover:bg-gray-700"
                  onClick={() => window.location.href = `/book/${item._id}`}>
                  view
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                className="text-gray-800 text-xl font-bold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
