import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Persons from './Persons'
import PersonForm from './PersonForm'
import { ALL_PERSONS } from './queries'
import Notify from './Notify'
import PhoneForm from './PhoneForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS)

  if(result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5_000)
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}

export default App;
