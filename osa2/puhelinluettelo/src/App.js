import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers'
import { useState, useEffect } from 'react'
import personService from './services/persons'

const FilterResults = ({persons, search, handleDelete}) => {
  const matches = persons.filter(person => person.name.match(new RegExp(search, "i")))

  return (
    <div>
      <h2>Numbers</h2>
      {matches.map(match =>
        <div 
          key={match.id}>
          {match.name} {match.number}
          <button onClick={() => handleDelete(match.id, match.name)}>delete</button>
        </div>
        )}
    </div>
  )
}

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {

  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const FilterInput = ({search, setSearch}) => {
  return (
    <div>
      filter shown with <input value={search} onChange={e => setSearch(e.target.value)}/>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message[1]) {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleDelete = (id, name) => {
    window.confirm(`Delete ${name}?`)
    personService
    .deleteName(id)
    setPersons(persons.filter(person => person.id != id))
    setMessage(
      `Deleted ${name} successfully`
    )
    setTimeout(() => {
      setMessage(null)
    }, 2000) 
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const all = persons.map(person => person.name)
    if (all.includes(nameObject.name)) {
      if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const findPerson = persons.find(person => person.name === nameObject.name)
        personService
        .update(nameObject.number, findPerson)
        .then(response => {
          setPersons(persons.map(person => person !== findPerson ? person : response.data))
          setMessage([
            `Updated ${findPerson.name}'s number successfully`, true
          ])
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
        .catch(error => {
          setMessage([
            `Information of ${findPerson.name} has already been removed from server`, false
          ])
          setTimeout(() => {
            setMessage(null)
          }, 2000)
          setPersons(persons.filter(person => person.id !== findPerson.id))
        })
      }

    }
    else {
      personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setMessage(
          [`Added ${nameObject.name}`, true]
        )
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
    }
    setNewName('')
    setNewNumber('')
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <FilterInput search={search} setSearch={setSearch}/>
      <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <FilterResults persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )
}

export default App

