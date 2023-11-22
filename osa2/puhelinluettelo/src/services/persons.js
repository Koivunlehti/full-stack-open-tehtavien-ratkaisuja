import axios from "axios"

const getAll = () => {
    
    const request = axios.get("http://localhost:3001/persons")

    return request.then(response => response.data )
}

const addNew =( personObject ) => {
    const request = axios.post("http://localhost:3001/persons", personObject)
    
    return request.then(response => response.data)
}

export default {getAll,addNew}
