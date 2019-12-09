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
