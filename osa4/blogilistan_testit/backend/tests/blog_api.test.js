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

test('id-field of returned blog is named id', async () => {
    const response = await api
    .get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('adding new blogs', async () => {
    const newBlog = {
        title: 'Test Blog 3',    
        author: "Tester 3",
        url: "test3",
        likes: 10
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)   

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length + 1)

    expect(response.body[2].title).toContain("Test Blog 3")
    expect(response.body[2].author).toContain("Tester 3")
    expect(response.body[2].url).toContain("test3")
    expect(response.body[2].likes).toEqual(10)
})

test('adding new blog without likes gives likes a value of 0', async () => {
    const newBlog = {
        title: 'Test Blog 4',    
        author: "Tester 4",
        url: "test4",
    }

    await api
    .post('/api/blogs')
    .send(newBlog)

    const response = await api.get('/api/blogs')
    
    expect(response.body[2].likes).toEqual(0)
}) 

afterAll(async () => {
    await mongoose.connection.close()
})