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
server.get("/api/persons", (request, response) => {
    response.json(numbers)
}) 

// Palvelin käynnistys
server.listen(3001)
console.log("Server started in port 3001")