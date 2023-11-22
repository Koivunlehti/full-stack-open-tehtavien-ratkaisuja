import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <>
      {text} {value}
      <br />
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good > 0 || neutral > 0 || bad > 0)
  {
    return (
      <div>
        <h2>statistics</h2>
        <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        all {good + neutral + bad}
        <br />
        average {(good - bad) / (good + neutral + bad)}
        <br />
        positive {good * 100 / (neutral + bad + good)} %
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>statistics</h2>
        no feedback given
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