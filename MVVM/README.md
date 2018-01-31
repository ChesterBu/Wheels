# MVVM

## 介绍

实现简单vue.js

## 实现功能

- 双向数据绑定

- 模版指令

- computed

- v-model

## 示例

```html
<div id="app">
        <p>a:  {{a}}</p>
        <p>computed:  {{hello}}</p>
        <p>b.c:  {{b.c}}</p>
        <input type="text" v-model='d'>
        <span>d:  {{d}}</span>
    </div>
    <script src="../Mvvm.js"></script>
    <script>
        let vm = new Mvvm({
            el: '#app',
            data: {
                a: 1,
                b: {
                    c: 1
                },
                d:10
            },
            computed: {
                hello() {
                    return this.a * 3
                }
            }
        })
    </script>
```