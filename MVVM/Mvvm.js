function Mvvm(options = {}) {
    this.$options = options;
    let data = this._data = this.$options.data;
    observe(data);
    //实现数据代理
    Object.keys(data).forEach((key) => {
        Object.defineProperty(this, key, {
            enumerable: true,
            get() {
                return this._data[key];
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        });
    });
    initComputed.call(this);
    new Compile(options.el, this);
}

//简单实现computed
function initComputed() {
    let vm = this;
    let computed = this.$options.computed;
    Object.keys(computed).forEach((key) => {
        Object.defineProperty(vm,key, {
            get: typeof computed[key] === 'function' ? computed[key] : computed[key].get
        });
    });
}


//观察对象给对象增加object.defineProperty
function Observe(data) {
    let dep = new Dep();
    Object.keys(data).forEach((key) => {
        let val = data[key];
        observe(val); //如果val是对象。则递归调用
        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(newVal) {
                val = newVal;
                observe(val); //改变val后也要数据劫持
                dep.notify(); //让所有watcher的update方法执行
            }
        });
    });
}

function observe(data) {
    if (!data || typeof data !== 'object') return;
    return new Observe(data);
}

//解析模版指令
function Compile(el, vm) {
    //el:app
    vm.$el = document.querySelector(el);
    let frg = document.createDocumentFragment(),
        child;
    while (child = vm.$el.firstChild) {
        frg.appendChild(child);
    }
    (function replace(frg) {
        Array.from(frg.childNodes).forEach((node) => {
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;
            if (node.nodeType === 3 && reg.test(text)) {
                let arrs = RegExp.$1.split('.');
                let val = vm;
                arrs.forEach((key) => {
                    val = val[key];
                });
                //替换
                new Watcher(vm, RegExp.$1, function (newVal) {
                    node.textContent = text.replace(reg, newVal);
                });
                node.textContent = text.replace(reg, val);
            }
            if (node.nodeType === 1) {
                let nodeAttrs = node.attributes;
                Array.from(nodeAttrs).forEach((attr) => {
                    let name = attr.name;
                    let exp = attr.value;
                    if (name.indexOf('v-model') === 0) {
                        node.value = vm[exp];
                    }
                    new Watcher(vm, exp, function (newVal) {
                        node.value = newVal; //当watcher触发时会自动将内容放到输入框内；
                    });
                    node.addEventListener('input', function (e) {
                        let newVal = e.target.value;
                        vm[exp] = newVal;
                    });
                });
            }
            if (node.childNodes) {
                replace(node);
            }
        });
    }(frg));
    vm.$el.appendChild(frg);
}

//发布订阅
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(sub => sub.update());
    }
}
class Watcher {
    constructor(vm, exp, fn) {
        this.fn = fn;
        this.vm = vm;
        this.exp = exp;
        Dep.target = this;
        let val = vm;
        let arr = exp.split('.');   
        arr.forEach((k) => {
            val = val[k];       //触发getter 添加自己到属性订阅器中
        });
        Dep.target = null;
    }
    update() {
        let val = this.vm;
        let arr = this.exp.split('.');
        arr.forEach((k) => {
            val = val[k];
        });
        this.fn(val);
    }
}