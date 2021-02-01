import React from 'react'

const Countries = ({searchTerm, countries}) => {
    console.log(searchTerm);

    const filteredCountries = countries.filter(country =>
        country.name.match(new RegExp(searchTerm, 'i')))
        console.log(filteredCountries);
        console.log('Object length is: ', Object.keys(filteredCountries).length);
     
    const filteredLength = Object.keys(filteredCountries).length;

    if (filteredLength > 10){
    return( 
    <h2>Too many countries,be more specific please.</h2>
    )
    }
    else if (filteredLength < 10 && filteredLength > 1) {
    return(
        <div>
            <ul>{filteredCountries.map(c =><li>{c.name}</li>)}</ul>
        </div>
    )
    }
    else {
        return(
            <h2>{filteredCountries.map(c =><ul>{c.name}</ul>)}</h2>
            
        )   
}
}


export default Countries
