### 对象映射

::: tip
有时候遇到这么一种情况,端返回码值，前端需要反显文本,这时候就要用到映射了
:::

```ts
const obj = {
  小明1: 1,
  小明2: 2,
  小明3: 3,
  小明4: 4,
  小明5: 5,
  小明6: 6,
  小明7: 7,
  小明8: 8,
  小明9: 9,
  小明10: 10,
};

function codeToText(obj) {
  let map = {};
  for (let key in obj) {
    map[obj[key]] = key;
  }
  return map;
}
console.log(codeToText(obj));
// 1: "小明1"
// 2: "小明2"
// 3: "小明3"
// 4: "小明4"
// 5: "小明5"
// 6: "小明6"
// 7: "小明7"
// 8: "小明8"
// 9: "小明9"
// 10: "小明10"
let codelist = codeToText(obj);
function textTocode(obj) {
  let map = {};
  for (let key in obj) {
    map[obj[key]] = key;
  }
  return map;
}
console.log(textTocode(codelist));
//  小明1: "1"
// 小明2: "2"
// 小明3: "3"
// 小明4: "4"
// 小明5: "5"
// 小明6: "6"
// 小明7: "7"
// 小明8: "8"
// 小明9: "9"
// 小明10: "10"
```
