const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs')
const emailValidator = require('email-validator')

const addUser = async (req, res) => {
    
    try{
        const {name, username, email, password, confirmPassword} = req.body;
        // If any field is empty
        if(!name || !username || !email || !password || !confirmPassword){
            throw new Error('Please fill all the fields')
        }

        // If password is less than 6 characters
        if(password.length < 6){
            throw new Error('Password must be atleast 6 characters long')
        }

        // If password and confirmPassword do not match
        if(password !== confirmPassword){
            throw new Error('Passwords do not match')
        }

        // If email is not valid 
        if(!emailValidator.validate(email)){
            throw new Error('Please enter a valid email')
        }

        // If user already exists with same Email
        let emailExists = await User.findOne({email})
        if(emailExists){
            throw new Error('User already exists with this email')
        }

        // If user already exists with same Username
        let usernameExists = await User.findOne({username})
        if(usernameExists){
            throw new Error('User already exists with this username')
        }

        // Hashing the password
        const hashedPass = await bcrypt.hash(password, 8);

        // If everything is fine
        const user = await User.create({
            name,
            username,
            email,
            password: hashedPass
        })

        if(user){
            console.log('User created');
        }
        res.status(201).json({
            success: true,
            user
        })

    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const getUser = async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);

    try {

        // If any field is missing
        if(!email || !password){
            throw new Error('Please fill all the fields')
        }

       
        let user = await User.findOne({email}).select('+password') || null
        console.log(user);
        // verify user
        let verifiedPass = await bcrypt.compare(password, user.password) || false

        // If user does not exist
        if(user===null){
            throw new Error('User does not exist')
        }

        // If password is wrong
        if( !verifiedPass){
            throw new Error('Wrong password')
        }

        user.password = undefined

        // Injecting JWT token
        const token = user.jwtToken()

        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000,  // 24 hours
            httpOnly: true
        }

        res.cookie('token', token, cookieOptions)

        if (user !== null){
            console.log('User logged in');
        }
        res.status(200).json({
            success: true,
            user
        })
        
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const userDetails = async (req, res) => {
    try{
        const userId = req.user.id
        console.log(userId);
        const user = await User.findById({_id:userId})
        res.status(200).json({
            success: true,
            data:{
                name: user.name,
                username: user.username,
                email: user.email
            }
        })
    }catch(error){
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const delUser = async (req, res) => {
    const userId = req.user.id 

    try {
        const deletedUser = await User.findByIdAndDelete({_id:userId})
        console.log(deletedUser);
        res.status(200).json({
            success: true,
            deletedUser
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const updateUser = async (req, res) => {
    const userId = req.user.id
    console.log(userId);
    const {name, password} = req.body
    try{
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true, runValidators: true})
        res.status(200).json({
            success: true,
            updatedUser
        })
    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json({
            success: true,
            users
        })
    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const logOut = async (req, res) => {
    try {

        console.log(req.cookies.token);

        const cookieOptions = {
            expires: new Date(), 
            httpOnly: true
        }

        res.cookie("token", null, cookieOptions)
        
        res.status(200).json({
            success: true, 
            message: "User logged out successfully !"
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// exports.signOut = (req, res) =>{
//     try {

//       const cookieOption = {
//         expires: new Date(),
//         httpOnly: true
//       }
//       res.cookie("token", null, cookieOption)
//       res.status(200).json({
//         success: true,
//         message: "User Logged Out Successfully"
//       })

//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: error.message
//       })
//     }
// }

module.exports = {
    addUser,
    getUser,
    delUser,
    updateUser,
    getAllUsers,
    userDetails,
    logOut
}