### 什么是 async/await

async/await 是异步代码的新方式，以前的方法有回调函数和 Promise。<br/>
async/await 是基于 Promise 实现的，它不能用于普通的回填函数。<br/>
async/await 与 Promise 一样，是非阻塞的。<br/>
async/await 使得异步代码看起来像同步代码，这正是它的魔力所在之处。<br/>

### 什么是 Promise

Promise 是一个对象，对象和函数的区别就是对象可以保存状态，函数不可以（闭包除外）<br/>
并未剥夺函数 return 的能力，因此无需层层传递 callback，进行回调获取数据<br/>
代码风格，容易理解，便于维护<br/>
多个异步等待合并便于解决<br/>
Promise 是一个构造函数，自己身上有 all、reject、resolve 这几个眼熟的方法，原型上有 then、catch 等同样很眼熟的方法。<br/>

### async/await 语法

```ts
// 使用Promise
Promise.resolve().then((data) => {
  //promise
  console.log(data);
  return "aaa";
});

// 使用Async
async function foo() {
  console.log(await getJSON);
  return "aaa";
}
foo();
```

### 区别

函数前面多了一个 async 关键字。await 关键字只能用于 async 定于的函数内。async 函数会隐式地返回一个 Promise,该 promise 的 resolve 值就是 return 的值。示例中 resolve 的值就是字符串"aaa"<br/>
await 的是有使用限制的，await 关键字只能用于 async 定于的函数内，如果未使用 async 而直接使用 await 就会抛 SyntaxError。)<br/>

```ts
//不允许出现未使用async关键字的函数中
function foo() {
  const syncFn = () => {
    return await Promise.resolve("foo");
  };
  console.log(syncFn());
}

function bar() {
  const syncFn = function () {
    return await Promise.resolve("bar");
  };
  console.log(syncFn());
}
```

### 为什么 async/await 更好？

使用 async 函数可以让代码简洁很多，不需要想 Promise 一样需要 then,不需要写匿名函数处理 Promise 的 resolve 的值，也不需要定义多余的 data 变量，还避免了嵌套代码。<br/>
async/await 让 try/catch 可以同时处理同步和异步的错误。在下面的示例中，try/catch 不能处理 JSON.parse 的错误，因为它在 Promise 中,我们需要使用.catch,这样的错误会显得代码非常的冗余。

```ts
const makeRequest = () => {
  try {
  	getJSON().then(result => {
    // JSON.parse可能会出错
    const data = JSON.parse(result)
    console.log(data)
     })
   // 取消注释，处理异步代码的错误
   // .catch((err) => {
   //   console.log(err)
   // })
   } catch (err) {
    console.log(err)
        }
    }
```

使用 async/await 的话，catch 能处理 JSON.parse 错误

```ts
const makeRequest = async () => {
  try {
    // this parse may fail
    const data = JSON.parse(await getJSON())
    console.log(data)
  } catch (err) {
    console.log(err)
  }

```
