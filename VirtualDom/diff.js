import _ from './util';

import {
    types
} from './patch';

export default function (oldTree, newTree) {
    let index = 0; // 当前节点的标志
    let patches = {}; // 用来记录每个节点差异的对象
    //在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
}

function dfsWalk(oldNode, newNode, index, patches) {
    // 对比oldNode和newNode的不同，记录下来
    //先进行本层的对比
    let currentPatch = [];
    // Node is removed.

    if (_.isUndef(newNode)) {
        // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here

        //处理文本节点
    } else if (_.isString(oldNode) && _.isString(newNode)) {
        //不同的话记录
        if (newNode !== oldNode) {
            currentPatch.push({
                type: types.TEXT,
                content: newNode
            });
        }
        // Nodes are the same, diff props andchildren
    } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
        // diff props
        let propsPatches = diffProps(oldNode, newNode);
        if (propsPatches) {
            currentPatch.push({
                type: types.PROPS,
                props: propsPatches
            });
        }
        // diff children
        diffChildren(
            oldNode.children,
            newNode.children,
            index,
            patches,
            currentPatch
        );
        // Nodes are not the same, replace the old node with new node
    } else {
        currentPatch.push({
            type: types.REPLACE,
            node: newNode
        });
    }
    //如果有变化的话，patches记录
    if (currentPatch.length) {
        patches[index] = currentPatch;
    }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    let leftNode = null
    let currentNodeIndex = index
    //处理长为oldChildren.length这段
    _.each(oldChildren, (child, i) => {
        let newChild = newChildren[i]
        //存在这个节点
        if (newChild) {
            //遍历是用的深度便利，所以每个节点都会有唯一的index
            currentNodeIndex = (leftNode && leftNode.count) ?  //计算节点标识
                currentNodeIndex + leftNode.count + 1 :
                currentNodeIndex + 1
            dfsWalk(child, newChild, currentNodeIndex, patches)   // 深度遍历子节点
            leftNode = child
        //没有这个节点
        } else {
            currentPatch.push({
                type: types.REMOVE,
                index: i
            })
        }
    })
    //多了节点的情况
    if (oldChildren.length < newChildren.length) {
        let i = oldChildren.length
        while (i < newChildren.length) {
            let newChild = newChildren[i]
            currentPatch.push({
                type: types.APPEND,
                node: newChild
            })
            i++
        }
    }
}

function diffProps(oldNode, newNode) {
    let hasDiff = false;
    let oldProps = oldNode.props;
    let newProps = newNode.props;

    let propsPatches = {};

    // Find out different properties
    for (let key in oldProps) {
        let value = oldProps[key];
        if (newProps[key] !== value) {
            hasDiff = true;
            propsPatches[key] = newProps[key];
        }
    }

    // Find out new property
    for (let key in newProps) {
        let value = newProps[key];
        if (!oldProps.hasOwnProperty(key)) {
            hasDiff = true;
            propsPatches[key] = newProps[key];
        }
    }

    if (hasDiff) {
        return propsPatches;
    }
    // If properties all are identical
    return null;

}