import {useRef, useEffect} from 'react'
import * as d3 from 'd3'
import Geo from '../data/geo.json'
function Map() {

  function renderMap(container) {
    if (mapRef === null) {
      return;
    }

    const width = 600;
    const height = 550;
    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    }

    container.innerHTML = '';
    const svg = d3.select(container).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
    const projection = d3.geoMercator()
      .scale(90)
      .center([0, 20])
      .translate([width / 2 - margin.left, height / 2 - margin.top]);
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
  const mapRef = useRef(null);
  useEffect(() => {
    renderMap(mapRef.current);
  })

  
  return (
    <div ref={mapRef} className="mapContainer">
    </div >
  )
}

export { Map }   