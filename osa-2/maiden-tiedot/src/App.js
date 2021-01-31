import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        console.log('Promise fullfilled')
        setCountries(res.data);
      })
  }

  useEffect(hook, [])
  console.log('render', countries.length, 'countries with info..');
  

  const Filter = ({value, onChange}) => {
    return(
    <div>Filter shown with
      <input>
      </input>
    </div>
    )
  }








 return (
   <div>
     <Filter/>
   </div>
 )
}

export default App;
