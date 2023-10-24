const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs')
const emailValidator = require('email-validator')

const home = (req, res) => {
    res.send('Hello World!')
}

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
    const {email, username, password} = req.body;
    let user = null

    try {
        // If any field is missing
        if((!username && !email) || !password){
            throw new Error('Please fill all the fields')
        }

        if(!username && email){
            // If user exists with this email
            user = await User.findOne({email}).select('+password') || null
        }else if(!email && username){
            user = await User.findOne({username}).select('+password') || null
        }else{
            throw new Error('Please enter either username or email')
        }

        // If user does not exist
        if(user===null){
            throw new Error('User does not exist')
        }

        // If password is wrong
        if( !bcrypt.compare(password, user.password)){
            throw new Error('Wrong password')
        }

        user.password = undefined

        res.status(200).json({
            success: true,
            user
        })
        
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const delUser = async (req, res) => {
    const {email, username, password} = req.body;
    let user = null

    try {
        // If any field is missing
        if((!username && !email) || !password){
            throw new Error('Please fill all the fields')
        }

        if(!username && email){
            // If user exists with this email
            user = await User.findOne({email}).select('+password') || null
        }else if(!email && username){
            user = await User.findOne({username}).select('+password') || null
        }else{
            throw new Error('Please enter either username or email')
        }

        // If user does not exist
        if(user===null){
            throw new Error('User does not exist')
        }

        // If password is wrong
        if( password !== user.password){
            throw new Error('Wrong password')
        }
        user.password = undefined

        // If everything is fine


        if(await User.findOneAndDelete({email}) || await User.findOneAndDelete({username})){
            console.log('User deleted successfully');
        }else{
            throw new Error('User does not exist')
        }


        res.status(200).json({
            success: true,
            deleteCount: 1
        })
        
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }

}

const updateUser = async (req, res) => {
    const {email, username, password} = req.body;
    let user = null

    try {
        // If any field is missing
        if((!username && !email) || !password){
            throw new Error('Please fill all the fields')
        }

        if(!username && email){
            // If user exists with this email
            user = await User.findOne({email}).select('+password') || null
        }else if(!email && username){
            user = await User.findOne({username}).select('+password') || null
        }else{
            throw new Error('Please enter either username or email')
        }

        // If user does not exist
        if(user===null){
            throw new Error('User does not exist')
        }

        // If password is wrong
        if( password !== user.password){
            throw new Error('Wrong password')
        }
        user.password = undefined

        
        // If everything is fine
        const userId = user["_id"]
        const newUser = await User.findByIdAndUpdate(userId, {name: "updatedName", email: "updateduser@gmail.com"}, {new: true, runValidators: true})

        res.status(200).json({
            success: true,
            newUser
        })


    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        
        })
    }
}

module.exports = {
    home,
    addUser,
    getUser,
    delUser,
    updateUser
}