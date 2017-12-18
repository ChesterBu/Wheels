(function () {
    let root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelAnimationFrame']
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime()
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);

            }, timeToCall)
            lastTime = currTime + timeToCall;
            return id;
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id)
        }
    }
    Function.prototype.bind = Function.prototype.bind || function (context) {
        if (typeof this !== 'function') {
            throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
        }
        var self = this;
        var args = Array.prototype.slice.call(arguments, 1);
        var fNOP = function () {
        }
        var fBound = function () {
            var bindArgs = Array.prototype.slice.call(arguments);
            self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
            fNOP.prototype = this.prototype
            fBound.prototype = new fNOP()
            return fBound
        }
    }

    var util = {
        extend:function (target) {
            for(var i = 1,len = arguments.length;i<len;i++){
                for (var prop in arguments[i]){
                    if (arguments[i].hasOwnProperty(prop)){
                        target[prop] = arguments[i][prop]
                    }
                }
            }
            return target
        },
        getStyle:function (element,prop) {
            return element.currentStyle ? element.currentStyle[prop]:document.defaultView.getComputedStyle(element)[prop]
        },
        getScrollOffsets:function () {
            var w= window;
            if(w.pageXOffset != null)return {x:w.pageXOffset,y:w.pageYOffset}
            var d = w.document
            if(document.compatMode == "CSS1Compat"){
                return {
                    x:d.documentElement.scrollLeft,y:d.documentElement.scrollTop
                }
            }
            return { x: d.body.scrollLeft, y: d.body.scrollTop }
        },
        setOpacity: function(ele, opacity) {
            if (ele.style.opacity != undefined) {
                ele.style.opacity = opacity / 100;
            } else {
                // 兼容低版本 IE 浏览器
                ele.style.filter = "alpha(opacity=" + opacity + ")";
            }
        },
        fadeIn: function(element, speed) {
            var opacity = 0;
            util.setOpacity(element, 0)
            var timer;

            function step() {
                util.setOpacity(element, opacity += speed)
                if (opacity < 100) {
                    timer = requestAnimationFrame(step);
                } else {
                    cancelAnimationFrame(timer)
                }
            }
            requestAnimationFrame(step)
        },
        fadeOut: function(element, speed) {
            var opacity = 100;
            util.setOpacity(element, 100)
            var timer;

            function step() {
                util.setOpacity(element, opacity -= speed)
                if (opacity > 0) {
                    timer = requestAnimationFrame(step);
                } else {
                    cancelAnimationFrame(timer)
                }
            }
            requestAnimationFrame(step)
        },
        addEvent: function(element, type, fn) {
            if (document.addEventListener) {
                element.addEventListener(type, fn, false);
                return fn;
            } else if (document.attachEvent) {
                var bound = function() {
                    return fn.apply(element, arguments)
                }
                element.attachEvent('on' + type, bound);
                return bound;
            }
        },
        addClass: function(element, className) {
            var classNames = element.className.split(/\s+/);
            if (util.indexOf(classNames, className) == -1) {
                classNames.push(className);
            }
            element.className = classNames.join(' ')
        },
        removeClass: function(element, className) {
            var classNames = element.className.split(/\s+/);
            var index = util.indexOf(classNames, className)
            if (index !== -1) {
                classNames.splice(index, 1);
            }
            element.className = classNames.join(' ')
        },
        supportTouch: function() {
            return 'ontouchstart' in window ||
                window.DocumentTouch && document instanceof window.DocumentTouch;

        },
        getTime: function() {
            return new Date().getTime();
        }
    }

    function ScrollToTop(element, options) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;

        this.options = util.extend({}, this.constructor.defaultOptions, options)

        this.init();
    }
    ScrollToTop.defaultOptions = {
        // 默认值为 100，表示滚动条向下滑动 100px 时，出现回到顶部按钮
        showWhen: 100,
        // 回到顶部的速度。默认值为 100，数值越大，速度越快。 100 表示浏览器每次重绘，scrollTop 就减去 100px。
        speed: 100,
        // 元素淡入和淡出的速度。默认值为 10，数值越大，速度越快。 10 表示浏览器每次重绘，元素透明度以 10% 递增或者递减。
        fadeSpeed: 10
    }

    var proto = ScrollToTop.prototype;
    proto.init = function () {
        this.hideElement();
        this.bindScrollEvent();
        this.bindToTopEvent()
    }



    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = ScrollToTop;
        }
        exports.ScrollToTop = ScrollToTop;
    } else {
        root.ScrollToTop = ScrollToTop;
    }
}());
