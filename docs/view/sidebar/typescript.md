# 什么是 typescript?

---

::: tip --  
TypeScript 简称 TS
TS 和 JS 之间的关系其实就是 Less/Sass 和 CSS 之间的关系
就像 Less/Sass 是对 CSS 进行扩展一样, TS 也是对 JS 进行扩展
就像 Less/Sass 最终会转换成 CSS 一样, 我们编写好的 TS 代码最终也会换成 JS
TypeScript 是 JavaScript 的超集，因为它扩展了 JavaScript，有 JavaScript 没有的东西。
硬要以父子类关系来说的话，TypeScript 是 JavaScript 子类，继承的基础上去扩展。

:::

---

# TypeScript 特点

---

::: tip --
支持最新的 JavaScript 新特特性
支持代码静态检查
支持诸如 C,C++,Java,Go 等后端语言中的特性 (枚举、泛型、类型转换、命名空间、声明文件、类、接口等)
:::

```npm{1,6-8}
npm i -g typescript

```

# 安装 ts-node

---

```npm{1,6-8}
npm i -g ts-node

```

# 创建一个 tsconfig.json 文件

```npm{1,6-8}
tsc --init

```

然后新建 index.ts,输入相关练习代码，然后执行 ts-node index.ts

---

# 基础数据类型

---

## JS 的八种内置类型

```ts{1,6-8}
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me");
```

## null 和 undefined

```ts{1,6-8}
//默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给其他类型
// null和undefined赋值给string
let str:string = "666";
str = null
str= undefined

// null和undefined赋值给number
let num:number = 666;
num = null
num= undefined

// null和undefined赋值给object
let obj:object ={};
obj = null
obj= undefined

// null和undefined赋值给Symbol
let sym: symbol = Symbol("me");
sym = null
sym= undefined

// null和undefined赋值给boolean
let isDone: boolean = false;
isDone = null
isDone= undefined

// null和undefined赋值给bigint
let big: bigint =  100n;
big = null
big= undefined
//如果你在tsconfig.json指定了"strictNullChecks":true ，null 和 undefined 只能赋值给 void 和它们各自的类型。
```

## number 和 bigint

---

```ts{1,6-8}
//虽然number和bigint都表示数字，但是这两个类型不兼容。
let big: bigint =  100n;
let num: number = 6;
big = num;
num = big;
//
//会抛出一个类型不兼容的 ts(2322) 错误。

```

# 其他类型

## Array

---

```ts{1,6-8}
// 对数组类型的定义有两种方式：
let arr:string[] = ["1","2"];
let arr2:Array<string> = ["1","2"]；
// 定义联合类型数组
let arr:(number | string)[];
// 表示定义了一个名称叫做arr的数组,
// 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
arr3 = [1, 'b', 2, 'c'];
// 定义指定对象成员的数组：
// interface是接口,后面会讲到
interface Arrobj{
    name:string,
    age:number
}
let arr3:Arrobj[]=[{name:'jimmy',age:22}]

```

# 函数

---

```ts{1,6-8}
// 函数声明
function sum(x: number, y: number): number {
    return x + y;
}


// 函数表达式
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};


// 用接口定义函数类型
interface SearchFunc{
  (source: string, subString: string): boolean;
}
// 采用函数表达式接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。


// 可选参数
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
// 注意点：可选参数后面不允许再出现必需参数


// 参数默认值
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');


// 剩余参数
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}
let a = [];
push(a, 1, 2, 3);



// 函数重载
// 由于 JavaScript 是一个动态语言，我们通常会使用不同类型的参数来调用同一个函数，该函数会根据不同的参数而返回不同的类型的调用结果：
function add(x, y) {
 return x + y;
}
add(1, 2); // 3
add("1", "2"); //"12"
// 由于 TypeScript 是 JavaScript 的超集，因此以上的代码可以直接在 TypeScript 中使用，但当 TypeScript 编译器开启 noImplicitAny 的配置项时，以上代码会提示以下错误信息：
// Parameter 'x' implicitly has an 'any' type.
// Parameter 'y' implicitly has an 'any' type.


// 该信息告诉我们参数 x 和参数 y 隐式具有 any 类型。为了解决这个问题，我们可以为参数设置一个类型。因为我们希望 add 函数同时支持 string 和 number 类型，因此我们可以定义一个 string | number 联合类型，同时我们为该联合类型取个别名：
type Combinable = string | number;
// 在定义完 Combinable 联合类型后，我们来更新一下 add 函数：
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
     return a.toString() + b.toString();
    }
    return a + b;
}
// 为 add 函数的参数显式设置类型之后，之前错误的提示消息就消失了。那么此时的 add 函数就完美了么，我们来实际测试一下：
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
// 在上面代码中，我们分别使用 'Semlinker' 和 ' Kakuqo' 这两个字符串作为参数调用 add 函数，并把调用结果保存到一个名为 result 的变量上，这时候我们想当然的认为此时 result 的变量的类型为 string，所以我们就可以正常调用字符串对象上的 split 方法。但这时 TypeScript 编译器又出现以下错误信息了：
// Property 'split' does not exist on type 'number'.
// 很明显 number 类型的对象上并不存在 split 属性。问题又来了，那如何解决呢？这时我们就可以利用 TypeScript 提供的函数重载特性。

// 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。 要解决前面遇到的问题，方法就是为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用。

type Types = number | string
function add(a:number,b:number):number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a:Types, b:Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
// 在以上代码中，我们为 add 函数提供了多个函数类型定义，从而实现函数的重载。之后，可恶的错误消息又消失了，因为这时 result 变量的类型是 string 类型。

```

## Tuple(元组)

---

::: tip
元祖定义
众所周知，数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型，其工作方式类似于数组。
元组最重要的特性是可以限制数组元素的个数和类型，它特别适合用来实现多值返回。
元祖用于保存定长定数据类型的数据
:::

```ts{1,6-8}

let x: [string, number];
// 类型必须匹配且个数必须为2

x = ['hello', 10]; // OK
x = ['hello', 10,10]; // Error
x = [10, 'hello']; // Error

// 注意，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。如果一个数组中可能有多种类型，数量和类型都不确定，那就直接any[]
// 元祖类型的解构赋值
// 我们可以通过下标的方式来访问元组中的元素，当元组中的元素较多时，这种方式并不是那么便捷。其实元组也是支持解构赋值的：
let employee: [number, string] = [1, "Semlinker"];
let [id, username] = employee;
console.log(`id: ${id}`);
console.log(`username: ${username}`);

// 以上代码成功运行后，控制台会输出以下消息：
id: 1
username: Semlinker

// 这里需要注意的是，在解构赋值时，如果解构数组元素的个数是不能超过元组中元素的个数，否则也会出现错误，比如：
let employee: [number, string] = [1, "Semlinker"];\
// let [id, username, age] = employee;

// 在以上代码中，我们新增了一个 age 变量，但此时 TypeScript 编译器会提示以下错误信息：
// Tuple type '[number, string]' of length '2' has no element at index '2'.

// 很明显元组类型 [number, string] 的长度是 2，在位置索引 2 处不存在任何元素。
// 元组类型的可选元素
// 与函数签名类型，在定义元组类型时，我们也可以通过 ? 号来声明元组类型的可选元素，具体的示例如下：
let optionalTuple: [string, boolean?];
optionalTuple = ["Semlinker", true];
console.log(`optionalTuple : ${optionalTuple}`);
optionalTuple = ["Kakuqo"];
console.log(`optionalTuple : ${optionalTuple}`);

// 在上面代码中，我们定义了一个名为 optionalTuple 的变量，该变量的类型要求包含一个必须的字符串属性和一个可选布尔属性，该代码正常运行后，控制台会输出以下内容：
optionalTuple : Semlinker,true
optionalTuple : Kakuqo

// 那么在实际工作中，声明可选的元组元素有什么作用？这里我们来举一个例子，在三维坐标轴中，一个坐标点可以使用 (x, y, z) 的形式来表示，对于二维坐标轴来说，坐标点可以使用 (x, y) 的形式来表示，而对于一维坐标轴来说，只要使用 (x) 的形式来表示即可。针对这种情形，在 TypeScript 中就可以利用元组类型可选元素的特性来定义一个元组类型的坐标点，具体实现如下：
type Point = [number, number?, number?];

const x: Point = [10]; // 一维坐标点
const xy: Point = [10, 20]; // 二维坐标点
const xyz: Point = [10, 20, 10]; // 三维坐标点

console.log(x.length); // 1
console.log(xy.length); // 2
console.log(xyz.length); // 3

// 元组类型的剩余元素
// 元组类型里最后一个元素可以是剩余元素，形式为 ...X，这里 X 是数组类型。剩余元素代表元组类型是开放的，可以有零个或多个额外的元素。 例如，[number, ...string[]] 表示带有一个 number 元素和任意数量string 类型元素的元组类型。为了能更好的理解，我们来举个具体的例子：
type RestTupleType = [number, ...string[]];
let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"];
console.log(restTuple[0]);
console.log(restTuple[1]);

// 只读的元组类型
// TypeScript 3.4 还引入了对只读元组的新支持。我们可以为任何元组类型加上 readonly 关键字前缀，以使其成为只读元组。具体的示例如下：
const point: readonly [number, number] = [10, 20];

// 在使用 readonly 关键字修饰元组类型之后，任何企图修改元组中元素的操作都会抛出异常：
// Cannot assign to '0' because it is a read-only property.
point[0] = 1;
// Property 'push' does not exist on type 'readonly [number, number]'.
point.push(0);
// Property 'pop' does not exist on type 'readonly [number, number]'.
point.pop();
// Property 'splice' does not exist on type 'readonly [number, number]'.
point.splice(1, 1);

```

---

```ts{1,6-8}
#  void
// void表示没有任何类型，和其他类型是平等关系，不能直接赋值:
let a: void;
let b: number = a; // Error
// 你只能为它赋予null和undefined（在strictNullChecks未指定为true时）。声明一个void类型的变量没有什么大用，我们一般也只有在函数没有返回值时去声明。
// 值得注意的是，方法没有返回值将得到undefined，但是我们需要定义成void类型，而不是undefined类型。否则将报错:
function fun(): undefined {
  console.log("this is TypeScript");
};
fun(); // Error

# never
// never类型表示的是那些永不存在的值的类型。
// 值会永不存在的两种情况：

// 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）；
// 函数中执行无限循环的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回。

// 异常
function err(msg: string): never { // OK
  throw new Error(msg);
}

// 死循环
function loopForever(): never { // OK
  while (true) {};
}


// never类型同null和undefined一样，也是任何类型的子类型，也可以赋值给任何类型。
// 但是没有类型是never的子类型或可以赋值给never类型（除了never本身之外），即使any也不可以赋值给never
let ne: never;
let nev: never;
let an: any;

ne = 123; // Error
ne = nev; // OK
ne = an; // Error
ne = (() => { throw new Error("异常"); })(); // OK
ne = (() => { while(true) {} })(); // OK

// 在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，具体示例如下：
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}

// 注意在 else 分支里面，我们把收窄为 never 的 foo 赋值给一个显示声明的 never 变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事修改了 Foo 的类型：
type Foo = string | number | boolean;

// 然而他忘记同时修改 controlFlowAnalysisWithNever 方法中的控制流程，这时候 else 分支的 foo 类型会被收窄为 boolean 类型，导致无法赋值给 never 类型，这时就会产生一个编译错误。通过这个方式，我们可以确保controlFlowAnalysisWithNever 方法总是穷尽了 Foo 的所有可能类型。 通过这个示例，我们可以得出一个结论：使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。
// any
// 在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型.
// 如果是一个普通类型，在赋值过程中改变类型是不被允许的：
let a: string = 'seven';
a = 7;
// TS2322: Type 'number' is not assignable to type 'string'.

// 但如果是 any 类型，则允许被赋值为任意类型。
let a: any = 666;
a = "Semlinker";
a = false;
a = 66
a = undefined
a = null
a = []
a = {}

// 在any上访问任何属性都是允许的,也允许调用任何方法.
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');

// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
let something;
something = 'seven';
something = 7;
something.setName('Tom');

// 等价于
let something: any;
something = 'seven';
something = 7;
something.setName('Tom');

// 在许多场景下，这太宽松了。使用 any 类型，可以很容易地编写类型正确但在运行时有问题的代码。如果我们使用 any 类型，就无法使用 TypeScript 提供的大量的保护机制。请记住，any 是魔鬼！尽量不要用any。
// 为了解决 any 带来的问题，TypeScript 3.0 引入了 unknown 类型。
unknown
unknown与any一样，所有类型都可以分配给unknown:
let notSure: unknown = 4;
notSure = "maybe a string instead"; // OK
notSure = false; // OK

unknown与any的最大区别是：
// 任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。unknown 任何类型的值都可以赋值给它，但它只能赋值给unknown和any
let notSure: unknown = 4;
let uncertain: any = notSure; // OK

let notSure: any = 4;
let uncertain: unknown = notSure; // OK

let notSure: unknown = 4;
let uncertain: number = notSure; // Error


// 如果不缩小类型，就无法对unknown类型执行任何操作：
function getDog() {
 return '123'
}

const dog: unknown = {hello: getDog};
dog.hello(); // Error

// 这种机制起到了很强的预防性，更安全，这就要求我们必须缩小类型，我们可以使用typeof、类型断言等方式来缩小未知范围：
function getDogName() {
 let x: unknown;
 return x;
};
const dogName = getDogName();
// 直接使用
const upName = dogName.toLowerCase(); // Error
// typeof
if (typeof dogName === 'string') {
  const upName = dogName.toLowerCase(); // OK
}
// 类型断言
const upName = (dogName as string).toLowerCase(); // OK

```

Number、String、Boolean、Symbol

---

```ts{1,6-8}
// 首先，我们来回顾一下初学 TypeScript 时，很容易和原始类型 number、string、boolean、symbol 混淆的首字母大写的 Number、String、Boolean、Symbol 类型，后者是相应原始类型的包装对象，姑且把它们称之为对象类型。
// 从类型兼容性上看，原始类型兼容对应的对象类型，反过来对象类型不兼容对应的原始类型。
// 下面我们看一个具体的示例：
let num: number;
let Num: Number;
Num = num; // ok
num = Num; // ts(2322)报错
// 在示例中的第 3 行，我们可以把 number 赋给类型 Number，但在第 4 行把 Number 赋给 number 就会提示 ts(2322) 错误。
// 因此，我们需要铭记不要使用对象类型来注解值的类型，因为这没有任何意义。

```

object、Object 和 {}

---

```ts{1,6-8}
// 另外，object（首字母小写，以下称“小 object”）、Object（首字母大写，以下称“大 Object”）和 {}（以下称“空对象”）
// 小 object 代表的是所有非原始类型，也就是说我们不能把 number、string、boolean、symbol等 原始类型赋值给 object。在严格模式下，null 和 undefined 类型也不能赋给 object。

JavaScript 中以下类型被视为原始类型：string、boolean、number、bigint、symbol、null 和 undefined。

下面我们看一个具体示例：
let lowerCaseObject: object;
lowerCaseObject = 1; // ts(2322)
lowerCaseObject = 'a'; // ts(2322)
lowerCaseObject = true; // ts(2322)
lowerCaseObject = null; // ts(2322)
lowerCaseObject = undefined; // ts(2322)
lowerCaseObject = {}; // ok

// 在示例中的第 2~6 行都会提示 ts(2322) 错误，但是我们在第 7 行把一个空对象赋值给 object 后，则可以通过静态类型检测。
// 大Object 代表所有拥有 toString、hasOwnProperty 方法的类型，所以所有原始类型、非原始类型都可以赋给 Object。同样，在严格模式下，null 和 undefined 类型也不能赋给 Object。
// 下面我们也看一个具体的示例：
let upperCaseObject: Object;
upperCaseObject = 1; // ok
upperCaseObject = 'a'; // ok
upperCaseObject = true; // ok
upperCaseObject = null; // ts(2322)
upperCaseObject = undefined; // ts(2322)
upperCaseObject = {}; // ok

// 在示例中的第 2到4 行、第 7 行都可以通过静态类型检测，而第 5~6 行则会提示 ts(2322) 错误。
// 从上面示例可以看到，大 Object 包含原始类型，小 object 仅包含非原始类型，所以大 Object 似乎是小 object 的父类型。实际上，大 Object 不仅是小 object 的父类型，同时也是小 object 的子类型。
// 下面我们还是通过一个具体的示例进行说明。
type isLowerCaseObjectExtendsUpperCaseObject = object extends Object ? true : false; // true
type isUpperCaseObjectExtendsLowerCaseObject = Object extends object ? true : false; // true
upperCaseObject = lowerCaseObject; // ok
lowerCaseObject = upperCaseObject; // ok


// 在示例中的第 1 行和第 2 行返回的类型都是 true，第3 行和第 4 行的 upperCaseObject 与 lowerCaseObject 可以互相赋值。

// 注意：尽管官方文档说可以使用小 object 代替大 Object，但是我们仍要明白大 Object 并不完全等价于小 object。

// {}空对象类型和大 Object 一样，也是表示原始类型和非原始类型的集合，并且在严格模式下，null 和 undefined 也不能赋给 {} ，如下示例：
let ObjectLiteral: {};
ObjectLiteral = 1; // ok
ObjectLiteral = 'a'; // ok
ObjectLiteral = true; // ok
ObjectLiteral = null; // ts(2322)
ObjectLiteral = undefined; // ts(2322)
ObjectLiteral = {}; // ok
type isLiteralCaseObjectExtendsUpperCaseObject = {} extends Object ? true : false; // true
type isUpperCaseObjectExtendsLiteralCaseObject = Object extends {} ? true : false; // true
upperCaseObject = ObjectLiteral;
ObjectLiteral = upperCaseObject;

// 在示例中的第 8 行和第 9 行返回的类型都是 true，第10 行和第 11 行的 ObjectLiteral 与 upperCaseObject 可以互相赋值，第2~4 行、第 7 行的赋值操作都符合静态类型检测；而第5 行、第 6 行则会提示 ts(2322) 错误。
// 综上结论：{}、大 Object 是比小 object 更宽泛的类型（least specific），{} 和大 Object 可以互相代替，用来表示原始类型（null、undefined 除外）和非原始类型；而小 object 则表示非原始类型。

```

推断 断言

---

```ts{1,6-8}
// 类型推断
{
  let str: string = 'this is string';
  let num: number = 1;
  let bool: boolean = true;
}
{
  const str: string = 'this is string';
  const num: number = 1;
  const bool: boolean = true;
}

// 看着上面的示例，可能你已经在嘀咕了：定义基础类型的变量都需要写明类型注解，TypeScript 太麻烦了吧？在示例中，使用 let 定义变量时，我们写明类型注解也就罢了，毕竟值可能会被改变。可是，使用 const 常量时还需要写明类型注解，那可真的很麻烦。
// 实际上，TypeScript 早就考虑到了这么简单而明显的问题。
// 在很多情况下，TypeScript 会根据上下文环境自动推断出变量的类型，无须我们再写明类型注解。因此，上面的示例可以简化为如下所示内容：
{
  let str = 'this is string'; // 等价
  let num = 1; // 等价
  let bool = true; // 等价
}
{
  const str = 'this is string'; // 不等价
  const num = 1; // 不等价
  const bool = true; // 不等价
}

// 我们把 TypeScript 这种基于赋值表达式推断类型的能力称之为类型推断。
// 在 TypeScript 中，具有初始化值的变量、有默认值的函数参数、函数返回的类型都可以根据上下文推断出来。比如我们能根据 return 语句推断函数返回的类型，如下代码所示：
{
  /** 根据参数的类型，推断出返回值的类型也是 number */
  function add1(a: number, b: number) {
    return a + b;
  }
  const x1= add1(1, 1); // 推断出 x1 的类型也是 number

  /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */
  function add2(a: number, b = 1) {
    return a + b;
  }
  const x2 = add2(1);
  const x3 = add2(1, '1'); // ts(2345) Argument of type "1" is not assignable to parameter of type 'number | undefined
}

// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// 类型断言
// 有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
// 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。
// TypeScript 类型检测无法做到绝对智能，毕竟程序不能像人一样思考。有时会碰到我们比 TypeScript 更清楚实际类型的情况，比如下面的例子：
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2); // 提示 ts(2322)

// 其中，greaterThan2 一定是一个数字（确切地讲是 3），因为 arrayNumber 中明显有大于 2 的成员，但静态类型对运行时的逻辑无能为力。
// 在 TypeScript 看来，greaterThan2 的类型既可能是数字，也可能是 undefined，所以上面的示例中提示了一个 ts(2322) 错误，此时我们不能把类型 undefined 分配给类型 number。
// 不过，我们可以使用一种笃定的方式——类型断言（类似仅作用在类型层面的强制类型转换）告诉 TypeScript 按照我们的方式做类型检查。
// 比如，我们可以使用 as 语法做类型断言，如下代码所示：
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;

语法
// 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// 以上两种方式虽然没有任何区别，但是尖括号格式会与react中JSX产生语法冲突，因此我们更推荐使用 as 语法。
// 非空断言
// 在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。具体而言，x! 将从 x 值域中排除 null 和 undefined 。
// 具体看以下示例：
let mayNullOrUndefinedOrString: null | undefined | string;
mayNullOrUndefinedOrString!.toString(); // ok
mayNullOrUndefinedOrString.toString(); // ts(2531)

type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}

// 确定赋值断言
// 允许在实例属性和变量声明后面放置一个 ! 号，从而告诉 TypeScript 该属性会被明确地赋值。为了更好地理解它的作用，我们来看个具体的例子：
let x: number;
initialize();

// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error
function initialize() {
  x = 10;
}


// 很明显该异常信息是说变量 x 在赋值前被使用了，要解决该问题，我们可以使用确定赋值断言：
let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}

// 通过 let x!: number; 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值

```

```ts{1,6-8}
Objects / Functions
两者都可以用来描述对象或函数的类型，但是语法不同。
Interface
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}


Type alias
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;


Other Types
与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement('div');
type B = typeof div;

接口可以定义多次,类型别名不可以
与类型别名不同，接口可以定义多次，会被自动合并为单个接口。
interface Point { x: number; }
interface Point { y: number; }
const point: Point = { x: 1, y: 2 };

扩展
两者的扩展方式不同，但并不互斥。接口可以扩展类型别名，同理，类型别名也可以扩展接口。
接口的扩展就是继承，通过 extends 来实现。类型别名的扩展就是交叉类型，通过 & 来实现。
接口扩展接口
interface PointX {
    x: number
}

interface Point extends PointX {
    y: number
}

类型别名扩展类型别名

type PointX = {
    x: number
}

type Point = PointX & {
    y: number
}

接口扩展类型别名
type PointX = {
    x: number
}
interface Point extends PointX {
    y: number
}

类型别名扩展接口
interface PointX {
    x: number
}
type Point = PointX & {
    y: number
}

泛型
泛型介绍
假如让你实现一个函数 identity，函数的参数可以是任何值，返回值就是将参数原样返回，并且其只能接受一个参数，你会怎么做？
你会觉得这很简单，顺手就写出这样的代码：
const identity = (arg) => arg;

由于其可以接受任意值，也就是说你的函数的入参和返回值都应该可以是任意类型。 现在让我们给代码增加类型声明：
type idBoolean = (arg: boolean) => boolean;
type idNumber = (arg: number) => number;
type idString = (arg: string) => string;
...

一个笨的方法就像上面那样，也就是说 JS 提供多少种类型，就需要复制多少份代码，然后改下类型签名。这对程序员来说是致命的。这种复制粘贴增加了出错的概率，使得代码难以维护，牵一发而动全身。并且将来 JS 新增新的类型，你仍然需要修改代码，也就是说你的代码对修改开放，这样不好。还有一种方式是使用 any 这种“万能语法”。缺点是什么呢？我举个例子：
identity("string").length; // ok
identity("string").toFixed(2); // ok
identity(null).toString(); // ok
...

如果你使用 any 的话，怎么写都是 ok 的， 这就丧失了类型检查的效果。实际上我知道我传给你的是 string，返回来的也一定是 string，而 string 上没有 toFixed 方法，因此需要报错才是我想要的。也就是说我真正想要的效果是：当我用到id的时候，你根据我传给你的类型进行推导。比如我传入的是 string，但是使用了 number 上的方法，你就应该报错。
为了解决上面的这些问题，我们使用泛型对上面的代码进行重构。和我们的定义不同，这里用了一个 类型 T，这个 T 是一个抽象类型，只有在调用的时候才确定它的值，这就不用我们复制粘贴无数份代码了。
function identity<T>(arg: T): T {
  return arg;
}

其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：

K（Key）：表示对象中的键类型；
V（Value）：表示对象中的值类型；
E（Element）：表示元素类型。

来张图片帮助你理解

其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 U，用于扩展我们定义的 identity 函数：
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}
console.log(identity<Number, string>(68, "Semlinker"));


除了为类型变量显式设定值之外，一种更常见的做法是使编译器自动选择这些类型，从而使代码更简洁。我们可以完全省略尖括号，比如：
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}
console.log(identity(68, "Semlinker"));

对于上述代码，编译器足够聪明，能够知道我们的参数类型，并将它们赋值给 T 和 U，而不需要开发人员显式指定它们。
泛型约束
假如我想打印出参数的 size 属性呢？如果完全不进行约束 TS 是会报错的：
function trace<T>(arg: T): T {
  console.log(arg.size); // Error: Property 'size doesn't exist on type 'T'
  return arg;
}

报错的原因在于 T 理论上是可以是任何类型的，不同于 any，你不管使用它的什么属性或者方法都会报错（除非这个属性和方法是所有集合共有的）。那么直观的想法是限定传给 trace 函数的参数类型应该有 size 类型，这样就不会报错了。如何去表达这个类型约束的点呢？实现这个需求的关键在于使用类型约束。 使用 extends 关键字可以做到这一点。简单来说就是你定义一个类型，然后让 T 实现这个接口即可。
interface Sizeable {
  size: number;
}
function trace<T extends Sizeable>(arg: T): T {
  console.log(arg.size);
  return arg;
}

有的人可能说我直接将 Trace 的参数限定为 Sizeable 类型可以么？如果你这么做，会有类型丢失的风险，详情可以参考这篇文章A use case for TypeScript Generics。
泛型工具类型
为了方便开发者 TypeScript 内置了一些常用的工具类型，比如 Partial、Required、Readonly、Record 和 ReturnType 等。不过在具体介绍之前，我们得先介绍一些相关的基础知识，方便读者可以更好的学习其它的工具类型。
1.typeof
typeof 的主要用途是在类型上下文中获取变量或者属性的类型，下面我们通过一个具体示例来理解一下。
interface Person {
  name: string;
  age: number;
}
const sem: Person = { name: "semlinker", age: 30 };
type Sem = typeof sem; // type Sem = Person

在上面代码中，我们通过 typeof 操作符获取 sem 变量的类型并赋值给 Sem 类型变量，之后我们就可以使用 Sem 类型：
const lolo: Sem = { name: "lolo", age: 5 }

你也可以对嵌套对象执行相同的操作：
const Message = {
    name: "jimmy",
    age: 18,
    address: {
      province: '四川',
      city: '成都'
    }
}
type message = typeof Message;
/*
 type message = {
    name: string;
    age: number;
    address: {
        province: string;
        city: string;
    };
}
*/

此外，typeof 操作符除了可以获取对象的结构类型之外，它也可以用来获取函数对象的类型，比如：
function toArray(x: number): Array<number> {
  return [x];
}
type Func = typeof toArray; // -> (x: number) => number[]

2.keyof
keyof 操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。
interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join"
type K3 = keyof { [x: string]: Person };  // string | number

在 TypeScript 中支持两种索引签名，数字索引和字符串索引：
interface StringArray {
  // 字符串索引 -> keyof StringArray => string | number
  [index: string]: string;
}

interface StringArray1 {
  // 数字索引 -> keyof StringArray1 => number
  [index: number]: string;
}

为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。所以 keyof { [x: string]: Person } 的结果会返回 string | number。
keyof也支持基本数据类型：
let K1: keyof boolean; // let K1: "valueOf"
let K2: keyof number; // let K2: "toString" | "toFixed" | "toExponential" | ...
let K3: keyof symbol; // let K1: "valueOf"

keyof 的作用
JavaScript 是一种高度动态的语言。有时在静态类型系统中捕获某些操作的语义可能会很棘手。以一个简单的prop 函数为例：
function prop(obj, key) {
  return obj[key];
}

该函数接收 obj 和 key 两个参数，并返回对应属性的值。对象上的不同属性，可以具有完全不同的类型，我们甚至不知道 obj 对象长什么样。
那么在 TypeScript 中如何定义上面的 prop 函数呢？我们来尝试一下：
function prop(obj: object, key: string) {
  return obj[key];
}

在上面代码中，为了避免调用 prop 函数时传入错误的参数类型，我们为 obj 和 key 参数设置了类型，分别为 {} 和 string 类型。然而，事情并没有那么简单。针对上述的代码，TypeScript 编译器会输出以下错误信息：
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.

元素隐式地拥有 any 类型，因为 string 类型不能被用于索引 {} 类型。要解决这个问题，你可以使用以下非常暴力的方案：
function prop(obj: object, key: string) {
  return (obj as any)[key];
}

很明显该方案并不是一个好的方案，我们来回顾一下 prop 函数的作用，该函数用于获取某个对象中指定属性的属性值。因此我们期望用户输入的属性是对象上已存在的属性，那么如何限制属性名的范围呢？这时我们可以利用本文的主角 keyof 操作符：
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

在以上代码中，我们使用了 TypeScript 的泛型和泛型约束。首先定义了 T 类型并使用 extends 关键字约束该类型必须是 object 类型的子类型，然后使用 keyof 操作符获取 T 类型的所有键，其返回类型是联合类型，最后利用 extends 关键字约束 K 类型必须为 keyof T 联合类型的子类型。  是骡子是马拉出来遛遛就知道了，我们来实际测试一下：
type Todo = {
  id: number;
  text: string;
  done: boolean;
}

const todo: Todo = {
  id: 1,
  text: "Learn TypeScript keyof",
  done: false
}

function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const id = prop(todo, "id"); // const id: number
const text = prop(todo, "text"); // const text: string
const done = prop(todo, "done"); // const done: boolean

很明显使用泛型，重新定义后的 prop<T extends object, K extends keyof T>(obj: T, key: K) 函数，已经可以正确地推导出指定键对应的类型。那么当访问 todo 对象上不存在的属性时，会出现什么情况？比如：
const date = prop(todo, "date");

对于上述代码，TypeScript 编译器会提示以下错误：
Argument of type '"date"' is not assignable to parameter of type '"id" | "text" | "done"'.

这就阻止我们尝试读取不存在的属性。
3.in
in 用来遍历枚举类型：
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }

4.infer
在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R ? R : any;

以上代码中 infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。
5.extends
有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：
loggingIdentity(3);  // Error, number doesn't have a .length property

这时我们需要传入符合约束类型的值，必须包含length属性：
loggingIdentity({length: 10, value: 3});

索引类型
在实际开发中，我们经常能遇到这样的场景，在对象中获取一些属性的值，然后建立对应的集合。
let person = {
    name: 'musion',
    age: 35
}

function getValues(person: any, keys: string[]) {
    return keys.map(key => person[key])
}

console.log(getValues(person, ['name', 'age'])) // ['musion', 35]
console.log(getValues(person, ['gender'])) // [undefined]

在上述例子中，可以看到getValues(persion, ['gender'])打印出来的是[undefined]，但是ts编译器并没有给出报错信息，那么如何使用ts对这种模式进行类型约束呢？这里就要用到了索引类型,改造一下getValues函数，通过 索引类型查询和 索引访问 操作符：
function getValues<T, K extends keyof T>(person: T, keys: K[]): T[K][] {
  return keys.map(key => person[key]);
}

interface Person {
    name: string;
    age: number;
}

const person: Person = {
    name: 'musion',
    age: 35
}

getValues(person, ['name']) // ['musion']
getValues(person, ['gender']) // 报错：
// Argument of Type '"gender"[]' is not assignable to parameter of type '("name" | "age")[]'.
// Type "gender" is not assignable to type "name" | "age".


编译器会检查传入的值是否是Person的一部分。通过下面的概念来理解上面的代码：
T[K]表示对象T的属性K所表示的类型，在上述例子中，T[K][] 表示变量T取属性K的值的数组

// 通过[]索引类型访问操作符, 我们就能得到某个索引的类型
class Person {
    name:string;
    age:number;
 }
 type MyType = Person['name'];  //Person中name的类型为string type MyType = string


介绍完概念之后，应该就可以理解上面的代码了。首先看泛型，这里有T和K两种类型，根据类型推断，第一个参数person就是person，类型会被推断为Person。而第二个数组参数的类型推断（K extends keyof T），keyof关键字可以获取T，也就是Person的所有属性名，即['name', 'age']。而extends关键字让泛型K继承了Person的所有属性名，即['name', 'age']。这三个特性组合保证了代码的动态性和准确性，也让代码提示变得更加丰富了
getValues(person, ['gender']) // 报错：
// Argument of Type '"gender"[]' is not assignable to parameter of type '("name" | "age")[]'.
// Type "gender" is not assignable to type "name" | "age".

映射类型

根据旧的类型创建出新的类型, 我们称之为映射类型

比如我们定义一个接口
interface TestInterface{
    name:string,
    age:number
}

我们把上面定义的接口里面的属性全部变成可选
// 我们可以通过+/-来指定添加还是删除

type OptionalTestInterface<T> = {
  [p in keyof T]+?:T[p]
}

type newTestInterface = OptionalTestInterface<TestInterface>
// type newTestInterface = {
//    name?:string,
//    age?:number
// }

比如我们再加上只读

type OptionalTestInterface<T> = {
 +readonly [p in keyof T]+?:T[p]
}

type newTestInterface = OptionalTestInterface<TestInterface>
// type newTestInterface = {
//   readonly name?:string,
//   readonly age?:number
// }

由于生成只读属性和可选属性比较常用, 所以TS内部已经给我们提供了现成的实现 Readonly / Partial,会面内置的工具类型会介绍.
内置的工具类型
Partial

Partial<T> 将类型的属性变成可选

定义
type Partial<T> = {
  [P in keyof T]?: T[P];
};

在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值的类。中间的 ? 号，用于将所有属性变为可选。
举例说明
interface UserInfo {
    id: string;
    name: string;
}
// error：Property 'id' is missing in type '{ name: string; }' but required in type 'UserInfo'
const xiaoming: UserInfo = {
    name: 'xiaoming'
}

使用  Partial<T>
type NewUserInfo = Partial<UserInfo>;
const xiaoming: NewUserInfo = {
    name: 'xiaoming'
}

这个  NewUserInfo 就相当于
interface NewUserInfo {
    id?: string;
    name?: string;
}

但是 Partial<T> 有个局限性，就是只支持处理第一层的属性，如果我的接口定义是这样的
interface UserInfo {
    id: string;
    name: string;
    fruits: {
        appleNumber: number;
        orangeNumber: number;
    }
}

type NewUserInfo = Partial<UserInfo>;

// Property 'appleNumber' is missing in type '{ orangeNumber: number; }' but required in type '{ appleNumber: number; orangeNumber: number; }'.
const xiaoming: NewUserInfo = {
    name: 'xiaoming',
    fruits: {
        orangeNumber: 1,
    }
}

可以看到，第二层以后就不会处理了，如果要处理多层，就可以自己实现
DeepPartial
type DeepPartial<T> = {
     // 如果是 object，则递归类型
    [U in keyof T]?: T[U] extends object
      ? DeepPartial<T[U]>
      : T[U]
};

type PartialedWindow = DeepPartial<T>; // 现在T上所有属性都变成了可选啦

Required

Required将类型的属性变成必选

定义
type Required<T> = { 
    [P in keyof T]-?: T[P] 
};

其中 -? 是代表移除 ? 这个 modifier 的标识。再拓展一下，除了可以应用于 ? 这个 modifiers ，还有应用在 readonly ，比如 Readonly<T> 这个类型
type Readonly<T> = {
    readonly [p in keyof T]: T[p];
}

Readonly

Readonly<T> 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

定义
type Readonly<T> = {
 readonly [P in keyof T]: T[P];
};

举例说明
interface Todo {
 title: string;
}

const todo: Readonly<Todo> = {
 title: "Delete inactive users"
};

todo.title = "Hello"; // Error: cannot reassign a readonly property

Pick

Pick 从某个类型中挑出一些属性出来

定义
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

举例说明
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

可以看到 NewUserInfo 中就只有个 name 的属性了。
Record

Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。

定义
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

举例说明
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};

ReturnType

用来得到一个函数的返回值类型

定义
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;

infer在这里用于提取函数类型的返回值类型。ReturnType<T> 只是将 infer R 从参数位置移动到返回值位置，因此此时 R 即是表示待推断的返回值类型。
举例说明
type Func = (value: number) => string;
const foo: ReturnType<Func> = "1";

ReturnType获取到 Func 的返回值类型为 string，所以，foo 也就只能被赋值为字符串了。
Exclude

Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。

定义
type Exclude<T, U> = T extends U ? never : T;

如果 T 能赋值给 U 类型的话，那么就会返回 never 类型，否则返回 T 类型。最终实现的效果就是将 T 中某些属于 U 的类型移除掉。
举例说明
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number

Extract

Extract<T, U> 的作用是从 T 中提取出 U。

定义
type Extract<T, U> = T extends U ? T : never;

举例说明
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () =>void

Omit

Omit<T, K extends keyof any> 的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。

定义
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

举例说明
interface Todo {
  title: string;
  description: string;
  completed: boolean;


type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

NonNullable

NonNullable<T> 的作用是用来过滤类型中的 null 及 undefined 类型。

定义
type NonNullable<T> = T extendsnull | undefined ? never : T;

举例说明
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]

Parameters

Parameters<T> 的作用是用于获得函数的参数类型组成的元组类型。

定义
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any
? P : never;

举例说明
type A = Parameters<() =>void>; // []
type B = Parameters<typeofArray.isArray>; // [any]
type C = Parameters<typeofparseInt>; // [string, (number | undefined)?]
type D = Parameters<typeofMath.max>; // number[]

```
