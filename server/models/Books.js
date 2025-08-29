import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    author:{
        type: [String],
        required:true,
    },
    genre: {
        type: [String],
        required: true,
    },
    description:{
        type:String,
    },
    publishedYear: {
        type: Number,
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
    },
    image:{
        type:String,
        required: true,
    },
    bookType:{
        type: String,
        required: true,
    },
    uploadBook:{
        type:String,
        required: true,
    },
},{
    timestamps:true,
});

const Books = mongoose.model('Books',bookSchema);
export default Books;