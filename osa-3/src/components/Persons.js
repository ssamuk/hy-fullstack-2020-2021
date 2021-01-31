import React from 'react'

const Persons = ({persons, onRemove}) => {


    return(
      <ul >
        {persons.map(persons =>
        <li key={persons.name}>
            {persons.name} {persons.number} ID: {persons.id}
            <button onClick ={() => onRemove(persons.id)} >Delete</button>
        </li>)}
      </ul>
    )
  }

  export default Persons