var width = 640;
var height = 480;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.index; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

		

var circleData = [];
var linkData = [];

// Define first circle and type of motion:- circular
var circleData = [{
	id: 1,
	group: 1,
	cr: 10,
	rotr: 100,
	rtype: "circle",
	offset: 20,
	timelimit: 2000,
	starttime: undefined,
	elapsed: 0,
	x: 100,
	y: 100,
	scale: 1,
	move: false,
}, {
	id: 2,
	group: 1,
}, {
	id: 3,
	group: 1,
}, {
	id: 4,
	group: 1,
}]


var linkData = [{
	source: 1,
	target: 2,
	index: 1,
}, {
	source: 2,
	target: 1,
	index: 2,
}, {
	source: 2,
	target: 3,
	index: 3,
}]

console.log(JSON.stringify(circleData, null, 2))
console.log(JSON.stringify(linkData, null, 2))


// d3.json("data.json", function(error, graph) {
  // if (error) throw error;

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(linkData)
    // .data(graph.links)
    .enter().append("line");

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(circleData, function(d) { return d.id })
    // .data(graph.nodes, function(d) { return d.id })
    .enter().append("circle")
      .attr("r", 6.5)
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(circleData)
      // .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(linkData);		//
      // .links(graph.links);		//

			

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }
// });

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart()
  simulation.fix(d);
}

function dragged(d) {
  simulation.fix(d, d3.event.x, d3.event.y);
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  simulation.unfix(d);
}




