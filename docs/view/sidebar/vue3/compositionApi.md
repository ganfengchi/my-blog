[[toc]]

### composition Api（组合式 api）

为了让相关代码更紧凑 vue3 提出了组合式 api，组合式 api 能将同一个逻辑关注点相关代码收集在一起。 组合式 api 的入口就是 setup 方法。<br/>

用官方语言说，setup 是一个组件选项，在组件被创建之前，props  被解析之后执行。它是组合式 API 的入口。<br/>
setup 的写法有两种，可以跟 vue2 一样直接导出也可以导出 defineComponent 对象。若要对传递给  setup()  的参数进行类型推断，你需要使用  defineComponent。

```js
// 直接export
export default {
  setup(){}
}

import { defineComponent } from 'vue'
// 导出defineComponent对象
export default defineComponent({
  setup(){}
})
```

### 执行时机

从生命周期的角度来看，它会在 beforeCreate 之前执行。也就是创建组件会依次执行 setup、beforeCreate、create。

### this 指向

在 setup 中你应该避免使用 this，因为它不会找到组件实例。setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。

### 参数

setup 选项是一个接收 props 和 context 的函数。

### props

setup 函数中的第一个参数是 props。props 就是我们父组件给子组件传递的参数。<br/>

正如在一个标准组件中所期望的那样，setup 函数中的 props 是响应式的，当传入新的 prop 时，它将被更新。<br/>

```js
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
  },
  setup(props) {
    console.log(props.title);
  },
});
```

> 因为 props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。
> 如果需要解构请使用 toRefs 方法。

```js
import { defineComponent, toRefs } from "vue";
export default defineComponent({
  props: {
    title: String,
  },
  setup(props) {
    const { title } = toRefs(props);
    console.log(title.value);
  },
});
```

如果 title 是可选的 prop，则传入的 props 中可能没有 title 。在这种情况下，toRefs 将不会为 title 创建一个 ref 。你需要使用 toRef 替代它：

```js
import { defineComponent, toRef } from "vue";

export default defineComponent({
  props: {
    title: String,
  },
  setup(props) {
    const title = toRef(props, "title");
    console.log(title.value);
  },
});
```

### context

context  是一个普通的 JavaScript 对象，也就是说，它不是响应式的，这意味着你可以安全地对  context  使用 ES6 解构。

```js
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs);

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots);

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit);

    // 暴露公共 property (函数)
    console.log(context.expose);
  },
});
```

attrs  和  slots  是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以  attrs.x  或  slots.x  的方式引用 property。请注意，与  props  不同，attrs  和  slots  的 <br/>
property 是非响应式的。如果你打算根据  attrs  或  slots  的更改应用副作用，那么应该在  onBeforeUpdate  生命周期钩子中执行此操作。<br/>
这里我们重点说下 expose 的使用。<br/>
假如我们想在父组件中直接调用子组件的方法该怎么做呢？我们就可以在子组件中使用 expose 把属性或方法暴露出去。在父组件我们就可以通过子组件的 ref 直接调用了。<br/>
使用的时候需要注意：

1. 当组件没定义 expose 暴露内容的时候，通过 ref 获取到的就是组件自身的内容，也就是 setup 函数 return 的内容。

2. 当定义了 expose 暴露内容的时候，通过 ref 获取到的就是组件 expose 暴露内容，并且 setup 函数 return 的内容会失效，也就是会被覆盖。

```html
// 子组件
<template>
  <div>
    <h2>child</h2>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    setup(props, { expose }) {
      const childSay = () => {
        console.log("childSay");
      };
      const sex = "male";

      // 如果定义了会覆盖return中的内容
      // expose({
      //   sex
      // });

      return {
        childSay,
        childSay,
      };
    },
  });
</script>

// 父组件
<template>
  <div>
    <LifeChild ref="childRef" />
  </div>
</template>
<script>
  import { defineComponent, onMounted, ref } from "vue";

  import LifeChild from "@/components/LifeChild";

  export default defineComponent({
    components: {
      LifeChild,
    },
    setup() {
      const childRef = ref(null);

      onMounted(() => {
        // 使用子组件暴露的属性和方法
        childRef.value.childSay(); // childSay
        console.log(childRef.value.sex); // male
      });

      return {
        childRef,
      };
    },
  });
</script>
```

### 返回值

setup  返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。所以我们在模板中需要使用到的数据都需要通过 setup 方法 return 出来。<br/>
上面的话怎么理解呢？就是我们在模板，或者 vue2 选项式写法的计算属性、方法、生命周期钩子等等中使用的数据都需要在 setup 方法中通过 return 返回出来。

### 结合模板使用

如果 setup 返回一个对象，那么该对象的 property 以及传递给 setup 的 props 参数中的 property 就都可以在模板中访问到。

```html
<template>
  <div>{{ collectionName }}: {{ number }} {{ user.name }}</div>
</template>

<script>
  import { ref, reactive, defineComponent } from "vue";

  export default defineComponent({
    props: {
      // 这个属性能直接在模板中使用
      collectionName: String,
    },
    setup(props) {
      // 在setup函数中需要通过props获取。
      console.log(props.collectionName);

      // 定义响应式数据
      const number = ref(0);
      const user = reactive({ name: "randy" });

      // 暴露给 template
      return {
        number,
        user,
      };
    },
  });
</script>
```

### 结合渲染函数使用

setup  还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态。

```js
import { h, ref, reactive } from "vue";

export default {
  setup() {
    const number = ref(0);
    const user = reactive({ name: "randy" });
    // 请注意这里我们需要显式使用 ref 的 value
    return () => h("div", [number.value, user.name]);
  },
};
```

返回一个渲染函数将阻止我们返回任何其它的东西。我们可以通过我们上面介绍的  expose  来解决这个问题，给它传递一个对象，其中定义的 property 将可以被外部组件实例访问。

### 单文件 setup

要使用这个语法，需要将  setup attribute 添加到   script  代码块上：

```html
<script setup>
  console.log("hello script setup");
</script>
```

里面的代码会被编译成组件  setup()  函数的内容。这意味着与普通的  script  只在组件被首次引入的时候执行一次不同，script setup  中的代码会在每次组件实例被创建的时候执行。

### 顶层的绑定会被暴露给模板

```html
<script setup>
  // 当使用 <script setup> 的时候，任何在 <script setup> 声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容) 都能在模板中直接使用：
  // 变量
  const msg = "Hello!";

  // 函数
  function log() {
    console.log(msg);
  }
</script>

<template>
  <div @click="log">{{ msg }}</div>
</template>
```

> import 导入的内容也会以同样的方式暴露。意味着可以在模板表达式中直接使用导入的 helper 函数，并不需要通过  methods  选项来暴露它：

```html
<script setup>
  import { capitalize } from "./helpers";
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

### 响应式

响应式状态需要明确使用响应式 APIs 来创建。和从  setup()  函数中返回值一样，ref 值在模板中使用的时候会自动解包：

```html
<script setup>
  import { ref } from "vue";

  const count = ref(0);
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

### 使用组件

```html
<script setup>
  // <script setup>  范围里的值也能被直接作为自定义组件的标签名使用：
  import MyComponent from "./MyComponent.vue";
  // 将 MyComponent 看做被一个变量所引用。如果你使用过 JSX，在这里的使用它的心智模型是一样的。其 kebab-case 格式的 <my-component> 同样能在模板中使用。不过，我们强烈建议使用 PascalCase 格式以保持一致性。同时也有助于区分原生的自定义元素
</script>

<template>
  <MyComponent />
</template>
```

### 动态组件

```html
<script setup>
  // 由于组件被引用为变量而不是作为字符串键来注册的，在 <script setup> 中要使用动态组件的时候，就应该使用动态的 :is 来绑定：
  import Foo from "./Foo.vue";
  import Bar from "./Bar.vue";
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

### 递归组件

```js
// 一个单文件组件可以通过它的文件名被其自己所引用。例如：名为 FooBar.vue 的组件可以在其模板中用 <FooBar/> 引用它自己。
// 请注意这种方式相比于 import 导入的组件优先级更低。如果有命名的 import 导入和组件的推断名冲突了，可以使用 import 别名导入：
import { FooBar as FooBarChild } from "./components";
```

###命名空间组件

```html
<script setup>
  // 可以使用带点的组件标记，例如 <Foo.Bar> 来引用嵌套在对象属性中的组件。这在需要从单个文件中导入多个组件的时候非常有用：
  import * as Form from "./form-components";
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

### 使用自定义指令

全局注册的自定义指令将以符合预期的方式工作，且本地注册的指令可以直接在模板中使用，就像上文所提及的组件一样。
但这里有一个需要注意的限制：必须以  vNameOfDirective  的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。

```html
<script setup>
  const vMyDirective = {
    beforeMount: (el) => {
      // 在元素上做些操作
    },
  };
</script>
<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>

<script setup>
  // 导入的指令同样能够工作，并且能够通过重命名来使其符合命名规范
  import { myDirective as vMyDirective } from "./MyDirective.js";
</script>
```

### defineProps  和  defineEmits

::: tip

```html
<script setup>
  // 在 <script setup> 中必须使用 defineProps 和 defineEmits API 来声明 props 和 emits ，它们具备完整的类型推断并且在 <script setup> 中是直接可用的：
  const props = defineProps({
    foo: String,
  });

  const emits = defineEmits(["change", "delete"]);

  //触发事件 类似 context.emit()
  emits("change", { name: "randy" });
</script>
```

defineProps  和  defineEmits  都是只在  script setup 中才能使用的编译器宏。他们不需要导入且会随着  script setup  处理过程一同被编译掉。
defineProps  接收与  props 相同的值，defineEmits  也接收  emits 相同的值。
传入到  defineProps  和  defineEmits  的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 setup 范围中声明的局部变量。这样做会引起编译错误。但是，它可以引用导入的绑定，因为它们也在模块范围内。
:::

### defineExpose

使用  script setup>  的组件是默认关闭的，也即通过模板 ref 或者  $parent  链获取到的组件的公开实例，不会暴露任何在  script setup>  中声明的绑定。
为了在  script setup>  组件中明确要暴露出去的属性，使用  defineExpose  编译器宏，他也是不需要导入且会随着  script setup>  处理过程一同被编译掉。

```html
<script setup>
  import { ref } from "vue";

  const a = 1;
  const b = ref(2);

  defineExpose({
    a,
    b,
  });
</script>
<!-- 当父组件通过模板 ref 的方式获取到当前组件的实例，获取到的实例可以获取到a 、b属性 (ref 会和在普通实例中一样被自动解包)。跟前面说的expose是一样的。 -->
```

### useSlots 和 useAttrs

在  script setup>  使用  slots  和  attrs  的情况应该是很罕见的，因为可以在模板中通过  $slots 和 $attrs  来访问它们。在你的确需要使用它们的罕见场景中，可以分别用  useSlots  和  useAttrs  两个辅助函数：

```html
<script setup>
  import { useSlots, useAttrs } from "vue";

  const slots = useSlots();
  const attrs = useAttrs();
</script>
```

useSlots  和  useAttrs  是真实的运行时函数，它会返回与  setupContext.slots  和  setupContext.attrs  等价的值，同样也能在普通的组合式 API 中使用。

### 与普通的  script  一起使用

script setup>  可以和普通的  script>  一起使用。普通的  script>  在有这些需要的情况下或许会被使用到：

无法在  script setup>  声明的选项，例如  inheritAttrs  或通过插件启用的自定义的选项。
声明命名导出。
运行副作用或者创建只需要执行一次的对象。

```html
<script>
  // 普通 <script>, 在模块范围下执行(只执行一次)
  runSideEffectOnce();

  // 声明额外的选项
  export default {
    inheritAttrs: false,
    customOptions: {},
  };
</script>

<script setup>
  // 在 setup() 作用域中执行 (对每个实例皆如此)
</script>
```

> 该场景下不支持使用 render 函数。请使用一个普通的 script> 结合 setup 选项来代替。

### 顶层  await

::: tip

```html
<script setup>
  // <script setup> 中可以使用顶层 await。结果代码会被编译成 async setup()：
  const post = await fetch(`/api/post/1`).then(r => r.json())
</script>
```

另外，await 的表达式会自动编译成在  await  之后保留当前组件实例上下文的格式。
注意 async setup()  必须与  Suspense  组合使用，Suspense  目前还是处于实验阶段的特性。

:::

### 不能和 src 混合使用

```html
<script setup>
    //不能和 src attribute 一起使用。
  // 不能同时使用
  <script setup src="xxxx">
</script>
```

### computed 和 watch

计算属性和监听器

```js
// computed是计算属性，意思就是会缓存值，只有当依赖属性发生变化的时候才会重新计算。
// 在vue2中计算属性很简单，是一个对象，只需要简单定义就可以使用。
computed: {
  // 计算属性默认只有 get，不过在需要时你也可以提供一个 set
  fullName() {
    return this.firstName + this.lastName;
  },
  fullName2: {
    get() {
      return this.firstName + this.lastName + "2";
    },
    // 提供set方法后计算属性的值可以更改了
    set(newVal) {
      const names = newVal.split(" ");
      this.firstName = names[0];
      this.lastName = names[1];
    },
  },
},
```

在 vue3 中，是函数式的，并且需要先引入。

```html
<template>
  <div>
    <div>{{ user1.name }}</div>
    <div>{{ user1.age }}</div>
    <div>{{ fullName1 }}</div>
    <button @click="updateUser1Name">update user1 name</button>

    <div>{{ user2.name }}</div>
    <div>{{ user2.age }}</div>
    <div>{{ fullName2 }}</div>
    <button @click="updateUser2Name">update user2 name</button>
  </div>
</template>
<script>
  import { defineComponent, reactive, computed } from "vue";
  export default defineComponent({
    setup() {
      const user1 = reactive({ name: "randy1", age: 24 });
      // 接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 ref 对象
      // 这里的fullName1是不能修改的
      const fullName1 = computed(() => {
        return `${user1.name}今年${user1.age}岁啦`;
      });
      const updateUser1Name = () => {
        user1.name += "!";
      };

      const user2 = reactive({ name: "randy2", age: 27 });
      // 接受一个具有 get 和 set 函数的对象，用来创建可写的 ref 对象。
      // 这里的fullName2是可以修改的
      let fullName2 = computed({
        get() {
          return `${user2.name}今年${user2.age}岁啦`;
        },
        set(val) {
          user2.name = val;
        },
      });
      const updateUser2Name = () => {
        // 需要使用value访问
        fullName2.value = "新的name";
      };

      return {
        user1,
        fullName1,
        updateUser1Name,
        user2,
        fullName2,
        updateUser2Name,
      };
    },
  });
</script>
```

### watchEffect

立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。<br/>
怎么理解这句话呢？就是它会自动收集依赖，不需要手动传入依赖。当里面用到的数据发生变化时就会自动触发 watchEffect。并且 watchEffect 会先执行一次用来自动收集依赖。而且 watchEffect 无法获取到变化前的值，只能获取变化后的值。

```html
<script>
  import { defineComponent, reactive, watchEffect } from "vue";
  export default defineComponent({
    setup() {
      const user2 = reactive({ name: "randy2", age: 27 });

      const updateUser2Age = () => {
        user2.age++;
      };

      watchEffect(() => {
        console.log("watchEffect", user2.age);
      });
    },
  });
</script>
```

在上面这个例子中，首先会执行 watchEffect 输出 27，当我们触发 updateUser2Age 方法改变 age 的时候，因为 user2.age 是 watchEffect 的依赖，所以 watchEffect 会再次执行，输出 28。<br/>
这个方法可以鸡蛋理解为 created、beforeDestory 和 watch 的组合。

### 停止侦听

当  watchEffect  在组件的  setup()  函数或生命周期钩子被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。
在一些情况下，也可以显式调用返回值以停止侦听：

```js
const stop = watchEffect(() => {
  /* ... */
});

// later
stop();
```

### 清除副作用

有时副作用函数会执行一些异步的副作用，这些响应需要在其失效时清除。所以侦听副作用传入的函数可以接收一个  onInvalidate  函数作入参，用来注册清理失效时的回调。当以下情况发生时，这个失效回调会被触发：

副作用即将重新执行时
侦听器被停止 (如果在  setup()  或生命周期钩子函数中使用了  watchEffect，则在组件卸载时)

清除副作用很多同学可能不太理解，下面笔者用个例子解释下。
假设我们需要在 input 框输入关键字进行实时搜索，又不想请求太频繁我们就可以用到这个功能了。

```js
<template>
  <input type="text" v-model="text" />
</template>;

const text = ref("randy");

watchEffect((onInvalidate) => {
  const timer = setTimeout(() => {
    console.log("input", text.value);
    // 模拟调用后端接口
    // getDate(text.value)
  }, 1000);

  onInvalidate(() => {
    // 清除上一次请求
    clearTimeout(timer);
  });
  console.log("watchEffect", text.value);
});
```

> 上面的例子中 watchEffect 依赖了 text.value，所以我们只要在 input 输入值就会立马进入 watchEffect。如果不处理的话后端服务压力可能会很大，因为我们只要输入框值改变了就会发送请求。
> 我们可以利用清除副作用回调函数，在用户输入完一秒后再向后端发送请求。因为第一次是不会执行 onInvalidate 回调方法的，只有在副作用重新执行或卸载的时候才会执行该回调函数。
> 所以在我们输入的时候，会一直输出"watchEffect" text 对应的值，当我们停止输入一秒后会输出"input" text 对应的值，然后发送请求给后端。这样就达到我们最开始的目标了。
> 类似的还可以应用到事件监听上。这个小伙伴们可以自己试试。

### 副作用刷新时机

```js
// Vue 的响应性系统会缓存副作用函数，并异步地刷新它们，这样可以避免同一个“tick” 中多个状态改变导致的不必要的重复调用。在核心的具体实现中，组件的 update 函数也是一个被侦听的副作用。当一个用户定义的副作用函数进入队列时，默认情况下，会在所有的组件 update 前执行。也就是会在组件生命周期函数onBeforeUpdate之前执行。
const updateUser2Age = () => {
  user2.age++;
};

watchEffect(() => {
  console.log("watchEffect", user2.age);
});

onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});
```

上面的例子，当我们触发 updateUser2Age 方法修改 age 的时候，会先执行 watchEffect 然后执行 onBeforeUpdate。
如果需要在组件更新后重新运行侦听器副作用，我们可以传递带有  flush  选项的附加  options  对象 (默认为  pre)。

```js
const updateUser2Age = () => {
  user2.age++;
};

watchEffect(
  () => {
    console.log("watchEffect", user2.age);
  },
  {
    flush: "post",
  }
);

onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});
```

上面的例子，当我们触发 updateUser2Age 方法修改 age 的时候，会先执行 onBeforeUpdate 然后执行 watchEffect。<br/>
flush  选项还接受  sync，这将强制效果始终同步触发。然而，这是低效的，应该很少需要。sync 这个参数是什么意思呢？很多同学可能不理解，这里我们重点解释下。<br/>
当 watchEffect 只有一个依赖的时候这个参数和 pre 是没区别的。但是当有多个依赖的时候，flush: post 和  flush: pre 只会执行一次副作用，但是 sync 会执行多次，也就是有一个依赖改变就会执行一次。<br/>
下面我们看例子

```js
const user3 = reactive({ name: "randy3", age: 27 });

const updateUser3NameAndAge = () => {
  user3.name += "!";
  user3.age++;
};

watchEffect(
  () => {
    console.log("watchEffect", user3.name, user3.age);
  },
  {
    flush: "sync",
  }
);

onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});
```

在上面的例子中，watchEffect 有 name 和 age 两个依赖，当我们触发 updateUser3NameAndAge 方法的时候，如果 flush: "sync"这个副作用会执行两次，依次输出 watchEffect randy3! 27、watchEffect randy3! 28、onBeforeUpdate。<br/>
如果你想让每个依赖发生变化都执行 watchEffect 但又不想设置 flush: "sync"你也可以使用 nextTick 等待侦听器在下一步改变之前运行。

```js
import { nextTick } from "vue";
const updateUser3NameAndAge = async () => {
  user3.name += "!";
  await nextTick();
  user3.age++;
};
```

上面的例子会依次输出 watchEffect randy3! 27、onBeforeUpdate、watchEffect randy3! 28、onBeforeUpdate。<br/>
从 Vue 3.2.0 开始，我们也可以使用别名方法 watchPostEffect  和  watchSyncEffect，这样可以用来让代码意图更加明显。

### watchPostEffect

watchPostEffect 就是 watchEffect 的别名，带有 flush: 'post' 选项。

### watchSyncEffect

watchSyncEffect 就是 watchEffect 的别名，带有 flush: 'sync' 选项。

### 侦听器调试

onTrack  和  onTrigger  选项可用于调试侦听器的行为。

onTrack  将在响应式 property 或 ref 作为依赖项被追踪时被调用。
onTrigger  将在依赖项变更导致副作用被触发时被调用。

这个有点类似前面说的生命周期函数 renderTracked 和 renderTriggered，一个最初次渲染时调用，一个在数据更新的时候调用。
这两个回调都将接收到一个包含有关所依赖项信息的调试器事件。

```js
watchEffect(
  () => {
    /* 副作用 */
  },
  {
    onTrack(e) {
      console.log("onTrack: ", e);
    },
    onTrigger(e) {
      console.log("onTrigger:", e);
    },
  }
);
```

### watch

watch  需要侦听特定的数据源，并在单独的回调函数中执行副作用。默认情况下，它也是惰性的——即回调仅在侦听源发生变化时被调用。
与  watchEffect  相比，watch  有如下特点

惰性地执行副作用
更具体地说明应触发侦听器重新运行的状态
可以访问被侦听状态的先前值和当前值

类似 react 里面的 useEffect。

### 监听单一源

```js
<script>
import { defineComponent, reactive, watchEffect } from "vue";
export default defineComponent({
  setup() {
    const user1 = reactive({ name: "randy1", age: 24 });
    // source: 可以支持 string,Object,Function,Array; 用于指定要侦听的响应式变量
    // callback: 执行的回调函数
    // options：支持 deep、immediate 和 flush 选项。
    watch(
      () => user1.name,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      }
    );
    watch(
      () => user1.age,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      }
    );
  }
})
</script>
```

### 监听多个源

监听多个源我们使用数组。
这里我们需要注意，监听多个源只要有一个源发生变化，回调函数都会执行。

```js
<script>
import { defineComponent, reactive, watchEffect } from "vue";
export default defineComponent({
  setup() {
    const user1 = reactive({ name: "randy1", age: 24 });
    // source: 可以支持 string,Object,Function,Array; 用于指定要侦听的响应式变量
    // callback: 执行的回调函数
    // options：支持 deep、immediate 和 flush 选项。
    watch(
      [() => user1.name, () => user1.age],
      ([newVal1, newVal2], [oldVal1, oldVal2]) => {
        console.log(newVal1, newVal2);
        console.log(oldVal1, oldVal2);
      }
    );
  }
})
</script>
```

### 监听引用数据类型

有时我们可能需要监听一个对象的改变，而不是具体某个属性。

```js
const user2 = reactive({ name: "randy2", age: 27 });
watch(user2, (newVal, oldVal) => {
  console.log(newVal, oldVal); // {name: 'randy2', age: 28} {name: 'randy2', age: 28}
});

const updateUser2Age = () => {
  user2.age++;
};
```

上面的写法有没有问题呢？当我们触发 updateUser2Age 方法修改 age 的时候可以发现我们输出 newVal, oldVal 两个值是一样的。<br/>
这就是引用数据类型的坑。当我们不需要知道 oldVal 的时候这样写没问题，但是当我们需要对比新老值的时候这种写法就不行了。<br/>
我们需要监听这个引用数据类型的拷贝。当引用数据类型简单的时候我们可以直接解构成新对象。<br/>
这样输出来的值才是正确的。<br/>

```js
const user2 = reactive({ name: "randy2", age: 27 });
watch(
  // 这只是浅拷贝，解决第一层问题
  () => ({ ...user2 }),
  (newVal, oldVal) => {
    console.log(newVal, oldVal); // {name: 'randy2', age: 28} {name: 'randy2', age: 27}
  }
);

const updateUser2Age = () => {
  user2.age++;
};
```

### 所以关于监听总结就是

1. 监听基本数据类型需要使用箭头函数方式，否则监听不到。
2. 监听引用数据类型可以直接监听，但是新老值是一样的，如果需要对比新老值需要使用箭头函数的方式。
3. 监听引用数据类型使用箭头函数，我们如果不需要对比新老值，可以直接使用第三个参数 deep:true 开启深度监听即可。如果需要对比新老值就没必要使用深度监听了，直接看情况使用深拷贝和浅拷贝即可。

watch 还支持 watchEffect 的停止侦听、清除副作用、副作用刷新时机、侦听器调试，下面笔者只简单介绍使用方法，就不详细解释了。

### 停止侦听

在 watch 中，停止侦听用法和 watchEffect 一样。

```js
const stop = watch(
  () => user1.name,
  (newVal, oldVal) => {
    /* ... */
  }
);

// later
stop();
```

### 清除副作用

在 watch 中，onInvalidate 函数会作为回调的第三个参数传递进来。

```js
const invalidate = reactive({ name: "onInvalidate" });
watch(
  () => ({ ...invalidate }),
  (newVal, oldVal, onInvalidate) => {
    onInvalidate(() => {
      console.log("清除副作用");
    });
    console.log(newVal, oldVal);
  }
);
```

### 副作用刷新时机

在 watch 中，副作用刷新时机是在第三个参数中配置。

```js
const flushOptions = reactive({ name: "flushOptions", num: 1 });
watch(
  () => ({ ...flushOptions }),
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  {
    // flush: "pre", // 默认
    // flush: "post",
    // flush: "sync",
  }
);
```

### 侦听器调试

在 watch 中，侦听器调试是在第三个参数中配置。

```js
const trackOptions = reactive({ name: "trackOptions" });
watch(
  () => ({ ...trackOptions }),
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  {
    onTrack(e) {
      console.log("onTrack: ", e);
    },
    onTrigger(e) {
      console.log("onTrigger:", e);
    },
  }
);
```

### teleport

teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下渲染了 HTML，而不必求助于全局状态或将其拆分为两个组件。
什么意思呢？就是我们组件的 html 节点可以通过 teleport 挂载到任意位置。

```js
<template>
  <div class="about">
    <teleport to="#app">
      <div>我是通过teleport传递过来的，挂载在app下面</div>
    </teleport>
  </div>
</template>
// 比如我们的about组件里面就可以通过  <teleport to="#app">  把<div>我是通过teleport传递过来的，挂载在app下面</div>挂载到id为app的html节点下。

// 我们来看看渲染效果，发现我们写在about页面的元素被挂载到了app节点下。

// teleport的to属性必须是有效的查询选择器或 HTMLElement
// <!-- 正确 -->
<teleport to="#some-id" />
<teleport to=".some-class" />
<teleport to="[data-teleport]" />

// <!-- 错误 -->
<teleport to="h1" />
<teleport to="some-string" />

// teleport还支持disabled选项。此可选属性可用于禁用 <teleport> 的功能，这意味着其插槽内容将不会移动到任何位置，而是在你在周围父组件中指定了 <teleport> 的位置渲染。
<teleport to="#app" :disabled="displayVideoInline">
  <video src="./my-movie.mp4">
</teleport>

```

### Suspense

我们在 vue2 中肯定写过这样的代码

```js
<template>
  <div>
    <div v-if="!loading">...页面内容</div>
    <div v-if="loading">加载中...</div>
  </div>
</template>
```

```js
// Suspense就是用来更优雅的展示内容。需要搭配defineAsyncComponent使用。
<suspense> 组件有两个插槽。它们都只接收一个直接子节点。default 插槽里的节点会尽可能展示出来。如果不能，则展示 fallback 插槽里的节点。
// 父组件
<template>
  <Suspense>
    <template #default>
      <AsyncPage />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
import { defineComponent,  defineAsyncComponent } from "vue";

export default defineComponent({
  components: {
    // 无配置项异步组件
    AsyncPage: defineAsyncComponent(() => import("@/components/AsyncCom.vue")),

    // 有配置项异步组件
    // AsyncPage: defineAsyncComponent({
    //   loader: () => import("@/components/AsyncCom.vue"),
    //   delay: 3000,
    //   timeout: 3000,
    //   // errorComponent: () => import("./ErrorComponent.vue"),
    //   // loadingComponent: () => import("./LoadingComponent.vue"),
    // }),
  },
}

// 子组件 AsyncCom.vue
<template>
  <div>
    <div>hi 我是异步组件</div>
  </div>
</template>
<script>
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  async setup() {
    // sleep 模拟后端请求接口
    const sleep = (times) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, times);
      });
    };

    // 请求2秒
    await sleep(2000);

    return {};
  },
});
</script>
```

> 注意，Suspense 是一个试验性的新特性，其 API 可能随时会发生变动。特此声明，以便社区能够为当前的实现提供反馈。生产环境请勿使用。我们目前了解有这个东西即可。

### 多片段

vue3 现在正式支持了多根节点的组件，也就是片段！什么意思呢？下面看个例子就明白了。
在 vue2 中，由于不支持多根节点组件，当其被开发者意外地创建时会发出警告。结果是，为了修复这个问题，许多组件被包裹在了一个  div  中。

<!-- Layout.vue -->

```html
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
在 vue3 中，组件可以包含多个根节点！但是，这要求开发者显式定义 attribute
应该分布在哪里。
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

这一段是什么意思呢？我们先来说说$attrs。

### $attrs

在 vue2 中，我们知道 this.$attrs 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class  和  style  除外)。
// 父组件

```html
<Child3
  :fullName="fullName"
  :age="24"
  class="child3"
  id="child3"
  style="color: blue"
></Child3>
<script>
  // 子组件
  export default {
    // 设置inheritAttrs false 不接受没有在props中定义的属性
    // inheritAttrs: false,
    props: {
      fullName: String,
    },
    created() {
      // 获取没在props中定义的但是传递过来的属性
      console.log(this.$attrs); // 输出{age: 24, id: 'child3'}
    },
  };
</script>
```

上面的例子输出没在子组件接收的 age 和 id 所以会输出{age: 24, id: 'child3'}(因为 class  和  style 会被忽略)。
在 vue3 中有了更改，attrs 被转移到 setup 的第二个参数 context 上，context.attrs。并且 class  和  style 也都不再忽略了。也就是说 class  和  style 也会在 attrs 里面。

```html
// 父组件
<Child2 v-model:name1="name1" v-model:name2="name2" class="child2" id="child2" style="color: blue"></Child3>
<script>
// 子组件
export default {
  props: {
    name1: String,
  },
  setup(props, context) {
    // 获取没在props中定义的但是传递过来的属性
    console.log(context.attrs); // 输出{name2: 'randy', class: 'child2', id: 'child2', style: {color: 'blue'}}
  }
}
</script>
```

> 上面会输出全部未被接收的 prop，输出{age: 24, class: 'child3', id: 'child3', style: {color: 'blue'}}<br/>
> 在 vue2 中由于只有一个片段，所以未在 props 定义的属性会直接挂载在根片段上。<br/>
> 但是 vue3 由于支持多个片段，所以如果使用了多片段并且有未在 props 定义的属性就会抛出警告，因为它不知道把这些未定义在 props 中的属性挂载到哪个片段上，所以就需要我们使用 v-bind="$attrs"来显示指定了。

看到这小伙伴们是不是就懂了呢。虽然 vue3 支持多片段，但是我们需要定义 v-bind="$attrs"。

既然讲到了$attrs，我们再讲讲$listeners 的改动。

### $listeners

我们知道在 vue2 中$listeners包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。
但是在vue3，$listeners 被移除了，父作用域中的事件监听器也被放到了 attrs 里面。相当于是合并在一起了。

### 生命周期改动

首先我们来看看 vue2 和 vue3 的生命周期函数。

vue3 虽然提倡把生命周期函数都放到 setup 中，但是 vue2 那种选项式写法还是支持的。

```ts
vue2                vue3选项式               vue3(setup)
beforeCreate        beforeCreate             无
created             created                  无
beforeMount         beforeMount              onBeforeMount
mounted             mounted                  onMounted
beforeUpdate        beforeUpdate             onBeforeUpdate
updated             updated                  onUpdated
beforeDestroy       beforeUnmount            onBeforeUnmount
destroyed           unmounted                onUnmounted
errorCaptured       errorCaptured            onErrorCaptured
无                  renderTracked            onRenderTracked
无                  renderTriggered          onRenderTriggered
activated           activated                onActivated
deactivated         deactivated              onDeactivated
```

::: tip 总结

vue2 相较于 vue3 少了 renderTracked、renderTriggered 两个生命周期方法。
销毁生命周期方法名也发生了变化，由 beforeDestroy、destroyed 变为 beforeUnmount、unmounted，这样是为了更好的与 beforeMount、mounted 相对应。
vue3 写在 setup 函数中生命周期方法名就是前面多加了 on。

基本的生命周期函数我想不必笔者多说小伙伴们应该都很清楚了。下面重点说下 renderTracked、renderTriggered 两个方法。
:::

### renderTracked

简单理解就是，首次渲染时，模板里面进行了哪些操作，以及该操作的目标对象和键。<br/>
如果有多个属性，这个方法会被触发多次。<br/>
我们来看例子<br/>

```html
<template>
  <div>
    <div>{{ name }}</div>
    <div>user: {{ user.age }}</div>
  </div>
</template>
<script>
  import {
    defineComponent,
    onRenderTracked,
    onRenderTriggered,
    ref,
    reactive,
  } from "vue";
  export default defineComponent({
    setup() {
      const name = ref("randy");
      const user = reactive({ age: 27 });

      onRenderTracked(({ key, target, type }) => {
        console.log("onRenderTracked", { key, target, type });
      });
      onRenderTriggered(({ key, target, type }) => {
        console.log("onRenderTriggered", { key, target, type });
      });

      return {
        name,
        user,
      };
    },
  });
</script>
```

页面首次加载只会触发 onRenderTracked 方法。<br/>
因为模板里面用到了 name 和 user.age 所以该方法会被触发两次输出{key: 'value', target: RefImpl, type: 'get'}和{key: 'age', target: {age: 27}, type: 'get'}。<br/>
因为 name 是 ref 定义的，所以 key 始终是 value，并且只是读操作，所以 type 为 get。<br/>
user 是 reactive 定义的，并且我们只使用了 age 属性所以 key 是 age 并且只是读操作，所以 type 为 get。<br/>

### renderTriggered

简单理解就是，页面更新渲染时，模板里面进行了哪些操作，以及该操作的目标对象和键。<br/>
如果有多个属性被修改，这个方法会被触发多次。<br/>
我们来看例子

```html
<template>
  <div>
    <div>{{ name }}</div>
    <button @click="changeName">changeName</button>
    <div>user: {{ user.age }}</div>
  </div>
</template>
<script>
  import {
    defineComponent,
    onRenderTracked,
    onRenderTriggered,
    ref,
    reactive,
  } from "vue";
  export default defineComponent({
    setup() {
      const name = ref("randy");
      const changeName = () => {
        name.value = "demi";
      };
      const user = reactive({ age: 27 });

      onRenderTracked(({ key, target, type }) => {
        console.log("onRenderTracked", { key, target, type });
      });
      onRenderTriggered(({ key, target, type }) => {
        console.log("onRenderTriggered", { key, target, type });
      });

      return {
        name,
        changeName,
        user,
      };
    },
  });
</script>
```

我们点击 changeName 按钮来修改 name，这里只会触发 onRenderTriggered 方法一次。并且输出{key: 'value', target: RefImpl, type: 'set'}，因为是修改所以 type 是 set。

### 生命周期全流程

有些人可能好奇，所有的生命周期函数顺序到底是怎么样的呢？
我们分单组件和父子组件来说明。

### 单组件

### 页面首次加载

> setup -> onBeforeMount -> onRenderTracked -> onMounted

### 页面更新

> onRenderTriggered -> onBeforeUpdate -> onUpdated

### 页面卸载

> onBeforeUnmount -> onUnmounted

### 父子组件

### 页面首次加载

> 父组件 setup -> 父组件 onBeforeMount -> 父组件 onRenderTracked -> 子组件 setup -> 子组件 onBeforeMount -> 子组件 onRenderTracked -> 子组件 onMounted -> 父组件 onMounted

### 页面更新

> 纯父组件属性更新 onRenderTriggered -> onBeforeUpdate -> onUpdated<br/>

> 纯子组件属性更新 onRenderTriggered -> onBeforeUpdate -> onUpdated<br/>

> 父组件属性更新，该属性在子组件中有被使用 父组件 onRenderTriggered -> 父组件 onBeforeUpdate -> 子组件 onBeforeUpdate -> 子组件 onUpdated -> 父组件 onUpdated<br/>

> 子组件属性更新，该属性在父组件中有被使用 子组件 onRenderTriggered -> 父组件 onRenderTriggered -> 父组件 onBeforeUpdate -> 子组件 onBeforeUpdate -> 子组件 onUpdated -> 父组件 onUpdated<br/>

### 页面卸载

父组件 onBeforeUnmount -> 子组件 onBeforeUnmount -> 子组件 onUnmounted -> 父组件 onUnmounted

> 注意上面生命周期函数调用顺序在 vue2 中也是一致的，只不过 vue2 没有 setup、 renderTracked、renderTriggered，并且销毁方法是 beforeDestroy、destroyed。

###

```html
// 在 vue2 中，我们可以通过事件来监听组件生命周期中的关键阶段。这些事件名都是以 hook: 前缀开头，并跟随相应的生命周期钩子的名字。
<template>
  <child-component @hook:updated="onUpdated">
</template>

// 在 vue3 中，这个前缀已被更改为 vnode-。额外地，这些事件现在也可用于 HTML 元素，和在组件上的用法一样。
<template>
  <child-component @vnode-updated="onUpdated">
</template>

// 或者在驼峰命名法的情况下附带前缀 vnode：
<template>
  <child-component @vnodeUpdated="onUpdated">
</template>
```

### 全局 API 改动

任何全局改变 Vue 行为的 API 现在都会移动到应用实例上 app 上，以下是部分全局 API 及其相应实例 API 的表，如需了解很多可以查看官网。

#### 位置变更

```js
2.x 全局 API                              3.x 实例 API (app)
Vue.config                               app.config
Vue.config.productionTip                 removed    已移除
Vue.config.ignoredElements               app.config.isCustomElement
Vue.component                            app.component
Vue.directive                            app.directive
Vue.mixin                                app.mixin
Vue.use                                  app.use
Vue.version                              app.version
Vue.filter                               removed 已移除
Vue.prototype                            app.config.globalProperties
Vue.extendremoved                        已移除 
```

app 通过 createApp 方法创建。

```js
import { createApp } from "vue";
const app = createApp(App);
```

### nextTick

```js
// 在vue2中我们是这样使用的
this.$nextTick(() => {});
//或者
Vue.nextTick(() => {});
// 在vue3中是这样的，需要手动引入
import { nextTick } from "vue";

nextTick(() => {});
```

在 vue2 中 Vue.nextTick()  这样的全局 API 是不支持 tree-shake 的，不管它们实际上是否被使用了，都会被包含在最终的打包产物中。<br/>
而 vue3 中的引入时写法可以 tree-shaking 能减少打包体积。

### 模板指令改动

### v-model

```html
在vue2中 v-model 指令在表单 <input>、<textarea> 及 <select> 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 v-model 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。
v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

text 和 textarea 元素使用 value property 和 input 事件；
checkbox 和 radio 使用 checked property 和 change 事件；
select 字段将 value 作为 prop 并将 change 作为事件。

在vue2中只对上面几个表单项做了特殊处理。如果在自定义组件上使用v-model需要在组件内通过model参数指明v-model的属性和事件。
如果不指明model它的值默认是value，事件默认是input事件。
```

```html
// 父组件
{{ value2 }}
<Child4 v-model="value2" />

// 子组件
<template>
  <div>
    <input type="text" :value="value1" @input="handleInput" />
</button>
  </div>
</template>
<script>
export default {
  // 定义v-model传过来的值名字是value1 修改值的事件是change事件
  model: {
    prop: "value1",
    event: "change",
  },
  props: {
    value1: String,
  },
  methods: {
    handleInput(e) {
      this.$emit("change", e.target.value);
    },
  },
};
</script>
```

有了 model 这样我们的自定义组件 Child4 也能使用 v-model 啦。在 input 输入框输入的时候会$emit 出 change 事件，这个事件会直接修改父组件 value2 的值。<br/>
除了使用 v-model，vue2 还可以使用.sync 修饰符来直接修改父元素数据。

```html
// 父组件 {{ syncValue }}
<Child4 :syncTest.sync="syncValue" />

// 子组件
<template>
  <div>
    <button @click="updateSyncTestValue">修改syncTest的值</button>
  </div>
</template>
<script>
  export default {
    props: {
      syncTest: String,
    },
    methods: {
      updateSyncTestValue() {
        this.$emit("update:syncTest", "new syncTest value");
      },
    },
  };
</script>
```

父组件传递给子组件的值如果带了.sync 就可以在子组件通过 update:xxx 事件直接修改该值而不用再暴露事件在父组件去修改。<br/>
这样我们点击子组件按钮触发 updateSyncTestValue 方法，父组件的 syncTest 值会变成 new syncTest value。<br/>
在 vue3 中 v-model 得到了加强，自定义组件也可以使用了 v-model。而不用去指定 model 或者使用.sync 参数了。<br/>
默认情况下，组件上的  v-model  使用  modelValue  作为 prop 和  update:modelValue  作为事件。<br/>

```html
// 父组件 {{name1}}
<Child1 v-model="name1" />

// 子组件
<template>
  <div class="child1">
    <button @click="changeName">改变值</button>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    props: {
      modelValue: String,
    },
    setup() {
      const changeName = () => {
        context.emit("update:modelValue", "demi");
      };
      return {
        changeName,
      };
    },
  });
</script>
```

当我们点击子组件按钮触发 changeName 方法，会直接修改父组件的 name1 值。

### 自定义参数名

我们可以通过向 v-model 传递参数来修改这些名称：

```html
// 父组件 {{name1}}
<Child1 v-model:name="name1" />

// 子组件
<template>
  <div class="child1">
    <button @click="changeName">改变值</button>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    props: {
      name: String,
    },
    setup() {
      const changeName = () => {
        context.emit("update:name", "demi");
      };
      return {
        changeName,
      };
    },
  });
</script>
```

### 多个参数

当我们点击子组件按钮触发 changeName1、changeName2 方法，会直接修改父组件的 name1、name2 值。<br/>
我们还可以通过向 v-model 传递多个参数，这在 vue2 中是不可以的。

```html
// 父组件 name1: {{ name1 }} name2: {{ name2 }}
<Child2 v-model:name1="name1" v-model:name2="name2" />

// 子组件
<template>
  <div class="child2">
    <button @click="changeName1">改变name1值</button>
    <button @click="changeName2">改变name2值</button>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    props: {
      name1: String,
      name2: String,
    },
    setup() {
      const changeName1 = () => {
        context.emit("update:name1", "demi1");
      };
      const changeName2 = () => {
        context.emit("update:name2", "demi2");
      };
      return {
        changeName1,
        changeName2,
      };
    },
  });
</script>
```

### v-model 修饰符

vue3 除了支持.trim、.number 和 .lazy 修饰符。还支持添加自己的自定义修饰符。

下面笔者写个.capitalize 修饰符，用来转换字母为大写。

```html
// 父组件 {{ name3 }}
<Child5 v-model.capitalize="name3" />

// 子组件
<template>
  <div class="child5">
    <input type="text" @input="changeName" />
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    props: {
      modelValue: String,
      modelModifiers: {
        default: () => ({}),
      },
    },
    setup(props, context) {
      console.log(props.modelModifiers); // {capitalize: true}
      const changeName = (e) => {
        if (props.modelModifiers.capitalize) {
          context.emit("update:modelValue", e.target.value.toUpperCase());
        } else {
          context.emit("update:modelValue", e.target.value);
        }
      };
      return {
        changeName,
      };
    },
  });
</script>
```

我们通过传递.capitalize，在子组件 props 中接收 modelModifiers，这个属性里面存放传递的修饰符，比如我们传递了.capitalize 它的值就是{capitalize: true}，所以我们可以根据这个属性还自定义操作。<br/>
对于带参数的  v-model  绑定，生成的 prop 名称将为  arg + "Modifiers"，这里笔者就不再细说了。

```html
<Child5 v-model:name.capitalize="name3" />
```

### key 支持在 template 使用

```html
在vue2中，key是不能定义在template节点上的。但是在vue3中支持了。
<!-- Vue 2.x -->
<template v-for="item in list">
  <div :key="'heading-' + item.id">...</div>
  <span :key="'content-' + item.id">...</span>
</template>

<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

### 修改 v-if 和 v-for 优先级

在 vue2 中 v-for 的优先级是比 v-if 高的，在一个元素上同时使用  v-if  和  v-for  时，v-for  会优先作用。<br/>
下面我们根据数据 show 字段进行遍历展示，在 vue2 中是可行的。但是在 vue3 这样是不可行的。

```js
<ul>
  <li v-for="(list, index) of lists2" :key="index" v-if="list.show">
    {{ list.name }}
  </li>
</ul>

lists2: [
  { name: "randy", show: true },
  { name: "demi", show: false },
  { name: "jack", show: true },
],
```

在 vue3 中需要这样写。因为在 vue3 中 v-if 的优先级比 v-for 更高，所以在 v-if 中访问不到 list。

```js
<ul>
  <li v-for="(list, index) of lists2" :key="index">
    <div v-if="list.show">{{ list.name }}</div>
  </li>
</ul>

lists2: [
  { name: "randy", show: true },
  { name: "demi", show: false },
  { name: "jack", show: true },
],
```

### v-bind="object"  现在排序敏感

在一个元素上动态绑定 attribute 时，同时使用  v-bind="object"  语法和独立 attribute 是常见的场景。然而，这就引出了关于合并的优先级的问题。<br/>
在 vue2 中，如果一个元素同时定义了  v-bind="object"  和一个相同的独立 attribute，那么这个独立 attribute 总是会覆盖  object  中的绑定。

```html
<!-- 模板 -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- 结果 -->
<div id="red"></div>
```

在 vue3 中，如果一个元素同时定义了  v-bind="object"  和一个相同的独立 attribute，那么绑定的声明顺序将决定它们如何被合并。后面的会覆盖前面的。

```html
<!-- 模板 -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- 结果 -->
<div id="blue"></div>

<!-- 模板 -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- 结果 -->
<div id="red"></div>
```

### 移除 v-on.native 修饰符

```html
<!-- 默认情况下，传递给带有 v-on 的组件的事件监听器只能通过 this.$emit 触发。如果要将原生 DOM 监听器添加到子组件的根元素中，可以使用 .native 修饰符： -->
<my-component
  v-on:close="handleComponentEvent"
  v-on:click.native="handleNativeClickEvent"
/>
<!-- 
这里的被.native修饰的click就是原生事件，当点击的时候才会触发。
在vue3中v-on 的 .native 修饰符已被移除。同时，新增的 emits 选项允许子组件定义真正会被触发的事件。
因此，对于子组件中未被定义为组件触发的所有事件监听器，Vue 现在将把它们作为原生事件监听器添加到子组件的根元素中 (除非在子组件的选项中设置了 inheritAttrs: false)。 -->

<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
子组件
<script>
  export default {
    emits: ["close"],
  };
</script>

<!-- 在上面的例子中，因为子组件定义了emits: ['close']，也就是说组件说明了，我只会暴露出close事件，其他的事件你就当原生事件处理就可以了。所以click事件就是原生事件了 -->
```

### v-for 中的 ref

在 vue2 中，在  v-for  中使用的  ref attribute 会用 ref 数组填充相应的  $refs property。当存在嵌套的 v-for 时，这种行为会变得不明确且效率低下。<br/>
在 vue3 中，此类用法将不再自动创建 $ref  数组。要从单个绑定获取多个 ref，请将  ref  绑定到一个更灵活的函数上 (这是一个新特性)：<br/>

```js
<div v-for="item in list" :ref="setItemRef"></div>
```

```js
// 选项式 API:
export default {
  data() {
    return {
      itemRefs: []
    }
  },
  methods: {
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    }
  },
  beforeUpdate() {
    this.itemRefs = []
  },
  updated() {
    console.log(this.itemRefs)
  }
}

// 组合式 API:
import { onBeforeUpdate, onUpdated } from 'vue'

export default {
  setup() {
    let itemRefs = []
    const setItemRef = el => {
      if (el) {
        itemRefs.push(el)
      }
    }
    onBeforeUpdate(() => {
      itemRefs = []
    })
    onUpdated(() => {
      console.log(itemRefs)
    })
    return {
      setItemRef
    }
  }
}
```

itemRefs  不必是数组：它也可以是一个对象，其 ref 可以通过迭代的 key 被设置。如有需要，itemRefs  也可以是响应式的，且可以被侦听。

### 组件改动

### 函数式组件

在 vue2 中我们使用 functional 定义函数式组件。有如下特点

作为性能优化，因为它们的初始化速度比有状态组件快得多
返回多个根节点

```html
<!-- 比如使用 <dynamic-heading> 组件，负责提供适当的标题 (即：h1、h2、h3 等等)，在 vue2 中，这可以通过单文件组件编写： -->
<script>
  export default {
    functional: true,
    props: ["level"],
    render(h, { props, data, children }) {
      return h(`h${props.level}`, data, children);
    },
  };
</script>

<!-- 或者，对于喜欢在单文件组件中使用 <template> 的用户： -->
<template functional>
  <component :is="`h${props.level}`" v-bind="attrs" v-on="listeners" />
</template>

<script>
  export default {
    props: ["level"],
  };
</script>
<!-- 
但是在 vue3 中，所有的函数式组件都是用普通函数创建的。换句话说，不需要定义 { functional: true } 组件选项。也就是说 functional 已经被移除了。
它们将接收两个参数：props 和 context。context 参数是一个对象，包含组件的 attrs、slots 和 emit property。
此外，h 现在是全局导入的，而不是在 render 函数中隐式提供。
以前面提到的 <dynamic-heading> 组件为例，下面是它现在的样子。 -->
<script>
  import { h } from "vue";

  const DynamicHeading = (props, context) => {
    return h(`h${props.level}`, context.attrs, context.slots);
  };

  DynamicHeading.props = ["level"];

  export default DynamicHeading;
</script>
```


