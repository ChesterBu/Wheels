import _ from './util';

export const types = {
    TEXT: 'TEXT',
    PROPS: 'PROPS',
    REPLACE: 'REPLACE',
    REMOVE: 'REMOVE',
    APPEND: 'APPEND'
};

export default function patch(node, patches) {
    let walker = { //遍历的节点index
        index: 0
    }
    dfsWalk(node, walker, patches)
}

function dfsWalk(node, walker, patches) {
    let currentPatches = patches[walker.index] // 从patches拿出当前节点的差异

    let len = node.childNodes ? node.childNodes.length : 0;
    for (let i = 0; i < len; i++) {
        let child = node.childNodes[i]
        walker.index++
            dfsWalk(child, walker, patches) //深度遍历子节点
    }
    //有变化就改
    if (currentPatches) {
        applyPatches(node, currentPatches)
    }
}

function applyPatches(node, currentPatches) {
    let removeCount = 0;
    _.each(currentPatches, (currentPatch) => {
        switch (currentPatch.type) {
            case types.REPLACE:
                let newNode = (typeof currentPatch.node === 'string') ? document.createTextNode(currentPatch.node) :
                    currentPatch.node.render()
                node.parentNode.replaceChild(newNode, node)
                break;
            
            case types.APPEND:
                let insertNode = (typeof currentPatch.node === 'object') ? currentPatch.node.render() : 
                document.createTextNode(currentPatch.node);
                node.appendChild(insertNode)
                break;
            case types.REMOVE:
                //remove之后传的index会有变化
                let removeIndex = currentPatch.index - removeCount;
                node.removeChild(node.childNodes[removeIndex])
                removeCount++
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
    for (let key in props) {
        if (_.isUndefined(props[key])) {
            node.removeAttribute(key);
        } else {
            let value = props[key];
            _.setAttr(node, key, value);
        }
    }
}