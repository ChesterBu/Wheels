/*jshint esversion: 6 */
(function() {
        let root = (typeof self == 'object' && self.self == self && self) ||
            (typeof global == 'object' && global.global == global && global) ||
            this || {};

        const util = {
            extend(target) {
                for (let i = 0, len = arguments.length; i < len; i++) {
                    for (let prop in arguments[i]) {
                        if (arguments[i].hasOwnProperty(prop)) {
                            target[prop] = arguments[i][prop];
                        }
                    }
                }
                return target;
            },
            getStyle(element, prop) {
                return window.getComputedStyle(element)[prop];
            },
            getSrollOffsets() {
                return {
                    x: window.scrollX,
                    y: window.scrollY
                };
            },
            addClass(element, className) {
                let classNames = element.className.split(/\s+/);
                if (classNames.indexOf(className) === -1) {
                    classNames.push(className);
                }
                element.className = classNames.join(' ');
            },
            removeClass(element, className) {
                let classNames = element.className;
                let index = classNames.indexOf(className);
                if (index !== -1) {
                    classNames.splice(index, 1);
                }
                element.className = classNames.join(' ');
            },
            removeProperty(element, name) {
                element.style.removeProperty(name);
            },
            isValidListener(listener) {
                if (typeof listener === 'function') {
                    return true;
                } else if (listener && typeof listener === 'object') {
                    return isValidListener(listener.listener);
                } else {
                    return false;
                }
            }
        };

    class EventEmitter {
        constructor() {
            this._events = {};
        }



        /**
         * 添加事件
         * @param  {String} eventName 事件名称
         * @param  {Function} listener 监听器函数
         * @return {Object} 可链式调用
         */
        on(eventName, listener) {
            if (!eventName || !listener) return;
            if (!util.isValidListener(listener)) {
                throw new TypeError('listener must be a function');
            }
            let events = this._events;
            let listeners = events[eventName] = events[eventName] || [];
            let listenerIsWrapped = typeof listener === 'object';
            //不重复添加事件
            if (listeners.indexOf(listener) === -1) {
                listeners.push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
            return this;
        }

        /**
         * 添加事件，该事件只能被执行一次
         * @param  {String} eventName 事件名称
         * @param  {Function} listener 监听器函数
         * @return {Object} 可链式调用
         */
        once(eventName, listener) {
            return this.on(eventName, {
                listener: listener,
                once: true
            });
        }

        /**
         * 删除事件
         * @param  {String} eventName 事件名称
         * @param  {Function} listener 监听器函数
         * @return {Object} 可链式调用
         */
        off(eventName, listener) {
            let listeners = this._events[eventName];
            if (!listeners) return;
            this._events[eventName] = listeners.filter(listenObj => listenObj.listener !== listener);

            return this;
        }

        /**
         * 触发事件
         * @param  {String} eventName 事件名称
         * @param  {Array} args 传入监听器函数的参数，使用数组形式传入
         * @return {Object} 可链式调用
         */
        emit(eventName, args) {
            let self = this;
            let listeners = self._events[eventName];
            if (!listeners) return;
            listeners.map((listenObj) => {
                listenObj.listener.apply(self, args || []);
                if (listenObj.once) {
                    self.off(eventName, listenObj.listener);
                }
            });
            return self;
        }

    }

    class Sticky extends EventEmitter {

        constructor(element, options) {
            super();
            this.element = typeof element === 'string' ? document.querySelector(element) : element;
            this.options = util.extend({}, this.constructor.defaultOptions, options);
            this.init();
        }

        init() {
            this.calculateElement();
            this.bindScrollEvent();
        }

        calculateElement() {
            if (this.element) {
                let rect = this.element.getBoundingClientRect();
                this.eLeft = rect.left + util.getSrollOffsets().x;
                this.eTop = rect.top + util.getSrollOffsets().y - this.options.offset;
            }
        }

        bindScrollEvent() {
            let self = this;
            window.addEventListener('scroll', function(event) {
                if (util.getSrollOffsets().y > self.eTop) {
                    self.setSticky();
                } else {
                    self.setNormal();
                }
            });
        }

        setSticky() {
            if (this.status === 'sticky') return;
            this.status = 'sticky';
            util.addClass(this.element, 'sticky');
            this.setElementSticky();
            this.emit('onSticky');
        }
        setNormal() {
            if (this.status !== "sticky") return;
            this.status = "normal";
            util.removeClass(this.element, 'sticky');
            this.setElementNormal();
            this.emit("onDetach");
        }
        setElementSticky() {
            this.element.style.position = "fixed";
            this.element.style.left = this.eLeft + 'px';
            this.element.style.top = this.options.offset + 'px';
        }
        setElementNormal() {
            util.removeProperty(this.element, "position");
            util.removeProperty(this.element, "left");
            util.removeProperty(this.element, "top");
        }
    }

    Sticky.defaultOptions = {
        offset: 0
    };




    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = Sticky;
        }
        exports.Sticky = Sticky;
    } else {
        root.Sticky = Sticky;
    }
}());
