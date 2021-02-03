import React from 'react'

const Country = ({country}) =>{

    return(
        <div>
                {country.map(c =>
                <div>
                    <h2>{c.name}</h2>
                    <p>Capital: {c.capital}</p>
                    <p>Population: {c.population}</p>
                    <b>Languages</b>
                    <ul>
                           {c.languages.map(lang =>
                            <li>
                                {lang.name}
                            </li>)}
                    </ul>
                    <img src={c.flag} width="300"></img>
                </div>)}
            </div>  
    )
}

export default Country