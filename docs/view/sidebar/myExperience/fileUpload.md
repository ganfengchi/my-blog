# 文件上传

### 知识点

```js
new FormData

{
    headers:{
        'Content-Type':'multipart/form-data'
    }
}
//formdata类型
```

```ts
const upLoad = (files) => {
  const formData = new FromData();
  fromData.append("upLoadFiles", files.file); //主要文件
  fromData.append("xxxxx", xxx); //其他参数
};
axios
  .post("/file/Upload", formData, { "Content-Type": "multipart/form-data" })
  .then()
  .catch()
  .fanally();
```
