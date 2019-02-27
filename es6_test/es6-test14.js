//第十四章 Reflect

//Reflect对象引入目的：
// 1.原本属于Object对象内部方法一些方法放到Reflect上，如Object.defineProperty
// 2.修改某些object对象的返回结果，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出
//   一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
// 3.让Object的命令式操作变成函数行为，如name in obj和delete obj[name]，而Reflect.has(obj, name)
//   和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
//4.Reflect的方法和Proxy的方法一一对应，使用Proxy时可以调用对应的Reflect方法完成默认行为，作为修改行为
//  的基础

//Reflect的静态方法：
//1.get(target, name, receiver):查找并返回target对象的name属性,如果name属性部署了getter,
//  则读取函数的this绑定receiver
let obj = {
  a: 1,
  b: 3,
  get c () {
    return this.a + this.b;
  },
};
let obj2 = {
    a:3,
    b:4,
};
console.log(Reflect.get(obj, 'c'));  //4
console.log(Reflect.get(obj, 'c', obj2)); //7


//2.set(target, name, value, receiver):设置target对象的name属性值为value,如果name属性部署了setter
//  方法，则设置receiver对象的name属性值
let obj3 = {
    a: 2,
    set setA(value) {
        this.a = value;
    }
};
let obj4 = {
    a:3,
};

Reflect.set(obj3, 'setA', 5);
console.log(obj3.a); //5

Reflect.set(obj3, 'setA', 8, obj4);
console.log(obj3.a, obj4.a);//5  8

//3.has(obj,name): 判断obj里是否存在name属性，类似in运算符
console.log(Reflect.has(obj3, 'a'));//true

//4.deleteProperty(obj,name):删除obj里的name属性，类似delete运算符
Reflect.deleteProperty(obj3, 'a');

//5.construct(target, args):不使用new来调用构造函数，等同于 new target(args)
function obj5(name, age) {
    this.name = name;
    this.age = age;
}
let instance = Reflect.construct(obj5, ['Lily', 9]);
console.log(instance);  //obj5 { name: 'Lily', age: 9 }

//6.apply(func,thisArg,args):等同于Function.prototype.apply.call(func, thisArg, args)，用于绑
// 定this对象到thisArg上，执行func(args)
// 一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的
// apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种
// 操作。
const ages = [11, 33, 12, 54, 18, 96];

//旧写法
const minNum = Math.min.apply(Math, ages);
const minString = Object.prototype.toString.call(minNum);
console.log(minNum, minString);//11 '[object Number]'

//新写法
const minNum2 = Reflect.apply(Math.min, Math, ages);
const minString2 = Reflect.apply(Object.prototype.toString, minNum2, []);
console.log(minNum2, minString2);//11 '[object Number]'

//7.ownKeys(obj):返回obj的所有属性,基本等同于Object.getOwnPropertyNames与
// Object.getOwnPropertySymbols之和。
let myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject);// ['foo', 'bar']
Object.getOwnPropertySymbols(myObject);//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject);// ['foo', 'bar', Symbol(baz), Symbol(bing)]


//使用Proxy实现观察者模式
let observeQueue = new Set();
let observe = function (fn) {  //把方法加入观察者队列中
    observeQueue.add(fn);
};
let observable = function (obj) {  //返回一个obj的代理，所有赋值操作都会调用观察者队列里的方法
    return new Proxy(obj, {
        set: function (target, key, value, receiver) {
            let re = Reflect.set(target, key, value, receiver);  //先赋值
            observeQueue.forEach(fn => {  //执行所有的方法
                fn();
            });
            return re;
        }
    })
};

const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';  //李四, 20
