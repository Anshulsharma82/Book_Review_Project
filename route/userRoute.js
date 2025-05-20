import express from 'express'
const Router = express.Router()
import { signup, login } from '../controller/userController.js';

/**
 * API to register new user
 * request body - name, username, email, phoneNumber, password
 */
Router.post('/signup', signup)

/**
 * API to authenticate user and allow user to login
 * request body - username, password
 */
Router.post('/login', login)

export default Router;