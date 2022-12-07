import { useState, useEffect } from 'react'
import { Form } from "./Form"
import { Chart } from "./Chart"
import { Map } from "./Map"
import { cityCoord } from '../api/cityCoord'
import { weatherByCoord } from '../api/weatherByCoord'

function App(props) {
  const [cityInfo, setCityInfo] = useState([]);

  const [cityName, setCityName] = useState('')
  const [checkTemp, setCheckTemp] = useState(0)
  const [checkRain, setCheckRain] = useState(0)

  const onFormSubmitted = (name, temp, rain) => {
    setCityName(name)
    if (typeof (temp) === Boolean) {
      setCheckTemp(temp)
    }
    if (typeof (temp) === Boolean) {
      setCheckRain(rain)
    }

  }

  useEffect(() => {
    if (cityName != '') {
      const city = new cityCoord(cityName);
      city.info().then(newCityInfo => {
        setCityInfo(newCityInfo)
      })

      if (cityInfo.length == 0) {
        alert("Input the real name of city")
      }
      else {
        console.log(cityName)
      }
    }
  }, [cityName, checkTemp, checkRain])

  return (
    <main className="main">
      <Form onFormSubmit={onFormSubmitted} />
      <Chart />
      <Map />
    </main>
  )
}

export { App }