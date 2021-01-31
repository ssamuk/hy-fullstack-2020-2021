import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

const Input = () => {
  return(
    <div>
    <p>Find countries</p>
    <input></input>
    </div>
  )
}






 return (
   <div>
    <Input/>
   </div>
 )
}

export default App;
