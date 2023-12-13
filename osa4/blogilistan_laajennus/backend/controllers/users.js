const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get("/", async (request, response) => {
    const users = await User.find({})
    
    response.json(users)
})

usersRouter.post("/", async (request, response) => {
    const username = request.body.username
    const name = request.body.name
    const password = await bcrypt.hash(request.body.password, 10)

    const user = new User({
        username,
        name,
        password,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter