const handleError = (err,req,res,next) => {
    return res.status(500).json({error: 'Unknown error has occured'})
}

export default handleError;