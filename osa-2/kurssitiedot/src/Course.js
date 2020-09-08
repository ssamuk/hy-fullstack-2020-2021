import React from 'react'


const Course = ({courses}) => {
    const Content = ({content}) => {
      const Header = ({header}) => <h2>{header}</h2>
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
                <h4> Total of {total} exercises.</h4>
            </div>
        )
        }
    
        return (
            <div>
                <Header header = {content.name}/>
                <Part parts = {content.parts}/>
                <Total parts = {content.parts}/>
            </div>
        ) 
        }
  
    return(
      <div>
        {courses.map(courses =>
                <Content content = {courses} key = {courses.id}/>  
        )} 
      </div>
    )
  }
export default Course