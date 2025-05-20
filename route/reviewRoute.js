import express from 'express'
const Router = express.Router()
import { updateReview, deleteReview } from '../controller/reviewController.js';

import isUserLoggedIn from '../middleware/userLoggedIn.js';

/**
 * API to update review
 * request body - review
 * request params - id (_id of review collection)
 * 
 */
Router.put('/:id', isUserLoggedIn, updateReview)

/**
 * API to delete review
 * request params - id (_id of review collection)
 */
Router.delete('/:id', isUserLoggedIn, deleteReview)

export default Router;