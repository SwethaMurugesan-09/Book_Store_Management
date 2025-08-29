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