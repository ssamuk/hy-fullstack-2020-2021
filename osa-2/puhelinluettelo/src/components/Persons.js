import React from 'react'

const Persons = ({persons}) => {
    return(
      <ul>
        {persons.map(persons =>
        <li key={persons.name}>{persons.name} {persons.number}</li>)}
      </ul>
    )
  }

  export default Persons