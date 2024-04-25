// Load world map and data
Promise.all([
  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@1/world/110m.json"),
  d3.csv(
    "https://gist.githubusercontent.com/mbostock/9535021/raw/830ff7e145d8dc40b6d9b5ea896ef55bf3aedf5a/un.csv"
  ),
]).then(([world, data]) => {
  const features = topojson.feature(world, world.objects.countries).features;

  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const width = 975 - margin.left - margin.right;
  const height = 610 - margin.top - margin.bottom;

  const svg = d3
    .select("#map")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height);

  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .rangeRound([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, 1])
    .rangeRound([height - margin.bottom, margin.top]);

  const color = d3.scaleSequential(d3.interpolateViridis);

  svg
    .append("g")
    .selectAll("path")
    .data(features)
    .join("path")
    .attr("fill", (d) => {
      const country = data.find((c) => c.Country === d.properties.name);
      return country ? color(country.Population / country.Area) : "#ddd";
    })
    .attr("d", d3.geoPath().projection(d3.geoMercator()));

  const legend = svg
    .append("g")
    .attr("transform", `translate(${width - 40},${margin.top})`)
    .selectAll("g")
    .data(d3.ticks(0, 1, 6))
    .join("g");

  legend
    .append("rect")
    .attr("fill", (d) => color(d))
    .attr("height", 8)
    .attr("x", -8)
    .attr("width", 8)
    .attr("y", (d) => y(d));

  legend
    .append("text")
    .attr("fill", "currentColor")
    .attr("text-anchor", "end")
    .attr("x", -12)
    .attr("y", (d) => y(d) + 4)
    .attr("dy", "0.32em")
    .text(d3.format(".1f"));

  svg
    .append("path")
    .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", d3.geoPath().projection(d3.geoMercator()));
});
