# Preload

## 介绍

原生 JavaScript 实现的预加载库

效果演示：[预加载](https://chesterbu.github.io/Wheels/Preload/docs/index.html)

## 使用

```html
<script src="path/preload.js"></script>
```

或者

```js
import Preload from 'path/preload.js'
```

## API

### 初始化

```js
new Preload(options);
```

### options

#### 1.progress

```js
new Preload(pics, {
    // 函数有 3 个参数
    // index 表示加载到第几张图片
    // totoal 表示一共需要记载几张图片
    // type 加载的类型，成功还是失败，成功为 'success'，失败为 'fail'
    progress: function(index, total, type){
        var percent = Math.floor(index / total * 100) + '%';
        console.log(percent);
    }
});
```

#### 2.complete**

当所有图片加载完毕时触发

```js
new Preload(pics, {
    // 函数有 2 个参数
    // sucessNum 表示成功加载的个数
    // failNum 表示加载失败的个数
    complete: function(sucessNum, failNum){
        console.log('成功加载' + sucessNum + '张图片，加载失败' + failNum + '张图片');
    }
});
```