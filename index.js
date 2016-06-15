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
	id: 3,
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
	id: 4,
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
	move: false,}]


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

// console.log(JSON.stringify(circleData, null, 2))
// console.log(JSON.stringify(linkData, null, 2))


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
    .data(circleData, function(d) { 
				console.log(d)
				return d.id })
    // .data(graph.nodes, function(d) { return d.id })
    .enter().append("circle")
      .attr("r", function(d) { return d.cr })
		// .attr('d', function(d) {
			// var initial_x = (d.rotr != undefined ? d.rotr : d.rotrx)
			// d.x = (width/2) + d.offset + initial_x
			// d.y = (height/2) + d.offset
			// return d;
		// })
		// .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + "), scale(" + d.scale + ")";})
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

// =================

// timer_ret_val: could be used to stop the timer, but not actually used in this code really. 
var timer_ret_val = false;

// Keeps a record of the elapsed time since the timer began.
var timer_elapsed = 0;

// Kick off the timer, and the action begins: 
// d3.timer(tickFn);


function tickFn(_elapsed) {
	timer_elapsed = _elapsed;

	// Process all circles data. 
	for (var i = 0; i<circleData.length;i++)	{

		var t_circleData = circleData[i];
		if (t_circleData.starttime == undefined)
				t_circleData.starttime = _elapsed
				

			// Calc elapsed time.
			var t_elapsed = _elapsed - t_circleData.starttime

			// Keep a record.
			t_circleData.elapsed = t_elapsed

			// Calculate how far through the desired time for one iteration.
			var t = t_elapsed / t_circleData.timelimit
		
			if (t_circleData.rtype == 'circle')	{
				var rotation_radius = t_circleData.rotr
				var t_offset = t_circleData.offset
				var t_angle = (2 * Math.PI) * t;
				var t_x = rotation_radius * Math.cos(t_angle);
				var t_y = rotation_radius * Math.sin(t_angle);

				t_circleData.x = (width/2) + t_offset + t_x
				t_circleData.y = (height/2) + t_offset + t_y
			}

	}
}




