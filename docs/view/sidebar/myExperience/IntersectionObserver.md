# Intersection Observer

::: tip
IntersectionObserver 接口 (从属于 Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗 (viewport) 交叉状态的方法。祖先元素与视窗 (viewport) 被称为根 (root)。
当一个 IntersectionObserver 对象被创建时，其被配置为监听根中一段给定比例的可见区域。一旦 IntersectionObserver 被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。
:::

```ts
// 假如有个需求，对一个页面中的特定元素，只有在其完全显示在可视区内时进行埋点曝光。
const boxList = [...document.querySelectorAll(".box")];

var io = new IntersectionObserver(
  (entries) => {
    entries.forEach((item) => {
      // intersectionRatio === 1说明该元素完全暴露出来，符合业务需求
      if (item.intersectionRatio === 1) {
        // 。。。 埋点曝光代码
        io.unobserve(item.target);
      }
    });
  },
  {
    root: null,
    threshold: 1, // 阀值设为1，当只有比例达到1时才触发回调函数
  }
);

// observe遍历监听所有box节点
boxList.forEach((box) => io.observe(box));

//图片懒加载
const imgList = [...document.querySelectorAll("img")];

var io = new IntersectionObserver(
  (entries) => {
    entries.forEach((item) => {
      // isIntersecting是一个Boolean值，判断目标元素当前是否可见
      if (item.isIntersecting) {
        item.target.src = item.target.dataset.src;
        // 图片加载后即停止监听该元素
        io.unobserve(item.target);
      }
    });
  },
  {
    root: document.querySelector(".root"),
  }
);

// observe遍历监听所有img节点
imgList.forEach((img) => io.observe(img));
```
