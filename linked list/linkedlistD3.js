var MAXRADIUS = 30;
var WIDTH = 900;
var HEIGHT = 500 - 97;
var TEXT_PADDING = 8;
var FONT_SIZE = 14;
var MARGIN = 24;

var linkedList = new LinkedList();
initializeLinkedList(linkedList);

var data = flattenLinkedList(linkedList);
var svg = d3
  .select('#anchor')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)
  .append('g')
  .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')');

var BOX_SIZE = (2 * (WIDTH - 2 * MARGIN)) / (data.length + 1);
var BOX_PORTION_OFFSET = MAXRADIUS * 2;
var MAX_BOX_PORTION = HEIGHT - BOX_PORTION_OFFSET;

svg
  .selectAll('.nodes-rect')
  .data(data, function(d) {
    return d;
  })
  .enter()
  .append('rect')
  .attr('class', 'nodes-rect')
  .attr('x', function(d, i) {
    return (i * BOX_SIZE) / 2;
  })
  .attr('y', function(d, i) {
    return (
      BOX_PORTION_OFFSET +
      (i * (MAX_BOX_PORTION - BOX_SIZE - 2 * MARGIN)) / (data.length - 1)
    );
  })
  .attr('width', BOX_SIZE)
  .attr('height', BOX_SIZE)
  .attr('rx', BOX_SIZE / 10)
  .attr('ry', BOX_SIZE / 10)
  .attr('fill', 'white')
  .attr('stroke', '#665A88')
  .attr('opacity', 0.85);

svg
  .selectAll('.nodes-text')
  .data(data, function(d) {
    return d;
  })
  .enter()
  .append('text')
  .attr('class', 'nodes-text')
  .attr('font-size', FONT_SIZE)
  .attr('x', function(d, i) {
    return (i * BOX_SIZE) / 2 + TEXT_PADDING;
  })
  .attr('y', function(d, i) {
    return (
      BOX_PORTION_OFFSET +
      (i * (MAX_BOX_PORTION - BOX_SIZE - 2 * MARGIN)) / (data.length - 1) +
      FONT_SIZE +
      TEXT_PADDING
    );
  })
  .text(function(d, i) {
    if (i === 0) return d + ' (Head)';
    if (i === data.length - 1) return d + ' (Tail)';
    return d;
  })
  .attr('fill', '#665A88');

function updateViz() {
  var data = flattenLinkedList(linkedList);
  console.log('this is data', data);
  /*    var nodesCirc = svg.selectAll('.nodes-circ').data(data, function(d){return d;});*/
  var nodesRect = svg.selectAll('.nodes-rect').data(data, function(d, i) {
    return i;
  });
  var nodesText = svg.selectAll('.nodes-text').data(data, function(d, i) {
    return i;
  });

  // update
  BOX_SIZE = (2 * (WIDTH - 2 * MARGIN)) / (data.length + 1);
  nodesRect
    .transition()
    .duration(1000)
    .attr('x', function(d, i) {
      return (i * BOX_SIZE) / 2;
    })
    .attr('y', function(d, i) {
      return (
        BOX_PORTION_OFFSET +
        (i * (MAX_BOX_PORTION - BOX_SIZE - 2 * MARGIN)) / (data.length - 1)
      );
    })
    .attr('width', BOX_SIZE)
    .attr('height', BOX_SIZE)
    .attr('rx', BOX_SIZE / 10)
    .attr('ry', BOX_SIZE / 10);
  nodesText
    .transition()
    .duration(1000)
    .attr('x', function(d, i) {
      return (i * BOX_SIZE) / 2 + TEXT_PADDING;
    })
    .attr('y', function(d, i) {
      return (
        BOX_PORTION_OFFSET +
        (i * (MAX_BOX_PORTION - BOX_SIZE - 2 * MARGIN)) / (data.length - 1) +
        FONT_SIZE +
        TEXT_PADDING
      );
    })
    .text(function(d, i) {
      if (i === 0) return d + ' (Head)';
      if (i === data.length - 1) return d + ' (Tail)';
      return d;
    });

  // enter
  /*    nodesCirc.enter()
    .append('circle')
      .attr('class', 'nodes-circ')
      .attr('r', function(d){return d/25;})
      .attr('cx', function(d, i){return i * (BOX_SIZE)/2 + BOX_SIZE/2;})
      .attr('cy', MAXRADIUS)
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('opacity', 0.85)
      */

  nodesRect
    .enter()
    .append('rect')
    .attr('class', 'nodes-rect')
    .attr('x', function(d, i) {
      return (i * BOX_SIZE) / 2;
    })
    .attr('y', function(d, i) {
      return (
        BOX_PORTION_OFFSET +
        (i * (MAX_BOX_PORTION - BOX_SIZE - 2 * MARGIN)) / (data.length - 1)
      );
    })
    .attr('width', BOX_SIZE)
    .attr('height', BOX_SIZE)
    .attr('rx', BOX_SIZE / 10)
    .attr('ry', BOX_SIZE / 10)
    .attr('fill', 'white')
    .attr('stroke', '#665A88')
    .attr('opacity', 0.85);

  nodesText
    .enter()
    .append('text')
    .attr('class', 'nodes-text')
    .attr('font-size', FONT_SIZE)
    .attr('x', function(d, i) {
      return (i * BOX_SIZE) / 2 + TEXT_PADDING;
    })
    .attr('y', function(d, i) {
      return (
        BOX_PORTION_OFFSET +
        (i * (MAX_BOX_PORTION - BOX_SIZE - 2 * MARGIN)) / (data.length - 1) +
        FONT_SIZE +
        TEXT_PADDING
      );
    })
    .text(function(d, i) {
      if (i === 0) return d + ' (Head)';
      if (i === data.length - 1) return d + ' (Tail)';
      return d;
    })
    .attr('fill', '#665A88');

  //exit
  /*    nodesCirc.exit()
    .transition().duration(1000)
      .attr('opacity', 0)
    .remove()*/

  nodesRect
    .exit()
    .transition()
    .duration(1000)
    .attr('opacity', 0)
    .remove();

  nodesText
    .exit()
    .transition()
    .duration(1000)
    .attr('opacity', 0)
    .remove();
}

function flattenLinkedList(linkedList) {
  var data = [];
  var cursor = linkedList.head;
  while (cursor && cursor.value) {
    data.push(cursor.value);
    cursor = cursor.next;
  }
  return data;
}

function initializeLinkedList(linkedList) {
  var initializeAmount = d3.range(0, 11);
  initializeAmount.forEach(function() {
    linkedList.addToTail(Math.round(Math.random() * MAXRADIUS * 25));
  });
}

function randomLinkedListAction(linkedList) {
  var action = Math.round(Math.random() * 1);
}

function manualAddToTail() {
  var value = document.getElementById('controls-input').value;
  console.log('this is value', value);
  linkedList.addToTail(value);
  updateViz();
}
function manualRemoveHead() {
  var value = linkedList.removeHead();
  updateViz();
}

function manualAddToHead() {
  var value = document.getElementById('controls-input').value;
  linkedList.addToHead(value);
  updateViz();
}
