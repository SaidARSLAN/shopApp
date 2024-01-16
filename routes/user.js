const express = require('express')
const { User } = require('../models/user')

const user = express.Router()

user.get("/", (request,response) => {

    const user = new User({
        id : request.body.id,
        username : request.body.username,
        password : request.body.password,
        isActive : request.body.isActive
    })
    try {
        await 
    }
    catch (err) {
        console.log(err)
    }
})