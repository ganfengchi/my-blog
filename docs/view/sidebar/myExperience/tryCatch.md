### try..catch/es5 标准模式

> 在 try 里面发生错误，不会执行错误后的 try 里面的代码,但依然会执行外面的代码

```ts
// 例1

try{
    console.log('a');
    console.log(b);//后面的终止执行
    console.log('c');

}catch(e){

}
console.log('d');
// 打印a,d

// 例2
try{
    console.log('a');
    console.log(b);
    console.log('c');

}catch(e){//捕捉错误,try里面没有错误就不会捕捉catch-->//error error.message error.name---->error
    console.log(e.name+":"+e.message);
}
console.log('d');
//  a
// ReferenceError:b is not defined、
// d


// 例3 语法解析错误syntaxError
function test(){}
function demo(){
    : //---syntaxerror
}

// 例4 ReferenceError非法或不能识别的引用数值
var str =abcd;//abcd is not defined
```

> 启用 es5 严格模式----那么 es3.0 和 es5.0 产生冲突的部分就是用 es5.0，否则用 es3.0
> 1----"use strict"//遵循 es5.0,不再兼容 es3 的一些不规则语法，使用 es5 新规范<br/>
> 2----两种用法<br/>
> 1）全局严格模式<br/>
> 2）局部函数内严格模式（推荐）<br/>

```js
例5;
function demo() {
  console.log(arguments.callee);
}
demo(); //----es3.0

function test() {
  "use strict"; //----es5.0
  console.log(arguments.callee);
}
test();
```

"use strict"字符串形式是为了--浏览器内核升级了才好用，不会对不兼容严格模式的浏览器产生影响<br/>
不支持 with/arguments.callee/func.caller,变量赋值前必须声明，局部 this 必须被赋值(Person.call(null/undefined)赋值什么就是什么)，拒绝重复属性和参数<br/>
with 可以改变作用域链，with 里面添对象的话，把对象当作 with 要执行的代码体作用域链的最顶端<br/>
es5 严格模式不允许用 with,防止它更改作用域链，提高程序运行效率<br/>

```js
// 例6
var obj = {
  name: "obj",
  age: 234,
};
var name = "window";
function test() {
  var age = 12; //obj里面没有age的时候会执行
  var name = "scope";
  with (obj) {
    console.log(name); //obj
    console.log(age); //234
  }
}
test(); //obj

// 例7命名空间的用法
var org = {
  dp1: {
    jc: {
      name: "abc",
      age: 123,
    },
    deng: {
      name: "xiaodeng",
      age: 234,
    },
  },

  dp2: {},
};
with (org.dp1.jc) {
  console.log(name); //abc
}
with (org.dp1.deng) {
  console.log(name); //xiaodeng
}

// document对象上有很多对象和方法
// 例8
console.log(document);

with (document) {
  write("a"); //这样就不用写document.write("a") 了，直接找
}

// es5严格模式不允许用with,防止它更改作用域链，提高程序运行效率
// 例9
("use strict");
with (document) {
  write("a");
} //Uncaught SyntaxError: Strict mode code may not include a with statement

// 例10
("use strict");
function test() {
  // console.log(arguments.callee);--1
  console.log(test.caller); //--2
}
function demo() {
  //---2
  test(); //---2
} //---2
// test();--1
demo(); //--2

// 严格模式里面this必须被赋值,要么new
// 例11
("use strict");
function test() {
  console.log(this);
}
test(); //undefined
new test(); //test{}
test.call({}); //{}空对象
test.call(123); //123

小例子;
("use strict");
console.log(this); //全局

// 拒绝重复属性和参数
// 例12
// es3里面重复的参数不报错，es5报错
// 小例子
("use strict");
function test(name, name) {
  console.log(name);
}
test(1, 2); //报错
// 小例子
var obj = {
  name: "123",
  name: "234",
}; //重复属性不报错w223654423ewdfry3wsa12

例13;
("use strict");
var a = 123;
eval("console.log (a) "); //打印123
// eval把字符串当代码执行，但es3里面不能用eval
```
