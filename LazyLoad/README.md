# LazyLoad

## 介绍

原生 JavaScript 懒加载库

## 使用

```html
<script src="path/lazyload.js"></script>
```

或者

```js
import LazyLoad from 'path/lazyload.js'
```

## 示例

HTML 文件：

```html
<img src="img/loading.gif" data-lazy-src="img/1.jpg">
```

JavaScript 文件：

```js
new LazyLoad();
```

## API

### HTML

通过 `data-lazy-src` 设置图片的地址，当加载时，将该值赋值给 src 属性。

```html
<img src="img/loading.gif" alt="" data-lazy-src="img/1.jpg">
```

也可以通过 `data-lazy-background` 设置背景图片的地址，当加载时，将该值赋值给 `background-image` 属性。

```html
<div data-lazy-background="img/1.jpg"></div>
```

### 初始化

```js
new LazyLoad(options);
```

### options

#### 1.onload

当通过懒加载加载完一张图片时触发，每张图片都会触发一次：

```js
new Lazy({
    onload: function(elem){
        // elem 表示该图片元素
        console.log(elem)
        // 你可以通过 elem 操作图片元素
        elem.className = 'loaded';
    }
})
```

#### 2.delay

默认值为 `250`

#### 3.top

距离顶部视口还有多少 px 的时候就开始加载，默认为 0

#### 4.bottom

距离视口底部还有多少 px 的时候就开始加载，默认为 0，当从上往下滚动时，应该使用的是 bottom。

#### 5.left

距离视口左边还有多少 px 的时候就开始加载，默认为 0

#### 6.right

距离视口右边还有多少 px 的时候就开始加载，默认为 0