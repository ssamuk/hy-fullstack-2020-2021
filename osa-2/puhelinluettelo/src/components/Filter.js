import React from 'react'

const Filter = ({value, onChange}) => {
    return(
    <div>Filter shown with<input value = {value} onChange={onChange}></input></div>
    )
  }

  export default Filter