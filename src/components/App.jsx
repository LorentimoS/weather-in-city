import { useState } from 'react'
import { Form } from "./Form"
import { Chart } from "./Chart"
import { Map } from "./Map"

function App(props) {
  const [cityName, setCityName] = useState('')
  const [checkTemp, setCheckTemp] = useState('')
  const [checkRain, setCheckRain] = useState('')

  
  return (
    <main className="main">
      <Form />
      <Chart />
      <Map />
    </main>
  )
}

export { App }