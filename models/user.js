const mongoose = require('mongoose')


const userSchema = mongoose.Schema({

    id : Number,
    username : String,
    password : String,
    isActive : Boolean
})


const User = userSchema.model("User",userSchema)

module.exports = {User}