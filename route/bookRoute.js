import express from 'express'
const Router = express.Router()


import isUserLoggedIn from '../middleware/userLoggedIn.js'
import { getAllBooks, getBookById, createBook, addReview } from '../controller/bookController.js'

/**
 * API to create new book
 * request body - genre, title, content
 */
Router.post('/', isUserLoggedIn, createBook)

/**
 * API to get all books, implemented pagination also and user can search by genre and author
 */
Router.get('/', getAllBooks)

/**
 * API to get a book by id and book's all reviews.
 * request params - id
 */
Router.get('/:id', getBookById)

/**
 * API to add reviews and rating to the book
 * request params - id (id of book)
 * request body - review and rating.
 */
Router.post('/:id/reviews', isUserLoggedIn, addReview)


export default Router;