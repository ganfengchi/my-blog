# 类型判断

### js 的数据类型

```js
// JS的数据类型分为以下两类：

// 基本（原始）类型：
String, Number, Boolean, Null, Undefined, Symbol, BigInt;
// 引用（对象）类型：
Object, Array, Date, Function, RegExp;
```

### 基本类型和引用类型的区别

存储值的位置不一样（这一条很重要，有助于理解深浅拷贝），原始类型：栈内存，对象类型：堆内存（但是引用地址还是在栈内存上）

原始类型是不能携带属性和方法的

### js 的类型判断方式

### Object.prototype.toString.call() 方法,这个方法可以判断任何的类型,返回的是一个字符串

::: tip
#### toString方法
toString() 返回的是这个对象对字符串的表现
```js
[1,2,3].toString()
// '1，2，3'
```
Array ,function 等类型作为Object的实例,都各自重写了自己的toSting方法：<br/>
类型 Obj<br/>
实例 Array fn 都各自重写了自己的toSting方法<br/>
我们要得到对象的具体类型，需要调用Object 的原型的未被重写的toString：<br/>
delect 属性用于删除对象的某个属性<br/>
hasOwnproperty() 方法会返回一个布尔值 ，指示对象的自身属性中是否具有指定的属性<br/>



#### 为什么要加call<br/>
```js
Object.prototype.toString([])// ['object Object']
```
Object.prototype 返回的是原型字符串的表现<br/>
原型 Obj<br/>
实例 Object.prototype <br/>
如果不加 call 的化返回的就是原型 obj 字符串的表现<br/>
如果加 call 其实就是把 call 中的参数传入原型 obj 中,指向被 call 的对象<br/>
所以我们在使用在要加 call<br/>
:::

#### typeof() 方法，这个方法用来准确判断基本类型

```js

typeOf  1 // nunber
typeOf  '1' //string
typeOf true //boolean
typeOf null //object
typeOf undefinded //undefinded
typeOf [] //object
typeOf  {} //object

 //我们会发现  typeOf 判断  对象，数组等引用类型和null都是object
 //判断不了引用类型
```

#### instanceof() 方法，这个方法用来判断对象类型,返回一个布尔值，如果判断基本类型，那么会输出 false

```js
1 instanceof Number; //false
"123" instanceof String; // false
//我们会发现判断基本类型，那么会输出false

let a = {};
a instanceof
  Object[(1, 2, 3)] instanceof //true
  Array; //true
```

### 那么为什么 instanceof 只能判断引用类型呢？

这与 instanceof 的实现原理有关，instanceof 的原理是通过判断对象的原型中是否能找到类型的 prototype，找到了就返回 true，找不到就返回 false<br/>
那么我们模拟手写一个 instanceof，看看 instanceof 里面到底干了什么，首先定义一个函数，取名 instance_of（这是我们自己定义的函数，取名随便，这里方便理解），根据 instanceof 的语法，他有左右两个值，左边是实例对象，右边是类型，所以给我们自己定义的函数两个形参，left，right,剩下的代码如下：

```js
function instance_of(left, right) {
  let prototype = right.prototype;
  let __proto__ = left.__proto__;

  while (true) {
    if (__proto__ === null) {
      return false;
    }
    if (__proto__ === prototype) {
      return true;
    }
    __proto__ = __proto__.__proto__;
  }
}
```

> 特定的判断方法 1.数组的 isArray() 方法，判断是否为数组，返回 true 或者 false.
> 2.isNaN() 方法，在 JavaScript  中，NaN  是一个不合法的数字。 Number.isNaN () 方法用于判断传递的值是否为 NaN，并且检查其类型是否为 Number，如果值为 NaN  且类型为 Number，则返回 true，否则返回 false。
> 在 isNaN 方法中，它会先将判定的对象调用 ToNumber()方法转成数字，ToNumber()方法返回的值如果是 NaN，则返回 true，否则为 false。
