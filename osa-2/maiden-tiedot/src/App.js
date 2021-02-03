import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'


// Other components

/* const Filter = ({value, onChange}) => {
  return(
  <div>Filter shown with
    <input>
    </input>
  </div>
  )
}*/

// APP
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
       // console.log('Promise fullfilled')
        setCountries(res.data);
      })
  }

  useEffect(hook, [])
 // console.log('render', countries.length, 'countries with info..');

  
  const handleSearchTermChange = (event) => {
   // console.log(event.target.value)
    setSearchTerm(event.target.value)
  }



 return (
   <div>

     <form>
       Filter all countries:
       <input
       value={searchTerm}
       onChange={handleSearchTermChange}></input>
     </form>

     <Countries
     searchTerm = {searchTerm}
     countries = {countries}/>

   </div>
 )
}

export default App;
