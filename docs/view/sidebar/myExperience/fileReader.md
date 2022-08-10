# FileReader 对象
FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容。

浏览器原生提供一个FileReader构造函数，用来生成 FileReader 实例。

### 我们看MDN上怎么说
::: tip
#### FileReader
FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。<br/>

其中 File 对象可以是来自用户在一个input元素上选择文件后返回的FileList对象，也可以来自拖放操作生成的 DataTransfer对象，还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。<br/>

重要提示： FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。要在 JavaScript 中按路径名读取文件，应使用标准 Ajax 解决方案进行服务器端文件读<br/>取，如果读取跨域，则使用 CORS 权限。
:::

```js
var reader = new FileReader();
```
::: tip
FileReader 有以下的实例属性。<br/>

FileReader.error：读取文件时产生的错误对象<br/>
FileReader.readyState：整数，表示读取文件时的当前状态。一共有三种可能的状态，0表示尚未加载任何数据，1表示数据正在加载，2表示加载完成。<br/>
FileReader.result：读取完成后的文件内容，有可能是字符串，也可能是一个 ArrayBuffer 实例。<br/>
FileReader.onabort：abort事件（用户终止读取操作）的监听函数。<br/>
FileReader.onerror：error事件（读取错误）的监听函数。<br/>
FileReader.onload：load事件（读取操作完成）的监听函数，通常在这个函数里面使用result属性，拿到文件内容。<br/>
FileReader.onloadstart：loadstart事件（读取操作开始）的监听函数。<br/>
FileReader.onloadend：loadend事件（读取操作结束）的监听函数。<br/>
FileReader.onprogress：progress事件（读取操作进行中）的监听函数。<br/>
:::

::: tip
FileReader 有以下实例方法:<br/>
FileReader.abort()：终止读取操作，readyState属性将变成2。<br/>
FileReader.readAsArrayBuffer()：以 ArrayBuffer 的格式读取文件，读取完成后result属性将返回一个 ArrayBuffer 实例。<br/>
FileReader.readAsBinaryString()：读取完成后，result属性将返回原始的二进制字符串。<br/>
FileReader.readAsDataURL()：读取完成后，result属性将返回一个 Data URL 格式（Base64 编码）的字符串，代表文件内容。对于图片文件，这个字符串可以用于<img>元素的src属性。注意，这个字符串不能直接进行 Base64 解码，必须把前缀data:*/*;base64,从字符串里删除以后，再进行解码。<br/>
FileReader.readAsText()：读取完成后，result属性将返回文件内容的文本字符串。该方法的第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 UTF-8。<br/>
:::