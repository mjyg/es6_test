//第七章 函数的扩展

// 函数参数的默认值
function f({x, y = 5}) {
    console.log(x,y);
}
f({x:3});  //3 5
f({});  //只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成。  //undefined 5

//通过提供函数参数的默认值，就可以避免这种情况。
function f2({x, y = 5} = {}) {
    console.log(x,y);
}
f2();  //如果没有提供参数，函数foo的参数默认为一个空对象。  //undefined 5

function f1(x = 3, y = 5) {
    console.log(x, y);
}
f1(null, undefined);  //如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
                            //null 5

// 函数的length属性
function f4(a, y = 1) {
}
console.log(f4.length);  //length属性的返回值，等于函数的参数个数减去指定了默认值的参数个数 //1
function f3(a = 0, y) {
}
console.log(f3.length);  //如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
                    // 0

// var x = 1;
function foo(y = throwError(),x) {  // 参数的默认值不是在定义时执行，而是在运行时执行。如果参数已经
                                    // 赋值，默认值中的函数就不会运行。
  // x = 3;
  // y();
  console.log(y);
}

function throwError() {
    throw new  Error('Missing parameter'); //省略参数就抛出错误
}
foo(2);  //2
console.log('2--------------------');


//rest参数:搭配的变量是一个数组，可以出传入任意数目的参数
function f5(array, ...items) {
    items.forEach((item) => {
        array.push(item);
    });
    console.log(array);
}
f5([1],3,4);  //[ 1, 3, 4 ]
//
//严格模式：只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，
//否则会报错。
//两种解决办法：1。设定全局严格模式；2.把函数包含在一个立即执行函数里
let dd = (function () {
    'use strict';
    console.log('outside');
    return function (value = 42) {  //返回匿名函数
        console.log('inside');
        return value;
    };
}());

console.log(dd);  //outside  [Function]
console.log('-------------');
console.log(dd());  //第一次调用只是构建了一个外层函数体对象，只有有后续的调用，才能调用内层函数体，
                    // 并且重复调用，只会重复内层函数体。  //inside 42
console.log('-------------');
// console.log(dd()(33));
console.log('-------------');

function f0(value = 42) {
     console.log('inside');
        return value;
}
let dd2 = (function () {
    'use strict';
    console.log('outside');
    return f0(); //返回已经声明的函数
}());
console.log(dd2); //在一个函数内返回一个已经声明的函数，其实是调用已经声明的函数，跟上面的情况是不一样
                    // 的。
                // outside inside 42
console.log('-------------');

// 声明一个函数表达式
var add = function(x){
	var sum = 1;
	// 在函数表达式内部有一个求和的内部函数
	var tmp = function(x){
		sum = sum + x;// 求和
		return tmp;
	};
	// 构建一个函数体的toString()函数
	tmp.toString = function(){
		return sum;
	};
	return tmp; // 返回的是一个函数体,如果该函数体有toString()方法,则会调用函数体的toString()方法
};

// 以下结果输出为：6
console.log(add(10)(2)(3));
console.log(add(100)(2)(3));
// 下面的结果输出变了(7,8)
console.log(add(1)(3)(3));
console.log(add(1)(2)(5));
console.log('---------------');

//箭头函数:箭头函数没有自己的this，其this指向和它同级的对象
this.id = 21;
console.log(this);  //{ id: 21 }
function foo() {
    console.log(this);
      setTimeout(function f8(){
          console.log(this);
        console.log('id:', this.id);
      }, 100);
      setTimeout(() =>{
          // console.log(this);
        console.log('id:', this.id);
      }, 1000);
}
console.log('------------');
foo.call({ id: 42 });

// let s2 = 4;
// function Timer() {
//   this.s1 = 0;
//   this.s2 = 0;
//   // 箭头函数
//   setInterval(() => this.s1++, 1000);
//   // 普通函数
//   setInterval(function () {
//     this.s2++;
//   }, 1000);
// }
//
// var timer = new Timer();
//
// setTimeout(() => console.log('s1: ', timer.s1), 3100);
// setTimeout(() => console.log('s2: ', timer.s2), 3100);


