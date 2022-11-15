class weatherByCoord{

    constructor(latitude, longitude) {
      this.cityWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain`;
    }

  info(){
    return fetch(this.cityWeather)
            .then(response=>response.json());
  }
}

export {weatherByCoord}