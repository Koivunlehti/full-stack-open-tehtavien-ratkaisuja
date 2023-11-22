const express = require("express");
const server = express();


// Middlewaret
server.use(express.json());

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

server.get("/api/persons", (request, response) => {
    response.json(numbers);
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

server.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);

    numbers = numbers.filter(person => person.id !== id) 
    response.status(204).end()
})
// Palvelin käynnistys
server.listen(3001)
console.log("Server started in port 3001")