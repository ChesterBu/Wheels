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