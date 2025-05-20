import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

import userRoute from './route/userRoute.js'
import bookRoute from './route/bookRoute.js'
import reviewRoute from './route/reviewRoute.js'
import searchRoute from './route/searchRoute.js'
import cookieParser from 'cookie-parser'
import dbConnect from './database-connection.js'
import invalidRoute from './middleware/invalidRoute.js'
import handleError from './middleware/handleError.js'

const PORT = process.env.PORTS || 3000

app.use(express.json())  // to parse JSON request body
app.use(cookieParser()) // to send jwt token to APIs request for verifying.
app.use('/', userRoute)
app.use('/books', bookRoute)
app.use('/review', reviewRoute)
app.use('/search', searchRoute)

app.use(invalidRoute)  // to handle invalid routes
app.use(handleError) // to handle unknown errors.

app.listen(PORT, async() => {
    console.log(`Server is running on PORT ${PORT}`)
    await dbConnect()
})