### offsetLeft和offsetTop
::: tip
这两个都是只读属性。offsetLeft从字面意思上理解，就是以父元素作为参照点（父元素的定位不能是static），当前元素相对于父元素左边的偏移量。那么offsetTop就是以父元素为参照物，当前元素相对于父元素上边的偏移量。如果没有父元素那么参照点就是body。

:::


### offsetLeft/offsetTop和style.left/style.top的区别

::: tip 
style.left/style.top和offsetLeft/offsetTop的功能一样，那么它们有什么区别呢？1.返回值不一样：style.left/style.top返回的是字符串，带了单位（px）的，而offsetLeft/offsetTop只返回数字（小数会四舍五入）。2.可读写性不同：offsetLeft/offsetTop只读，而style.left/style.top 可读写。3.若是没有给 HTML 元素指定过 top 样式，则 style.top 返回的是空字符串（而且必须要定义在html里，如果定义在css里，style.left的值仍然为空，这也是个坑啊，大家谨慎）。
:::


### offsetWidth和offsetHeight
::: tip 
这两个也是只读属性，先上公式：offsetHeight || offsetWidth = boder + padding + content（不包括margin）
:::

### offsetHeight/offsetWidth和style.height/style.width的区别
::: tip 
1.返回值不一样：offsetHeight/offsetWidth返回纯数字（小数会四舍五入），style.height/style.width返回字符串，带单位（px）。2.可读写性不一样：offsetHeight/offsetWidth只读，style.height/style.width可读写。3.style.height/style.width是不包含边框的哦。还是用和公式表示一下：offsetWidth = style.width + style.padding + style.border4.如果没有为元素设置高度，offsetHeight会根据内容获取高度值，style.height会返回undefind5.style.width仅仅能返回在HTML中定义的内部样式表的width属性值，如果定义在CSS中就获取不到。
:::

### clientWidth和clientHeight
::: tip 
只读属性，返回当前节点的可视宽度和可视高度（不包括边框、外边距）（包括内边距）clientHeight = topPadding + bottomPadding+ height - scrollbar.height。
:::

### scrollTop、scrollLeft、scrollWidth、scrollHeight
::: tip
scrollTop和scrollLeft是可读写属性 。scrollTop：返回网页滚动条垂直方向滚去的距离； scrollLeft：返回网页滚动条水平方向滚去的距离；scrollWidth和scrolltHeight是只读属性，返回当前节点的实际宽度和实际高度（不包括边框）,没有滚动条时和clientWidth和clientHeight一样
:::

###  event.clientX、event.clientY、event.pageX、event.pageY
::: tip
event.clientX /event.clientY是目标点距离浏览器可视范围的X轴/Y轴坐标
event.pageX /event.pageY 是目标点距离document最左上角的X轴/Y轴坐标
:::

### innerHeight/innerWidth和outerHeight/outerWidth
::: tip 
innerHeight/innerWidth为只读属性，返回窗口文档显示区的高度和宽度，不包括菜单栏、工具栏和滚动条的宽高。（ 注：IE不支持这些属性，它用document.documentElement 或document.body 的 clientWidth和 clientHeight属性作为替代。）outerHeight/outerWidth为可读写属性，设置或返回一个窗口的高度和宽度，包括所有界面元素（如工具栏/滚动条）。
:::