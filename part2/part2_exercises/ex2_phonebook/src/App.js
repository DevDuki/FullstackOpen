import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const createName = (event) => {
    const createdName = event.target.value
    setNewName(createdName)
  }

  const createNumber = (event) => {
      const createdNumber = event.target.value
      setNewNumber(createdNumber)
  }

  const addToList = (event) => {
      event.preventDefault()

      const person = persons.filter(person => person.name === newName)[0]
            
      if(person) {
        const confirm = window.confirm(`${newName} is already added to phonebook\nReplace the old number with new one?`)

        if(confirm){
          const changedPerson = {...person, number: newNumber}
          const id = changedPerson.id

          personService.update(id, changedPerson)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
              setNewName('')
              setNewNumber('')
              setNotification(`${updatedPerson.name}'s number replaced!`)
              setTimeout(() => {
                setNotification(null)
              }, 2000)
            })
            .catch(error => {
              setErrorMessage(`Information of ${changedPerson.name} has already been removed from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 2500)
            })
        }
      } else {
        const newPerson = { name: newName, number: newNumber} 

        personService.create(newPerson)
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson))
            setNewName('')
            setNewNumber('')
            setNotification(`${createdPerson.name} created!`)
            setTimeout(() => {
              setNotification(null)
            }, 2000)
          })
      }
  }

  const deleteFromList = (id) => {
    const deletingPerson = persons.find(person => person.id === id)    
    const confirmed = window.confirm(`Delete ${deletingPerson.name}?`)

    if(confirmed){
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification(`${deletingPerson.name} deleted!`)
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
      .catch(error => {
        setErrorMessage(`${deletingPerson.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2500)
      })
    }   
  }

  const filterByName = (event) => {
      setFilterName(event.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
      <Filter changeHandler={filterByName} filterValue={filterName} />
      <h3>Add a new Number</h3>
      <PersonForm submitHandler={addToList} nameInputHandler={createName} nameInputValue={newName} numberInputHandler={createNumber} numberInputValue={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterName={filterName} clickHandler={deleteFromList} />
    </div>
  )
}

export default App