import { Container, Paper, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import { Alert, Button, Form, Nav, Navbar, Table } from 'react-bootstrap'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Redirect, useParams, useHistory, useRouteMatch } from 'react-router-dom'

const Home = () => (
  <div>
    <h2>DevDuki notes app</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

const Users = () => (
  <div>
    <h2>DevDuki notes app</h2>
    <ul>
      <li>Dev Duki</li>
      <li>Scooby Doo</li>
      <li>Pika Chu</li>
      <li>Harry Potter</li>
    </ul>
  </div>
)

const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('duki')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" />
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" />
          <Button variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Scooby Doo',
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Harry Potter',
    },
    {
      id: 3,
      content: 'Most important methods of HTPP-protocol are GET and POST',
      important: true,
      user: 'Dev Duki',
    },
  ])

  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const padding = {
    padding: 5
  }

  const match = useRouteMatch('/notes/:id')
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null

  return (
    <Container>
      <div className="container">
        {(message &&
          <Alert variant="success">{message}</Alert>
        )}
        <div>
          <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/">home</Link> 
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/notes">notes</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/users">users</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    {user
                      ? <em>{user} logged in</em>
                      : <Link style={padding} to="/login">login</Link>
                    }
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>

          <Switch>
            <Route path="/notes/:id">
              <Note note={note} />
            </Route>
            <Route path="/notes">
              <Notes notes={notes} />
            </Route>
            <Route path="/users">
              {user ? <Users /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              <Login onLogin={login} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>

        <div>
          <br />
          <em>Note app, Department of Computer Science 2020</em>
        </div>
      </div>
    </Container>
  )
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)