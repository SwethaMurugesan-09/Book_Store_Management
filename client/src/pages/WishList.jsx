import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";

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
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error removing book");
      console.error(error);
    }
  };

  if (loading) return <div>Loading wishlist...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No books in wishlist</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="p-4 border rounded-lg shadow">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover mb-4 rounded" />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.author}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => window.location.href = `/book/${item._id}`}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View
                </button>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
