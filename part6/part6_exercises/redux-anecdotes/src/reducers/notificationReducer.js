

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

let notificationTimer = null

export const setNotification = (message, displayTime) => {
  return (dispatch) => {
    dispatch({
      type: 'SET',
      data: message
    })

    if (notificationTimer) {
      window.clearTimeout(notificationTimer)
    }
    
    notificationTimer = window.setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, displayTime * 1000)
  }
}