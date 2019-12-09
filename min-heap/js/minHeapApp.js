var MinHeap = new MinHeap();
var MinHeapD3 = new MinHeapD3('svg');

var handlePush = function() {
  var input = document.getElementById('controls-input');
  MinHeap.push(Number(input.value));
  input.value = '';
  input.focus();
  visualize();
};

var handlePop = function() {
  var popped = MinHeap.pop();
  alert('The popped value is ' + popped);
  visualize();
};

var handleClear = function() {
  MinHeap.clear();
  visualize();
};

var visualize = function() {
  MinHeapD3.clearTree();
  MinHeapD3.drawTree(MinHeap, 0);
};

var initialize = function() {
  MinHeap.clear();
  for (let i = 0; i < 10; i++) {
    const random = Math.floor(Math.random() * 25);
    MinHeap.push(random);
  }
  visualize();
};

initialize();
