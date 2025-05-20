import mongoose from "mongoose";
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    reviewIds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'review'
        }
    ], // ids of all the reviews associated with the book.
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    } // id of user who created the book.
}, {
    timestamps: true
})

const model = mongoose.model('book', schema)

export default model;