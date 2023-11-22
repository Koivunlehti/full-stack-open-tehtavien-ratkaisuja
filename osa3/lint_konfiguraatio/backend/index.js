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

// Osoitteet
// infosivu
server.get("/info",(request, response, next) => {
    Person.countDocuments({})
    .then(result =>{
        response.send(
            "<p>Phonebook has info for " + result + " people</p>" +
            "<p>" + new Date() +"</p>")
    })
    .catch(error => next(error))
});

// Kaikki henkilöt
server.get("/api/persons", (request, response, next) => {
    Person.find({})
    .then(persons => {
        response.json(persons);
    })
    .catch(error => next(error))
}) 

// Henkilö id:n perusteella
server.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {        
        response.json(person)      
    } else {        
        response.status(404).end()
    }})
    .catch(error => next(error))
});

// Lisää uusi henkilö
server.post("/api/persons/", (request, response, next) => {
    if (!request.body.name) {
        return response.status(400).json({  
            error: 'Name is missing' 
        })
    }
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

// Poista henkilö
server.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

// Muuta henkilöä
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

// Loppupään middlewaret

const errorHandler = (error, request, response,next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {    
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'MongooseError') {
        return response.status(500).send({ error: 'database connection timeout' })
    }

    next(error)
}

server.use(errorHandler)

// Palvelin käynnistys
server.listen(process.env.PORT)
console.log("Server started in port 3001")