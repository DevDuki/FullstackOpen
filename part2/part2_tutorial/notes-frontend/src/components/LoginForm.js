import React, { useState } from 'react'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const sendCredentials = (event) => {
    event.preventDefault()

    loginUser({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={sendCredentials}>
        <div>
          username
          <input 
            type="text" value={username}
            onChange={({ target }) => setUsername(target.value)} 
          />
        </div>
        <div>
          password
          <input
            type="password" value={password}
            onChange={({ target }) => setPassword(target.value)} 
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm