import React, { useEffect, useState } from 'react'

const Signup = () => {

    const [signup, setSignup] = useState(null);
    
    useEffect(()=>{
        const fetchBooks = async() =>{
          try{
            const response = await fetch("http://localhost:5000/api/user/register");
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

  return (
    <div></div>
  )
}

export default Signup