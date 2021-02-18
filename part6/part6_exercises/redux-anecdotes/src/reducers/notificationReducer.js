

export default (state = '', {type, data}) => {
  switch (type) {
    case 'SET':
      return data
      
    case 'CLEAR':
      return ''

    default:
      return state
  }
}

export const setNotification = (message, displayTime) => {
  return (dispatch) => {
    dispatch({
      type: 'SET',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, displayTime * 1000)  
  }
}