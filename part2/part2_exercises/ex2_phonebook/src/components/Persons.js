import React from 'react'
import Person from './Person'

const Persons = ({persons, filterName, clickHandler}) => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
      
      return (
          <>
            {filteredPersons.map(person => <Person key={person.id} person={person} clickHandler={clickHandler} />)}
          </>
      )
}

export default Persons