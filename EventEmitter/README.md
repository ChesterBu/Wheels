# EventEmitter

## 介绍

一个简单的 EventEmitter，可在浏览器中使用，帮助你实现事件的订阅和发布。

## 依赖

原生 JavaScipt 实现，无依赖。

## 使用

```html
<script src="path/EventEmitter.js"></script>
```

或者

```js
import eventEmitter from 'path/eventEmitter.js'
```


## API

```js
let emitter = new EventEmitter();
```

### on

添加一个事件监听器，支持链式调用

```js
emitter.on(eventName, listener)
```

* eventName 事件名称
* listener 监听器函数

### off

删除一个事件监听器，支持链式调用

```js
emitter.on(eventName, listener)
```

* eventName 事件名称
* listener 监听器函数

### once

添加一个只能触发一次的事件监听器，支持链式调用

```js
emitter.once(eventName, listener)
```

* eventName 事件名称
* listener 监听器函数

### emit

触发事件，支持链式调用

```js
emitter.emit(eventName, args)
```

* eventName 事件名称
* arg 数组形式，传入事件监听器的参数

### offall

删除某个事件或者所有事件

```js
emitter.offall(eventName)
```

* eventName 事件名称 如果不传，则删除所有事件




