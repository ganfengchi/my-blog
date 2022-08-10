```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a); // {n:2}
console.log(b); // {n:1}
console.log(b.x); //{ n:2}
a.n = 3;
console.log(b); //1
console.log(b.x); //3
console.log(a); //3
```

```js
"use strict";

function sidEffecting(arr) {
  arr[0] = arr[2];
}
function bar(a, b, c) {
  c = 10;
  sidEffecting(arguments); //[1,1,1]
  return a + b + c;
}
console.log(bar(1, 1, 1)); //12
```

```js
var a = {};
var b = {
  key: "a", //a["[object Object]"]="456" 456替换了123
};
var c = {
  key: "c",
};
a[b] = "123";
a[c] = "456";
console.log(a[b]); //456
```

```js
//要求定义函数add，实现alert(add(1)(2)(3));
//函数柯里化：可以连续给一个函数，反复传参，反复传的参数还能累积到函数内
var add = function (x1) {
  var sum = x1; //先把第一个（）中的1保存斤局部变量sum中
  var fun = function (x2) {
    //定义内层函数，能够将第二个（）中的2.累加到变量sum
    sum += x2;
    return fun; //因为函数柯里化要求，能被连续给一个函数传参，所以应该返回当前函数对象，才能连续调，用并传参，如果返回sum，只能传两个参数就结束了
  };
  fun.toString = function () {
    //必须为fun函数定义个toString（）方法
    //fun的tostring（）方法可以返回fun函数闭包中的sum变量现在的值
    return sum;
  };
  return fun; //可以连续传入第二个参数（2）.add()也必须返回函数才能连续调用，继续传参
};
alert(add(1)(2)(3)); //6
alert(add(2)(4)(6)); //12
```

```js
function add() {
  var sum = 0;
  for (i of arguments) {
    sum += i;
  }
  return sum;
}
//测试代码
console.log(add(1, 2, 3)); //6
console.log(add(1, 2, 3, 4, 5)); //15

function add() {
  var sum = 0;
  for (i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
//测试代码
console.log(add(1, 2, 3)); //6
console.log(add(1, 2, 3, 4, 5)); //15
```

```js
var arr = [1, 2, 3, 2, 1, 4];
var hash = {}; //一个对象中不允许有重复的下标
for (var i = 0; i < arr.length; i++) {
  hash[arr[i]] = 1;
}
console.log(hash);
var res = [];
var i = 0;
for (res[i++] in hash);
console.log(res); //1,2,3,4
```

```js
//数组去重复
//数组去重复，有几种方法，那种方法更好（考虑数组中喊喊成千上万个元素的情况）
//想一个数组添加10万个元素，但是每个元素（0~10000之间）随机生成
var arr = [];
for (var i = 0; i < 100000; i++) {
  arr.push(parseInt(Math.random() * 10000));
}
//第一种：传统：利用对象的属性名不能重复的特点
function unique1(arr) {
  var obj = {};
  for (var n of arr) {
    obj[n] = 1;
  }
  var newArr = [];
  for (var key in obj) {
    newArr.push(parseInt(key));
  }
  //如果字符串内容的数组去重： newArr=Object.keys(obj);
  return newArr;
}
console.time("unique1"); //开始计时！
var newArr = unique1(arr);
console.timeEnd("unique1"); //结束计时，并显示执行时间
console.log(newArr);
//第二种：利用新es标准中的新类型set
//set类型的对象：只是不允许重复的集合
//向set类型对象中添加薪资时，如果set中没有这个新值才能进去，如果set中有这个新值了则不再添加
function unique2(arr) {
  //将原数arr放入一个new set（）对象中利用new set不允许重复着的特点，自动去重复
  // var set=new Set(arr);
  // //将set打散,后放入新数组中
  // var newArr=[...set];
  // return newArr;
  return [...new Set(arr)];
}
console.time("unique2"); //开始计时！
var newArr = unique2(arr);
console.timeEnd("unique2"); //结束计时，并显示执行时间
console.log(newArr);
```

```js
//微软
//1.去掉数组中非数字字符，并给每个数字+1
var arr = [1, 2, 3, "a", 4, "b"];
for (var i = arr.length - 1; i >= 0; i--) {
  //倒着遍历
  if (typeof arr[i] === "number") {
    arr[i]++;
  } else {
    arr.splice(i, 1);
  }
}
console.log(arr);
//2.在2个排好序的数组中高效率的找出相同的元素
var arr1 = [1, 3, 7, 9, 12, 37, 45, 88];
//
//
var arr2 = [2, 4, 9, 13, 45, 88, 92];
//
//
for (var i = 0, j = 0, result = []; i < arr1.length && j < arr2.length; ) {
  if (arr1[i] < arr2[j]) {
    i++;
  } else if (arr1[i] > arr2[j]) {
    j++;
  } else {
    //arr1[i]=arr2[j]
    result.push(arr1[i]); //arr2[j]
    i++;
    j++;
  }
}
console.log(result);
//3.找出一个排好序的数组中，2个元素和为19的元素组合，考虑程序的执行效率
var arr = [1, 2, 4, 6, 7, 11, 12, 15, 17];
//
for (var i = 0, j = arr.length - 1; i < j; ) {
  if (arr[i] + arr[j] > 19) {
    j--;
  } else if (arr[i] + arr[j] < 19) {
    i++;
  } else {
    //arr[i]+arr[j]==19
    console.log(`${arr[i]}+${arr[j]}`);
    i++;
    j--;
  }
}
```

```js
var age = 100;
function test() {
  this.age = 50;
  return function () {
    return this.age;
  };
}
var m = new test();
alert(m()); //100
var n = test();
alert(n()); //50
```

```js
//面向对象+闭包
var name = "window";
var p = {
  name: "Perter",
  getName: function () {
    var self = this;
    return function () {
      return self.name;
    };
  },
};
var getName = p.getName();
console.log(getName); // return function(){return self.name;}
var _name = getName();
console.log(_name); //Perter
```

```js
var a = 20;
function fun() {
  this.a = 50;
  return function () {
    return this.a;
  };
}
var m = new fun();
console.log(m()); //20
var n = fun();
console.log(n()); //50
```

```js
<button>click me!</button>
<button>click me!</button>
<button>click me!</button>
<button>click me!</button>
<button>click me!</button>
//鄙视题
//页面上5个完全相同的按钮，点击那个按钮，让按钮弹出自己是第几个
var btns = document.getElementsByTagName("button");
console.log(btns);
//btns:[button,button,button,button,button]
//        0      1       2     3       4
for (var i = 0; i < btns.length; i++) {
  //在遍历过程中 仅将时间处理函数赋值给一个按钮的onclick属性，保存起来
  //而不是调用函数！所哟，不会读取函数中的内容，也不会读取i
  (function (i) {
    //循环几次妈妈就调用几次
    btns[i].onclick = function () {
      //没调用一次妈妈，就创建一个孩子函数，并将本次传入的i值，放在局部变量中保存红包给孩子专属使用
      //var i 形参相当于局部变量
      alert(i);
    };
  })(i); //匿名函数调用时，也可传入参数1，而原始类型值传参，是副本的意思
  //将外部循环变量i的临时值赋值给妈妈中的变量i，被孩子永久保存起来
}
console.log("循环结束");
console.log(`i=${i}`);
console.log("程序结束");

//一般单机按钮只能再循环结束后，程序结束后
//此时单机按钮，会自动调用按钮上提前保存的时间处理函数
//执行alert（i）此时，才会去找i，因为时间处理函数内，没有局部变量,所以，只能去全局找i用
for (var i = 0; i < 4; i++) {
  setTimeout(function () {
    //异步，回调函数
    console.log(i);
  }, 50);
}
console.log("循环结束");
console.log("i=" + i); //4个4
```

```js
//如何使用回调函数让多个异步函数顺序执行
function liang(next) {
  console.log(`亮亮起跑....`);
  setTimeout(function () {
    //异步
    console.log(`亮亮到达终点！`);
    //在亮到达整点之后，才自动执行下一项任务
    next();
  }, Math.random() * 2 * 1000 + 1000);
  //1~3之间去随机
}
function ran() {
  console.log(`然然起跑....`);
  setTimeout(function () {
    //异步
    console.log(`然然到达终点！`);
  }, Math.random() * 2 * 1000 + 1000);
  //1~3之间去随机
}
//单纯调用2个异步函数无法保证一定执行顺序
//liang()
//ran();
//正确：让liang()先抱住ran(),但是暂不执行ran()
liang(
  /*next*/
  function () {
    ran();
  }
);
```

```js
var str = "helloworld";
var arr = [];
for (var i = 0; i < str.length; i++) {
  //获取当前字母
  var char = str[i];
  //如果arr中没有这名称的字母，就想arr中添加当前字符，值为1
  if (arr[char] === undefined) {
    arr[char] = 1;
  } else {
    //否则如果arr中如果已经有了这个名称的字母，就给arr中这个字母的值+1
    arr[char]++;
  }
}
console.log(arr);
//maxchar暂存目前最多的字符
//count暂存目前最多的数量
var maxchar,
  count = 0;
//遍历
for (var key in arr) {
  if (arr[key] > count) {
    //就用key代替maxchar
    maxchar = key;
    //就用key的value代替count
    count = arr[key];
  }
}
console.log(`出现次数最多的字母是：${maxchar},出现了${count}次 `);
```

```js
//浅克隆
//定义函数，可以克隆一个对象
function clone(oldobj) {
  //创建一个新的空对象
  var newobj = {};
  //遍历旧对象的每个属性
  for (var key in oldobj) {
    //没遍历每一个属性，就为新对象添加同名的属性，职位旧对象中同名属性值
    //去除旧对象中就属性值
    //放入
    //新对象中强行添加的同名属性中
    newobj[key] = oldobj[key];
    //  <-搬家
    //千万不能加"",因为旧属性名是in前的一个变量，变量中没遍历到一个新属性是，获得的属性名都不一样！是变化的！所以不能加""
    //千万不能用.旧属性名。以为等效于[""]
  }

  return newobj;
}
//测试
var lilei = {
  sname: "lilei",
  sage: 11,
};
var lilei2 = clone(lilei);
console.log(lilei);
console.log(lilei2);
console.log(lilei == lilei2);
//如果==左右都是对象，则==不再比较对象内容，而是比较两个对象地址是否相同
//如果返回true说明克隆失败！因为地址是同一个对象，说明没有对出的一个对象
```

```js
//闭包
//需求：定义一个函数为小孩儿管理压缩钱
//小孩每花一笔钱，可以从总钱数中扣除发的钱，提示还剩XXX
//3步
//1.定义一个外层函数，包裹要保护的变量和内层函数
function parent() {
  var total = 1000;
  //2.外层函数将内层函数对象返回到函数外部，外部可用
  //不用给内层函数起名字
  return function (money) {
    //小孩儿//局部

    total -= money;
    console.log(`花了${money},还剩${total}`);
  };
}
//3.想用内层函数的人需要调用外层函数，才能获得返回出来的内层函数，保存在变量中，就可使用外城函数对象反复使用。
//    pay：function(money){//小孩儿//局部

//        total-=money;
//        console.log(`花了${money},还剩${total}`);
//     }
//   }
total = 0; //试图篡改total变量
var pay = parent();
pay(100); //花了100，还剩900
pay(100); //花了100，还剩800
pay(100); //花了100，还剩700
```

```js
// nAdd=function(){n++};
//鄙视面试时找2种东西：
//1.外城函数和内层函数之间的局部变量
//2.找外层函数宫想外返回了那些内层函数
//判断是不是考闭包：
//1.外层函数包裹要保护的变量和使用变量的内层函数
function fun() {
  var n = 999;
  //fun（）内没有声明过nAdd局部变量
  //全局也没有nAdd全局变量
  //js中强行给一个为声明过的赋值！不会报错！
  //会自动卸载全局！创建该变量！
  nAdd = function () {
    n++;
    //console.log(n);//1000
  };
  //外层函数将内层函数返回到外部
  return function () {
    console.log(n);
  };
}
var getN = fun();
//getN : function fun(){ console.log(n);}
getN(); //? 999
nAdd();
getN(); //?1000
```

```js
//保护对象的各种办法，如何应用到构造函数中
//鄙视：如何定义一个更像JAVA的构造函数
function Emp(eid, ename, salary, eage) {
  this.eid = eid;
  this.ename = ename;
  this.salary = salary;
  this.eage = eage;
}
var eric = new Emp(1001, "埃里克", 1200, 25);
//尝试修改eid
eric.eid = -2;
//尝试删除ename属性
delete eric.ename;
//尝试遍历薪资
for (var key in eric) {
  console.log(`${key}:${eric[key]}`);
}
console.log(eric);
```

```js
//深克隆：即可用第一级属性，如果某个属性又是内嵌的子对象，深克隆会对子对象中，继续克隆内嵌子对象及其内容

function deepClone(oldObj) {
  //定义一个函数，可以克隆一个对象
  if (oldObj == null) {
    //判断对象是否为空
    return null; //如果对象为空，就return  空
  }
  if (typeof oldObj !== "object") {
    //判断对象属性类型是否为对象
    return oldObj; //如果不是对象就return出来
  }
  var newObj = Array.isArray(oldObj) ? [] : {}; //创建一个新的对象 判断新对象是否为数组如果是数组就用[]，不是则用{}
  for (var key in oldObj) {
    //遍历旧的对象
    newObj[key] = deepClone(oldObj[key]); //把遍历旧对象，克隆得到的对象值，赋给新对象
  }
  return newObj; //return出新对象
}
var a1 = 10;
var arr1 = [1, 2, 3];
var lilei1 = {
  sname: "Li Lei",
  sage: 11,
  address: {
    city: "深圳",
    street: "华强北",
    phone: 1383838438,
    email: "lilei@163.com",
  },
};
var a2 = deepClone(a1);
console.log(a2);
var arr2 = deepClone(arr1);
console.log(arr2);
console.log(arr1 == arr2); //false
var lilei2 = deepClone(lilei1);
console.log(lilei2);
console.log(lilei1 == lilei2); //false
console.log(lilei1.address == lilei2.address); //false
```

```js
var num = new Array();
for (var i = 0; i < 4; i++) {
  num[i] = f1(i);
}
function f1(n) {
  function f2() {
    alert(n);
  }
  return f2;
}
num[2](); //2
num[1](); //1
num[0](); //0
num[3](); //3
```

```js
function Foo() {
  Foo.a = function () {
    console.log(1);
  };
  this.a = function () {
    console.log(2);
  };
}
Foo.prototype.a = function () {
  console.log(3);
};
Foo.a = function () {
  console.log(4);
};
Foo.a(); //4
let obj = new Foo();
obj.a(); //2
Foo.a(); //1
```

```js
var x = 0;
var foo = {
  x: 1,
  bar: function () {
    console.log(this.x); //1
    var that = this;
    return function () {
      console.log(this.x); //0
      console.log(that.x); //1
    };
  },
};
foo.bar(); //1
foo.bar()(); //1,0,1
```

```js
function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    },
  };
}
var a = fun(0); //undefined
a.fun(1); //0
a.fun(2); //0
a.fun(3); //0
var b = fun(0) //undefined
  .fun(1) //0
  .fun(2) //1
  .fun(3); //2
var c = fun(0) //undefined
  .fun(1); //0
c.fun(2); //1
c.fun(3); //1
```

```js
function A() {}
function B() {
  return new A();
}
A.prototype = new A();
B.prototype = new B();
var a = new A();
var b = new B();
console.log(a.__proto__ == b.__proto__); //ture
```

```js
function foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
foo.getName = function () {
  console.log(2);
};
foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}
foo.getName(); //2
getName(); //4
foo().getName(); //1
getName(); //1
new foo.getName(); //2
new foo().getName(); //3
new new foo().getName(); //3
```

```js
//闭包//取号
var getNum = (function () {
  var i = 0;
  return function () {
    i++;
    console.log(i);
  };
})();
getNum(); //1
getNum(); //2
i = 0;
getNum(); //3
getNum(); //4
```

```js
//判断1个对象是不是数组类型，一共有几种方法
//不正确的方法：typeof
var n = 10,
  str = "hello",
  b = true,
  nu = null,
  un;
var f = function () {};
var obj1 = {},
  obj2 = [1, 2, 3],
  obj3 = new Date();
console.log(
  typeof n,
  typeof str,
  typeof b,
  typeof nu,
  typeof un,
  typeof f,
  typeof obj1,
  typeof obj2,
  typeof obj3
);
//判断爹：3种：
//1.用__proto__获得对象的爹，然后在和数组的爹做比较
console.log(
  obj1.__proto__ == Array.prototype,
  obj2.__proto__ == Array.prototype,
  obj3.__proto__ == Array.prototype
);
//2.因为__proto__可能被浏览器禁用，所以有等效的函数来完成__proto__的任务：Object.getPrototypeOf(child)
console.log(
  Object.getPrototypeOf(obj1) == Array.prototype,
  Object.getPrototypeOf(obj2) == Array.prototype,
  Object.getPrototypeOf(obj3) == Array.prototype
);
//3.还有宇哥更直接的函数：
console.log(
  Array.prototype.isPrototypeOf(obj1),
  Array.prototype.isPrototypeOf(obj2),
  Array.prototype.isPrototypeOf(obj3)
);
//4.用腹肌原型对象中的constructor属性
console.log(
  obj1.constructor == Array,
  obj2.constructor == Array,
  obj3.constructor == Array
);
//5.用chile instanof 妈妈>bool
console.log(
  obj1 /*is*/ instanceof Array,
  obj2 /*is*/ instanceof Array,
  obj3 /*is*/ instanceof Array
);
//输出对象中的DNA：内部隐藏属性class
//错误
//
//
console.log(Object.prototype.toString.call(obj1));
console.log(Object.prototype.toString.call(obj2));
console.log(Object.prototype.toString.call(obj3));
```

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  });
}
//let 就输出 0,1,2,3,4  var  输出5,5,5,5,5,
```

```js
var number = 2;
var obj = {
  number: 4,
  fn1: (function () {
    this.number *= 2; //8
    number *= 2;
    var number = 3;
    return function () {
      this.number *= 2; //8
      number *= 3; //27
      console.log(number);
    };
  })(),
};
var fn1 = obj.fn1;
console.log(number); //4
fn1(); //9
obj.fn1(); //27
console.log(number); //8
console.log(obj.number); //8
```

```js
function fun(o) {
  o.name = "西西";
  o = {};
  o.name = "小丽";
}
var obj = { name: "小红", age: 11 };
fun(obj);
console.log(obj); //age:11  name：西西
```

```js
var a = 2;
var obj = {
  a: 4,
  fn1: function () {
    this.a *= 2;
    var a = 3;
    return function () {
      this.a *= 2;
      a *= 3;
      console.log(a);
    };
  },
};
var fn1 = obj.fn1;
console.log(a); //4
fn1(); //9
obj.fn1(); //27
console.log(a); //8
console.log(obj.a); //8
```

```js
function setObj(p) {
  p.name = "小红";
  p = {};
  p.name = "茜茜";
}
var p = {
  name: "小明",
};
setObj(p);
console.log(p); //小红
```

```js
//location.search
var search =
  "?uname=dingding&upwd=123456&favs=swimming&favs=running&favs=basketball";
function search2obj(str) {
  //创建新的空对象
  var obj = {};
  //去掉str开头的？
  str = str.slice(1);

  //"uname=dingding&upwd=123456&favs=swimming&favs=running&favs=basketball"
  var arr = str.split("&");
  //["uname=dingding,upwd=123456,favs=swimming,favs=running,favs=basketball"]
  //遍历arr中每个子字符串
  for (var s of arr) {
    //按=切割子字符串，然后将切割后的第一部分报错在遍历key中，将切割后的第二部分保存在遍历value中
    var [key, value] = s.split("=");
    //如果obj中不包含key为下标的属性
    if (obj[key] === undefined) {
      //就强行给obj添加key为下标的属性，并赋值
      obj[key] = value;
    } else {
      //否则，如果obj中已包含key为下标的属性
      //就取出obj中key属性的值，和新值value平常一个新数组，在放回obj中key属性保存
      obj[key] = [].concat(obj[key], value);
    }
  }
  return obj;
}
var obj = search2obj(search);
console.log(obj);
```

```js
this.b = "2";
function abc() {
  let b = 1;
  ++b;

  setTimeout(() => {
    test("fun text 第一个定时器");
  }, 3000);

  setTimeout(test("text fun 第二个定时器"), 3000);

  console.log(b); //2 打印局部++b的2
  function test(str) {
    //调用test    再调用匿名函数
    this.b++;
    console.log(str); //text fun   fun test
    console.log(this.b++); //3 //5
  }
}
abc();
```

```js
function sidEffecting(arr) {
  arr[0] = arr[0];
}
function bar(a, b, c) {
  c = 10;
  sidEffecting(arguments);
  return a + b + c;
}
console.log(bar(1, 1, 1)); //12
```

```css
#container {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  background-color: purple;
}
/*40x4+8*5=200*/
#container > div {
  width: 40px;
  height: 40px;
  background-color: #fff;
  margin-top: 8px;
  margin-left: 8px;
  float: left;
  border-radius: 4px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
```

```html
<!--动态生成4*4表格，每个表格中有坐标(0,0) - (3,3) 点击格增加次数，且每个格互不干扰(闭包！)，次数通过弹窗显示-->
<!--1. 先做静态页面-->
<div id="container"></div>
```

```js
 <script>
           (function(){//外层函数
      var arr=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ];
      var div=document.getElementById("container")
      //2. 动态为div添加16个子div
      for(var r=0;r<4;r++){//外层循环控制行号
        for(var c=0;c<4;c++){//内层循环控制列号
          var cell=document.createElement("div");
          cell.innerHTML=`(${r},${c})`;
          div.appendChild(cell);
          //方案1: 直接给每个格子添加单击事件处理函数，每个处理函数来自于一个闭包的外层函数调用的返回值，且闭包保存一个变量n，记录当前格子的点击次数——缺点: 每个n完全隔离，每个格子的n和n之间无法进行计算等操作
          // cell.onclick=(function(){
          //   var n=0;//当前格子的点击次数
          //   return function(){
          //     n++;
          //     alert(`点了${n}次`);
          //   }
          // })();
          // //cell.onclick=function(){(var n=0;) n++;alert(`点了${n}次`);}

          //方案2: 今后只要看到二维的布局，2048或消消乐，都应该用二维数组来存储所有格子的值。每个按钮的单击事件处理函数中应该只保存自己对应的元素的下标位置！当点击时，通过自己保存的行号和列号来找到二维数组中自己对应的元素值，修改。——缺点: arr数组是全局变量
          cell.onclick=(function(r,c){ //内层  //外层
            return function(){ //内层
              //将二维数组中r行c列的值+1
              arr[r][c]++;
              alert(`点击了${arr[r][c]}次`);
            }
          })(r,c);//将外部循环过程中r和c的值，传入妈妈函数中。保存到妈妈函数的局部变量r和c中
          //比如:
          //第一个cell: 外部for循环的r=0,c=0时
          //cell.onclick=function(){(r=0,c=0) arr[r][c]++; alert(`点击了${arr[r][c]}次`); }
          //第二个cell: 外部for循环的r=0,c=1时
          //cell.onclick=function(){ (r=0,c=1) arr[r][c]++; alert(`点击了${arr[r][c]}次`); }

          //方案3: 用匿名函数自调包裹整段代码！arr就成了局部变量，会被内层函数引用着，不会释放。但是外部也不能擅自修改了！
        }
      }
    })();
    </script>

```

```js
setTimeout(() => console.log("a"), 0); //定时器 回调
var p = new Promise((resolve) => {
  //直接写new promise中的代码属于主程序立刻执行的
  console.log("b"); //主程序立刻执行
  setTimeout(() => console.log("f"), 0); //定时器 回调
  resolve(); //自动调用.then()中的代码
});
p.then(() => console.log("c")); //微任务回调
p.then(() => console.log("d")); //微任务回调
console.log("e"); //主程序
// 执行顺序//b//e//c//d//a//f
```

```js
//观察者(observer)模式: 当一个变量值被修改时，可以自动通知所有关注这个变量的其他对象，让他们自动重新获得这个变量的新值。
var data = {
  money: 1000,
  setMoney(money) {
    this.money = money;
    //只要money被修改，就要调用notifyAll()
    this.notifyAll();
  },
  observers: [],
  notifyAll() {
    this.observers.forEach(function (obj) {
      obj.getMoney(); //要求，凡是进入observers数组中的对象，必须自身携带一个getMoney()函数，表示自己是关注money变化的
    });
  },
};

var obj1 = {
  money: 0,
  getMoney() {
    console.log(`obj1得知data的money被改为${data.money},并重新获得data.money`);
    this.money = data.money;
  },
};
var obj2 = {
  money: 0,
  getMoney() {
    console.log(`obj2得知data的money被改为${data.money},并重新获得data.money`);
    this.money = data.money;
  },
};
var obj3 = {
  money: 0,
  getMoney() {
    console.log(`obj3得知data的money被改为${data.money},并重新获得data.money`);
    this.money = data.money;
  },
};
data.observers.push(obj1);
data.observers.push(obj2);
data.observers.push(obj3);
data.setMoney(900);
console.log(obj1.money, obj2.money, obj3.money);
data.setMoney(800);
console.log(obj1.money, obj2.money, obj3.money);
```

```html
<html>
    <head>
        <meta charset="utf-8"/>
        <title>打开新链接方式总结</title>
        <script>
            /*打开新链接方式总结：
            1. 在当前窗口打开，可后退
            2. 在当前窗口打开，不可后退
            3. 在新窗口打开，可打开多个
            4. 在新窗口打开，只能打开一个
            */
            function open1(){
                window.open("http://baidu.com","_self");
            }
            function open2(){
                location.replace("http://baidu.com");
            }
            function open3(){
                window.open("http://baidu.com","_blank");
            }
            function open4(){
                window.open("http://baidu.com","tmooc");
            }
        </script>
    </head>
    <body>
        <h3>1. 在当前窗口打开，可后退</h3>
        <a href="http://baidu.com" target="_self">欢迎访问tmooc</a><br>
        <button onclick="open1()">欢迎访问tmooc</button>
        <h3>2. 在当前窗口打开，禁止后退</h3>
        <button onclick="open2()">欢迎访问tmooc</button>
        <h3>3. 在新窗口打开，可同时打开多个</h3>
        <a href="http://baidu.com" target="_blank">欢迎访问tmooc</a><br>
        <button onclick="open3()">欢迎访问tmooc</button>
        <h3>4. 在新窗口打开，同时只能打开一个</h3>
        <a href="http://baidu.com" target="tmooc">欢迎访问tmooc</a><br>
        <button onclick="open4()">欢迎访问tmooc</button>
    </body>
</html>


