import axios from "axios"

const getAll = () => {
    
    const request = axios.get("http://localhost:3001/persons")

    return request.then(response => response.data )
}

const addNew = ( personObject ) => {
    const request = axios.post("http://localhost:3001/persons", personObject)
    
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete("http://localhost:3001/persons/" + id)

    return request.then(response => response.data)
}

const updatePerson = (personObject) => {
    const request = axios.put("http://localhost:3001/persons/" + personObject.id, personObject)
    return request.then(response => response.data)
}

export default {getAll, addNew, deletePerson, updatePerson}
