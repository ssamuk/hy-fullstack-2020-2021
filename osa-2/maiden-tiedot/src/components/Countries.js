import React from 'react'

const Countries = ({searchTerm, countries}) => {
    console.log(searchTerm);

    const filteredCountries = countries.filter(country =>
        country.name.match(new RegExp(searchTerm, 'i')))
        console.log(filteredCountries);
        

    return(
        <ul>{filteredCountries.map(c =><li>{c.name}</li>)}</ul>
    )
}



export default Countries
