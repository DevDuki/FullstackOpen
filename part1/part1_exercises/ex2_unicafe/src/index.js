import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h2>give feedback</h2>

const Button = ({clickFn, text}) => <button onClick={clickFn}>{text}</button>

const Votes = ({voteAmount, text}) => (
  <>
    <td><p>{text}</p></td>
    <td><p>{voteAmount}</p></td>
  </>
)


const TotalVotes = ({total}) => (
  <>
    <td><p>total</p></td>
    <td><p>{total}</p></td>
  </>
)

const Average = ({score, total}) => (
  <>
    <td><p>average</p></td>
    <td><p>{score / total}</p></td>
  </>
)

const PositivePerc = ({perc, total}) => (
  <>
    <td><p>positiv</p></td>
    <td><p>{perc / total}%</p></td>    
  </>
)

const Statistics = ({good, neutral, bad, total}) => {
  if(total === 0){
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <Votes text="good"    voteAmount={good} />
          </tr>
          <tr>
            <Votes text="neutral" voteAmount={neutral} />
          </tr>
          <tr>
            <Votes text="bad"     voteAmount={bad} />
          </tr>
          <tr>
            <TotalVotes total={total} />
          </tr>
          <tr>
            <Average score={good - bad} total={total} />
          </tr>
          <tr>
            <PositivePerc perc={good * 100} total={total} />
          </tr>  
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad

  const voteGood = () => {
    setGood(good + 1)
  }

  const voteNeutral = () => {
    setNeutral(neutral + 1)
  }

  const voteBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header />
      <Button clickFn={voteGood}    text="good" />
      <Button clickFn={voteNeutral} text="neutral" />
      <Button clickFn={voteBad}     text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)