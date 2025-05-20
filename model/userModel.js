import mongoose from "mongoose";
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',],
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        minLength: 8
    },
    reviewIds: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'review'
            }
    ], // review ids to keep track of reviews user has added.
    bookIds: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'book'
            }
    ] // book ids to keep track of books user has created.
}, {
    timestamps: true
})

const model = mongoose.model('user', schema)

export default model;