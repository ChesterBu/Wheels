# sticky

## 介绍

原生 JavaScript 实现的固定在顶部效果

## 依赖

原生 JavaScript 实现，无依赖。

## 使用

```html
<script src="path/Sticky.js"></script>
```

或者

```js
import Sticky from 'path/Sticky.js'
```

## 示例

HTML 文件：

```html
<div id="sticky"></div>
```

JavaScript 文件：

```js
var sticky = new Sticky("#sticky");
```

## API

### 初始化

```js
let sticky = new Sticky("selector", options);
```


```js
let stickyElem = document.getElementById("sticky");
let sticky = new Sticky(stickyElem)
```

### options

**1.offset**

```js
var sticky = new Sticky("#sticky", {
    // 表示距离顶部 20px 的时候就固定
    offset: 20
});
```

### 事件绑定

从未固定状态到固定状态的时候：

```js
sticky.on("onStick", function() {
    console.log('固定在顶部')
})
```

从固定状态到未固定状态的时候：

```js
sticky.on("onDetach", function() {
    console.log('取消固定在顶部')
})
```

如果希望事件只执行一次，可以使用 once 进行绑定

```js
sticky.once("onStick", function() {
    console.log('固定在顶部')
})
```

### 类名

当固定在顶部的时候，会添加一个名为 `sticky` 的类名
