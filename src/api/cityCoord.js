class cityCoord{

  constructor(nameCity) {
    this.cityUrl = `https://nominatim.openstreetmap.org/search.php?q=${nameCity}&limit=1&format=jsonv2`;
  }

  info(){
    return fetch(this.cityUrl)
        .then(response=>response.json());
  }
}

export {cityCoord}