### 跨域中option请求详解
在正式跨域的请求前，浏览器会根据需要，发起一个“PreFlight”（也就是Option请求），用来让服务端返回允许的方法（如get、post），被跨域访问的Origin（来源，或者域），还有是否需要Credentials(认证信息）
 
::: tip
三种场景：
1. 如果跨域的请求是Simple Request（简单请求 ），则不会触发“PreFlight”。Mozilla对于简单请求的要求是：
以下三项必须都成立：
1. 只能是Get、Head、Post方法
2. 除了浏览器自己在Http头上加的信息（如Connection、User-Agent），开发者只能加这几个：Accept、Accept-Language、Content-Type、。。。。
3. Content-Type只能取这几个值：
application/x-www-form-urlencoded
multipart/form-data
text/plain
:::

#### 一、为什么会出现options请求呢？


::: tip 
 跨域请求中，options请求是浏览器自发起的preflight request(预检请求)，以检测实际请求是否可以被浏览器接受。

preflight request请求报文中有两个需要关注的首部字段：

（1）Access-Control-Request-Method：告知服务器实际请求所使用的HTTP方法；

（2）Access-Control-Request-Headers：告知服务器实际请求所携带的自定义首部字段。

同时服务器也会添加origin header,告知服务器实际请求的客户端的地址。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

服务器所返回的Access-Control-Allow-Methods首部字段将所有允许的请求方法告知客户端，返回将所有Access-Control-Request-Headers首部字段将所有允许的自定义首部字段告知客户端。此外，服务器端可返回Access-Control-Max-Age首部字段，允许浏览器在指定时间内，无需再发送预检请求，直接用本次结果即可。

在我们开发过程中出现的浏览器自发起的options请求就是上面的第二种情况。实际上，跨域请求中的”复杂请求”发出前会进行一次方法是options的preflight request。

:::

#### 二、当跨域请求是简单请求时不会进行preflight request,只有复杂请求才会进行preflight request。

::: tip 
跨域请求分两种：简单请求、复杂请求；

符合以下任一情况的就是复杂请求：

1.使用方法put或者delete;

2.发送json格式的数据（content-type: application/json）

3.请求中带有自定义头部；

除了满足以上条件的复杂请求其他的就是简单请求喽！
:::

#### 三、为什么跨域的复杂请求需要preflight request？
::: tip
复杂请求可能对服务器数据产生副作用。例如delete或者put,都会对服务器数据进行修改,所以在请求之前都要先询问服务器，当前网页所在域名是否在服务器的许可名单中，服务器允许后，浏览器才会发出正式的请求，否则不发送正式请求
:::