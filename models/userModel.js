const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'User must have a name']
    },
    username:{
        type: String,
        required: [true, 'User must have a username'],
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: [true, 'User must have an email'],
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true, 'User must have a password'],
        select: false,
        minLength: [6, 'Password must be atleast 6 characters long']
    }
},  {
    timestamps: true,
}
)

userSchema.methods = {
    jwtToken(){
        return JWT.sign({id: this._id}, process.env.SECRET, {expiresIn: '24h'})
    }
}

userSchema.pre('save', async function(next){
   if(!this.isModified('password')){
       next();
   }else{
         this.password = await bcrypt.hash(this.password, 8);
         next();
   }
})

const User = mongoose.model('User', userSchema);

module.exports = User;