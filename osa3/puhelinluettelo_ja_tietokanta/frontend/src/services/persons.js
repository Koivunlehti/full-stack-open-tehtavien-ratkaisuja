import axios from "axios";

const phoneBookUrl = "http://localhost:3001/api/persons";

const getAll = () => {
    
    const request = axios.get(phoneBookUrl)

    return request.then(response => response.data )
}

const addNew = ( personObject ) => {
    const request = axios.post(phoneBookUrl, personObject)
    
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(phoneBookUrl+ "/" + id)

    return request.then(response => response.data)
}

const updatePerson = (personObject) => {
    const request = axios.put("http://localhost:3001/persons/" + personObject.id, personObject)
    return request.then(response => response.data)
}

export default {getAll, addNew, deletePerson, updatePerson}
