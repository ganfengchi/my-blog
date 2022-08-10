### 你说你会 Promise？那你解决一下项目中的这五个难题？ 转载自掘金

### 前言

> 大家好，我是林三心，用最通俗易懂的话讲最难的知识点是我的座右铭，基础是进阶的前提是我的初心，众所周知哈，Promise 在咱们的开发中是相当的重要，我觉得对于 Promise 的使用等级，可以分为三个等级
> 1、掌握 Promise 的基本使用
> 2、掌握 Promise 的基本原理
> 3、在项目中能灵活运用 Promise 解决一些问题

第一点的话，其实就是能掌握 Promise 的一些基本使用方法以及一些方法，如 then、catch、all、race、finally、allSettled、any、resolve 等等<br/>
第二点的话，就是要能简单实现一下 Promise 的原理，这能使我们对 Promise 的那些常用方法有更好的理解<br/>
第三点的话，就是要能灵活 Promise 解决咱们开发中的一些问题，今天我就给大家说一下我用 Promise 在项目开发中解决了什么问题吧！<br/>

### 接口请求超时

顾名思义，就是给定一个时间，如果接口请求超过这个时间的话就报错
1、自己实现
实现思路就是：接口请求和延时函数赛跑，并使用一个 Promise 包着，由于 Promise 的状态是不可逆的，所以如果接口请求先跑完则说明未超时且 Promise 的状态是 fulfilled，反之，延时函数先跑完则说明超时了且 Promise 的状态是 rejetced，最后根据 Promise 的状态来判断有无超时

```ts
/**
 * 模拟延时
 * @param {number} delay 延迟时间
 * @returns {Promise<any>}
 */
function sleep(delay) {
  return new Promise((_, reject) => {
    setTimeout(() => reject("超时喽"), delay);
  });
}

/**
 * 模拟请求
 */
function request() {
  // 假设请求需要 1s
  return new Promise((resolve) => {
    setTimeout(() => resolve("成功喽"), 1000);
  });
}

/**
 * 判断是否超时
 * @param {() => Promise<any>} requestFn 请求函数
 * @param {number} delay 延迟时长
 * @returns {Promise<any>}
 */
function timeoutPromise(requestFn, delay) {
  return new Promise((resolve, reject) => {
    const promises = [requestFn(), sleep(delay)];
    for (const promise of promises) {
      // 超时则执行失败，不超时则执行成功
      promise.then(
        (res) => resolve(res),
        (err) => reject(err)
      );
    }
  });
}
```

### 2、Promise.race

其实 timeoutPromise 中的代码可以使用 Promise.race 来代替，是同样的效果

```ts
function timeoutPromise(requestFn, delay) {
  // 如果先返回的是延迟Promise则说明超时了
  return Promise.race([requestFn(), sleep(delay)]);
}
```

### 3.测试

```TS
// 超时
timeoutPromise(request, 500).catch(err => console.log(err)) // 超时喽

// 不超时
timeoutPromise(request, 2000).then(res => console.log(res)) // 成功喽
```

#转盘抽奖
我们平时在转盘抽奖时，一般都是开始转动的同时也发起接口请求，所以有两种可能

1、转盘转完，接口还没请求回来，这是不正常的<br/>
2、转盘转完前，接口就请求完毕，这是正常的，但是需要保证请求回调跟转盘转完回调同时执行<br/>

### 1、转盘转完，接口还没请求回来

主要问题就是，怎么判断接口请求时间是否超过转盘转完所需时间，咱们其实可以用到上一个知识点接口请求超时，都是一样的道理。如果转盘转完所需时间是 2500ms，那咱们可以限定接口请求需要提前 1000ms 请求回来，也就是接口请求的超时时间为 2500ms - 1000ms = 1500ms

```ts
/**
 * 模拟延时
 * @param {number} delay 延迟时间
 * @returns {Promise<any>}
 */
function sleep(delay) {
  return new Promise((_, reject) => {
    setTimeout(() => reject("超时喽"), delay);
  });
}

/**
 * 模拟请求
 */
function request() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("成功喽"), 1000);
  });
}

/**
 * 判断是否超时
 * @param {() => Promise<any>} requestFn 请求函数
 * @param {number} delay 延迟时长
 * @returns {Promise<any>}
 */
function timeoutPromise(requestFn, delay) {
  return Promise.race([requestFn(), sleep(delay)]);
}
```

### 2、转盘转完前，接口就请求完毕

咱们确保了接口请求可以在转盘转完之前请求回来，但是还有一个问题，就是需要保证请求回调跟转盘转完回调同时执行，因为虽然接口请求请求回来的时候，转盘还在转着，咱们需要等转盘转完时，再一起执行这两个回调
听到这个描述，相信很多同学就会想到 Promise.all 这个方法

```TS
// ...上面代码

/**
 * 模拟转盘旋转到停止的延时
 * @param {number} delay 延迟时间
 * @returns {Promise<any>}
 */
 function turntableSleep(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve('停止转动喽'), delay)
  })
}

/**
 * 判断是否超时
 * @param {() => Promise<any>} requestFn 请求函数
 * @param {number} turntableDelay 转盘转多久
 * @param {number} delay 请求超时时长
 * @returns {Promise<any>}
 */

function zhuanpanPromise(requsetFn, turntableDelay, delay) {
  return Promise.all([timeoutPromise(requsetFn, delay), turntableSleep(turntableDelay)])
}
```

### 3、测试

// 不超时，且先于转盘停止前请求回数据

```ts
zhuanpanPromise(request, 2500, 1500).then(
  (res) => console.log(res),
  (err) => console.log(err)
);
```

### 控制并发的 Promise 的调度器

想象一下，有一天你突然一次性发了 10 个请求，但是这样的话并发量是很大的，能不能控制一下，就是一次只发 2 个请求，某一个请求完了，就让第 3 个补上，又请求完了，让第 4 个补上，以此类推，让最高并发量变成可控的
addTask(1000,"1");<br/>
addTask(500,"2");<br/>
addTask(300,"3");<br/>
addTask(400,"4");<br/>
的输出顺序是：2 3 1 4<br/>

整个的完整执行流程：<br/>
一开始 1、2 两个任务开始执行<br/>
500ms 时，2 任务执行完毕，输出 2，任务 3 开始执行<br/>
800ms 时，3 任务执行完毕，输出 3，任务 4 开始执行<br/>
1000ms 时，1 任务执行完毕，输出 1，此时只剩下 4 任务在执行<br/>
1200ms 时，4 任务执行完毕，输出 4<br/>

###实现

```ts
class Scheduler {
  constructor(limit) {
    this.queue = [];
    this.limit = limit;
    this.count = 0;
  }

  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time);
      });
    };
    this.queue.push(promiseCreator);
  }

  taskStart() {
    for (let i = 0; i < this.limit; i++) {
      this.request();
    }
  }

  request() {
    if (!this.queue.length || this.count >= this.limit) return;
    this.count++;
    this.queue
      .shift()()
      .then(() => {
        this.count--;
        this.request();
      });
  }
}
```

#测试

```ts
// 测试
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
```

### 取消重复请求

举个例子，咱们在做表单提交时，为了防止多次重复的提交，肯定会给按钮的点击事件加上防抖措施，这确实是有效地避免了多次点击造成的重复请求，但是其实还是有弊端的
众所周知，为了用户更好地体验，防抖的延时是不能太长的，一般在我的项目中都是 300ms，但是这只能管到请求时间 < 300ms 的接口请求，如果有一个接口请求需要 2000ms，那么此时防抖也做不到完全限制重复请求，所以咱们需要额外做一下取消重复请求的处理

```ts
// 实现
// 实现思路：简单说就是，利用Promise.race方法，给每一次请求的身边安装一颗雷，如果第一次请求后，又接了第二次重复请求，那么就执行第一次请求身边的雷，把第一次请求给炸掉，以此类推。
class CancelablePromise {
  constructor() {
    this.pendingPromise = null;
    this.reject = null;
  }

  request(requestFn) {
    if (this.pendingPromise) {
      this.cancel("取消重复请求");
    }

    const promise = new Promise((_, reject) => (this.reject = reject));
    this.pendingPromise = Promise.race([requestFn(), promise]);
    return this.pendingPromise;
  }

  cancel(reason) {
    this.reject(reason);
    this.pendingPromise = null;
  }
}

function request(delay) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("最后赢家是我");
      }, delay);
    });
}
```

### 测试

```ts
const cancelPromise = new CancelablePromise();
// 模拟频繁请求5次
for (let i = 0; i < 5; i++) {
  cancelPromise
    .request(request(2000))
    .then((res) => console.log(res)) // 最后一个 最后赢家是我
    .catch((err) => console.error(err)); // 前四个 取消重复请求
}
```

### 全局请求 loading

比如一个页面中，或者多个组件中都需要请求并且展示 loading 状态，此时我们不想要每个页面或者组件都写一遍 loading，那我们可以统一管理 loading，loading 有两种情况

1、全局只要有一个接口还在请求中，就展示 loading
2、全局所有接口都不在请求中，就隐藏 loading

那我们怎么才能知道全局接口的请求状态呢？其实咱们可以利用 Promise，只要某个接口请求 Promise 的状态不是 pending 那就说明他请求完成了，无论请求成功或者失败，既然是无论成功失败，那咱们就会想到 Promise.prototype.finally 这个方法

```ts
// 实现
class PromiseManager {
  constructor() {
    this.pendingPromise = new Set();
    this.loading = false;
  }

  generateKey() {
    return `${new Date().getTime()}-${parseInt(Math.random() * 1000)}`;
  }

  push(...requestFns) {
    for (const requestFn of requestFns) {
      const key = this.generateKey();
      this.pendingPromise.add(key);
      requestFn().finally(() => {
        this.pendingPromise.delete(key);
        this.loading = this.pendingPromise.size !== 0;
      });
    }
  }
}
```

### 测试

```ts
// 模拟请求
function request(delay) {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve("成功喽"), delay);
    });
  };
}

const manager = new PromiseManager();

manager.push(
  request(1000),
  request(2000),
  request(800),
  request(2000),
  request(1500)
);

const timer = setInterval(() => {
  // 轮询查看loading状态
  console.log(manager.loading);
}, 300);
```
