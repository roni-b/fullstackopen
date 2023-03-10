import { useState } from 'react'

const Statistics = (props) => {
  if (props.sum > 0) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
  }
  return (
    <div>No feedback given</div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.name}
  </button>
)

const StatisticLine = (props) => (
  <div>
    <Statistics text={props.text} value={props.value} sum={props.sum}/>
  </div>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //const [allClicks, setAll] = useState([])
  const header1 = 'give feedback'
  const header2 = 'statistics'
  const sumForAverage = good + bad*-1
  const sum = good+bad+neutral

  const handleGood = () => {
    //setAll(allClicks.concat(1))
    setGood(good+1)
  }
  const handleNeutral = () => {
    //setAll(allClicks.concat(0))
    setNeutral(neutral+1)
  }
  const handleBad = () => {
    //setAll(allClicks.concat(-1))
    setBad(bad+1)
  }

  return (
    <div>
      <h1>{header1}</h1>
      <Button handleClick={handleGood} name="good" />
      <Button handleClick={handleNeutral} name="neutral" />
      <Button handleClick={handleBad} name="bad" />
      <h1>{header2}</h1>
      <StatisticLine text="good" value={good} sum={sum}/>
      <StatisticLine text="neutral" value={neutral} sum={sum}/>
      <StatisticLine text="bad" value={bad} sum={sum}/>
      <StatisticLine text="average" value={sumForAverage/sum} sum={sum}/>
      <StatisticLine text="positive" value={good/sum*100+"%"} sum={sum}/>
    </div>
  )
}

export default App
//<Statistics good={good} neutral={neutral} bad={bad} value={value} sum={sum}/>

/*<div>good {props.good}</div>
<div>neutral {props.neutral}</div>
<div>bad {props.bad}</div>
<div>average {props.value/props.sum}</div>
<div>positive {props.good/props.sum*100} %</div>*/