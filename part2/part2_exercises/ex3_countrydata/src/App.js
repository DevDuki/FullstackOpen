import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryData from './components/CountryData'
import Input from './components/Input'


const App = () => {

  const [ search, setSearch ] = useState('')
  const [ data, setData ] = useState([])

  const changeSearch = (event) => {
    setSearch(event.target.value)  
  }

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        const countryData = response.data
        setData(countryData)
      })
  }, []);

  return (
    <div>
      <Input changeHandler={changeSearch} searchValue={search} />
      <CountryData searchCriteria={search} data={data} />
    </div>
  )

}

export default App