import React, { useState } from 'react'
import ReactDOM from 'react-dom'
/*import { render } from '@testing-library/react'*/



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const Anecdote = (props) => (
  <p>{props.text}</p>
)

const Points = (props) =>(
  <p>has {props.points} points.</p>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0])
  

  const addPoints = () => {
    setPoints(points => {
      points[selected]++
      console.log(points)
      return points
    })
  }

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  return (
    <div>    
      <Anecdote text = {props.anecdotes[selected]}/>
      <Button handleClick={() => addPoints()} text = 'Vote'/>
      <Button handleClick ={() => handleClick()} text = 'Next anecdote'/>
      <Points points = {points[selected]}/>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)