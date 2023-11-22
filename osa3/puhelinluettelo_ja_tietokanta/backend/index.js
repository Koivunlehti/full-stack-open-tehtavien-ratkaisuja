require("dotenv").config()
const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person")

// Middlewaret

server.use(cors());

server.use(express.json());

server.use(morgan(function (tokens, req, res) {
    const body = req.body
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), 
      '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(body)
    ].join(' ');
  }));

// Numerot
let numbers = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

// Osoitteet
server.get("/info",(request,response) => {
    response.send(
        "<p>Phonebook has info for " + numbers.length + " people</p>" +
        "<p>" + new Date() +"</p>")
});

server.get("/api/persons", (request, response, next) => {
    Person.find({})
    .then(persons => {
        response.json(persons);
    })
    .catch(error => next(error))
}) 

server.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = numbers.find(person => person.id === id);

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
});

server.post("/api/persons/", (request, response, next) => {
    if (!request.body.name) {
        return response.status(400).json({  
            error: 'Name is missing' 
        })
    }
    // else if (numbers.find(person => person.name === newPerson.name)) {
    //     return response.status(400).json({  
    //         error: 'Name already exists' 
    //     })
    // }

    if (!request.body.number) {
        return response.status(400).json({  
            error: 'Number is missing' 
        })
    }

    const newPerson = new Person({
        "name":request.body.name,
        "number":request.body.number
    })
    newPerson.save()
    .then(person => {
        response.json(person)    
    })
    .catch(error => next(error))
})

server.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

server.put("/api/persons/:id", (request, response, next) => {
    const person = {
        "name":request.body.name,
        "number":request.body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
        response.json(updatedNote)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response,next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'MongooseError') {
        return response.status(500).send({ error: 'database connection timeout' })
    }

    next(error)
}

server.use(errorHandler)

// Palvelin käynnistys
server.listen(process.env.PORT)
console.log("Server started in port 3001")