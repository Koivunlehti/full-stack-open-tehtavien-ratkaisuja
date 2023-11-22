import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

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
      <h2>statistics</h2>
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad}
      <br />
      all {good + neutral + bad}
      <br />
      average {(good - bad) / (good + neutral + bad)}
      <br />
      positive {good * 100 / (neutral + bad + good)} %
    </div>
  )
}

export default App