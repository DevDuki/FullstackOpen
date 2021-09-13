import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../Queries/queries'
import EditBirthyear from './editBirthyear'

const Authors = (props) => {  
  const result = useQuery(ALL_AUTHORS)


  if (!props.show) {
    return null
  }

  const authors = result.loading
    ? []
    : result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <EditBirthyear authors={authors} setError={props.setError} />
    </div>
  )
}

export default Authors
