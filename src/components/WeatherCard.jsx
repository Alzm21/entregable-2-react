import React, { useState } from 'react'
import './styles/weatherCard.css'

const WeatherCard = ({weather, temp}) => {

    const [isCel, setIsCel] = useState(true)

    const handleTemp = () => {              //Function que sirve para cambiar la temperatura de °C a °F
        setIsCel(!isCel)
    }

  return (
    <div className='weather_card'>
        <h1 className='weather_title'>Weather App</h1>
        <h2 className='weather_country'> {weather?.name}, {weather?.sys.country} </h2>
        <div className="weather_container">
            <figure className='weather_img'>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="weather image" />
            </figure>
            <div className="weather_info">
                <h3 className='weather_description'> "{weather?.weather[0].description}" </h3>
                <ul className='weather_list'>
                    <li className='weather_item'><span>Wind speed: </span><span>{weather?.wind.speed} m/s</span></li>
                    <li className='weather_item'><span>Clouds: </span><span> {weather?.clouds.all} %</span></li>
                    <li className='weather_item'><span>Pressure: </span><span> {weather?.main.pressure} hPa</span></li>
                </ul>
            </div>
        </div>
        <h3 className='weather_temp'> 
            {
                isCel ? temp?.cel + ' °C' : temp?.fah + ' °F'

            }
        </h3>
        <button className='temp_change' onClick={handleTemp}>
            Change to {isCel ? '°F' : 'C°'}
        </button>
    </div>
  )
}

export default WeatherCard