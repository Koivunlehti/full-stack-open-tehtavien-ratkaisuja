import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from "./services/persons"

const App = () => {
  // Tilamuuttujat
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

        setSuccessMessage("Added " + addPerson.name)        
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      setNewName('')
      setNewNumber('')
    }
    else {
      if(window.confirm(addPerson.name + " is already added to phonebook, replace the old number with a new one?")) {
        const oldPerson = persons.find(person => person.name === addPerson.name)
        oldPerson.number = addPerson.number
        personService.updatePerson(oldPerson).then(personUpdated => {
          setPersons(persons.map(person => person.id === personUpdated.id ? personUpdated : person))
          
          setSuccessMessage("Updated " + personUpdated.name)        
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const handleDelete = (id, name) => {
    personService.deletePerson(id).then(() => { 
      setPersons(persons.filter(person => person.id !== id))

      setSuccessMessage("Deleted "+ name +" succesfully" )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }).catch(()=> {
      setPersons(persons.filter(person => person.id !== id))
      
      setErrorMessage("Information of "+ name +" has already been deleted from server")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
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
      <Notification message={successMessage} cssclass={"success"}></Notification>
      <Notification message={errorMessage} cssclass={"error"}></Notification>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App