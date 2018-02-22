# Virtual Dom

## 介绍

原生 JavaScript 实现 Virtual DOM

## 依赖

原生 JavaScript 实现，无依赖。

## 使用

```js
import el from '../element'
import diff from '../diff'
import patch from '../patch'

//1. use `el(tagName, [propeties], children)` to create a virtual dom tree
let tree = el('div', {
    'id': 'container'
}, [
    el('h1', {
        style: 'color: blue'
    }, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li')])
])

// 2. generate a real dom from virtual dom. `root` is a `div` element
let root = tree.render()
document.body.appendChild(root)
// 3. generate another different virtual dom tree
let newTree = el('div', {
    'id': 'container'
}, [
    el('h1', {
        style: 'color: red'
    }, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li'), el('li')])
])
setTimeout(() => {
    // 4. diff two virtual dom trees and get patches
    let patches = diff(tree, newTree)

    // 5. apply patches to real dom
    patch(root, patches)


},5000)
```

## VirtualDOM 算法

1. 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
1. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
1. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

## element.js

- 用JS对象模拟DOM树

## diff.js

- 深度优先遍历，记录差异,在实际的代码中，会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记：

- 在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。

- 上面说的节点的差异指的是什么呢？对 DOM 操作可能会：

- - 替换掉原来的节点，例如把上面的div换成了section
- - 移动、删除、新增子节点，例如上面div的子节点，把p和ul顺序互换
- - 修改了节点的属性
- - 对于文本节点，文本内容可能会改变。例如修改上面的文本节点2内容为Virtual DOM 2。

```js
    TEXT: 'TEXT',
    PROPS: 'PROPS',
    REPLACE: 'REPLACE',
    REMOVE: 'REMOVE',
    APPEND: 'APPEND'

```

## patch.js

- 把差异应用到真正的DOM树上
