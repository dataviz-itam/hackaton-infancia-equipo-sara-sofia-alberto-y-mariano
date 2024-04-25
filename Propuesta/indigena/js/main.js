// DATOS

const data = [
  {
    poblacion: "no indigena",
    anio: 2016,
    rezago_educativo: 10.36866,
    servicio_salud: 12.472451,
    seguridad_social: 57.24826,
    alimentacion_nutritiva: 24.30495,
    pobreza: 49.25313,
    pobreza_extrema: 6.577441,
    calidad_vivienda: 14.46732,
    servicios_basicos: 19.60687
  },
  { 
    poblacion: "indigena",
    anio: 2016, 
    rezago_educativo: 17.75919,
    servicio_salud: 9.174249,
    seguridad_social: 95.99325,
    alimentacion_nutritiva: 40.65299,
    pobreza: 92.75655,
    pobreza_extrema: 45.420845,
    calidad_vivienda: 46.53552,
    servicios_basicos: 78.54909
  },
  { 
    poblacion: "no indigena",
    anio: 2018, 
    rezago_educativo: 10.99997,
    servicio_salud: 13.384007,
    seguridad_social: 56.63071,
    alimentacion_nutritiva: 24.96547,
    pobreza: 48.08649,
    pobreza_extrema: 6.594615,
    calidad_vivienda: 13.40261,
    servicios_basicos: 20.19010
  },
  { 
    poblacion: "indigena", 
    anio: 2018, 
    rezago_educativo: 21.09996,
    servicio_salud: 10.195189,
    seguridad_social: 94.67429,
    alimentacion_nutritiva: 46.57213,
    pobreza: 90.94877,
    pobreza_extrema: 51.177988,
    calidad_vivienda: 48.68419,
    servicios_basicos: 83.24291
  },
  { 
    poblacion: "no indigena", 
    anio: 2020, 
    rezago_educativo: 11.95281,
    servicio_salud: 26.472058,
    seguridad_social: 56.00151,
    alimentacion_nutritiva: 25.85210,
    pobreza: 50.67715,
    pobreza_extrema: 8.901116,
    calidad_vivienda: 11.40828,
    servicios_basicos: 18.46984
  },
  { 
    poblacion: "indigena", 
    anio: 2020, 
    rezago_educativo: 19.16298,
    servicio_salud: 24.681989,
    seguridad_social: 95.45269,
    alimentacion_nutritiva: 44.55788,
    pobreza: 90.20167,
    pobreza_extrema: 48.940887,
    calidad_vivienda: 42.25951,
    servicios_basicos: 84.92487
  },
  { 
    poblacion: "no indigena", 
    anio: 2022, 
    rezago_educativo: 11.13925,
    servicio_salud: 40.293208,
    seguridad_social: 55.71693,
    alimentacion_nutritiva: 20.42306,
    pobreza: 43.70918,
    pobreza_extrema: 7.602664,
    calidad_vivienda: 11.03058,
    servicios_basicos: 18.19449
  },
  { 
    poblacion: "indigena", 
    anio: 2022, 
    rezago_educativo: 20.5378,
    servicio_salud: 66.058359,
    seguridad_social: 93.88922,
    alimentacion_nutritiva: 38.64380,
    pobreza: 82.25551,
    pobreza_extrema: 50.146444,
    calidad_vivienda: 44.92031,
    servicios_basicos: 83.35632
  },
];

// Listener



// Gráfica
const width = 500;
const height = 350;
const margin = { top: 10, bottom: 40, left: 10, right: 10 };

function barChart(data, container, indicador, titulo) {
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // svg
  //   .append("rect")
  //   .attr("width", "100%")
  //   .attr("height", "100%")
  //   .attr("fill", "#3b3b3b"); // todo este codigo es para poner un fondo gris

  // Create a scale for the x-axis based on unique "anio" values
  const anios = Array.from(new Set(data.map((d) => d.anio)));
  const x = d3
    .scaleBand()
    .domain(anios)
    .range([0, width - margin.left - margin.right])
    .padding(0.1);

  const maxporcentaje = d3.max(data, (d) => d[indicador]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[indicador])])
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
      (d) => x(d.anio) + (x.bandwidth() / 2) * (d.poblacion === "no indigena" ? 1 : 0)
    ) // Adjust x position based on "poblacion"
    .attr("y", (d) => y(d[indicador]))
    .attr("width", x.bandwidth() / 2) // Reduce the width to create space between bars in the same group
    .attr("height", (d) => y(0) - y(d[indicador]))
    .attr("fill", (d) => (d.poblacion === "indigena" ? "cornflowerblue" : "gray"));

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .selectAll(".tick line")
      .attr("stroke", "black"); // Set tick line color to"black
    g.selectAll(".tick text")
      .attr("fill", "black") // Set tick label color to"black
      .attr("font-size", "20px")
      .style("overflow", "visible"); 
    g.select(".domain").attr("stroke", "black"); // Set axis line color to"black
  }

  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((d) => d)) // Use the "anio" values for tick labels
      .selectAll(".tick line")
      .attr("stroke", "black"); // Set tick line color to"black
    g.selectAll(".tick text")
      .attr("fill", "black") // Set tick label color to"black
      .attr("font-size", "20px");
    g.select(".domain").attr("stroke", "black"); // Set axis line color to"black

    // Add title
    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text(titulo);

    // Add x-axis label
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text("Año");

    // Add y-axis label
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left*10)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text("Personas");
  }

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
}

barChart(
  data,
  "#d3-container1",
  "rezago_educativo",
  "Rezago educativo"
);
// barChart(servicio_salud, "#d3-container2", "Trabajo Infantil");
