import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good > 0 || neutral > 0 || bad > 0)
  {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <tr>
              <StatisticLine text="good" value={good}></StatisticLine>
            </tr>
            <tr>
              <StatisticLine text="neutral" value={neutral}></StatisticLine>
            </tr>
            <tr>
              <StatisticLine text="bad" value={bad}></StatisticLine>
            </tr>
            <tr>
              <td>all</td><td>{good + neutral + bad}</td>
            </tr>
            <tr>
              <td>average</td><td>{((good - bad) / (good + neutral + bad)).toFixed(1)}</td>   
            </tr>
            <tr>
              <td>positive</td><td>{(good * 100 / (neutral + bad + good)).toFixed(1)} %</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>statistics</h2>
        <p>no feedback given</p>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App