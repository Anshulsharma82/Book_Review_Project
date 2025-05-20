import reviewModel from '../model/reviewModel.js'
import userModel from '../model/userModel.js'
import bookModel from '../model/bookModel.js'

// Method to update review.
const updateReview = async (req, res) => {
    try {
        // user can update their reviews only, In case they try to update someone else's review throw error.
        const reviewData = await reviewModel.find({ userId: req.userId, _id: req.params.id })
        if (reviewData.length === 0 || reviewData === undefined) {
            return res.status(400).json({ error: 'You can update your review only' })
        }
        const { review } = req.body;
        if(!review) {
            return res.status(400).json({error: 'review is required field'})
        }
        await reviewModel.updateOne({ _id: req.params.id }, { review })
        return res.status(200).json({ msg: 'Review updated successfully' })
    } catch (error) {
        console.log('Error while updating review', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

// Method to delete review.
const deleteReview = async (req, res) => {
    try {
        // user can delete their reviews only, In case they try to delete someone else's review throw error.
        const reviewData = await reviewModel.find({ userId: req.userId, _id: req.params.id })
        if (reviewData.length === 0 || reviewData === undefined) {
            return res.status(400).json({ error: 'You can update your review only' })
        }

        // delete review from review collection 
        await reviewModel.findByIdAndDelete(req.params.id)

        const updateQuery = {
            $pull: {
                reviewIds: req.params.id
            }
        }
        const findQuery = {
            reviewIds: req.params.id
        }

        // pull _id of deleted review document from associate collections.
        await userModel.updateOne(findQuery, updateQuery)
        await bookModel.updateOne(findQuery, updateQuery)

        return res.status(200).json({ msg: 'Review deleted Successfully' })
    } catch (error) {
        console.log("Error while deleting review", error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export {
    updateReview,
    deleteReview
}