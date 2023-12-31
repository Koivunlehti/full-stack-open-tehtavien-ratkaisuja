const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const username = request.body.username
    const password = request.body.password
  
    const user = await User.findOne({ username })
    if (!user) {
        return response.status(401).json({error: 'invalid username or password'})
    }

    const passwordCheck = await bcrypt.compare(password, user.password)
    if (passwordCheck === false) {
        return response.status(401).json({error: 'invalid username or password'})
    }
  
    const tokenUser = {
        username: user.username,
        id: user._id,
    }
  
    const token = jwt.sign(tokenUser, process.env.JWT_SECRET)
  
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})
  
module.exports = loginRouter