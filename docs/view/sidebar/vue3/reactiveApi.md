[[toc]]
# 响应性API

::: tip 
在vue2中，我们只要定义在data()方法中的数据就是响应式数据。或者使用Vue.observable()方法来定义响应式数据。<br/>
还可以使用this.$set( target, propertyName/index, value )或Vue.set( target, propertyName/index, value )来给对象或数组添加响应式属性。使用this.$delete( target, propertyName/index)或Vue.delete( target, propertyName/index)来给对象或数组删除响应式属性。<br/>
在vue2中使用Vue.observable()方法。
```js
const state = Vue.observable({ count: 0 })
```
但在vue3中主要是使用ref和reactive来定义响应式数据。由于vue3使用的是proxy进行响应式监听，所以新增、删除属性也都是响应式的，也就不需要使用上面的set delete了
:::


### ref和isRef
接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 .value property，指向该内部值。<br/>

一般用来定义基本类型的响应式数据。注意这里说的是一般，并不是说ref就不能定义引用类型的响应式数据。<br/>

使用ref定义的响应式数据在setup函数中使用需要加上.value，但在模板中可以直接使用。<br/>
isRef检查值是否为一个 ref 对象。<br/>
```html
<template>
  <h3>count1</h3>
  <div>count1: {{ count1 }}</div>
  <button @click="plus">plus</button>
  <button @click="decrease">decrease</button>
  
  <div>user1: {{ user1.name }}</div>
  <button @click="updateUser1Name">update user1 name</button>
</template>

<script>
import { defineComponent, ref, isRef } from "vue";
export default defineComponent({
  setup() {
    const count1 = ref(0);

    const plus = () => {
      count1.value++;
    };
    const decrease = () => {
      count1.value--;
    };
    
    const user1 = ref({ name: "randy1" });
    const updateUser1Name = () => {
      // ref定义的变量需要使用.value修改
      user1.value.name += "!";
    };
    
    console.log(isRef(count1)); // true

    return {
      count1,
      plus,
      decrease,
      user1,
      updateUser1Name
    };
  },
});
</script>
```
ref除了定义响应式数据还可以定义模板引用，类似vue2的this.$refs这个后面笔者在讲模板引用的时候会细说。
```html
<template> 
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      // 创建
      const root = ref(null)

      onMounted(() => {
        // 获取子组件
        console.log(root.value) // <div>This is a root element</div>
      })

      return {
        root
      }
    }
  }
</script>
```

###shallowRef
创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。<br/>
这句话怎么理解呢？就是我们使用shallowRef创建出来的数据不是响应式的，也就是我们的修改页面并不会重新渲染。但是我们直接修改数据.value是会响应式的。<br/>
下面我们来看例子。<br/>
```js
const sRef1 = shallowRef(0);
console.log("shallowRef:", sRef1.value); // 0

// 假设点击页面按钮，触发该方法
const changeShallowRef1 = () => {
  // 直接修改value，页面会同步修改，也就是会响应式
  sRef1.value++;
};

const sRef2 = shallowRef({ name: "demi1" });

// 假设点击页面按钮，触发该方法
const changeShallowRef2 = () => {
  // 不直接修改value，而是修改属性值
  sRef2.value.name = "randy";
  sRef2.value.address = { city: "汨罗" }; // 添加新属性
  // 这里数据虽然改变了，但是页面不会更新，也就是说不会响应式
  console.log(sRef2.value); // {address: {city: '汨罗'}, name: "randy"}
  
  // 但是我们直接重新赋值，页面会立马重新渲染
  sRef2.value = {name: "randy", address: {city: '汨罗'}}
};

// 假设点击页面按钮，触发该方法
const changeShallowRef3 = () => {
  // 但是我们直接重新赋值，页面会立马重新渲染
  sRef2.value = {name: "randy", address: {city: '汨罗'}}
};
```
通过上面的例子我们可以发现，当响应式数据是基本数据类型的时候ref和shallowRef没有差别。但是如果数据是引用数据类型的话ref的数据是响应式的而shallowRef不是，shallowRef需要给value重新赋值才会触发响应式。

### reactive和isReactive
::: tip
reactive用来定义引用类型的响应式数据。注意，不能用来定义基本数据类型的响应式数据，不然会报错。<br/>
reactive定义的对象是不能直接使用es6语法解构的，不然就会失去它的响应式，如果硬要解构需要使用toRefs()方法。<br/>
isReactive用来检查对象是否是由 reactive 创建的响应式代理。<br/>
:::
```html
<template>
  <div>
    <h3>user2</h3>
    <div>user2: {{ user2.name }}</div>
    <button @click="updateUser2Name">update user2 name</button>

    <h3>user3</h3>
    <div>user3 name: {{ name }} user3 age: {{ age }}</div>
    <button @click="updateUser3Name">update user3 name</button>

    <h3>count2</h3>
    <div>count2: {{ count2 }}</div>
    <button @click="plus2">plus2</button>
    <button @click="decrease2">decrease2</button>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, isReactive } from "vue";
export default defineComponent({
  setup() {
    const _user = { name: "randy2" }
    const user2 = reactive(_user);
    const updateUser2Name = () => {
      // reactive定义的变量可以直接修改
      user2.name += "!";
      
      // 原始对象的修改并不会响应式，也就是页面并不会重新渲染
      // _user.name += "!";
      // 代理对象被改变的时候，原始对象会被修改
      // console.log(_user);
    };
    
    // 使用toRefs可以响应式解构出来，在模板能直接使用啦。
    const user3 = reactive({ name: "randy3", age: 24 });
    const updateUser3Name = () => {
      user3.name += "!";
    };

    // 使用reactive定义基本数据类型会报错
    const count2 = reactive(0);

    const plus2 = () => {
      count2.value++;
    };
    const decrease2 = () => {
      count2.value--;
    };
    
    // 检查对象是否是由 reactive 创建的响应式代理。
    console.log(isReactive(user2)); // true
    console.log(isReactive(count2)); // false

    return {
      user2,
      updateUser2Name,
      // ...user3, // 直接解构不会有响应式
      ...toRefs(user3),
      updateUser3Name,
      count2,
      plus2,
      decrease2,
    };
  },
});
</script>
```
reactive 将解包所有深层的 refs，同时维持 ref 的响应性。

怎么理解这句话呢，就是使用reactive定义响应式对象，里面的属性是ref定义的话可以直接赋值而不需要再.value，并且数据的修改是响应式的。
```js
const count = ref(1)
// 可以直接定义，而不是{count: count.value}
const obj = reactive({ count })

// 这种写法也是支持的
// const obj = reactive({})
// obj.count = count

// ref 会被解包
console.log(obj.count === count.value) // true

// 它会更新 `obj.count`
count.value++
console.log(count.value) // 2
console.log(obj.count) // 2

// 它也会更新 `count` ref
obj.count++
console.log(obj.count) // 3
console.log(count.value) // 3

```

### shallowReactive
浅响应式，创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (暴露原始值)。<br/>
并且与 reactive不同，任何使用 ref 的 property 都不会被代理自动解包。<br/>
简单理解就是响应式只会在第一层，不会深层响应式。类似于浅拷贝。

```js
const user1 = shallowReactive({
  name: "demi1",
  address: { city: "汨罗", count: 10 },
});

// 假设点击页面按钮，触发该方法
const changeUser1 = () => {
  // 响应式，页面会发生变化
  user1.name = "demi1 !!!";
};

// 假设点击页面按钮，触发该方法
const changeUser2 = () => {
  // 非响应式，也就是页面不会发生变化
  user1.address.city = "岳阳";
  user1.address.count++;
  // 这里数据虽然改变了，但是页面不会更新，也就是说不会响应式
  console.log(user1); // {address: {city: '岳阳', count: 11}, name: "demi1 !!!"}
};
console.log(isReactive(user1)); // true
console.log(isReactive(user1.address)); // false
```

### readonly和isReadonly
接受一个对象 (响应式或纯对象) 或 ref数据 并返回原始对象的只读代理。只读代理是深层的：任何被访问的嵌套 property 也是只读的。<br/>
怎么理解这句话呢，就是说只要是对象不管是普通对象还是reactive定义的对象或者是ref定义的数据，定义成readonly后就不能被修改了。<br/>
这里需要特别注意，是readonly返回的对象变成只读，源对象不会受到影响，所以修改源对象还是可以的。
```js
isReadonly用来检查对象是否是由 readonly 创建的只读代理。
// ref定义的数据会被限制，不能被修改
let name1 = ref("readonly randy");
// readOnlyName1才是只读的
let readOnlyName1 = readonly(name1);
const changeName1 = () => {
  readOnlyName1.value += "!";
  // 这里直接修改源对象还是可以的
  // name1.value += "!";
};

// 基本数据类型数据会无效，能被修改
let readOnlyName2 = readonly("readonly randy");
readOnlyName2 = "randy";
console.log(readOnlyName2); // randy

// reactive定义的对象会被限制，不能被修改
const reactiveUser1 = reactive({ name: "readonly randy" });
let readonlyUser1 = readonly(reactiveUser1);
const changeUserName1 = () => {
  readonlyUser1.name += "!";
  // 这里直接修改源对象还是可以的
  // reactiveUser1.name += "!";
};

// 普通对象也会被限制，不能被修改
let readonlyUser2 = readonly({ name: "readonly randy" });
readonlyUser2.name = "randy";
console.log(readonlyUser2.name); // readonly randy

console.log(isReadonly(readOnlyName1)); // true
console.log(isReadonly(readOnlyName2)); // false
console.log(isReadonly(readonlyUser1)); // true
console.log(isReadonly(readonlyUser2)); // true

// 与 reactive 一样，如果任何 property 使用了 ref，当它通过代理访问时，则被自动解包。
const raw = {
  count: ref(123)
}

// 这里就类似const copy = reactive(raw)
const copy = readonly(raw)

console.log(raw.count.value) // 123
console.log(copy.count) // 123
```

### shallowReadonly
浅只读，创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)。<br/>
并且与 readonly不同，任何使用 ref 的 property 都不会被代理自动解包。<br/>
简单理解就是只读的限制只会在第一层，不会深层只读。类似于浅拷贝。
```js
const user2 = shallowReadonly(
  reactive({
    name: "demi2",
    address: { city: "汨罗2", count: 10 },
  })
);
console.log(isReadonly(user2)); // true
console.log(isReadonly(user2.address)); // false
const changeUser2 = () => {
  // 响应式，页面会同步修改
  user2.address.city = "岳阳";
  user2.address.count++;
  
  // 非响应式，也就是页面不会重新渲染该值
  user2.name = "demi1 !!!";
};

```

### isProxy
检查对象是否是由 reactive或 readonly 创建的 proxy。
```js
// ref定义的所以返回false
let name1 = ref("readonly randy");
// ref是对象，所以返回true
let readOnlyName1 = readonly(name1);

// readonly失败返回false
let readOnlyName2 = readonly("readonly randy");

const reactiveUser1 = reactive({ name: "readonly randy" });
let readonlyUser1 = readonly(reactiveUser1);

let readonlyUser2 = readonly({ name: "readonly randy" });

// 检查对象是否是由 reactive 或 readonly 创建的 proxy。
console.log(isProxy(name1)); // false
console.log(isProxy(readOnlyName1)); // true
console.log(isProxy(readOnlyName2)); // false
console.log(isProxy(reactiveUser1)); // true
console.log(isProxy(readonlyUser2)); // true
```
上面的例子有些小伙伴看了会比较懵逼，为什么readonly有些是true有些又是false呢？其实你弄懂了readonly就大概会清楚了。readonly是不能处理基本数据类型的，所以readonly不成功就会返回false
### toRaw
返回 reactive 或 readonly代理的原始对象。这是一个“逃生舱”，可用于临时读取数据而无需承担代理访问/跟踪的开销，也可用于写入数据而避免触发更改。不建议保留对原始对象的持久引用。请谨慎使用。
```js
const foo = {}
const reactiveFoo = reactive(foo)
console.log(toRaw(reactiveFoo) === foo) // true
```

### markRaw
标记一个对象，使其永远不会转换为 proxy。返回对象本身。<br/>
因为不会被proxy，也就是说不会响应式，相当于一个普通值。
```js
const info = markRaw({ sex: "male" });
console.log(isReactive(reactive(info))); // false
const user3 = reactive({ name: "randy", info });
const changeUser3 = () => {
  user3.info.sex = "female";
  // 这里数据虽然变了，但是页面并不会重新渲染，也就是说不会响应式
  console.log(user3); // {info: {sex: 'female'}, name: "randy"}
};
```
### unref
如果参数是一个 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 的语法糖函数。
```js
const user1 = ref({ name: "randy1" });
console.log("unref: ", unref(user1), user1.value);
```
### toRef
可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。
```js
const state = reactive({
  foo: 1,
  bar: 2
})
const fooRef = toRef(state, 'foo')
fooRef.value++
console.log(state.foo) // 2
state.foo++
console.log(fooRef.value) // 3
// 当你要将 prop 的 ref 传递给复合函数时，toRef 很有用：
export default {
  setup(props) {
    useSomeFeature(toRef(props, 'foo'))
  }
}
```
即使源 property 不存在，toRef 也会返回一个可用的 ref。这使得它在使用可选 prop 时特别有用，可选 prop 并不会被 toRefs 处理。
toRefs
将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref。
```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// ref 和原始 property 已经“链接”起来了
state.foo++
console.log(stateAsRefs.foo.value) // 2
stateAsRefs.foo.value++
console.log(state.foo) // 3

// 当从组合式函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应性的情况下对返回的对象进行解构/展开：
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })
  // 操作 state 的逻辑
  // 返回时转换为ref
  return toRefs(state)
}
export default {
  setup() {
    // 可以在不失去响应性的情况下解构
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
```
toRefs 只会为源对象中包含的 property 生成 ref。如果要为特定的 property 创建 ref，则应当使用 toRef。


### customRef
创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，并且应该返回一个带有 get 和 set 的对象。<br/>
这个在我们自定义响应式的时候非常有用。比如我们在获取、设置值的时候做些特殊处理。<br/>
这个在vue2中是没办法直接修改响应值的实现的，但是在vue3可以。

```html
<template>
  <div class="customref">
    <div>{{ text }}</div>
    <input v-model="text" />
  </div>
</template>
<script>
import { defineComponent, customRef } from "vue";
export default defineComponent({
  setup() {
    const useDebouncedRef = (value, delay = 2000) => {
      let timeout;
      return customRef((track, trigger) => {
        return {
          get() {
            track();
            return value;
          },
          set(newValue) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              value = newValue;
              trigger();
            }, delay);
          },
        };
      });
    };
    return {
      text: useDebouncedRef("randy"),
    };
  },
});
</script>
```
### triggerRef
手动执行与 shallowRef 关联的任何作用 (effect)。
```js
const shallow = shallowRef({
  greet: 'Hello, world'
})
// 第一次运行时输出"Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})
// 这不会触发作用 (effect)，因为 ref 是浅层的
shallow.value.greet = 'Hello, universe'
// 触发watchEffect 输出"Hello, universe"
triggerRef(shallow)
```
