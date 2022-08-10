#### vue2动态组件注册与使用

```ts
const list =[
    {url:'/invInfo.vue',name:'InvoiceInfo'},
    {url:'/taxInfo.vue',name:'dsTaxInfo'},
]

const dynamicComponents = ()=>{
    let components = this.$options.components
    this.list .forEach((item,index) => {
        import(`.${item.url}`).then( module => {
            components[item.name] = module.default
        })
    })
}
```

```html

<component  :is='item.xxxxxx'/>
```