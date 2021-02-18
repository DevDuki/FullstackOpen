import anecdoteService from '../service/anecdotes'

const initialState = []

export const voteAnectode = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find((anecdote) => anecdote.id === id)
    const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1} 
    const updatedAnecdote = await anecdoteService.updateAnecdote(changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.postAnecdote(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote,
    })
  }
}

export const initialiseAnecdotes = (data) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'VOTE':
      const id = action.data.id
      return state.map((anecdote) => anecdote.id !== id ? anecdote : action.data)

    case 'CREATE':
      const anecdoteObject = action.data
      return [...state, anecdoteObject]

      case 'INIT_ANECDOTES':
        return action.data

    default:
      return state
  }
}

export default reducer