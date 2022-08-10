# websocket

::: tip
解决问题：
有心跳检测及自动重连机制，当网络断开或者后端服务问题造成客户端 websocket 断开，程序会自动尝试重新连接直到再次连接成功
:::

# vue 中使用 websocket

::: tip
场景阐述
在使用原生 websocket 的时候，如果设备网络断开，不会触发任何函数，前端程序无法得知当前连接已经断开。这个时候如果调用 websocket.send 方法，浏览器就会发现消息发不出去，便会立刻或者一定短时间后（不同浏览器或者浏览器版本可能表现不同）触发 onclose 函数。
后端 websocket 服务也可能出现异常，连接断开后前端也并没有收到通知，因此需要前端定时发送心跳消息 ping，后端收到 ping 类型的消息，立马返回 pong 消息，告知前端连接正常。如果一定时间没收到 pong 消息，就说明连接不正常，前端便会执行重连。
为了解决以上两个问题，以前端作为主动方，定时发送 ping 消息，用于检测网络和前后端连接问题。一旦发现异常，前端持续执行重连逻辑，直到重连成功。
:::

```html
<template>
  <div class="box">websocket</div>
</template>
```

```ts

<script>
  const heartCheck = {
    timeout: 60 * 1000,
    timer: null,
    serverTimer: null,
    reset() {
      this.timer && clearTimeout(this.timer)
      this.serverTimer && clearTimeout(this.serverTimer)
    },
    start(ws) {
      this.reset()
      this.timer = setTimeout(() => {
        // console.log('发送心跳,后端收到后，返回一个心跳消息')
        // onmessage拿到返回的心跳就说明连接正常
        ws.send(JSON.stringify({ heart: 1 }))
        this.serverTimer = setTimeout(() => {
          // 如果超过一定时间还没响应(响应后触发重置)，说明后端断开了
          ws.close()
        }, this.timeout)
      }, this.timeout)
    }
  }
  export default {
    name: 'Websocket',
    data() {
      return {
        asrc,
        wsuri: 'ws://123.207.167.163:9010/ajaxchattest', // ws wss
        lockReconnect: false, // 连接失败不进行重连
        maxReconnect: 5, // 最大重连次数，若连接失败
        socket: null
      }
    },
    mounted() {
      this.initWebSocket()
    },
    methods: {
      reconnect() {
        console.log('尝试重连')
        if (this.lockReconnect || this.maxReconnect <= 0) {
          return
        }
        setTimeout(() => {
          // this.maxReconnect-- // 不做限制 连不上一直重连
          this.initWebSocket()
        }, 60 * 1000)
      },
      initWebSocket() {
        try {
          if ('WebSocket' in window) {
            this.socket = new WebSocket(this.wsuri)
          } else {
            console.log('您的浏览器不支持websocket')
          }
          this.socket.onopen = this.websocketonopen
          this.socket.onerror = this.websocketonerror
          this.socket.onmessage = this.websocketonmessage
          this.socket.onclose = this.websocketclose
        } catch (e) {
          this.reconnect()
        }
      },
      websocketonopen() {
        console.log('WebSocket连接成功', this.socket.readyState)
        heartCheck.start(this.socket)
        // this.socket.send('发送数据')
        this.websocketsend()
      },
      websocketonerror(e) {
        console.log('WebSocket连接发生错误', e)
        this.reconnect()
      },
      websocketonmessage(e) {
        // console.log(e)
        let data = JSON.parse(e.data)
        console.log('得到响应', data)
        console.log('可以渲染网页数据...')
        // 消息获取成功，重置心跳
        heartCheck.start(this.socket)
      },
      websocketclose(e) {
        console.log('connection closed (' + e.code + ')')
        this.reconnect()
      },
      websocketsend() {
        let data = { id: 'a1b2c3' }
        this.socket.send(JSON.stringify(data))
      }
    },
    destroyed() {
      this.socket.close()
    }
  }
</script>
```
