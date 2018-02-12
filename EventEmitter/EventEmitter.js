(function () {
    //抄自underscore用于将 root指向全局对象
    let root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this || {};


    class EventEmitter {
        constructor() {
            this._events = {};
        }
        static isValidListener(listener) {
            if (typeof listener === 'function') {
                return true;
            } else if (listener && typeof listener === 'object') {
                return isValidListener(listener.listener);
            } else {
                return false;
            }
        }
        /**
         * 添加事件
         * @param  {String} eventName 事件名称
         * @param  {Function} listener 监听器函数
         * @return {Object} 可链式调用
         */
        on(eventName, listener) {
            if (!eventName || !listener) return;
            if (!EventEmitter.isValidListener(listener)) {
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

        /**
         * 删除某一个类型的所有事件或者所有事件
         * @param  {String[]} eventName 事件名称
         */
        offall(eventName) {
            if (eventName && this._events[eventName]) {
                this._events[eventName] = [];
            } else {
                this._events = {};
            }
        }
    }

    //导出
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = EventEmitter;
        }
        exports.EventEmitter = EventEmitter;
    } else {
        root.EventEmitter = EventEmitter;
    }

}());