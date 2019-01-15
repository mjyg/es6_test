/**
 * Created by z18630 on 2018/12/27 0011.
 */

//第九章 对象的扩展

//属性的简洁表示法
let b = 2;
let obj = {
  'a':1,
  b,
  let () {   //自动识别let为字符串，而不是关键字
    console.log('11111');
  },
  ['c'+'2']: 3,   //可以把属性名表达式放在方括号内
  'ss': function () {
    return null;
  },
  get zz() {
  },
};
console.log(obj);
// { a: 1,
//   b: 2,
//   let: [Function: let],
//   c2: 3,
//   ss: [Function: ss],
//   zz: [Getter] }


//方法的name属性
console.log(obj.ss.name);  // 对象方法也是函数，也可调用name属性  //ss

//函数的内置对象arguments：伪数组，有length属性，可以通过下标访问参数，无数组其他方法
function f1(a,b,c) {
  console.log(arguments,arguments.length);
  console.log(typeof arguments);
  console.log(Array.isArray(arguments));   //判断是否是数组
  let arr = Array.prototype.slice.call(arguments); //将arguments对象转化为一个真正的数组(可以传入第二个参数，表示截取数组的起始位置)
  console.log(arr, typeof arr, Array.isArray(arr));
}
f1(1,2,3);
//[Arguments] { '0': 1, '1': 2, '2': 3 } 3
// object
// false
// [ 1, 2, 3 ] 'object' true

//使用arguments对象模拟函数重载
function f2() {
  switch (arguments.length){
    case 0:
      console.log(0);
      break;
    case 1:
      console.log(1);
      break;
    case 2:
      console.log(2);
      break;
  }
}
f2(1,2);  //2

//Array.prototype.slice.call():能将具有length属性且key值为数字的对象转化为数组，数组元素的顺序有key值决定，长度由length决定
let o = {0:0,1:1,2:2,length:2};
console.log(Array.prototype.slice.call(o));  //[ 0, 1 ]
let o1 = {'a':0,1:1,2:2,length:4};
let o2 = {3:0,1:1,2:2,length:4};
console.log(Array.prototype.slice.call(o1));  //[ <1 empty item>, 1, 2, <1 empty item> ]
console.log(Array.prototype.slice.call(o2));  //[ <1 empty item>, 1, 2, 0 ]
console.log([].slice.call(o2));   //可以用数组实例[]来代替Array.prototype(数组的原型对象)
                    //[ <1 empty item>, 1, 2, 0 ]
console.log('--------------');

//原型对象prototype
//给原型对象增加属性和函数，就是给对象增加公有属性和函数
Array.prototype.name = 'new attr';
Array.prototype.add = function () {
  let sum = 0;
  console.log('add this:', this);  // 获取当前上下文
  this.forEach(val => {
    sum += val;
  });
  return sum;
};
Array.prototype.shuffle = function() {  //打乱数组
  let len = this.length;
  while(len --) {
    let key = Math.floor(Math.random()*len);//Math.random():返回0到1之间的随机数，不包括0和1
    let temp = this[key];
    this[key] = this[len];
    this[len] = temp;
  }
};
let a = [1,2,3,4];
console.log(a.name, a.add());  //add this: [ 1, 2, 3, 4 ]  new attr 10
a.shuffle();
console.log(a);  //[ 3, 1, 4, 2 ]
//实现原型继承
function ff1() {
  
}
function ff2() {
  
}
ff2.prototype.name = 'ff2"s name';
ff2.prototype.get = function(value){
  console.log('this:', this);
  return value;
};
ff2.prototype.get();  //this: ff2 { name: 'ff2"s name', get: [Function] }
let ob2 = new ff2();
console.log(ob2);  //ff2 {}
console.log('++++++++++++++++++++++++++++++++++++++++');
ff1.prototype = ob2; //给ff1的原型对象赋值，相当于ff1继承了ob2所有的属性和方法（写成ff1.prototype是一样的效果,表示显示赋值）
console.log(ff1.prototype.get('ff1 name'), ff1.prototype.name);
//this: ff2 {}
// ff1 name ff2"s name
console.log('------------');
let ob1 = new ff1();
console.log(ob1.get('ob1 name'), ob1.name);
//this: ff2 {}
// ob1 name ff2"s name

console.log(ob1.valueOf());  //ff2 {}

let Animal = function (name) {   //同时产生了Animal函数对象和Animal原型对象
  this.name = name;
};
Animal.prototype.getAnimal = function () {
  console.log('this:', this);
  return this.name;
};
Animal.getAnimal2 = function () {
  console.log('this2:', this);
  return this.name;
};
let dog = new Animal('dog');
let cat = new Animal('cat');
console.log(dog.valueOf());  // Animal { name: 'dog' }

//apply(),call():call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是
// 为了改变函数体内部 this 的指向。
// JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的
// 概念。
function fruit(){
}
fruit.prototype = {
  color: 'red',
  say: function (a1='first',a2='two') {
    console.log('my color is', this.color, a1,a2);
  }
};
let apple = new fruit();
apple.say();  //my color is red first two

banana = {color: 'yellow'};
apple.say.call(banana);  //不想对banana重新定义 say 方法，那么我们可以通过 call 或 apply 用 apple
                        // 的 say 方法：
                        //my color is yellow first two
apple.say.apply(banana);  //my color is yellow first two
//可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法（本栗子中banana没
// 有say方法），但是其他的有（本栗子
// 中apple有say方法），我们可以借助call或apply用其它对象的方法来操作。

//不同之处：第一个参数你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)，
// call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。
apple.say.call(banana, 'apple1', 'apple2');  //my color is yellow apple1 apple2
apple.say.apply(banana, ['apple1', 'apple2']);  //my color is yellow apple1 apple2

//应用：
//数组之间追加
let as = [1,2,3];
let as2 = [1,2,3];
([].push.apply(as,[2,3,4]));  //push是定义在数组实例上的方法
Array.prototype.push.apply(as2,[2,3,4]);
console.log(as,as2);  //[ 1, 2, 3, 2, 3, 4 ] [ 1, 2, 3, 2, 3, 4 ]
//获取数组的最大值最小值
console.log(Math.max.call(Math,2,3,6,3));  //Math是对象，不像Array,String,Date那样是对
                                                    // 象的类，没有构造函数Math()  //6
console.log(Math.max.apply(Math,[2,3,6,3]));  //6
//定义一个log方法，代理console.log
function log() {
  console.log.apply(console, arguments);
}
log(1,2,3);  //1 2 3
//在打印前加'(app)'
function log2() {
  let arr = Array.prototype.slice.call(arguments);
  arr.unshift('(app)');
  console.log.apply(console, arr);
}
log2(1,2,3);  //(app) 1 2 3

//bind():bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入
// bind()方法的第一个参数作为 this，
// 传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函
// 数。
let bar = function () {
  console.log(this.x);
};
let foo = {
  x: 3,
};
bar();  //undefined
let v = bar.bind(foo);
console.log(v); //bind方法返回一个函数 //[Function: bound bar]
bar.bind(foo)();  //3
//调用多次bind
let boo = {x:5};
bar.bind(foo).bind(boo)();  //只有第一次调用bind生效  //3

//总结：
//当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即
// 执行函数。
// apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
// apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文（函数的每次调用都会拥
// 有一个特殊值——本次调用的上下文
// （context）——这就是this关键字的值。）；
// apply 、 call 、bind 三者都可以利用后续参数传参；
// bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

//例1：
function class1(){
  this.name=function(){
    console.log("我是class1内的方法");
  }
}
function class2(){
  console.log('class2 before:', this);
  class1.call(this);  //此行代码执行后，当前的this指向了class2（也可以说class2继承了class1）
  console.log('class2 after:', this);
}

var f=new class2();
f.name();   //调用的是class1内的方法，将class1的name方法交给class2使用
//class2 before: class2 {}
//class2 after: class2 { name: [Function] }
//我是class1内的方法

//例2：
function eat(x,y){
  console.log(x+y);
}
function drink(x,y){
  console.log(x-y);
}
eat.call(drink,3,2);// 当前函数的上下文变成drink,调用的是eat()(js 中的函数其实是对象，函数名是对
                    // Function 对象的引用)。  //5

//例3
function Animal2(){
  this.name="animal";
  this.showName=function(){
    console.log(this.name);
  }
}
function Dog2(){
  this.name="dog";
}
var animal=new Animal2();
var dog2=new Dog2();

animal.showName.call(dog2); //当前函数的上下文变成dog，即animal.showName里的this是dog  //dog

//例4：继承
function Animal3(name){
  this.name=name;
  this.showName=function(){
    console.log(this.name);
  }
}
function Dog3(name){
  Animal3.call(this,name); //把Dog对象传入Animal中，也就是Animal里的this都变成Dog,那么Dog就能直接
    // 调用Animal的所有属性和方法。
}
var dog3=new Dog3("Crazy dog");
dog3.showName();  //Crazy dog

//方法的 name 属性
console.log(animal.showName.bind(dog2).name);  //bound
console.log(bar.bind(foo).name);  //bind方法创造的函数，name属性返回bound加上原函数的名字
                                    //bound bar
let ad = new Function();
console.log(ad.name);  //Function构造函数创造的函数，name属性返回anonymous。  //anonymous
console.log('------------------');

//属性的可枚举性和遍历
let dd = {
  name: 'aa',
  age: 3,
};
Object.prototype.greed = 4;
console.log(Object.keys(dd));  //返回对象自身的所有可枚举的属性的键名。  //[ 'name', 'age' ]
for (key in Object.prototype) {  //只遍历对象自身的和继承的可枚举的属性。
  console.log(key);  //greed
}
 //Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
console.log(Object.getOwnPropertyDescriptor(dd, 'name'));
// { value: 'aa',
//   writable: true,
//   enumerable: true,
//   configurable: true }

Object.getOwnPropertyDescriptor(dd, 'age').enumerable = false;   //更改无效
console.log(Object.getOwnPropertyDescriptor(dd, 'age'));
//{ value: 3, writable: true, enumerable: true, configurable: true }
console.log(JSON.stringify(dd));  //只串行化对象自身的可枚举的属性。
//{"name":"aa","age":3}
console.log(Object.assign(dd));  //只拷贝对象自身的可枚举的属性。
//{ name: 'aa', age: 3 }
//以上四个循环会忽略enumerable为false的属性，toString和length属性的enumerable都是false，因此不会遍
// 历到这两个继承自原型的属性
//只有for...in...可遍历到继承的可枚举属性，所以，尽量不要用for...in循环，而用Object.keys()代替。

// ES6 一共有 5 种方法可以遍历对象的属性。
//
// （1）for...in
//
// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
//
// （2）Object.keys(obj)
//
// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
//
// （3）Object.getOwnPropertyNames(obj)
//
// Object.getOwnPropertyNames返回一个数组，包含对象自身的(不含继承的)所有属性（不含 Symbol 属性，但
// 是包括不可枚举属性）的键名。
//
// （4）Object.getOwnPropertySymbols(obj)
//
// Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
//
// （5）Reflect.ownKeys(obj)
//
// Reflect.ownKeys返回一个数组，包含对象自身的(不含继承的)所有键名，不管键名是 Symbol 或字符串，也不
// 管是否可枚举。
//
// 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
//
// 首先遍历所有数值键，按照数值升序排列。
// 其次遍历所有字符串键，按照加入时间升序排列。
// 最后遍历所有 Symbol 键，按照加入时间升序排列。
console.log(Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 }));
//[ '2', '10', 'b', 'a', Symbol() ]
console.log('Reflect.ownKeys',Reflect.ownKeys({}));  //Reflect.ownKeys []

//super关键字
//this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
const proto = {
  foo: 'hello',
};
const obja = {
  foo: 'word',
  act() {
    console.log(super.foo); //引用了原型对象proto的foo属性。(super关键字表示原型对象时，只能用在对
      // 象方法的简写法之中，用在其他地方
                            // 都会报错。)
  },
};
Object.setPrototypeOf(obja, proto);
obja.act();  //hello
console.log('------------');

const proto2 = {
  foo: 'hello',
  act() {
    console.log(this.foo);
  }
};
const obja2 = {
  foo: 'word',
  act() {
    super.act(); //super.act指向原型对象proto的act方法，但是绑定的this却还是当前对象obja2
  },
};
Object.setPrototypeOf(obja2, proto2);
obja2.act(); //word

//对象的扩展运算符
//解构赋值：解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝
// 的是这个值的引用，而不是这个值的副本。
let op = {a:{b:1}};
let{...x1} = op;
op.a.b = 2;
console.log(x1.a.b);  //2

const o3 = Object.create({ x: 1, y: 2 });
o3.z = 3;

let { x, ...newObj } = o3;  //扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式，
let { y, z } = newObj;
console.log(x,y,z);//变量x是单纯的解构赋值，所以可以读取对象o继承的属性;扩展运算符的解构赋值，不能复
                   // 制继承自原型对象的属性。  //1 undefined 3

console.log({...'hello'});  //{ '0': 'h', '1': 'e', '2': 'l', '3': 'l', '4': 'o' }
console.log({...'ni', ...'hao'});   //{ '0': 'h', '1': 'a', '2': 'o' }
