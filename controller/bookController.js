import userModel from '../model/userModel.js'
import bookModel from '../model/bookModel.js'
import reviewModel from '../model/reviewModel.js'

//Method to get all books, to search book by author and genre, fetch data on the basis of pagination.
const getAllBooks = async(req,res) => {
    try {
        const query = req.query;
        let findQuery = {}
        // pagination code
        const page = query?.page ? query.page : 1
        const limit = query?.limit ? query.limit : 2
        const skip = (page - 1) * 2;
        // code to fetch documents on the basis of author and genre.
        if(query.author) {
            findQuery['author'] = query.author
        }
        if (query.genre) {
            findQuery['genre'] = query.genre
        }
        console.log(findQuery)
        const books = await bookModel.find(findQuery).skip(skip).limit(limit)
        return res.status(200).json({books})
    } catch (error) {
        console.log('Error while getting books', error)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

//Method to get a book by id.
const getBookById = async(req,res) => {
    try {
        const bookData = await bookModel.findById(req.params.id).populate('reviewIds')
        return res.status(200).json({dat: bookData})
    } catch (error) {
        console.log('Error in get by id API', error)
        return res.status(400).json({error: 'Internal Server Error'})
    }
}

// Method to create book
const createBook = async(req,res) => {
    try {

        const { genre, title, content } = req.body
        const userData = await userModel.findById(req.userId)

        const bookCreated = await bookModel.create({
            author: userData.name,
            genre,
            title,
            content,
            createdBy: req.userId
        })

        // add newly created book id to associated user document.
        const updateQuery = {
            $push: {
                bookIds: bookCreated._id
            }
        }

        await userModel.updateOne({_id: req.userId}, updateQuery)
        res.status(200).json({msg: 'book creaetd', data: bookCreated})
    } catch (error) {
        console.log('error while createing cook', error)
        res.status(500).json({ error: 'Internal Server error'})
    }
}

//Method to add review on book.
const addReview = async(req,res) => {
    
    try {
        // Check that user hadn't added any review before
        const didUserAddedReviewBefore  = await reviewModel.findOne({userId: req.userId})
        if(didUserAddedReviewBefore) {
            return res.status(400).json({error: 'You can add review only once'})
        }
    
        // create review
        const { rating, review } = req.body
        const reviewCreated = await reviewModel.create({
            rating,
            review,
            userId: req.userId,
            bookId: req.params.id
        })
    
        // add reviewId to associated user and book collection's document.
    
        const updateQuery = {
            $push: {
                reviewIds: reviewCreated._id
            }
        }
    
        await userModel.updateOne({_id: req.userId}, updateQuery)
        await bookModel.updateOne({_id: req.params.id}, updateQuery)
    
        return res.status(200).json({msg: 'Review created successfully'})
        
    } catch (error) {
        console.log("Error in create review API", error)
        return res.status(500).json({error: 'Internal Server Error'})
    }

}

export {
    getAllBooks,
    getBookById,
    createBook,
    addReview
}