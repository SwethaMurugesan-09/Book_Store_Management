import express from 'express';
import upload from '../config/multer.js'
import {addBook, getBook, getBookByAuthor, getBookByGenre, getBookById, getBookByYear, updateBook} from '../controllers/bookController.js';

const router = express.Router()

router.post('/add-books',upload.fields([{name: 'image', maxCount: 1},{name: 'uploadBook', maxCount:1},]),addBook);
router.get('/getbook',getBook);
router.get('/getBookById/:id',getBookById);
router.put('/updateBook/:id',updateBook);
router.get('/genre',getBookByGenre);
router.get('/author/:author',getBookByAuthor);
router.get('/year',getBookByYear);

export default router;