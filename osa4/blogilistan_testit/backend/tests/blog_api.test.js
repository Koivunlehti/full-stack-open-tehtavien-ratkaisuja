const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")

const api = supertest(app)

const initialBlogs = [
    {    
        title: 'Test Blog 1',    
        author: "Tester 1",
        url: "test1",
        likes: 5
    },  
    {    
        title: 'Test Blog 2',    
        author: "Tester 2",
        url: "test2",
        likes: 7
    }
]

beforeEach( async () => {  
    await Blog.deleteMany({})  
    await Blog.insertMany(initialBlogs)
})

test('correct ammount of blogs is returned as json', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
    await mongoose.connection.close()
})