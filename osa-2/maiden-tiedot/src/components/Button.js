import React from 'react'
import Country from './Country'


const showDetails = (parameter) => {
    console.log('Im at function', parameter);
    return (
        <div>
            <Country country={parameter}/>
        </div>
    )
}

const Button = ({text, country}) => {

    const showDetails = () => {
        console.log('Im at function', country);
        let arr = [];
        arr.push(country)
        console.log('arr', arr);
        return (
                <Country country={arr}/>
        )
    }

    return(
        <button
        onClick = {() => showDetails()}>
            {text}
        </button>
    )
}


export default Button