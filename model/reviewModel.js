import mongoose from "mongoose";

const schema = mongoose.Schema({

    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: 'book'
    }, // bookId to associate book with the review.
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    } // userId to associate user with his review.
}, {
    timestamps: true
})

const model = mongoose.model('review', schema)

export default model;