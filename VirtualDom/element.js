import _ from './util'

function el(tagName, props, children) {
    if (!(this instanceof Element)) {
        //处理传入children不是数组的情况
        if (!_.isArray(children) && children != null) {
            children = _.slice(arguments, 2).filter(_.truthy)
        }
        return new Element(tagName, props, children)
    }
}


class Element {
    constructor(tagName, props, children) {
        //处理没有props的情况
        if (_.isArray(props)) {
            children = props
            props = {}
        }
        this.tagName = tagName
        this.props = props || {}
        this.children = children || []
        //标识符，tagName可能会相同,所以传入的props中最好有个key
        this.key = props ? props.key : void 0
        let count = 0
        _.each(this.children, (child, i) => {
            if (child instanceof Element) {
                count += child.count
            } else {
                children[i] = '' + child
            }
            count++
        })
        this.count = count
    }
    //将js对象渲染成Dom节点
    render() {
        let el = document.createElement(this.tagName)
        let props = this.props
        for (let [propName, propValue] of Object.entries(props)) {
            _.setAttr(el, propName, propValue)  //设置节点的DOM属性
        }
        //递归渲染children
        _.each(this.children, (child) => {
            let childEl = (child instanceof Element) ?
                child.render() :    // 如果子节点也是虚拟DOM，递归构建DOM节点
                document.createTextNode(child)  // 如果字符串，只构建文本节点
            el.appendChild(childEl)
        })
        return el
    }
}




export default el