const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs",{id:1, title:1, author:1, url:1})
    
    response.json(users)
})

usersRouter.post("/", async (request, response) => {
    const username = request.body.username
    const name = request.body.name
    let password = request.body.password
    if (!password)
        return response.status(400).json({error:"password is required."})
    if (password.length < 3)
        return response.status(400).json({error:"password is too short."})

    password = await bcrypt.hash(request.body.password, 10)

    const user = new User({
        username,
        name,
        password,
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        if (error.name === 'ValidationError') {
            if (error.errors.username) {
                return response.status(400).json({ error: error.errors.username.properties.message })
            }
            return response.status(400).json({ error: error.message })  
        }
        else {
            return response.status(400).json({error:"user cannot be created."})
        }
    }
})

module.exports = usersRouter