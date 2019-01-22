//暂时性死区（TDZ）
let a = [];
for (var i = 0; i < 3;i ++) {
  //TDZ开始
  // i = 0;  //let声明i后，该代码块形成暂时性死区，声明之前使用都会报错
  // console.log(i); //TDZ结束
  let i = 'abc';
  console.log(i);
} //abc abc abc


//不能重复声明
function aaa(i) {
  {
    let i;
  }
}

//块级作用域
console.log('--------------------');
let temp = new Date();
function f() {
  console.log(temp);
  if(true) {
    let temp = 'hello';
  }
  console.log(temp);
}
f(); //2019-01-14T11:03:28.494Z 2019-01-14T11:03:28.494Z

//JS编译和执行顺序
console.log('------------------');
d(); //使用‘函数语句’的方式定义函数可以‘先使用，后定义’
function d() {
  console.log('aaaaaaaa')};
console.log('aaaaaaaa');

console.log('------------------');
// console.log(t())  //使用表达式定义的函数只能‘先定义，后使用’
                    // (预编译的时候，声明了变量t=undifined,执行到t()时，还不是函数 所以报错)
var t = function d() {
  console.log('aaaaaaaa');
};
console.log('aaaaaaaa');
console.log('------------------');

//块级作用域与函数声明(js作用域分为全局作用域、函数作用域和块级作用域)
function r() {
  console.log('outside');
}
(function () {
  console.log(r);
  if (true){
     function r() {   //对支持ES6的环境中函数声明会提升到函数作用域或块级作用域的头部(和var一样)
      console.log('inside');
    }
  }
  console.log(r);
  r();
})();
console.log('------------------');

//冻结对象
const foo = {b:{}};
Object.freeze(foo); //浅冻结
foo.a = 'a';  //静默失败
foo.b.c = 'c'; // 成功
console.log(foo);//{ b: { c: 'c' } }

//深冻结，冻结对象中的对象
const deepFreeze = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
       deepFreeze(obj[key]);
    }
  });
};
const foo2 = {b: {}};
deepFreeze(foo2);
foo2.a = 'a';  //静默失败
foo2.b.c = 'c'; // 静默失败
console.log(foo2); //{ b: {} }

console.log('------------------');

//全局变量
// const global = require('system.global')();
// console.log(global);
