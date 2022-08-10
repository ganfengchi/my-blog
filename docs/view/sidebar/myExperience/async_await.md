# 引言

> async/await 是非常棒的语法糖，可以说他是解决异步问题的最终解决方案。从字面意思来理解。async 是异步的意思，而 await 是 等待 ，所以理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。

### async 作用

> async 声明 function 是一个异步函数，返回一个 promise 对象，可以使用 then 方法添加回调函数。async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。

```ts
async function test() {
  return "test";
}
console.log(test); // [AsyncFunction: test] async函数是[`AsyncFunction`]构造函数的实例
console.log(test()); // Promise { 'test' }

// async返回的是一个promise对象
test().then((res) => {
  console.log(res); // test
});
// 如果async函数没有返回值 async函数返回一个undefined的promise对象
async function fn() {
  console.log("没有返回");
}
console.log(fn()); // Promise { undefined }
// 可以看到async函数返回值和Promise.resolve()一样，将返回值包装成promise对象，如果没有返回值就返回undefined的promise对象
```

### await

> await 操作符只能在异步函数 async function 内部使用。如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果，也就是说它会阻塞后面的代码，等待 Promise 对象结果。如果等待的不是 Promise 对象，则返回该值本身。

```ts
async function test() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("test 1000");
    }, 1000);
  });
}
function fn() {
  return "fn";
}

async function next() {
  let res0 = await fn(),
    res1 = await test(),
    res2 = await fn();
  console.log(res0);
  console.log(res1);
  console.log(res2);
}
next(); // 1s 后才打印出结果 为什么呢 就是因为 res1在等待promise的结果 阻塞了后面代码。
```

## 错误处理

> 如果 await 后面的异步操作出错，那么等同于 async 函数返回的 Promise 对象被 reject。

```js
async function test() {
  await Promise.reject("错误了");
}

test().then(
  (res) => {
    console.log("success", res);
  },
  (err) => {
    console.log("err ", err);
  }
);
// err 错误了
```

> 防止出错的方法，也是将其放在 try...catch 代码块之中。

```js
async function test() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error("错误了");
    });
  } catch (e) {
    console.log("err", e);
  }
  return await "成功了";
}
```

> 多个 await 命令后面的异步操作，如果不存在继发关系（即互不依赖），最好让它们同时触发。

```js
let foo = await getFoo();
let bar = await getBar();
// 上面这样写法 getFoo完成以后，才会执行getBar

// 同时触发写法 ↓

// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

## async/await 优点

> async/await 的优势在于处理由多个 Promise 组成的 then 链，在之前的 Promise 文章中提过用 then 处理回调地狱的问题，async/await 相当于对 promise 的进一步优化。
> 假设一个业务，分多个步骤，且每个步骤都是异步的，而且依赖上个步骤的执行结果。

```js
// 假设表单提交前要通过俩个校验接口

async function check(ms) {
  // 模仿异步
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`check ${ms}`);
    }, ms);
  });
}
function check1() {
  console.log("check1");
  return check(1000);
}
function check2() {
  console.log("check2");
  return check(2000);
}

// -------------promise------------
function submit() {
  console.log("submit");
  // 经过俩个校验 多级关联 promise传值嵌套较深
  check1().then((res1) => {
    check2(res1).then((res2) => {
      /*
       * 提交请求
       */
    });
  });
}
submit();

// -------------async/await-----------
async function asyncAwaitSubmit() {
  let res1 = await check1(),
    res2 = await check2(res1);
  console.log(res1, res2);
  /*
   * 提交请求
   */
}
```

### 原理

> async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

```js
/*
 * Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。
 * 异步操作需要暂停的地方，都用 yield 语句注明
 * 调用 Generator 函数，返回的是指针对象(这是它和普通函数的不同之处),。调用指针对象的 next 方法，会移动内部指针。
 * next 方法的作用是分阶段执行 Generator 函数。每次调用 next 方法，会返回一个对象，表示当前阶段的信息（ value 属性和 done 属性）。value 属性是 yield 语句后面表达式的值，表示当前阶段的值；done 属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。
 */

// 了解generator的用法
function* Generator() {
  yield "1";
  yield Promise.resolve(2);
  return "ending";
}

var gen = Generator(); // 返回指针对象 Object [Generator] {}

let res1 = gen.next();
console.log(res1); // 返回当前阶段的值 { value: '1', done: false }

let res2 = gen.next();
console.log(res2); // 返回当前阶段的值 { value: Promise { 2 }, done: false }

res2.value.then((res) => {
  console.log(res); // 2
});

let res3 = gen.next();
console.log(res3); // { value: 'ending', done: true }

let res4 = gen.next();
console.log(res4); // { value: undefined, done: true }
```

> Generator 实现 async 函数

```js
// 接受一个Generator函数作为参数
function spawn(genF) {
  // 返回一个函数
  return function () {
    // 生成指针对象
    const gen = genF.apply(this, arguments);
    // 返回一个promise
    return new Promise((resolve, reject) => {
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield
      function step(key, arg) {
        let result;

        // 监控到错误 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          result = gen[key](arg);
        } catch (error) {
          return reject(error);
        }

        // gen.next() 返回 { value, done } 的结构
        const { value, done } = result;

        if (done) {
          // 如果已经完成了 就直接resolve这个promise
          return resolve(value);
        } else {
          // 除了最后结束的时候外，每次调用gen.next()
          return Promise.resolve(
            // 这个value对应的是yield后面的promise
            value
          ).then(
            (val) => step("next", val),
            (err) => step("throw", err)
          );
        }
      }
      step("next");
    });
  };
}
```

### 测试

```js
function fn(nums) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(nums);
    }, 1000);
  });
}
// async 函数
async function testAsync() {
  let res1 = await fn(1);
  console.log(res1); // 1
  let res2 = await fn(2);
  console.log(res2); // 2
  return res2;
}
let _res = testAsync();
console.log("testAsync-res", _res); // Promise
_res.then((v) => console.log("testAsync-res", v)); // 2

// Generator函数
function* gen() {
  let res1 = yield fn(3);
  console.log(res1); // 3
  let res2 = yield fn(4);
  console.log(res2); // 4
  // let res3 = yield Promise.reject(5);
  //  console.log(res3);
  return res2;
}

let _res2 = spawn(gen)();
console.log("gen-res", _res2); // Promise

_res2
  .then((v) => console.log("gen-res", v)) // 4
  .catch((err) => {
    console.log(err);
  }); // res3 执行会抛出异常
```
