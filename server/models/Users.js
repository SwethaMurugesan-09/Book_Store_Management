import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    number:{
        type:String,
        required:true,
        match:[/^\d{10}$/,'Invalid phone number'],
    },
    email:{
        type:String,
        required: true,
        match: [/^\S+@\S+\.\S+$/,'Invalid email format'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password is invalid'],
    },
}, {
        timestamps:true,
    });

const Users = mongoose.model('Users',userSchema);

export default Users;