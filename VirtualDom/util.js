let _ = {

    type(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
    },
    isArray(list) {
        return _.type(list) === 'Array'
    },
    slice(arrayLike, index) {
        return Array.prototype.slice.call(arrayLike, index)
    },
    isUndefined(value) {
        return typeof value === 'undefined';
    },
    isUndef(value){
        return typeof value === 'undefined' || value === null;
    },
    truthy(value) {
        return !!value
    },
    isString(list) {
        return _.type(list) === 'String'
    },
    each(array, fn) {
        for (let i = 0, len = array.length; i < len; i++) {
            fn(array[i], i)
        }
    },
    hump2lineae(str) {
        return str.replace(/[A-Z]/g, function(m, index) {
            return (index !== 0 ? '-' : '') + m.toLowerCase();
        });
    },
    toArray(listLike) {
        if (!listLike) {
            return []
        }

        let list = []

        for (let i = 0, len = listLike.length; i < len; i++) {
            list.push(listLike[i])
        }

        return list
    },
    setAttr(node, key, value) {
        switch (key) {
            case 'style':
                node.style.cssText = value
                break
            case 'value':
                let tagName = node.tagName || ''
                tagName = tagName.toLowerCase()
                if (tagName === 'input' || tagName === 'textarea') {
                    node.value = value
                } else {
                    // if it is not a input or textarea, use `setAttribute` to set
                    node.setAttribute(key, value)
                }
                break
            default:
                node.setAttribute(key, value)
                break
        }
    }
}

export default _