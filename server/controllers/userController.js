import Users from "../models/Users.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async(req,res)=>{
    try{
        const {name,email,password,number} = req.body;

        const existingUser = await Users.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: 'User already exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser =  new Users({
            name,
            email,
            password: hashedPassword,
            number,
        })

        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    }
    catch(error){
        res.status(500).json({message:'Internal server error'});
    }
};

export const loginUser = async(req,res) =>{
    try{
        const {email,password}=req.body;
        const user = await Users.findOne({email});
        if(!user)
        {
            return res.status(400).json({message:'Invalid email'});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({message:'Invalid password'});
        }

        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: '12h'});
        res.status(200).json({message:'Login Successful',token,user});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
}


export const getProfile = async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findById(decoded.userId)
      .select("-password")
      .populate("wishList");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


export const wishList = async(req,res) =>{
    try{
        const {userId, bookId} = req.body;
        const user = await Users.findById(userId);
        if(!user){
            return res.status(400).json({ message: 'User not found'});
        }
        if(!user.wishList.includes(bookId))
        {
            user.wishList.push(bookId);
            await user.save();
            await user.save();
            return res.status(200).json({ message: "Book added to wishList", wishList: user.wishList });
        }

        return res.status(200).json({ message: "Book already in wishList", wishList: user.wishList });
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
}

export const removeFavourite = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishList = user.wishList.filter((id) => id.toString() !== bookId);
    await user.save();

    res.status(200).json({ message: "Book removed from wishlist", wishList: user.wishList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};