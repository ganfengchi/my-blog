## 文件流下载


::: tip
什么是文件流  
当我们前端与后端交互的时候 后端返回文件流  
在响应头 Response Headers中
Content-Type:application/octet-strean;charset=utf-8就是文件流的格式
:::
### 怎么处理文件流
::: tip
一般文件流会直接进入catch 
:::

## 知识点
::: tip
 new Blob()

blob对象标识一个不可变，原生数据的类型文件对象，他的数据可以按文本或者在二进制的格式进行读取，也可以转换成ReadableStream来用于数据操作  

 new FlieRander
 
 FlieRander对象允许Web应用程序异步去读存储在金酸剂上的文件(或原生数据缓冲区)的内容，使用File或Blob对象指定要读取的文件或数据
:::

```ts
const fileDownload = (url,params)=>{
    axios.post(url,params,{
    responseTpye:'blob'
})
.then(res=>{
    const blob = nwe Blob([res])
    if(!!window.ActiveXObject ||'ActiveXObject' in window ){
        window.navigator.msSavaBlob(blob,fileName)
    }else{
        let DownloadElement= document.createElement('a')
        let href=window.URL.createObjectURL(blob)
        DownloadElement.href=href
        DownloadElement.download=fileName
        document.body.appendChile(DownloadElement)
        DownloadElement.click()
        window.URL.revokeObjectURL(href)
    }
})
.catch(err=>{
    if(err.type==='application/json'){
        let reader= new FileReader()
        reader.onload=(e)=>{
            const  res =JSON.parse(e.currentTarget.reslut)
            if(res.code&&res.code==='9999'){
                this.$message.error(res.message)
            }
        }
        reader.readAsText(err)
    }else{
         const blob = nwe Blob([res])
        if(!!window.ActiveXObject ||'ActiveXObject' in window ){
            window.navigator.msSavaBlob(blob,fileName)
        }else{
            let DownloadElement= document.createElement('a')
            let href=window.URL.createObjectURL(blob)
            DownloadElement.href=href
            DownloadElement.download=fileName
            document.body.appendChile(DownloadElement)
            DownloadElement.click()
            window.URL.revokeObjectURL(href)
        } 
    }
})

}
````