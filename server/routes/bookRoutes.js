import express from 'express';
import upload from '../config/multer.js'
import {addBook, getBook, getBookById, updateBook} from '../controllers/bookController.js';

const router = express.Router()

router.post('/add-books',upload.single('image'),addBook);
router.get('/getbook',getBook);
router.get('/getBookById/:id',getBookById);
router.put('/updateBook/:id',updateBook);

export default router;