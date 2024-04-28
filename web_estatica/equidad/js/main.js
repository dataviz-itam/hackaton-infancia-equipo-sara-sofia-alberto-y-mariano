const matrimonio_infantil = [
  { sexo: "hombre", cantidad: 70512,  anio: 2000 },
  { sexo: "mujer",  cantidad: 318319, anio: 2000 },
  { sexo: "hombre", cantidad: 90112,  anio: 2010 },
  { sexo: "mujer",  cantidad: 344343, anio: 2010 },
  { sexo: "hombre", cantidad: 74743,  anio: 2015 },
  { sexo: "mujer",  cantidad: 305988, anio: 2015 },
  { sexo: "hombre", cantidad: 76322,  anio: 2020 },
  { sexo: "mujer",  cantidad: 237175, anio: 2020 },
];

const trabajo_infantil = [
  { sexo: "hombre", cantidad: 1147441, anio: 2017 },
  { sexo: "mujer",  cantidad: 589416,  anio: 2017 },
  { sexo: "hombre", cantidad: 1037024, anio: 2019 },
  { sexo: "mujer",  cantidad: 665109,  anio: 2019 },
  { sexo: "hombre", cantidad: 1146370, anio: 2022 },
  { sexo: "mujer",  cantidad: 676705,  anio: 2022 },
];

const width = 500;
const height = 350;
const margin = { top: 10, bottom: 40, left: 10, right: 10 };

function barChart(data, container, titulo) {
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg
    .append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#3b3b3b"); // todo este codigo es para poner un fondo gris

  // Create a scale for the x-axis based on unique "anio" values
  const anios = Array.from(new Set(data.map((d) => d.anio)));
  const x = d3
    .scaleBand()
    .domain(anios)
    .range([0, width - margin.left - margin.right])
    .padding(0.1);

  const maxCantidad = d3.max(data, (d) => d.cantidad);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.cantidad)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr(
      "x",
      (d) => x(d.anio) + (x.bandwidth() / 2) * (d.sexo === "mujer" ? 1 : 0)
    ) // Adjust x position based on "sexo"
    .attr("y", (d) => y(d.cantidad))
    .attr("width", x.bandwidth() / 2) // Reduce the width to create space between bars in the same group
    .attr("height", (d) => y(0) - y(d.cantidad))
    .attr("fill", (d) => (d.sexo === "hombre" ? "cornflowerblue" : "magenta"));

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .selectAll(".tick line")
      .attr("stroke", "white"); // Set tick line color to white
    g.selectAll(".tick text")
      .attr("fill", "white") // Set tick label color to white
      .attr("font-size", "20px")
      .style("overflow", "visible"); 
    g.select(".domain").attr("stroke", "white"); // Set axis line color to white
  }

  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((d) => d)) // Use the "anio" values for tick labels
      .selectAll(".tick line")
      .attr("stroke", "white"); // Set tick line color to white
    g.selectAll(".tick text")
      .attr("fill", "white") // Set tick label color to white
      .attr("font-size", "20px");
    g.select(".domain").attr("stroke", "white"); // Set axis line color to white

    // Add title
    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text(titulo);

    // Add x-axis label
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("Año");

    // Add y-axis label
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left*10)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("Personas");
  }

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
}

barChart(matrimonio_infantil, "#d3-container1", "Matrimonio Infantil");
barChart(trabajo_infantil, "#d3-container2", "Trabajo Infantil");
