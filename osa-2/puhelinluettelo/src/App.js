import React, { useState, useEffect } from 'react'
import PersonForm from '../src/components/PersonForm'
import Persons from '../src/components/Persons'
import Filter from '../src/components/Filter'
import personService from '../src/services/persons'


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    personService.getAll()
    .then(Persons => {
      setPersons(Persons)
    })
  }, [])


  const searchTermChange = event => {
    setSearchTerm(event.target.value)
  }


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
      personService.create(newObject)
      .then(Persons => {
        setPersons(persons.concat(Persons))
      })
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
  
  const remove = id => {
    personService
    .remove(id)
    .then(Persons => {
      setPersons(persons)
    })
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
      value={searchTerm}
      onChange={searchTermChange}/>
      <div><h2>Add new</h2></div>
      <PersonForm 
      addNew = {addNew} 
      newName = {newName} 
      newNumber = {newNumber}
      handleNameChange = {handleNameChange} 
      handleNumberChange = {handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons = {persons.filter(person => person.name.match(new RegExp(searchTerm, 'i')))}/>
    </div>
  )

}

export default App