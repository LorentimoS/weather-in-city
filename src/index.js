import { cityCoord } from "./api/cityCoord";
import { weatherByCoord } from "./api/weatherByCoord";
import * as d3 from "d3"
import * as Geo from "./geo.json"

let projection;
const cityForm = document.getElementById('cityForm');
cityForm.addEventListener('submit', event => {
  event.preventDefault();
  const cityName = cityForm.elements[0].value;
  const chartTemp = cityForm.elements[1].checked;
  const chartRain = cityForm.elements[2].checked;

  renderCity("#countryMap", cityName, chartTemp, chartRain)
});

document.addEventListener("DOMContentLoaded", setup)

function setup() {
  renderChart("#chart")
  renderMap("#map")
}

function renderChart(containerSelector) {
  const width = 600;
  const height = 300;
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 120
  };
  const svg = d3.select(containerSelector).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "chartSVG")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .attr("id", "svgChart")
}

function renderMap(containerSelector) {
  const width = 600;
  const height = 550;
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };
  const svg = d3.select(containerSelector).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
  projection = d3.geoMercator()
    .scale(90)
    .center([0, 20])
    .translate([width/2 - margin.left, height/2 - margin.top]);
  svg.append("g")
    .attr("id", "countryMap")
    .selectAll("path")
    .data(Geo.features)
    .enter()
    .append("path")
    .attr("class", "topo")
    .attr("d", d3.geoPath().projection(projection))
    .style("opacity", .7)
}

function renderCity(containerSelector, cityName, checkTemp, checkRain) {
  const svg = d3.select(containerSelector)
  const city = new cityCoord(cityName);

  city.info().then(infoArray => {
    if (infoArray.length == 0) {
      alert("Input the real name of city")
    }
    else {
      const coord = projection([infoArray[0].lon, infoArray[0].lat]);

      const circle = document.getElementById("circleCity");
      if (circle) {
        circle.remove()
      }

      svg.append("circle")
        .attr("cx", coord[0])
        .attr("cy", coord[1])
        .attr("r", 2)
        .attr("id", "circleCity")
        .style("fill", "red")

      renderWeather(infoArray[0].lon, infoArray[0].lat, checkTemp, checkRain)
    }
  })
}

function renderWeather(longitude, latitude, checkTemp, checkRain) {
  const width = document.getElementById('chartSVG').getAttribute('width') - 120 - 20
  const height = document.getElementById('chartSVG').getAttribute('height') - 20 - 20
  const svg = d3.select("#svgChart")
  const cityWeather = new weatherByCoord(longitude, latitude)

  cityWeather.weather().then(weatherArray => {
    const time = weatherArray.hourly.time;
    const temp = weatherArray.hourly.temperature_2m;
    const rain = weatherArray.hourly.rain;
    const arrWeatherData = [];
    for (let i = 0; i < time.length; i++) {
      arrWeatherData.push([time[i], temp[i], rain[i]])
    }

    const weatherData = arrWeatherData.map(function(d) {
      return {
        date: d3.timeParse("%Y-%m-%dT%I:%M")(d[0]),
        degree: d[1],
        rain: d[2]
      };
    });

    removeElement("axisTime")
    removeElement("currTime")

    const xTime = d3.scaleTime()
      .domain(d3.extent(weatherData, function(d) { return d.date; }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .attr("id", "axisTime")
      .call(d3.axisBottom(xTime));

    const currTime = new Date();
    svg.append('line')
    .style('stroke', 'red')
      .attr("id", "currTime")
    .attr('x1', xTime(currTime))
    .attr('y1', 0)
    .attr('x2', xTime(currTime))
    .attr('y2', height);

    removeElement("axisTemp")
    removeElement("labelTemp")
    removeElement("pathTemp")
    if (checkTemp) {
      const yDegree = d3.scaleLinear()
        .domain([d3.min(weatherData, function(d) { return d.degree; })-0.5,
        d3.max(weatherData, function(d) { return d.degree; })+0.5])
        .range([height, 0]);
      svg.append("g")
        .attr("id", "axisTemp")
        .call(d3.axisLeft(yDegree).tickSize(-width).ticks(6))

      svg.append("text")
        .attr("id", "labelTemp")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -30)
        .attr("x", -height/2)
        .text(weatherArray.hourly_units.temperature_2m)

      svg.append("path")
        .datum(weatherData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("id", "pathTemp")
        .attr("d", d3.line()
          .x(function(d) { return xTime(d.date); })
          .y(function(d) { return yDegree(d.degree); }))
    }

    removeElement("axisRain")
    removeElement("labelRain")
    removeElement("pathRain")
    if (checkRain) {
      const yRain = d3.scaleLinear()
        .domain([0, d3.max(weatherData, function(d) { return d.rain; })+0.1])
        .range([height, 0]);
      svg.append("g")
        .attr("transform", `translate(${-60 * checkTemp},0)`)
        .attr("id", "axisRain")
        .call(d3.axisLeft(yRain).tickSize(-width * (!checkTemp)).ticks(6))

      svg.append("text")
        .attr("id", "labelRain")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -30 - 60*checkTemp)
        .attr("x",  -height/2)
        .text(weatherArray.hourly_units.rain)
      
      svg.append("path")
        .datum(weatherData)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 1.5)
        .attr("id", "pathRain")
        .attr("d", d3.line()
          .x(function(d) { return xTime(d.date); })
          .y(function(d) { return yRain(d.rain); }))
    }
  })
}

function removeElement(idElem) {
  const Elem = document.getElementById(idElem);
  if (Elem) {
    Elem.remove()
  }
}