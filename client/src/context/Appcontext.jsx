import React from 'react'
import {toast} from "react-toastify";
import axios from "axios";

export const AppContext =createContext()

export const AppContextProvider = (props) =>{

  const backendUrl =import.meta.env.VITE_BACKEND_URL;

  const value ={
    books, setBooks
  }
  return(<AppContext.Provider value={value}>
    {props.children}
  </AppContext.Provider>)

}