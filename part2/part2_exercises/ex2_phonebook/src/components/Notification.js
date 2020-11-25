const Notification = ({message}) => {
  const messageStyle = {
    color: 'green',
    fontSize: 18,
    border: 'solid',
    borderRadius: 5,
    background: 'lightgrey',
    marginBottom: 15,
    paddingLeft: 15
  }
  if(message === null){
    return null
  }

  return (
    <div style={messageStyle}>
      <p>{message}</p>
    </div>
  )
}

export default Notification