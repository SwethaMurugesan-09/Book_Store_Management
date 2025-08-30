import Books from "../models/Books.js";
import {v2 as cloudinary} from 'cloudinary';

export const addBook = async(req,res) =>{
    const {title, author, genre, description, publishedYear, rating, bookType} =req.body;
    const image = req.files?.image?.[0];
    const uploadBook = req.files?.uploadBook[0];
    if(!title || !author || !genre || !publishedYear || !image || !uploadBook){
        return res.json({success: false, message: "Missing details"})
    }
    try{

        const bookUpload = await cloudinary.uploader.upload(uploadBook.path,{
            resource_type: "raw",
        })
        const imageUpload = await cloudinary.uploader.upload(image.path)
        const newBook = new Books({
            title,
            author,
            genre,
            description,
            publishedYear,
            image: imageUpload.secure_url,
            rating,
            bookType,
            uploadBook: bookUpload.secure_url,
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

export const getBookByGenre = async (req,res)=>{
    try{
            const {genre} = req.params;
            const books = await Books.find({ genre: genre });
            res.json({success: true, books});
    }
    catch(error)
    {
        res.status(500).json({success:false, message:error.message});
    }
};


export const getAllGenres = async (req, res) => {
  try{
        const bookGenre = await Books.aggregate([{
            $group: {
                _id:"$genre",
                image: {$first: "$image"}
            }
        }
        ]);
        res.json({success:true, genre: bookGenre});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getBookByAuthor = async(req,res) =>{
    try{
            const {author} = req.params;
            const books = await Books.find({author: { $regex: new RegExp(author, "i")}
        });
            res.json({success: true, books});
    }
    catch(error)
    {
        res.status(500).json({success: false,message: error.message});
    }
};


export const getBookByYear = async(req,res) =>{
    try{
        const getbookbyYear = await Books.aggregate([{
            $group:{
                _id:"$publishedYear",
            }
        }])
        res.json({success:true, message: getBookByYear});
    }
    catch(error)
    {
        res.status(500).json({success: false, message: error.message});
    }
};