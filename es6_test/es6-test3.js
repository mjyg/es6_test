/**
 * Created by z18630 on 2018/12/4 0004.
 */

//第三章 变量的解构赋值

//数组的解构赋值
//解构不成功
let [a,b,...z] = [1];
console.log(a,b,z); //1 undefined []
console.log('----------------');

//不完全解构
let [c] = [[1,2]];
let [d,e] = [1,[2,3]];
let [d1,[e1]] = [1, [2, 3]];
console.log(c, d, e);  //[ 1, 2 ] 1 [ 2, 3 ]
console.log(d1, e1); //1 2
console.log('-----------------');

//指定默认值
let [g, f=2] =[1];
let [g1, f1=2] =[1, undefined]; //严格===undefined,默认值才生效
console.log(g, f, g1, f1); //1 2 1 2

function q(){};
let [x=q()] = [1];
console.log(x); //1

//默认是解构其他变量，但是变量必须先声明
// let[r, y=r] = [1];
let[r=y, y=1] = [1]; // success, 预编译的时候声明了y,但是r可以赋值成1，由于惰性求值，y未被使用
                      //所以不会报错
// let [r = y, y = 1] = []; //error,r用到y时，y还未赋值
console.log(r,y);  //1 1

let[t=h] = [1];//success
// let[t=h] = []; //error:not defined
let h = 2;
// console.log(t); //1
console.log('------------------');

//对象的解构赋值:对象的属性没有次序，变量名需要与属性同名才取到值；数组的元素按次序排列，变量的值由
//它的位置决定
//嵌套赋值
let node = {
  loc:{
    start: {
      line: 1,
      column: 5
    }
  }
};
let { loc:loc1, loc:{start}, loc:{ start: {line}}} = node;
// console.log(loc1, start, line); //{start:{line:1, column:5 }} { line: 1, column: 5 } 1
console.log('------------------');

//指定默认值
let {x3: y3 = 3} = {};
console.log(y3); //3
let {x4: y4 = 5} = {x4: 7};
console.log(y4); //7

//一些错误写法
// let { foo:{ bar } } = {baz: 'baz'} //error: foo对象为undifined,对其再取子属性bar报错
let x7;
// {x7} = {x7:1}; //x7为已经声明的变量，js引擎会把{x7}理解为一个代码块，从而产生语法错误，应避免大
              // 括号在行首
({x7} = {x7: 1});
console.log(x7); //1

//特殊写法
({x9} = {x9:0}); // 用小括号，省略let
({x8} = 9);
({} = 'a'); //不会报错但无意义
console.log(x9, x8); //0 undefined

let {log,sin,cos} = Math;  //将函数赋值到变量
console.log(log,sin,cos);  //[Function: log] [Function: sin] [Function: cos]

let{0:n, 3:m, 5:l=9} = [0,1,2,3];  //数组为特殊的对象，根据下标赋值
console.log(n,m,l);  //0 3 9
({n, m, l} = [0, 1, 2, 3]);
// console.log(n, m, l);  //undefined undefined undefined
console.log('---------------');

//字符串的解构赋值
[n, m, l] = 'hello'; //字符串转化为数组
console.log(n, m, l);  //h e l
let {length} = 'hello'; //对数组的length属性赋值
console.log(length);  //5

//数值和布尔值的解构赋值
let {toString} = true; //等号右边是数值或bool值，会先转化为对象
let {prop} = {};
// let {prop1} = null; //error:null和undifined无法转化为对象，报错
console.log(toString, prop);  //[Function: toString] undefined
console.log('-------------');

//函数参数的解构赋值
let rr = [[1,2],[3,4]].map(([a,b]) => a + b);
console.log(rr);  //[ 3, 7 ]
console.log('-------------');

//使用默认值
function move({x=0,y=0} = {}) {  //参数默认值为{}，变量默认值为{x=0,y=0}
  console.log(x, y);
}
function move2({x,y} = {x:0,y:0}) {  //参数默认值为{x:0,y:0}，变量默认值为{x,y}
  console.log(x,y);
}
move({x:3}); //对实参{x:3}进行解构赋值，不使用参数默认值，x=3,y使用变量默认值0
move2({x:3});//对实参{x:3}进行解构赋值，不使用参数默认值，x=3,y无变量默认值，为undefined
move({}); //对实参{}进行解构赋值，不使用参数默认值，使用变量默认值，均为0
move2({}); //对实参{}进行解构赋值，不使用参数默认值，使用变量默认值，无默认值，均为undefined
move(); //未传实参，使用参数默认值，解构失败，使用变量默认值，均为0(???)
move2();//未传实参，使用参数默认值，均为0
//总结：当调用函数传了实参，变量赋值使用变量默认值，当未传递实参，使用参数默认值

//圆括号问题：只有在赋值语句的非模式部分可以使用圆括号（不能用于声明语句）
[(b)] = [3];
({p:(d)} = {}); //可以用在行首
console.log('----------------');

//用途
//交换变量的值
let s1 = 1;
let s2 = 2;
[s1, s2] = [s2, s1];
console.log(s1, s2);  //2 1

//从函数返回多个值
function test() {
  return {aa1:2, bb1:3};
}
let {aa1, bb1} = test();
console.log(aa1, bb1);  //2 3

//遍历map
let map = new Map();
map.set('a', 1);
for(const [,value] of map) {
  console.log(value); //1
}

//载入模块
// const {SourceMapConsumer, SourceNode} = require('source-map');
// console.log(SourceMapConsumer, SourceNode);

