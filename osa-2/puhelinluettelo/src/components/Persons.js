import { waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'

const Persons = ({persons}) => {

  
    return(
      <ul>
        {persons.map(persons =>
        <li key={persons.name}>
            {persons.name} {persons.number} ID: {persons.id}
        </li>)}
      </ul>
    )
  }

  export default Persons