//第十六章 Iterator 和 for...of 循环
//JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。
//任何数据结构只要部署 Iterator 接口，就可以完成遍历操作,一种数据结构只要部署了 Iterator 接口，我们就
// 称这种数据结构是“可遍历的”

//原生具备 Iterator 接口的数据结构如下:Array、Map、Set、String、TypedArray、 函数的 arguments 对象、
// NodeList 对象
//一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器
// 生成方法（原型链上的对象具有该方法也可）。
let arr = ['a', 'b', 'c'];
let ite = arr[Symbol.iterator]();
console.log(ite.next());  //{ value: 'a', done: false }

//一个类似数组的对象调用数组的Symbol.iterator方法
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}