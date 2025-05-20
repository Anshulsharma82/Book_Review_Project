import express from 'express'
const Router = express.Router()
import { searchMethod } from '../controller/searchController.js'

/**
 * API to search books by author and title
 * request query - Should have atleast author or title
 */
Router.get('/', searchMethod)

export default Router;