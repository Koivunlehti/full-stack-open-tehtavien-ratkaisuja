const blogsRouter = require('express').Router()
const Blog = require("../models/blog")
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {id:1, username:1, name:1})
    
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.url) {
        return response.status(400).end()
    }

    const user = await User.findOne()

    const newBlog = {
        title: request.body.title,    
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes ? request.body.likes : 0,
        user: user._id
    }

    const blog = new Blog(newBlog)
    
    const result = await blog.save()
    
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        return response.status(400).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = {
        title: request.body.title,    
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes ? request.body.likes : 0
    }
    
    try {
        const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
        
        response.json(blog)

    } catch (error) {
        return response.status(400).end()
    }
})

module.exports = blogsRouter