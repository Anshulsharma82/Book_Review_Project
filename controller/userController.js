import Joi from 'joi'
import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Method to create new user
const signup = async(req,res) => {
    try {
        // validate request body
        try {
             const validateRequestResponse = validateSignupRequest(req.body)
             if(validateRequestResponse.error) {
                return res.status(400).json({ error: validateRequestResponse.error.details[0].message})
             }
        } catch (error) {
            console.log('Error while validating request', error)
            return res.status(400).json({ error: 'Invalid Request'})
        }
        const { name, username, email, phoneNumber, password} = req.body;
        //Check if username is unique, if not return error
        const doesUsernameExist = await userModel.findOne({username})
        if(doesUsernameExist) {
            return res.status(400).json({error: 'Username is in use, Please try with different username'})
        }
        //Check if email is unique, if not return error
        const doesEmailExist = await userModel.findOne({email})
        if(doesEmailExist) {
            return res.status(400).json({error: 'Email is in use, Please try with different email'})
        }
        
        // Encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(password,salt)
        // DB call to make user account.
        await userModel.create({
            name,
            username,
            email,
            phoneNumber,
            password: hashedPwd
        })
        return res.status(201).json({msg: 'Account Created Successfully'})

    } catch (err) {
        console.log('Error in signup API', err)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

// Method to check user credentials.
const login = async(req,res) => {
    try {
        // Validate request.
        try {
            const validateRequestResponse =validateLoginRequest(req.body)            
            if(validateLoginRequest.error) {
                return res.status(400).json({error: validateRequestResponse.error.details[0].message})
            }
        } catch (error) {
            console.log('Error while validating request in Login API', error)
            return res.status(400).json({ error: 'Invalid Request'})
        }
        // Check if username is correct.
        const {username, password} = req.body
        const userData = await userModel.findOne({username})
        if(!userData) {
            return res.status(400).json({error: 'Either Username or Password incorrect'})
        }
        // Check if password is correct.
        const isPwdCorrect = await bcrypt.compare(password, userData.password)
        if(!isPwdCorrect) {
            return res.status(400).json({error: 'Either Username or Password incorrect'})
        }
        // Create JWT and send user's _id and username with the JWT.
        const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN
        const token = await jwt.sign({ username, userId: userData._id}, JWT_SECRET_TOKEN, {expiresIn: '30m'})
        // Create cookie to send JWT to validate authenticate APIs.
        res.cookie('token', token)
        return res.status(200).json({msg: 'Login successfull'})
    } catch (error) {
        console.log('Error in login API', error)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

const validateSignupRequest =  (requestBody) => {
    const validateSchema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.number().required(),
        password: Joi.string().min(8).required()
    })

    return validateSchema.validate(requestBody)
}

const validateLoginRequest = (requestBody) => {
    const validateSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    return validateSchema.validate(requestBody)
}

export {
    signup,
    login
}