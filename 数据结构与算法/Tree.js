
    function Node(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }

    function Tree(data) {
        let node = new Node(data);
        this._root = node;
    }

    Tree.prototype.traverseDF = function (callback) {
        (function resurse(currentNode) {
                for (let i = 0, length = currentNode.children.length; i < length; i++) {
                    resurse(currentNode.children[i]);
                }
                callback(currentNode);
            })(this._root);
    };
    //    let tree = new Tree('one');
    //
    //    tree._root.children.push(new Node('two'));
    //    tree._root.children[0].parent = tree;
    //
    //    tree._root.children.push(new Node('three'));
    //    tree._root.children[1].parent = tree;
    //
    //    tree._root.children.push(new Node('four'));
    //    tree._root.children[2].parent = tree;
    //
    //    tree._root.children[0].children.push(new Node('five'));
    //    tree._root.children[0].children[0].parent = tree._root.children[0];
    //
    //    tree._root.children[0].children.push(new Node('six'));
    //    tree._root.children[0].children[1].parent = tree._root.children[0];
    //
    //    tree._root.children[2].children.push(new Node('seven'));
    //    tree._root.children[2].children[0].parent = tree._root.children[2];

    Tree.prototype.contains = function (callback, traversal) {
        traversal.call(this, callback);
    };

    //    tree.contains(function (node) {
    //        if(node.data==='two'){
    //            console.log(node)
    //        }
    //    },tree.traverseDF);


    Tree.prototype.add = function (data, toData, traversal) {
        let child = new Node(data),
            parent = null,
            callback = function (node) {
                if (node.data === toData) {
                    parent = node
                }
            };
        this.contains(callback, traversal);
        if (parent) {
            parent.children.push(child);
            child.parent = parent;
        } else {
            throw new Error('can not add node to non-existent parent')
        }
    };

    //    let ceo = new Tree('CEO');
    //    ceo.add('VP of Happiness ','CEO',ceo.traverseDF)
    //
    //    console.dir(ceo);


    Tree.prototype.remove = function (data, fromData, traverasl) {
        let tree = this,
            parent = null,
            chiltToRemove = null,
            index;
        let callback = function (node) {
            if (node.data === fromData) {
                parent = node;
            }

        };

        function findIndex(arr, data) {
            let index;

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].data === data) {
                    index = i;
                }
            }

            return index;
        }

        this.contains(callback, traverasl);
        if (parent) {
            index = findIndex(parent.children, data);
            if (index === undefined) {
                throw new Error("node to remode does not exist")
            } else {
                chiltToRemove = parent.children.splice(index, 1);
            }
        } else {
            throw new Error("Parent does not exist")
        }

        return chiltToRemove;
    }
