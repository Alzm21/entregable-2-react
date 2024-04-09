import { useState, useEffect} from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import axios from 'axios'

function App() {

  const [coords, setCoords] = useState()      //Guardamos los datos de lat/long en el State
  const [weather, setWeather] = useState()    //State para guardar los resultados de la promesa "res"
  const [temp, setTemp] = useState()          //State para guardar la temperatura
  const [isLoading, setIsLoading] = useState(true)

  const success = (pos) => {                  //Constante donde sacamos la latitud y longitud de la zona
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  console.log(coords)
  
  useEffect(() => {
    if (coords){    //If para no utilizar el encadenamiento opcional en el url y que no arroje el clg error
      const apiKey = 'd0bc7367fc8be60728bed457501a6238'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      
      axios.get(url)
        .then(res => {
          const cel = (res.data.main.temp - 273.15).toFixed(0)
          const fah = (cel * 9/5 + 32).toFixed(0)
          setTemp( {cel, fah} )           //Podemos guardar ambas constantes en un mismo setter
          setWeather(res.data)
        })
        .catch(err => console.log(err))   //just clg the error
        .finally(()=> {
          setIsLoading(false)
        })
    }  
  }, [coords])

  return (
    <div className='app'>
      {
        isLoading ? 
          <h2>Loading...</h2> 
          :
          <WeatherCard
            weather = {weather}
            temp = {temp}
          />
      }
    </div>
  )
}

export default App
