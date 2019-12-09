var maxHeap = new maxHeap();
var maxHeapVisualizer = new maxHeapVisualizer('svg');

var handlePush = function() {
  var input = document.getElementById('controls-input');
  maxHeap.push(Number(input.value));
  input.value = '';
  input.focus();
  visualize();
};

var handlePop = function() {
  var popped = maxHeap.pop();
  alert('The popped value is ' + popped);
  visualize();
};

var handleClear = function() {
  maxHeap.clear();
  visualize();
};

var visualize = function() {
  maxHeapVisualizer.clearTree();
  maxHeapVisualizer.drawTree(maxHeap, 0);
};

var initialize = function() {
  maxHeap.clear();
  for (let i = 0; i < 15; i += 2) {
    maxHeap.push(i);
  }
  visualize();
};

initialize();
