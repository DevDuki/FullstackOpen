import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnectode(anecdote.id))
    dispatch(setNotification(`You voted ${anecdote.content}`, 2))
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
      {listAnecdotes()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => 
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList