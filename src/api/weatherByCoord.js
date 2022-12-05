class weatherByCoord{

    constructor(longitude, latitude) {
      this.cityWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain`;
    }

  weather(){
    return fetch(this.cityWeather)
            .then(response=>response.json());
  }
}

export {weatherByCoord}