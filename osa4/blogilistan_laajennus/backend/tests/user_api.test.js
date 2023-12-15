const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require("../models/user")

const api = supertest(app)

const initialUsers = [
    {    
        username: "im_user_1",    
        name: "Tester",
        password: "Q2werty"
    },  
]

beforeEach( async () => {  
    await User.deleteMany({})  
    await User.insertMany(initialUsers)
})

test("new user is created and returned as json", async () => {
    const newUser = {
        username: "TestUser",    
        name: "Something",
        password: "Q2werty",
    }

    response = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    

    expect(response.body.username).toContain(newUser.username)
    expect(response.body.name).toContain(newUser.name)
})

test("username has to be longer than 3 characters", async () => {
    const newUser = {
        username: "Te",    
        name: "Something",
        password: "Q2werty",
    }

    response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual({error:"username is too short."})
})

test("password has to be longer than 3 characters", async () => {
    const newUser = {
        username: "TestUser",    
        name: "Something",
        password: "Q2",
    }

    response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual({error:"password is too short."})
})

test("cannot add user without username", async () => {
    const newUser = {    
        name: "Something",
        password: "Q2werty",
    }

    response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual({error: "username is required."})
})

test("cannot add user without password", async () => {
    const newUser = {
        username: "TestUser", 
        name: "Something",
    }

    response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual({error:"password is required."})
})

test("username has to be unique", async () => {
    const newUser = {
        username: "im_user_1",    
        name: "Something",
        password: "Q2werty",
    }

    response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual({error:"username has to be unique."})
})

afterAll(async () => {
    await mongoose.connection.close()
})