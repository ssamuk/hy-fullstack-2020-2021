import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([{ name: 'Arto Hellas'}]) 
  const [ newName, setNewName ] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    let n = true;
    for (let i = 0; i < persons.length; i++) {
      if(persons[i].name === nameObject.name){
        n = false
      }
    }
    if(n === true){
      setPersons(persons.concat(nameObject))
        setNewName('')
    }
    else{
      alert(`Phonebook allready contains name: ${nameObject.name}. We clear text field for you :)`)
      setNewName('')
    }
        
    
  }
  
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <ul>
            {persons.map(persons =>
            <li key={persons.name}>{persons.name}</li>)}
          </ul>
      <form onSubmit={addName}>
        <input
        value={newName}
        onChange={handleNoteChange}
        />
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )

}

export default App