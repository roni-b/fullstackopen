import axios from 'axios'
import { act } from 'react-dom/test-utils'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newName => {
    return axios.post(baseUrl, newName)
}

const deleteName = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (newNumber, person) => {
    const url = `${baseUrl}/${person.id}`
    const changedNumber = { ...person, number: newNumber}
    return axios.put(url, changedNumber)
}

export default {
    getAll: getAll,
    create: create,
    deleteName: deleteName,
    update: update
}