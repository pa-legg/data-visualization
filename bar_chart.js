var width = 420,
    height = 300,
    barHeight = 20,
    maxBarLength = 20;

var data = [0,0,0,0,0,0,0,0,0,0];
random_data();

var x = d3.scale.linear()
    .domain([0, maxBarLength]) // d3.max(data)
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, data.length]) // d3.max(data)
    .range([0, height]);

var svg = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

var bar = svg.selectAll("g")
    .data(data)
  	.enter()
  	.append("g")
    .attr("transform", function(d, i) 
    	{ return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1)
    .attr("fill", function(d) 
    	{ return "rgb(0, 0, " + (d * 10) + ")"; })
    .on("mouseover", function(d) {
    	d3.select(this).attr("fill", function(d) 
    		{ return "rgb(" + (d * 10) + ", 0, 0)"; })
    })
    .on("mouseout", function(d) {
    	d3.select(this).attr("fill", function(d) 
    		{ return "rgb(0, 0, " + (d * 10) + ")"; })
    });

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .attr("fill", "white")
    .attr("text-anchor","end")
    .text(function(d) { return d; });

function random_data() {
	for (d in data) {
		data[d] = Math.ceil(Math.random() * maxBarLength) ;
	}
}

function update() {
	random_data();
	console.log("update: ", data);

	var bar = svg.selectAll("g")
	    .data(data);

	bar.select("rect")
		.data(data)
		.transition()
		.duration(1000)
		.attr("width", x)
		.attr("fill", function(d) 
			{ return "rgb(0, 0, " + (d * 10) + ")"; });

	bar.select("text")
		.data(data)
		.transition()
		.duration(1000)
		.attr("x", function(d) { return x(d) - 3; })
		.text(function(d) { return d; });
}

function add_data() {
	data.push(Math.ceil(Math.random() * maxBarLength));
	console.log("add: ", data);

	bar = svg.selectAll("g")
	    .data(data)
	  	.enter()
	  	.append("g")
	    .attr("transform", function(d, i) 
	    	{ return "translate(0," + i * barHeight + ")"; });

	bar.append("rect")
	    .attr("width", x)
	    .attr("height", barHeight - 1)
	    .attr("fill", function(d) 
	    	{ return "rgb(0, 0, " + (d * 10) + ")"; })
	    .on("mouseover", function(d) {
	    	d3.select(this).attr("fill", function(d) 
	    		{ return "rgb(" + (d * 10) + ", 0, 0)"; })
	    })
	    .on("mouseout", function(d) {
	    	d3.select(this).attr("fill", function(d) 
	    		{ return "rgb(0, 0, " + (d * 10) + ")"; })
	    });

	bar.append("text")
	    .attr("x", function(d) { return x(d) - 3; })
	    .attr("y", barHeight / 2)
	    .attr("dy", ".35em")
	    .attr("fill", "white")
	    .attr("text-anchor","end")
	    .text(function(d) { return d; });
}

function remove_data() {
	data.pop();
	console.log("remove: ", data);

	var bar = svg.selectAll("g")
	    .data(data);

	bar.exit()
		.transition()
		.duration(1000)
		.style("fill-opacity", 0)
		.remove();
}
