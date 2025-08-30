import express from 'express';
import { getProfile, loginUser,registerUser, removeFavourite, wishList } from '../controllers/userController.js';

const router = express.Router();
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/wishlist', wishList);
router.post('/wishlist/remove',removeFavourite);
router.get("/profile", getProfile);

export default router;