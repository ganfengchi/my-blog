# 手动实现一个outside

``` html
<div id='outside'></div>
```
``` css
#outside{
    width:400px;
    height:400px;
    background-color:yellow;
}

```

```ts
var oout=document.getElementById('outside')
window.addEventListener('mousedown',(e)=>{
    if(e&& e.path.includes(oout)){
        oout.style.background='blue'
    }else{
        oout.style.background='blue'
    }
})
```