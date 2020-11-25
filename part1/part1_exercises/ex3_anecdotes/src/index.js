import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({clickFn, text}) => <button onClick={clickFn}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)  

  const showAnecdote = () => {
    let randIdx = Math.floor((Math.random() * anecdotes.length))
    setSelected(randIdx)
  }

  const upVote = () => {
    points[selected] += 1
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Button clickFn={showAnecdote} text="next anecdote" />
      <Button clickFn={upVote} text="vote" />
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[points.indexOf(Math.max(...points))]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = new Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
