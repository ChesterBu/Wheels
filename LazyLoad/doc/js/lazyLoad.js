(function () {
    let root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};

    const util = {
        extend(target, ...src) {
            src.forEach((value) => {
                for (let prop in value) {
                    if (value.hasOwnProperty(prop)) {
                        target[prop] = value[prop];
                    }
                }
            });
            return target;
        }
    };

    class Lazy {
        constructor(opts) {
            this.opts = util.extend({}, this.constructor.defaultOpts, opts);
            this.init();
        }

        init() {
            this.calculateView();
            this.bindScrollEvent();
        }

        calculateView() {
            this.views = {
                top: 0 - (parseInt(this.opts, 10) || 0),
                bottom:root.innerHeight + (parseInt(this.opts.bottom, 10) || 0),
                left: 0 - (parseInt(this.opts.left, 10) || 0),
                right:root.innerWidth + (parseInt(this.opts.right, 10) || 0)
            }
        }

        bindScrollEvent() {
            let scrollEvent = root.addEventListener('scroll', this.handleLazyLoad().bind(this));
            let loadEvent = root.addEventListener('load', this.handleLazyLoad().bind(this));
            this.event = {
                scrollEvent: scrollEvent,
                loadEvent: loadEvent
            }
        }

        handleLazyLoad() {
            let timer = null;
            //节流模式处理
            return function () {
                let self = this;
                if(!timer){
                    timer = setTimeout(() => {
                        timer = null;
                        self.render();
                    }, this.opts.delay)
                }
            }
        }

        //检查是否在视口内
        checkInView(element) {
            //检查是否是隐藏元素
            if (element.offsetParent === null) {
                return false;
            }
            let rect = element.getBoundingClientRect();

            return (rect.right >= this.views.left &&
                rect.bottom >= this.views.top &&
                rect.left <= this.views.right &&
                rect.top <= this.views.bottom)
        }

        render() {
            let nodes = document.querySelectorAll('[data-lazy-src], [data-lazy-background]');
            let self = this;
            nodes.forEach((value) => {
                if (this.checkInView(value)) {
                    if (value.getAttribute('data-lazy-background') !== null) {
                        value.style.backgroundImage = `url( ${value.getAttribute('data-lazy-background')})`;
                    }
                    value.src = value.getAttribute('data-lazy-src');
                    console.log(value.src);
                    value.removeAttribute('data-lazy-src');
                    value.removeAttribute('data-lazy-background');
                }
            }, self);
            if (!nodes.length) {
                this.unbindScrollEvent();
            }
        }

        unbindScrollEvent() {
            root.removeEventListener('scroll', this.event.scrollEvent);
            root.removeEventListener('load', this.event.loadEvent);
        }
    }

    Lazy.defaultOpts = {
        delay: 250,
    };


    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = Lazy;
        }
        exports.Lazy = Lazy;
    } else {
        root.Lazy = Lazy;
    }
}());