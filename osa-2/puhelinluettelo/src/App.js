import React, { useState } from 'react'
import PersonForm from '../src/components/PersonForm'
import Persons from '../src/components/Persons'
import Filter from '../src/components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const addNew = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    let n = true;
    for (let i = 0; i < persons.length; i++) {
      if(persons[i].name === newObject.name){
        n = false
      }
    }
    if(n === true){
      setPersons(persons.concat(newObject))
        setNewName('')
        setNewNumber('')
    }
    else{
      alert(`Phonebook allready contains name: ${newObject.name}. We clear text field for you :)`)
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter />
      <div><h2>Add new</h2></div>
      
      <PersonForm addNew = {addNew} newName = {newName} newNumber = {newNumber}
                            handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons = {persons}/>
    </div>
  )

}

export default App