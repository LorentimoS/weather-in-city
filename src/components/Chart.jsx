import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
function Chart(props) {

  function renderChart(container) {
    if (chartRef === null) {
      return;
    }

    const width = 600;
    const height = 300;
    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 120
    };

    container.innerHTML = '';
    const svg = d3.select(container).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "chartSVG")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    if (props.arrayWeatherData.length != 0) {
      const weatherData = props.arrayWeatherData.map(function(d) {
        return {
          date: d3.timeParse("%Y-%m-%dT%I:%M")(d[0]),
          degree: d[1],
          rain: d[2]
        };
      });

      const xTime = d3.scaleTime()
        .domain(d3.extent(weatherData, function(d) { return d.date; }))
        .range([0, width]);
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xTime));

      const currTime = new Date();
      svg.append('line')
        .style('stroke', 'red')
        .attr('x1', xTime(currTime))
        .attr('y1', 0)
        .attr('x2', xTime(currTime))
        .attr('y2', height);

      if (props.tempr) {
        const yDegree = d3.scaleLinear()
          .domain([d3.min(weatherData, function(d) { return d.degree; }) - 0.5,
                   d3.max(weatherData, function(d) { return d.degree; }) + 0.5])
          .range([height, 0]);
        svg.append("g")
          .call(d3.axisLeft(yDegree).tickSize(-width).ticks(6))

        svg.append("text")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-90)")
          .attr("y", -30)
          .attr("x", -height / 2)
          .text(props.units[0])

        svg.append("path")
          .datum(weatherData)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return xTime(d.date); })
            .y(function(d) { return yDegree(d.degree); }))
      }

      if (props.rain) {
        const yRain = d3.scaleLinear()
          .domain([0, d3.max(weatherData, function(d) { return d.rain; }) + 0.1])
          .range([height, 0]);
        svg.append("g")
          .attr("transform", `translate(${-60 * props.tempr},0)`)
          .call(d3.axisLeft(yRain).tickSize(-width * (!props.tempr)).ticks(6))

        svg.append("text")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-90)")
          .attr("y", -30 - 60 * props.tempr)
          .attr("x", -height / 2)
          .text(props.units[1])

        svg.append("path")
          .datum(weatherData)
          .attr("fill", "none")
          .attr("stroke", "gray")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return xTime(d.date); })
            .y(function(d) { return yRain(d.rain); }))
      }
    }

  }
  const chartRef = useRef(null);
  useEffect(() => {
    renderChart(chartRef.current);
  })


  return (
    <div ref={chartRef}>
    </div >
  )
}

export { Chart }   