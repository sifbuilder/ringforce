// d3.json("data.json", function(error, graph) {
  // if (error) throw error;



var nodes = [];
var links = [];

// Define first circle and type of motion:- circular
var nodes = [{
	id: 1,
	group: 1,
	cr: 3,
	rotr: 100,
	rtype: "circle",
	color: "red",
	offset: 20,
	timelimit: 2000,
	starttime: undefined,
	elapsed: 0,
	x: 100,
	y: 100,
	vx: 0,
	vy: 0,
	scale: 1,
	move: false,
}
, {
	id: 2,
	group: 1,
	cr: 3,
	rotr: 100,
	rtype: "circle",
	color: "blue",
	offset: 20,
	timelimit: 2000,
	starttime: undefined,
	elapsed: 0,
	x: 500,
	y: 100,
	vx: 0,
	vy: 0,
	scale: 1,
	move: false,
}
, {
	id: 3,
	group: 1,
	cr: 3,
	rotr: 100,
	rtype: "circle",
	color: "green",
	offset: 20,
	timelimit: 2000,
	starttime: undefined,
	elapsed: 0,
	x: 350,
	y: 100,
	vx: 0,
	vy: 0,
	scale: 1,
	move: false,
}
, {
	id: 4,
	group: 1,
	cr: 3,
	rotr: 100,
	rtype: "circle",
	color: "black",
	offset: 20,
	timelimit: 2000,
	starttime: undefined,
	elapsed: 0,
	x: 550,
	y: 100,
	vx: 0,
	vy: 0,
	scale: 1,
	move: false,
}
, {
	id: 5,
	group: 1,
	cr: 3,
	rotr: 100,
	rtype: "circle",
	color: "grey",
	offset: 20,
	timelimit: 2000,
	starttime: undefined,
	elapsed: 0,
	x: 50,
	y: 100,
	vx: 0,
	vy: 0,
	scale: 1,
	move: false,
}
]


var links = [{
	source: 0,	// 100
	target: 1,	// 500
	index: 1,
}
, {
	source: 1,
	target: 2,	// 350
	index: 2,
}
, {
	source: 1,
	target: 3,	// 550
	index: 3,
}
, {
	source: 0,
	target: 4,	// 50
	index: 4,
}
]

var width = '100%' // 640;
var height = '100%' // 480;
var animationStep = 500;
var centerx = width / 2
var centery = height / 2
 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
   // .attr("width", width)
    // .attr("height", height)

var wpct = svg.property("scrollWidth") / 100
var hpct = svg.property("scrollHeigth") / 100
var mpct = wpct +  hpct / 2

		
  var linkLines = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(links)
    // .data(graph.links)
    .enter().append("line");

  var nodeCircles = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes, function(d) { return d.id })
    // .data(graph.nodes, function(d) { return d.id })
    .enter().append("circle")
    .attr("r", function(d) { return d.cr })
    .attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y })
    .style("fill", function(d) { return d.color })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  nodeCircles.append("title")
      .text(function(d) { return d.id; });
	
	var nodeRects = svg.append("g")
						.attr("class", "nodes")
						.selectAll("rect")
						.data(nodes, function(d) { return d.id })
            .enter()
            .append("rect")
            .attr("x", function (d) { return d.x - d.cr })
            .attr("y", function (d) { return d.y; })
            .attr("height", function (d) { return 2 * d.cr * mpct })
            .attr("width", function (d) { return 2 * d.cr * mpct })
 						.attr("stroke-width", 1)
						.attr("stroke", "grey")
						.style("fill", function(d) { return d.color })
						
	var simulation = d3.forceSimulation()
				.alpha(1)		// tick increments the current alpha by (alphaTarget - alpha) × alphaDecay
								// tick then invokes each registered force, passing the new alpha
								// tick decrements each node’s velocity by velocity × velocityDecay
								// tick increments each node’s position by velocity
				.alphaMin(0.001) // (0.001)
				.alphaDecay(0.000228) // (0.0228)
				.alphaTarget(0)
				.velocityDecay(0.000) // (0.4)			// each node’s velocity is multiplied by 1 - decay

		simulation
			.nodes(nodes)
	
	simulation
    .force("link", d3.forceLink().id(function(d) { return d.index; }))
    .force("charge", d3.forceManyBody().strength(-20))						// positive: attraction
		.force("collide", d3.forceCollide(function(d) {return d.cr + 10}).iterations(4)) //
    // .force("center", d3.forceCenter(width / 2, height / 2))				// 

  simulation
		.force("link")
      .links(links).strength(0) // .iterations(10).distance(100)

function tickforce(alpha) {
 		wpct = svg.property("scrollWidth") / 100
 		hpct = svg.property("scrollHeigth") / 100
		console.log("wpct: " , wpct)

 // for (var i = 0, n = nodes.length, node, k = alpha * 0.1; i < n; ++i) {
 				var t_angle = (2 * Math.PI) * alpha;
	 for (var i = 0, n = nodes.length, node, dir = 0 , k = 1; i < n; ++i) {
			node = nodes[i];
			if (node.color == 'red')	{
				// var dir = Math.sign(300 - node.x)// +1 | -1
				var q = (node.x - 300) / 300 // -1 | 0 | +1
				node.vx = node.vx - q * 0.1 // * Math.cos(t_angle)
				node.fy = 100
			}
			if (node.color == 'blue')	{
				var dir = Math.sign(300 - node.x)// +1 | -1
				var q = (node.x - 300) / 300 // -1 | 0 | +1
				node.vx = node.vx - q * 0.1 // * Math.cos(t_angle)
				node.fy = 100
			}
			if (node.color == 'green')	{
				// node.fx = 350
				node.fy = 100
			}
			if (node.color == 'black')	{
				node.fx = 550
				node.fy = 100
			}
			if (node.color == 'grey')	{
				node.fx = 50
				node.fy = 100
			}
		}
}

function init() {
			// console.log("init ")
	linkLines
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; })

	nodeCircles
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })

	nodeRects
			.attr("x", function(d) { return d.x - d.cr })
			.attr("y", function(d) { return d.y; })

	nodeTexts // .transition(100).duration(animationStep)
			.attr("x", function(d) { return d.x })
			.attr("y", function(d) { return d.y })
}

function ticked() {
	linkLines // .transition(100).duration(animationStep)
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; })

	nodeCircles // .transition(100).duration(animationStep)
			.attr("cx", function(d) { return d.x })
			.attr("cy", function(d) { return d.y })

	nodeRects // .transition(100).duration(animationStep)
			.attr("x", function(d) { return d.x - d.cr })
			.attr("y", function(d) { return d.y })

	nodeTexts // .transition(100).duration(animationStep)
			.attr("x", function(d) { return d.x })
			.attr("y", function(d) { return d.y })
}

simulation
	.on("tick", function() {
		ticked()
		tickforce(this.alpha())
	})
 .on("end", function() {
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ")
		// simulation.restart()
	})

// init();
// setInterval(
		// function() { console.log("step"); simulation.tick(); },
		// animationStep
// );



// d3.timer(tick_force)		// =================

function tick_force(_elapsed) {
console.log("elapsed: ", _elapsed)
	timer_elapsed = _elapsed;
	var alpha = _elapsed

	// Process all circles data. 
	for (var i = 0, k = alpha * 0.000001; i<nodes.length;i++)	{
	
		var t_node = nodes[i];
		if (t_node.starttime == undefined) t_node.starttime = _elapsed
			var t_elapsed = _elapsed - t_node.starttime	// Calc elapsed time.
			t_node.elapsed = t_elapsed	// Keep a record.
			var t = t_elapsed / t_node.timelimit	// Calculate how far through the desired time for one iteration.
			if (t_node.color == 'blue')	{
				var rotation_radius = t_node.rotr
				var t_offset = t_node.offset
				var t_angle = (2 * Math.PI) * t;
				var t_x = rotation_radius * Math.cos(t_angle);
				// var t_y = rotation_radius * Math.sin(t_angle);

				// t_node.x = (width/2) + t_offset + t_x
					t_node.x += 5 * Math.cos(t_angle)
					// t_node.x += t_x
				
				// t_node.vx -= t_node.x * Math.cos(t_angle) * k;
				// t_node.vy -= t_node.y * Math.sin(t_angle) * k;
				
			}
		}
	// console.log("^^^^ 2", JSON.stringify(nodes, null, 2))
		
		// simulation.restart()		
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart()
}

function dragged(d) {
 }

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
}





