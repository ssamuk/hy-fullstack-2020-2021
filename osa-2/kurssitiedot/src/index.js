import React from 'react'
import ReactDOM from 'react-dom'





const Course = ({course}) => {

  const Header = ({header}) => <h1>{header}</h1>
  const Content = ({parts}) => {
    const Part = ({parts}) => {
        return(
          
          
          <ul>
            {parts.map(names => <li key = {names.id}>{names.name} {names.exercises}</li>)}
          </ul>
        )
      }

    const Total = ({parts}) => {
      let total = parts.reduce((sum, parts) =>  sum + parts.exercises, 0)
    return(
      <div>
       <h3> Total of {total} exercises.</h3>
      </div>
    )
    
    }

    return (
      <div>
      <Part parts = {parts}/>
      <Total parts = {parts}/>
      </div>
    ) 
  }

  return(
    <div>
      <Header header = {course.name} />
      <Content parts = {course.parts}/> 
    </div>
  )
}




const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course course = {courses[0]}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
