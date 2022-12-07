import { useState } from 'react'

function Form(props) {
  const [cityName, setCityName] = useState('')
  const [checkTemp, setCheckTemp] = useState('')
  const [checkRain, setCheckRain] = useState('')

  
  return (
    <form>
        <label>
          City name:
          <input type="text" value={cityName} size="20" onChange = {event => {setCityName(event.target.value);}}/><br />
        </label>
        <label>
          <input type="checkbox" value={checkTemp} onChange = {event => {setCheckTemp(event.target.value);}}/>Temperature<br />
        </label>
        <label>
          <input type="checkbox" value={checkRain} onChange = {event => {setCheckRain(event.target.value);}}/>Rain<br />
        </label>
        <input type="submit" value="Show!"/>
      </form>
  )
}

export { Form }