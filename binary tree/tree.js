var Tree = function(name, index) {
  this.name = name;
  this.index = index;
  this.children = [];
};

Tree.prototype.insert = function(value, index) {
  var newTree = new Tree(value, index);
};

Tree.prototype.insertTree = function(root, tree) {
  if (root.children.length === 0) {
    root.children.push(tree);
  } else if (root.children.length === 1) {
    root.children.push(tree);
  } else {
  }
};

var treeData = {
  name: 1,
  children: [
    {
      name: 2,
      children: [
        { name: 4, children: [{ name: 8 }, { name: 9 }] },
        { name: 5, children: [{ name: 10 }, { name: 11 }] },
      ],
    },
    {
      name: 3,
      children: [{ name: 6 }, { name: 7 }, { name: 1232132 }],
    },
  ],
};

function insertData(treeData, value) {
  treeData.children[1].children.push();
}
