import jwt from 'jsonwebtoken'

export default function isUserLoggedIn(req,res,next) {
    // throw error in case user tries to access without login.
    if(!req.cookies.token) {
        return res.status(400).json({error: 'Please Login to Continue'})
    }
    // verify token
    const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN
    let isJWTValid;
    try {
        // check if JWT is valid and not expire.
        isJWTValid = jwt.verify(req.cookies.token, JWT_SECRET_TOKEN)
        req.userId = isJWTValid.userId
        return next()
        
    } catch (error) {
        if(!isJWTValid) {
            return res.status(400).json({error: 'Invalid Token, Please Login again to continue'})
        }
    }


}