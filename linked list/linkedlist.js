var LinkedList = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

LinkedList.prototype.addToTail = function(value) {
  var node = this.makeNode(value);
  if (!this.head) {
    this.head = node;
  }
  if (this.tail) {
    this.tail.next = node;
  }
  this.tail = node;
  this.length++;
};
LinkedList.prototype.removeHead = function() {
  if (this.head) {
    var currentHeadValue = this.head.value;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length--;
    return currentHeadValue;
  } else {
    console.log('No head to remove.');
  }
};
LinkedList.prototype.contains = function(value) {
  var currentNode = this.head;
  while (currentNode && currentNode.value) {
    if (currentNode.value === value) return true;
    currentNode = currentNode.next;
  }
  return false;
};

LinkedList.prototype.makeNode = function(value) {
  var node = {};
  node.value = value;
  node.next = null;
  return node;
};

LinkedList.prototype.addToHead = function(value) {
  var node = this.makeNode(value);

  if (!this.head) {
    this.head = node;
  } else {
    node.next = this.head;
  }
  this.length++;
  this.head = node;
};
