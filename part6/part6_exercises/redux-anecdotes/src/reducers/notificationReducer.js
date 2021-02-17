
export default (state = '', {type, data}) => {
  switch (type) {
    case 'NEW_ANECDOTE_ADDED':
      return`Anecdote '${data.anecdote}' has been added!`
      
    case 'VOTED':
      return `You voted '${data.anecdote}'`
      
    case 'REMOVE':
      return ''

    default:
      return state
  }
}

export const addedNotification = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE_ADDED',
    data: {
      anecdote
    }
  }
}

export const votedNotification = (anecdote) => {
  return {
    type: 'VOTED',
    data: {
      anecdote
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}