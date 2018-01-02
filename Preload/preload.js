(function () {
    let root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};

    const util = {
        extend(target) {
            for (var i = 1, len = arguments.length; i < len; i++) {
                for (var prop in arguments[i]) {
                    if (arguments[i].hasOwnProperty(prop)) {
                        target[prop] = arguments[i][prop]
                    }
                }
            }

            return target;
        },
        isValidListener(listener) {
            if (typeof listener === 'function') {
                return true;
            } else if (listener && typeof listener === 'object') {
                return util.isValidListener(listener.listener)
            } else {
                return false;
            }
        },

    }


    class Preload {
        constructor(pics, options) {
            if (!Array.isArray(pics)) {
                throw new Error('pics must be an array type')
            }
            this.pics = pics;
            this.options = util.extend({}, this.constructor.defaultOptions, options);
            this.index = this.failNum = 0;
            this.init();

        }

    }


    Preload.defaultOptions = {
        complete() {},
        progress() {}
    }







    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = Preload;
        }
        exports.Preload = Preload;
    } else {
        root.Preload = Preload;
    };

}());