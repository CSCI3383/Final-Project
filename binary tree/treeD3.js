var array = [];

var treeData = new Tree('0', 0);
array.push(treeData);

var addNextChild = function(value, array) {
  const node = new Tree(value, array.length);
  const nextSpot = Math.floor((array.length - 1) / 2);
  array.push(node);
  array[nextSpot].addChild(node, array.length);
};

var addBT = function() {
  var value = document.getElementById('controls-input').value;
  console.log('Add bt', value);
  addNextChild(value, array);
  test();
  console.log('after', root);
};

addNextChild('1', array);
addNextChild('2', array);
addNextChild('3', array);
addNextChild('4', array);
addNextChild('5', array);
addNextChild('6', array);

var i = 0,
  duration = 750,
  root;

var margin = { top: 20, right: 90, bottom: 30, left: 90 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var svg = d3
  .select('body')
  .append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var treemap = d3.tree().size([height, width]);
// declares a tree layout and assigns the size
function test() {
  d3.select('g')
    .selectAll('*')
    .remove();
  // Assigns parent, children, height, depth
  root = d3.hierarchy(treeData, function(d) {
    return d.children;
  });
  root.x0 = height / 2;
  root.y0 = 0;

  // Collapse after the second level
  root.children.forEach(collapse);
  console.log('asdsad');
  update(root);
}
test();

// Collapse the node and all it's children
function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d._children = null;
  }
}

function update(source) {
  // Assigns the x and y position for the nodes
  var treeData = treemap(root);
  console.log('update', treeData);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
    links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) {
    d.y = d.depth * 180;
  });

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node').data(nodes, function(d) {
    return d.id || (d.id = ++i);
  });

  var count = 0;
  // Enter any new modes at the parent's previous position.
  var nodeEnter = node
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function(d) {
      return 'translate(' + source.y0 + ',' + source.x0 + ')';
    })
    .on('click', click);

  // Add Circle for the nodes

  nodeEnter
    .append('circle')
    .attr('class', 'node')
    .attr('r', 1e-6)
    .style('fill', function(d) {
      return d._children ? 'lightsteelblue' : '#fff';
    });

  // Add labels for the nodes
  nodeEnter
    .append('text')
    .attr('dy', '.35em')
    .attr('x', function(d) {
      return d.children || d._children ? -13 : 13;
    })
    .attr('text-anchor', function(d) {
      return d.children || d._children ? 'end' : 'start';
    })
    .text(function(d) {
      return d.data.name;
    });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate
    .transition()
    .duration(duration)
    .attr('transform', function(d) {
      return 'translate(' + d.y + ',' + d.x + ')';
    });

  // Update the node attributes and style
  nodeUpdate
    .select('circle.node')
    .attr('id', function(d) {
      return 'node_' + d.data.index;
    })
    .attr('r', 10)
    .style('fill', function(d) {
      return d._children != d.children ? 'black' : 'pink';
    })
    .attr('cursor', 'pointer');

  // Remove any exiting nodes
  var nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr('transform', function(d) {
      return 'translate(' + source.y + ',' + source.x + ')';
    })
    .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle').attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text').style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link').data(links, function(d) {
    return d.id;
  });

  // Enter any new links at the parent's previous position.
  var linkEnter = link
    .enter()
    .insert('path', 'g')
    .attr('class', 'link')
    .attr('d', function(d) {
      var o = { x: source.x0, y: source.y0 };
      return diagonal(o, o);
    });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate
    .transition()
    .duration(duration)
    .attr('d', function(d) {
      return diagonal(d, d.parent);
    });

  // Remove any exiting links
  var linkExit = link
    .exit()
    .transition()
    .duration(duration)
    .attr('d', function(d) {
      var o = { x: source.x, y: source.y };
      return diagonal(o, o);
    })
    .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {
    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;

    return path;
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }
}

function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
}

const stack = [];

async function DFS(treeData) {
  d3.selectAll('.node').style('fill', 'black');
  stack.push(treeData);
  while (stack.length > 0) {
    await timer(1000);
    const popped = stack.pop();
    const name = popped.index;
    d3.select('#node_' + name).style('fill', 'red');
    if (popped.children !== undefined && popped.children.length > 0) {
      for (let i = popped.children.length - 1; i >= 0; i--) {
        stack.push(popped.children[i]);
      }
    }
  }
}

const queue = [];

async function BFS(treeData) {
  d3.selectAll('.node').style('fill', 'black');
  queue.push(treeData);
  while (queue.length > 0) {
    const level = queue.length;
    for (let i = 0; i < level; i++) {
      await timer(1000);
      const popped = queue.shift();
      console.log('this is BFS', popped);
      const name = popped.index;
      d3.select('#node_' + name).style('fill', 'red');

      if (popped.children !== undefined && popped.children.length > 0) {
        for (let i = 0; i < popped.children.length; i++) {
          queue.push(popped.children[i]);
        }
      }
    }
  }
}
