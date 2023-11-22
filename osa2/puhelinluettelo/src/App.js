import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import personService from "./services/persons"

const App = () => {
  // Tilamuuttujat
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState("")

  // Alkutietojen haku
  useEffect(() => {
    personService.getAll().then(persons  => {
      setPersons(persons)
    })
  }, [])

  // Tapahtumakäsittelijät
  const handleSubmit = (event) => {
    event.preventDefault()
    const addPerson = { 
      name: newName,
      number: newNumber
    }
    if (persons.find(person => person.name === addPerson.name) === undefined)
    {
      personService.addNew(addPerson).then(person => {
        setPersons(persons.concat(person))
      })
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(addPerson.name + " is already added to phonebook")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  // Renderöinti
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App