import React from 'react'
import { createNote } from "../reducers/anecdoteReducer";
import { useDispatch } from 'react-redux'
import { removeNotification, addedNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNote(anecdote))
    dispatch(addedNotification(anecdote))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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