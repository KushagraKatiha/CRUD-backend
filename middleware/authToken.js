const JWT = require('jsonwebtoken')

const authToken = (req, res, next) => {
    // verify token
    const token = req.cookies.token || null
    try{
        if(!token){
            throw new Error('Please login to continue')
        }

        const decoded = JWT.verify(token, process.env.SECRET)

        // Inject user info

    req.user = {
        id: decoded.id
    }

    next()
    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}


module.exports = authToken;