import Books from "../models/Books.js";
import {v2 as cloudinary} from 'cloudinary';

export const addBook = async(req,res) =>{
    const {title, author, genre, description, publishedYear, rating} =req.body;
    const image = req.file

    if(!title || !author || !genre || !publishedYear || !image){
        return res.json({success: false, message: "Missing details"})
    }
    try{
        const imageUpload = await cloudinary.uploader.upload(image.path)
        const newBook = new Books({
            title,
            author,
            genre,
            description,
            publishedYear,
            image: imageUpload.secure_url,
            rating
        })
        await newBook.save()
        res.json({success:true, newBook})
    }catch(error)
    {
        res.json({success:false, message:error.message})
    }
};

export const getBook = async(req,res)=>{
    try{
        const book = await Books.find();
        res.json({success:true , book})
    }catch(error)
    {
        res.json({success: false, message: error.message});
    }
};

export const getBookById = async(req,res) => {
    try{
        const {id}= req.params;
        const book = await Books.findById(id);
        if(!book)
        {
            return res.status(400).json({success:false, message:"Book not found"});
        }
        res.json({success:true, book});
    }
    catch(error)
    {
        res.josn({success:false, message: error.message})
    }
};

export const updateBook = async(req,res) => {
    try{
        const {id} =req.params;
        const {title, author, genre, description, publishedYear, rating} = req.body;
        const book = await Books.findById(id);
        if(!book)
        {
            return res.status(400).json({success:false, message: "Book not found"});
        }

        book.name = title || book.title;
        book.author = author || book.author;
        book.genre = genre || book.genre;
        book.description = description || book.description;
        book.publishedYear = publishedYear || book.publishedYear;

        await book.save();
        res.json({success:true, book});
    }
    catch(error)
    {
        res.status(500).json({success:false, message: error.message});
    }
};