import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
  <div>
    <h1>{props.text}</h1>
  </div>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const positive = (props.good / all)

if(all === 0){
  return <p>No feedback given</p>
}
else
  return(
    <div>
      <StatisticLine text = 'Good' value = {props.good}/>
      <StatisticLine text = 'Neutral' value = {props.neutral}/>
      <StatisticLine text = 'Bad' value = {props.bad}/>
      <StatisticLine text = 'All' value = {all}/>
      <StatisticLine text = 'Average' value = {average}/>
      <StatisticLine text = 'Positives' value = {positive} mark = '%'/>
    </div>
  )
}

const StatisticLine = (props) => {
  return(
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}{props.mark}</td>
        </tr>
      </tbody>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <body>
    <div>
     <Header text = 'Give feedback.'/>
     <Button handleClick={() => setGood(good + 1)} text = 'Good'/>
     <Button handleClick={() => setNeutral(neutral + 1)} text = 'Neutral' />
     <Button handleClick={() => setBad(bad +1)} text = 'Bad'/>
     <Header text ='statistics'/>
     <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
    </body>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
