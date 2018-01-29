(function () {
    let root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};

    class Preload {
        constructor(pics, options) {
            if (!Array.isArray(pics)) throw new Error('pics must be an array type');
            this.pics = pics;
            this.options = Object.assign({}, this.constructor.defaultOptions, options);
            this.index = this.failNum = 0;
            this.init();
        }
        init() {
            this.pics.forEach(item => {
                this.loadImg(item);
            });
        }
        loadImg(src) {
            let img = new Image();
            img.src = src;
            img.onload = () => {
                img.onload = null;
                this.progress(src, 'success');
            };
            img.onerror = () => {
                this.progress(src, 'fail');
            };
            
        }
        progress(src, type) {
            if (type === 'fail') this.failNum++;
            this.index++;
            this.options.progressing(this.index, this.pics.length, type);
            if (this.index === this.pics.length) {
                this.options.complete(this.pics.length - this.failNum, this.failNum);
            }
        }

    }

    Preload.defaultOptions = {
        complete(successNum, failNum) {
            console.log('成功加载' + successNum + '张图片，加载失败' + failNum + '张图片');

        },
        progressing(index, total, type) {
            let percent = Math.floor(index / total * 100) + '%';
            console.log(percent);
        }
    };


    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = Preload;
        }
        exports.Preload = Preload;
    } else {
        root.Preload = Preload;
    }

}());