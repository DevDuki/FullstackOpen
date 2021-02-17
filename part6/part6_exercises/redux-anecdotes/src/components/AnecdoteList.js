import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'
import { votedNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnectode(id))
    dispatch(votedNotification(anecdotes.find(anecdote => anecdote.id === id).content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const listAnecdotes = () => {
    if (filter === '') {
      return anecdotes
    } else {
      const lcFilter = filter.toLowerCase()
      const filteredAnecdotes = anecdotes.filter(
        (anecdote) => anecdote.content.toLowerCase().includes(lcFilter)
      )
      return filteredAnecdotes
    }
  }

  return (
    <>
      {listAnecdotes().map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList