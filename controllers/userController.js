const User = require('../models/userModel.js');

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

        // If password and confirmPassword do not match
        if(password !== confirmPassword){
            throw new Error('Passwords do not match')
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

        // If everything is fine
        const user = await User.create({
            name,
            username,
            email,
            password
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

module.exports = {
    home,
    addUser
}