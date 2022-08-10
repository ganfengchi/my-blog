## 背景

大家开发中经常会跟 DOM 的事件打交道，也会经常用到 e.target 和 e.currentTarget 这两个对象，但是却有很多人根本就不知道这两个有什么区别~~~

## 冒泡 & 捕获

当你触发一个元素的事件的时候，该事件从该元素的祖先元素传递下去，此过程为捕获，而到达此元素之后，又会向其祖先元素传播上去，此过程为冒泡

```html
<div id="a">
  <div id="b">
    <div id="c">
      <div id="d">哈哈哈哈哈</div>
    </div>
  </div>
</div>
```

我们给四个 div 元素绑定事件，且 addEventListener 第三个参数不设置，则默认设置为 false

```js
const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const d = document.getElementById("d");
a.addEventListener("click", (e) => {
  const { target, currentTarget } = e;
  console.log(`target是${target.id}`);
  console.log(`currentTarget是${currentTarget.id}`);
});
b.addEventListener("click", (e) => {
  const { target, currentTarget } = e;
  console.log(`target是${target.id}`);
  console.log(`currentTarget是${currentTarget.id}`);
});
c.addEventListener("click", (e) => {
  const { target, currentTarget } = e;
  console.log(`target是${target.id}`);
  console.log(`currentTarget是${currentTarget.id}`);
});
d.addEventListener("click", (e) => {
  const { target, currentTarget } = e;
  console.log(`target是${target.id}`);
  console.log(`currentTarget是${currentTarget.id}`);
});

// 现在我们点击，看看输出的东西，可以看出触发的是 d，而执行的元素是冒泡的顺序
// target 是 d currentTarget 是 d
// target 是 d currentTarget 是 c
// target 是 d currentTarget 是 b
// target 是 d currentTarget 是 a

// true
// 我们把四个事件第三个参数都设置为 true，我们看看输出结果，可以看出触发的是 d，而执行的元素是捕获的顺序
// target 是 d currentTarget 是 a
// target 是 d currentTarget 是 b
// target 是 d currentTarget 是 c
// target 是 d currentTarget 是 d
```


区别
我们可以总结出：

::: tip
e.target：触发事件的元素
e.currentTarget：绑定事件的元素
::: 
