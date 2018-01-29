(function () {
    let root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};

    

    class Lazy {
        constructor(opts) {
            this.opts = Object.assign({}, this.constructor.defaultOpts, opts);
            this.init();
        }
        init(){
            this.calculateView();
            this.bindScrollEvent();
        }
        calculateView() {
            this.views = {
                top: 0 - (parseInt(this.opts, 10) || 0),
                bottom: 0 - root.innerHeight + (parseInt(this.opts.bottom, 10) || 0),
                left: 0 - (parseInt(this.opts.left, 10) || 0),
                right: 0 - root.innerWidth +(parseInt(this.opts.right, 10) || 0)
            };
        }

        bindScrollEvent(){
            let scrollEvent = root.addEventListener('scroll',this.handleLazyLoad.bind(this));
            let loadEvent = root.addEventListener('load',this.handleLazyLoad.bind(this));

            this.event = {
                scrollEvent: scrollEvent,
                loadEvent: loadEvent
            };
        }

        handleLazyLoad(){
            let self = this;
            let timer = null;
            if(!this.opts.useDebounce && !!timer)return;
            clearTimeout(timer);
            timer = setTimeout(()=>{
                timer = null;
                self.render();
            },this.opts.delay);

        }

        static isHidden(element){
            return (element.offsetParent === null);
        }

        checkInView(element){
            if(this.isHidden(element)){
                return false;
            }
            let rect = element.getBoundingClientRect();
            return(rect.right >= this.views.left && rect.bottom >= this.views.top && rect.left <= this.views.right && rect.top <= this.views.bottom);
        }

        render(){
            let nodes = document.querySelectorAll('[data-lazy-src], [data-lazy-background]');
            let self = this;

            nodes.forEach((value) => {
                if (this.checkInView(value)){
                    if(value.getAttribute('data-lazy-background') !== null){
                        value.style.backgroundImage = `url( ${value.getAttribute('data-lazy-background')})`;
                    }
                    value.src = value.getAttribute('data-lazy-src');
                    value.removeAttribute('data-lazy-src');
                    value.removeAttribute('data-lazy-background');
                }
            },self);
            if(!nodes.length){
                this.unbindScrollEvent();
            }
        }

        unbindScrollEvent(){
            root.removeEventListener('scroll',this.event.scrollEvent);
            root.removeEventListener('load',this.event.loadEvent);
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