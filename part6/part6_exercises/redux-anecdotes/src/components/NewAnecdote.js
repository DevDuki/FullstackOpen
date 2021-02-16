import React from 'react'
import { createNote } from "../reducers/anecdoteReducer";
import { useDispatch } from 'react-redux'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNote(anecdote))
  }
  
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default NewAnecdote