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
        init(){

        }
        calculateView() {
            this.views = {
                top: 0 - (parseInt(this.opts, 10) || 0),
                bottom: 0 - root.innerHeight + (parseInt(this.opts.bottom, 10) || 0),
                left: 0 - (parseInt(this.opts.left, 10) || 0),
                right: 0 - root.innerWidth +(parseInt(this.opts.right, 10) || 0)
            }
        }

        bindScrolEvent(){
            let scrollEvent = root.addEventListener('scroll',this.handleLazyLoad.bind(this));
            let loadEvent = root.addEventListener('load',this.handleLazyLoad.bind(this));

            this.event = {
                scrollEvent: scrollEvent,
                loadEvent: loadEvent
            }


        }

        handleLazyLoad(){
            let self = this;
            let timer = null;
            if(!this.opts.useDebounce && !!timer)return;
            clearTimeout(timer)
            timer = setTimeout(()=>{
                timer = null;
                self.render();
            },this.opts.delay)

        }

        static isHidden(element){
            return (element.offsetParent === null);
        }

        checkInView(element){
            if(this.isHidden(element)){
                return false;
            }
            let rect = element.getBoundingClientRect();
            return(rect.right >= this.view.left && rect.bottom >= this.view.top && rect.left <= this.view.right && rect.top <= this.view.bottom)
        }

        render(){
            let nodes = document.querySelectorAll('[data-lazy-src], [data-lazy-background]');
            let self = this;
            nodes.forEach((value) => {
                if (this.checkInView(value){
                    if(value.getAttribute('data-lazy-background') !== null){
                        value.style.backgroundImage = `url( ${value.getAttribute('data-lazy-background')})`;
                    } else if(value.src !== (src = value.getAttribute('data-lazy-src')) ){
                        value.src = src;
                    }
                    value.removeAttribute('data-lazy-src');
                    value.removeAttribute('data-lazy-background');
                }
            },self);
        }
    }

    Lazy.defaultOpts = {
        delay: 250,
        useDebounce: false
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