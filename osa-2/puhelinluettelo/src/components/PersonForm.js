import React from 'react'

const PersonForm = ({addNew, newName, handleNameChange, handleNumberChange, newNumber} ) => { 
    return(
    <form onSubmit={addNew}>
          <div>
            name:
            <input value={newName} onChange={handleNameChange}/>
          </div>  
  
          <div>
            phone:
            <input value={newNumber} onChange={handleNumberChange}/>
          </div>
  
          <div><button type="submit">add</button></div>
        </form>
    )
  }

  export default PersonForm