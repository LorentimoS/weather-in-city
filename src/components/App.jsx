import { useState, useEffect } from 'react'
import { Form } from "./Form"
import { Chart } from "./Chart"
import { Map } from "./Map"
import { cityCoord } from '../api/cityCoord'
import { weatherByCoord } from '../api/weatherByCoord'

function App(props) {
  const [cityName, setCityName] = useState('')
  const [checkTemp, setCheckTemp] = useState(false)
  const [checkRain, setCheckRain] = useState(false)

  const [cityInfo, setCityInfo] = useState(undefined);
  const [lon, setLon] = useState(0.0)
  const [lat, setLat] = useState(0.0)

  const [weatherData, setWeatherData] = useState([])
  const [weatherUnits, setWeatherUnits] = useState([])

  const onFormSubmitted = (name, temp, rain) => {
    setCityName(name)
    setCheckTemp(temp)
    setCheckRain(rain)
  }

  useEffect(() => {
    if (cityName != '') {
      const city = new cityCoord(cityName)
      city.info().then(newCityInfo => {
        setCityInfo(newCityInfo[0])
      })
    }
  }, [cityName])

  useEffect(() => {
    if (cityName != '') {
      if (cityInfo == undefined) {
        //alert("Input the real name of city")
        console.log("Unreal name of city")
      }
      else {
        setLon(cityInfo.lon)
        setLat(cityInfo.lat)
      }
    }
  }, [cityInfo])

  useEffect(() => {
    if (cityName != '' && cityInfo != undefined) {
      const cityWeather = new weatherByCoord(lon, lat)
      cityWeather.weather().then(weatherArray => {
        const time = weatherArray.hourly.time;
        const temp = weatherArray.hourly.temperature_2m;
        const rain = weatherArray.hourly.rain;
        const arrWeatherData = [];
        for (let i = 0; i < time.length; i++) {
          arrWeatherData.push([time[i], temp[i], rain[i]])
        }
        setWeatherData(arrWeatherData)
        setWeatherUnits([weatherArray.hourly_units.temperature_2m,
                         weatherArray.hourly_units.rain])
      })
    }
  }, [lon])

  return (
    <main className="main">
      <Form onFormSubmit={onFormSubmitted} />
      <Chart arrayWeatherData={weatherData} units={weatherUnits} tempr={checkTemp} rain={checkRain} />
      <Map longitude={lon} latitude={lat} />
    </main>
  )
}

export { App }