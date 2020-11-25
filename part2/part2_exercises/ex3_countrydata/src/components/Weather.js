import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({country}) => {

    const [ currentWeatherData, setCurrentWeatherData ] = useState({})
    const countryName = country.name.toLowerCase()
    const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryName}`)
            .then(response => {
                setCurrentWeatherData(response.data.current)
            })
    }, [])

    return (
        <div>
            <h2>Weather in {country.name}</h2>
            <p><b>Weather:</b> {currentWeatherData.temperature}°C</p>
            <img src={currentWeatherData.weather_icons} alt={currentWeatherData.weather_descriptions} />
            <p><b>Wind:</b> {currentWeatherData.wind_speed}km/h direction {currentWeatherData.wind_dir}</p>
        </div>
    )
}

export default Weather