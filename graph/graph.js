var svg = d3.select('svg'),
  width = +svg.attr('width'),
  height = +svg.attr('height');

var simulation = d3
  .forceSimulation()
  .force(
    'link',
    d3.forceLink().id(function(d) {
      return d.id;
    })
  )
  //.force("charge", d3.forceManyBody().strength(-200))
  .force(
    'charge',
    d3
      .forceManyBody()
      .strength(-200)
      .theta(0.8)
      .distanceMax(150)
  )
  // 		.force('collide', d3.forceCollide()
  //       .radius(d => 40)
  //       .iterations(2)
  //     )
  .force('center', d3.forceCenter(width / 2, height / 2));

const graph = {
  nodes: [
    { id: '1' },
    { id: '2' },
    { id: '4' },
    { id: '8' },
    { id: '16' },
    { id: '11' },
    { id: '12' },
    { id: '14' },
    { id: '18' },
    { id: '116' },
  ],
  links: [
    { source: '2', target: '4' },
    { source: '4', target: '8' },
    { source: '8', target: '16' },
    { source: '16', target: '1' },
    { source: '8', target: '18' },
    { source: '16', target: '2' },
    { source: '16', target: '116' },
    { source: '2', target: '14' },
    { source: '16', target: '11' },
    { source: '18', target: '11' },
    { source: '18', target: '12' },
  ],
};

async function graphDFS(graph) {
  const stack = [];
  const visited = {};
  d3.selectAll('.node-circle').style('fill', 'grey');
  await timer(1500);
  const { links } = graph;
  stack.push('2');
  visited['2'] = true;
  while (stack.length > 0) {
    const popped = stack.pop();
    d3.select('#node_' + popped).style('fill', 'red');
    await timer(1500);
    for (let i = 0; i < links.length; i++) {
      const temp = links[i];
      if (temp.source.id === popped && visited[temp.target.id] === undefined) {
        stack.push(temp.target.id);
        visited[temp.target.id] = true;
      }
    }
  }
}

async function graphBFS(graph) {
  const queue = [];
  const queueVisited = {};
  const { links } = graph;
  queue.push('2');
  queueVisited['2'] = true;
  while (queue.length > 0) {
    const shifted = queue.shift();
    d3.select('#node_' + shifted).style('fill', 'yellow');
    await timer(1000);
    for (let i = 0; i < links.length; i++) {
      const temp = links[i];
      //   console.log(popped, 'temp', temp);
      console.log('stack', queue);
      if (temp.source.id === shifted && visited[temp.target.id] === undefined) {
        // console.log('popped', popped);
        queue.push(temp.target.id);
        queueVisited[temp.target.id] = true;
      }
    }
  }
  //   d3.selectAll('.node-circle').style('fill', 'red');
}

function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function run(graph) {
  graph.links.forEach(function(d) {
    // d.source = d.source_id;
    // d.target = d.target_id;
  });

  var link = svg
    .append('g')
    .style('stroke', '#aaa')
    .selectAll('line')
    .data(graph.links)
    .enter()
    .append('line');

  var node = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(graph.nodes)
    .enter()
    .append('circle')
    .attr('class', 'node-circle')
    .style('fill', 'white')
    .attr('id', function(d) {
      //   console.log('this d in circle', d);
      return 'node_' + d.id;
    })
    .attr('r', 2)
    .call(
      d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    );

  var label = svg
    .append('g')
    .attr('class', 'labels')
    .selectAll('text')
    .data(graph.nodes)
    .enter()
    .append('text')
    .attr('class', 'label')
    .text(function(d) {
      return d.id;
    });

  simulation.nodes(graph.nodes).on('tick', ticked);

  simulation.force('link').links(graph.links);

  function ticked() {
    link
      .attr('x1', function(d) {
        return d.source.x;
      })
      .attr('y1', function(d) {
        return d.source.y;
      })
      .attr('x2', function(d) {
        return d.target.x;
      })
      .attr('y2', function(d) {
        return d.target.y;
      });

    node
      .attr('r', 16)
      .style('stroke', '#424242')
      .style('stroke-width', '1px')
      .attr('cx', function(d) {
        return d.x + 5;
      })
      .attr('cy', function(d) {
        return d.y - 3;
      });

    label
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y;
      })
      .style('font-size', '10px')
      .style('fill', '#333');
  }
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
  //  simulation.fix(d);
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
  //  simulation.fix(d, d3.event.x, d3.event.y);
}

function dragended(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
  if (!d3.event.active) simulation.alphaTarget(0);
  //simulation.unfix(d);
}

run(graph);
