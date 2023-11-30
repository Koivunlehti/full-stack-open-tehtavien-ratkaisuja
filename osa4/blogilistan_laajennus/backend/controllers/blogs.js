const blogsRouter = require('express').Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.url) {
        return response.status(400).end()
    }

    const newBlog = {
        title: request.body.title,    
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes ? request.body.likes : 0
    }

    const blog = new Blog(newBlog)
    
    const result = await blog.save()
    
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

module.exports = blogsRouter