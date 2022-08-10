# 浏览器缓存（强缓存、协商缓存）

### 前言
::: tip 
最近在背面试题时，时常会看见浏览器缓存，虽然没有用过但是从它的描写中大致是知道它的作用和重要性。但是还是没有代码实操过，也是一知半解的，这口气咽不下啊，开始找资料，但是大部分都是理论半行代码没有，终于东拼西凑顿悟了。开始搭环境，干活。
:::

### 浏览器缓存
::: tip
浏览器缓存是浏览器在本地磁盘对用户最近请求过的文档进行存储，当访问者再次访问同一页面时，浏览器就可以直接从本地磁盘加载文档。
浏览器缓存主要分为强缓存（也称本地缓存）和协商缓存（也称弱缓存）。

强缓存
当请求资源的时，如果是之前请求过的并使用强缓存，那么在过期时间内将不会发送本次请求向服务器获取资源，而是直接从浏览器缓存中获取（不管资源是否改动）。过期了将重新从服务器获取，并再次强缓存。
协商缓存
当请求资源时，如果是之前请求过的并使用协商缓存，还是发送请求到服务器，服务器通过逻辑判断确认资源没有修改返回304状态码，那么本次的资源则是从缓存中获取；如果经过判断确认资源被修改过，则重新发送资源到客户端，并且客户端更新缓存。

判断资源是否修改有两种标准，一种是判断最后修改时间是否变了（确实是修改了，但资源的内容可以没有变），另一种是判断资源的内容是否修改。
使用缓存有下面的优点：

减少冗余的数据传输
减少服务器负担
加快客户端加载网页的速度
:::

### 搭建环境

我们使用node+koa2来搭建我们需要的环境，安装koa、安装路由
``` npm
npm install koa --save
npm install koa-router --save
```

### app.js

```ts
var Koa = require('koa');
var app = new Koa();
var Router = require('koa-router')();
const fs = require('fs')
Router.get("/", async (ctx) => {
    ctx.body = "ok"
})
app
    .use(Router.routes())   	//启动路由
    .use(Router.allowedMethods());
app.listen(3000);
    //启动服务器，网页输入网址127.0.0.1:3000，环境搭建成功
```
### 强缓存

::: tip 
强缓存是利用http头中的Expires和Cache-Control两个字段来控制的，Expires是http1.0的规范，Cache-Control是在http1.1中出现的，我们这里使用Cache-Control示范。
Cache-Control有一些常设置的值

private：仅浏览器可以缓存（默认值）；

public：浏览器和代理服务器都可以缓存；

max-age=xxx：过期时间单位秒；

no-cache：不进行强缓存；

no-store：不强缓存，也不协商缓存）


:::


```ts
Router.get('/', async (ctx) => {
    const getResource = () => {
        return new Promise((res) => {
            fs.readFile("./fs/a.txt", (err, data) => {
                if (err) {
                    return;
                }
                res(data)
            })
        })
    }
    ctx.set('Cache-Control', 'max-age=10')  //设置强缓存，过期时间为10秒
    ctx.body = await getResource(); 
// })
// 将测试搭建环境页面关闭，重新打开网页访问127.0.0.1:3000
// 前端页面响应头多了Cache-Control这个字段，且10s内都走本地缓存，不会去请求服务端
// 在过期时间内再次请求资源，就可以看到这次请求并没有经过服务器
```
### 协商缓存

主要涉及到两组header字段：Etag和If-None-Match、Last-Modified和if-modified-since。


### Etag和If-None-Match

::: tip
浏览器第一次请求一个资源的时候，服务器返回的header中会加上Last-Modify，Last-Modify是一个时间标识该资源的最后修改时间，例如Last-Modify: Thu,31 Dec 2037 23:59:59 GMT。
当浏览器再次请求该资源时，request的请求头中会包含 if-modified-since，该值为缓存之前返回的Last-Modify。服务器收到if-modified-since后，根据资源的最后修改时间判断是否命中缓存。
如果命中缓存，则返回304，并且不会返回资源内容，并且不会返回Last-Modify。
样例我们使用Last-Modify和if-modified-since来实现。对于Etag和If-None-Match的实现，读取资源内容，转成hash值，然后跟Last-Modify和if-modified-since的实现差不多了，同一个道理。
:::

新添加一个路由器
```ts
Router.get('/pp', async (ctx) => {
    const ifModifiedSince = ctx.request.header['if-modified-since'];
    const getResource = () => {
        return new Promise((res) => {
            fs.stat("./fs/a.txt", (err, stats) => {
                if (err) {
                    console.log(err);
                }
                res(stats)
            })
        })
    }
    let resource = await getResource();
    // atime	Access Time	访问时间	
    // 最后一次访问文件（读取或执行）的时间
    // ctime	Change Time	变化时间	
    // 最后一次改变文件（属性或权限）或者目录（属性或权限）的时间
    // mtime	Modify Time	修改时间	
    // 最后一次修改文件（内容）或者目录（内容）的时间
    if (ifModifiedSince === resource.mtime.toGMTString()) { //把具体的日期转换为（根据 GMT）字符串
        ctx.status = 304;
    }
    ctx.set('Last-Modified', resource.mtime.toGMTString());
    ctx.body = resource
})
```
::: tip
关闭页面，重新打开网页访问127.0.0.1:3000/pp

第一次请求，是没有if-modified-since字段的

第二次请求，没有修改资源，返回状态码304，从缓存获取资源
:::