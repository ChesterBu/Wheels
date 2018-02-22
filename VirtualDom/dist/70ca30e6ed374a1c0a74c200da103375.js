// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _ = {
    type: function type(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    },
    isArray: function isArray(list) {
        return _.type(list) === 'Array';
    },
    slice: function slice(arrayLike, index) {
        return Array.prototype.slice.call(arrayLike, index);
    },
    isUndefined: function isUndefined(value) {
        return typeof value === 'undefined';
    },
    isUndef: function isUndef(value) {
        return typeof value === 'undefined' || value === null;
    },
    truthy: function truthy(value) {
        return !!value;
    },
    isString: function isString(list) {
        return _.type(list) === 'String';
    },
    each: function each(array, fn) {
        for (var i = 0, len = array.length; i < len; i++) {
            fn(array[i], i);
        }
    },
    hump2lineae: function hump2lineae(str) {
        return str.replace(/[A-Z]/g, function (m, index) {
            return (index !== 0 ? '-' : '') + m.toLowerCase();
        });
    },
    toArray: function toArray(listLike) {
        if (!listLike) {
            return [];
        }

        var list = [];

        for (var i = 0, len = listLike.length; i < len; i++) {
            list.push(listLike[i]);
        }

        return list;
    },
    setAttr: function setAttr(node, key, value) {
        switch (key) {
            case 'style':
                node.style.cssText = value;
                break;
            case 'value':
                var tagName = node.tagName || '';
                tagName = tagName.toLowerCase();
                if (tagName === 'input' || tagName === 'textarea') {
                    node.value = value;
                } else {
                    // if it is not a input or textarea, use `setAttribute` to set
                    node.setAttribute(key, value);
                }
                break;
            default:
                node.setAttribute(key, value);
                break;
        }
    }
};

exports.default = _;
},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function el(tagName, props, children) {
    if (!(this instanceof Element)) {
        //处理传入children不是数组的情况
        if (!_util2.default.isArray(children) && children != null) {
            children = _util2.default.slice(arguments, 2).filter(_util2.default.truthy);
        }
        return new Element(tagName, props, children);
    }
}

var Element = function () {
    function Element(tagName, props, children) {
        _classCallCheck(this, Element);

        //处理没有props的情况
        if (_util2.default.isArray(props)) {
            children = props;
            props = {};
        }
        this.tagName = tagName;
        this.props = props || {};
        this.children = children || [];
        //标识符，tagName可能会相同,所以传入的props中最好有个key
        this.key = props ? props.key : void 0;
        var count = 0;
        _util2.default.each(this.children, function (child, i) {
            if (child instanceof Element) {
                count += child.count;
            } else {
                children[i] = '' + child;
            }
            count++;
        });
        this.count = count;
    }
    //将js对象渲染成Dom节点


    _createClass(Element, [{
        key: 'render',
        value: function render() {
            var el = document.createElement(this.tagName);
            var props = this.props;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref = _step.value;

                    var _ref2 = _slicedToArray(_ref, 2);

                    var propName = _ref2[0];
                    var propValue = _ref2[1];

                    _util2.default.setAttr(el, propName, propValue); //设置节点的DOM属性
                }
                //递归渲染children
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            _util2.default.each(this.children, function (child) {
                var childEl = child instanceof Element ? child.render() : // 如果子节点也是虚拟DOM，递归构建DOM节点
                document.createTextNode(child); // 如果字符串，只构建文本节点
                el.appendChild(childEl);
            });
            return el;
        }
    }]);

    return Element;
}();

exports.default = el;
},{"./util":12}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.types = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = patch;

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = exports.types = {
    TEXT: 'TEXT',
    PROPS: 'PROPS',
    REPLACE: 'REPLACE',
    REMOVE: 'REMOVE',
    APPEND: 'APPEND'
};

function patch(node, patches) {
    var walker = { //遍历的节点index
        index: 0
    };
    dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
    var currentPatches = patches[walker.index]; // 从patches拿出当前节点的差异

    var len = node.childNodes ? node.childNodes.length : 0;
    for (var i = 0; i < len; i++) {
        var child = node.childNodes[i];
        walker.index++;
        dfsWalk(child, walker, patches); //深度遍历子节点
    }
    //有变化就改
    if (currentPatches) {
        applyPatches(node, currentPatches);
    }
}

function applyPatches(node, currentPatches) {
    var removeCount = 0;
    _util2.default.each(currentPatches, function (currentPatch) {
        switch (currentPatch.type) {
            case types.REPLACE:
                var newNode = typeof currentPatch.node === 'string' ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
                node.parentNode.replaceChild(newNode, node);
                break;

            case types.APPEND:
                var insertNode = _typeof(currentPatch.node) === 'object' ? currentPatch.node.render() : document.createTextNode(currentPatch.node);
                node.appendChild(insertNode);
                break;
            case types.REMOVE:
                //remove之后传的index会有变化
                var removeIndex = currentPatch.index - removeCount;
                node.removeChild(node.childNodes[removeIndex]);
                removeCount++;
                break;
            case types.PROPS:
                setProps(node, currentPatch.props);
                break;
            case types.TEXT:
                if (node.textContent) node.textContent = currentPatch.content;
                break;
            default:
                throw new Error('Unknown patch type ' + currentPatch.type);
        }
    });
}

function setProps(node, props) {
    for (var key in props) {
        if (_util2.default.isUndefined(props[key])) {
            node.removeAttribute(key);
        } else {
            var value = props[key];
            _util2.default.setAttr(node, key, value);
        }
    }
}
},{"./util":12}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (oldTree, newTree) {
    var index = 0; // 当前节点的标志
    var patches = {}; // 用来记录每个节点差异的对象
    //在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
};

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _patch = require('./patch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dfsWalk(oldNode, newNode, index, patches) {
    // 对比oldNode和newNode的不同，记录下来
    //先进行本层的对比
    var currentPatch = [];
    // Node is removed.

    if (_util2.default.isUndef(newNode)) {
        // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here

        //处理文本节点
    } else if (_util2.default.isString(oldNode) && _util2.default.isString(newNode)) {
        //不同的话记录
        if (newNode !== oldNode) {
            currentPatch.push({
                type: _patch.types.TEXT,
                content: newNode
            });
        }
        // Nodes are the same, diff props andchildren
    } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
        // diff props
        var propsPatches = diffProps(oldNode, newNode);
        if (propsPatches) {
            currentPatch.push({
                type: _patch.types.PROPS,
                props: propsPatches
            });
        }
        // diff children
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
        // Nodes are not the same, replace the old node with new node
    } else {
        currentPatch.push({
            type: _patch.types.REPLACE,
            node: newNode
        });
    }
    //如果有变化的话，patches记录
    if (currentPatch.length) {
        patches[index] = currentPatch;
    }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    var leftNode = null;
    var currentNodeIndex = index;
    //处理长为oldChildren.length这段
    _util2.default.each(oldChildren, function (child, i) {
        var newChild = newChildren[i];
        //存在这个节点
        if (newChild) {
            //遍历是用的深度便利，所以每个节点都会有唯一的index
            currentNodeIndex = leftNode && leftNode.count ? //计算节点标识
            currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
            dfsWalk(child, newChild, currentNodeIndex, patches); // 深度遍历子节点
            leftNode = child;
            //没有这个节点
        } else {
            currentPatch.push({
                type: _patch.types.REMOVE,
                index: i
            });
        }
    });
    //多了节点的情况
    if (oldChildren.length < newChildren.length) {
        var i = oldChildren.length;
        while (i < newChildren.length) {
            var newChild = newChildren[i];
            currentPatch.push({
                type: _patch.types.APPEND,
                node: newChild
            });
            i++;
        }
    }
}

function diffProps(oldNode, newNode) {
    var hasDiff = false;
    var oldProps = oldNode.props;
    var newProps = newNode.props;

    var propsPatches = {};

    // Find out different properties
    for (var key in oldProps) {
        var value = oldProps[key];
        if (newProps[key] !== value) {
            hasDiff = true;
            propsPatches[key] = newProps[key];
        }
    }

    // Find out new property
    for (var _key in newProps) {
        var _value = newProps[_key];
        if (!oldProps.hasOwnProperty(_key)) {
            hasDiff = true;
            propsPatches[_key] = newProps[_key];
        }
    }

    if (hasDiff) {
        return propsPatches;
    }
    // If properties all are identical
    return null;
}
},{"./util":12,"./patch":8}],4:[function(require,module,exports) {
'use strict';

var _element = require('../element');

var _element2 = _interopRequireDefault(_element);

var _diff = require('../diff');

var _diff2 = _interopRequireDefault(_diff);

var _patch = require('../patch');

var _patch2 = _interopRequireDefault(_patch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//1. use `el(tagName, [propeties], children)` to create a virtual dom tree
var tree = (0, _element2.default)('div', {
    'id': 'container'
}, [(0, _element2.default)('h1', {
    style: 'color: blue'
}, ['simple virtal dom']), (0, _element2.default)('p', ['Hello, virtual-dom']), (0, _element2.default)('ul', [(0, _element2.default)('li')])]);

// 2. generate a real dom from virtual dom. `root` is a `div` element
var root = tree.render();
document.body.appendChild(root);
// 3. generate another different virtual dom tree
var newTree = (0, _element2.default)('div', {
    'id': 'container'
}, [(0, _element2.default)('h1', {
    style: 'color: red'
}, ['simple virtal dom']), (0, _element2.default)('p', ['Hello, virtual-dom']), (0, _element2.default)('ul', [(0, _element2.default)('li'), (0, _element2.default)('li')])]);
setTimeout(function () {
    // 4. diff two virtual dom trees and get patches
    var patches = (0, _diff2.default)(tree, newTree);

    // 5. apply patches to real dom
    (0, _patch2.default)(root, patches);
}, 5000);
},{"../element":6,"../diff":7,"../patch":8}],14:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '51794' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[14,4])
//# sourceMappingURL=/dist/70ca30e6ed374a1c0a74c200da103375.map