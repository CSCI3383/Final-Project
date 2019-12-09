var array = [];

var Tree = function(name, index) {
  this.name = name;
  this.index = index;
  this.children = [];
  this.parent = null;
};

Tree.prototype.setParentNode = function(Tree) {
  this.parent = Tree;
};

Tree.prototype.getParentNode = function() {
  return this.parent;
};

Tree.prototype.addChild = function(node) {
  node.setParentNode(this);
  this.children.push(node);
};

Tree.prototype.getChildren = function() {
  return this.children;
};

Tree.prototype.removeChildren = function() {
  this.children = [];
};

// var root = new Tree('root');
// i = 0;
// root.addChild(new Tree('child 0', i++));
// root.addChild(new Tree('child 1', i++));
// var children = root.getChildren();
// for (var i = 0; i < children.length; i++) {
//   for (var j = 0; j < 5; j++) {
//     children[i].addChild(new Tree('second level child ' + j));
//   }
// }
// console.log(root);
// children[0].removeChildren();
// console.log(root);
// console.log(root.getParentNode());
// console.log(children[1].getParentNode());
