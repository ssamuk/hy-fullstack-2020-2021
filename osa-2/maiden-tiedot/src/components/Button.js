import React from 'react'
import { render } from 'react-dom';
import Country from './Country'



const Button = ({text, country}) => {
    let arr = [];
        arr.push(country)
    
    let showComponent = false;
   
    const showDetails = () => {
        console.log('Im at function', country);
        let arr = [];
        arr.push(country)
        console.log('arr', arr);
        showComponent = true;
        console.log(showComponent);

        return <Country country={arr}/>
    }

    return(
        <div>
            <button
                onClick = {showDetails}>
                {text}
            </button>
            {showComponent ?
           <Country country = {arr} /> :
           null
        }
        </div>
    )
}


export default Button