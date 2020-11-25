import React, { useState } from 'react'
import Country from './Country'
import Weather from './Weather'

const CountryData = ({searchCriteria, data}) => {

    // Helper function
    const filterData = (array, filterCriteria) => {
        return array.filter(el => el.name.toLowerCase().includes(filterCriteria.toLowerCase()))
    }

    const showButtons = document.querySelectorAll(".show-country")

    const filteredData = filterData(data, searchCriteria)

    const [showCountry, setShowCountry] = useState({})

  
    if(filteredData.length > 10){
      return (
        <p>more specific pls</p>
      )    
    } else if(filteredData.length === 1){
      const country = filteredData[0]

      return (
        <>
          <Country country={country} />        
          <Weather country={country} />
        </>
      )
    }

    // It will only get to this if filteredData has a length between 2 and 10    
    
    const showCountryData = (event) => {
        const countryName = event.target.value
        const button = event.target

        if(button.textContent === 'show'){
            const countryData = filterData(filteredData, countryName)

            // If a button was toggled to hide before, but hide was not clicked before, it will now be reset back to show
            showButtons.forEach(button => button.textContent = 'show')

            setShowCountry(countryData[0])
            button.textContent = 'hide'
        } else {
            setShowCountry({})
            button.textContent = 'show'
        }        
    }

    return (
      <>
        {filteredData.map(country => {
          return (
            <div key={country.name}>
              <p>{country.name}</p>
              <button className="show-country" value={country.name} onClick={showCountryData}>show</button>
            </div>
          )
        })}
        <Country country={showCountry} />
      </>
    )
    
}

export default CountryData