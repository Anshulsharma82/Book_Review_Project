import bookModel from '../model/bookModel.js'

// Method to search books by author or title
const searchMethod = async(req,res) => {
    try {
        const { title, author } = req.query
        const findQuery = {}
        // If title and author both are missing throw error
        if(!title && !author) {
            return res.status(400).json({error: 'Invalid Request, Please provide either title or author'})
        }
        // using $regex and $options for partial and case insensitive search
        if(title) {
            findQuery['title'] =  { $regex: title, $options: 'i' }
        }
        if(author) {
            findQuery['author'] =  { $regex: author, $options: 'i' }
        }
        console.log(findQuery)
        const bookData = await bookModel.find(findQuery)
        return res.status(200).json({msg: bookData})
        
    } catch (error) {
        console.log('Error in search API', error)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

export {
    searchMethod
}