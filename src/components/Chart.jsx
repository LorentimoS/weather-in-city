import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
function Chart() {

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
      .attr("id", "svgChart")
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