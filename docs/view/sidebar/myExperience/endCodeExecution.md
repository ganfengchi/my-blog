# js 中终止代码执行的方法

### 例如当不满足某条件是不发送 ajax

```js
//方法1
if (!true) {
  return false;
}
const reslut = await getData();

//方法2
if (!true) {
  return new Promise((resolve, reject) => {
    reject();
  });
}
const reslut = await getData();
//方法3
if (!true) {
  return;
}
const reslut = await getData();

//方法4
function getDaatahandle() {
  return new Promise((resolve, reject) => {
    if (!true) {
      reject();
    } else {
      resolve();
    }
  });
}
const reslut = await getData();
```
