import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../Queries/queries'

const EditBirthyear = ({ authors, setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editBirthyear, result ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (err) => {
      setError(err.message)
    }
  })

  const submit = (event) => {
    event.preventDefault()

    editBirthyear({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if(result.data && result.data.editAuthor === null){
      setError('Person not found')
    }
  }, [result.data]) //eslint-disable-line

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name 
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(author => 
              <option key={author.name}>{author.name}</option>  
            )}
          </select>
        </div>
        <div>
          born <input value={born} onChange={({ target }) => setBorn(parseInt(target.value))} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditBirthyear