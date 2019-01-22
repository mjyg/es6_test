//闭包：闭包是指有权访问另一个作用域的变量的函数，常见方式是在一个函数内部创建另一个函数

function f() {
    let re = [];
    for (var i = 0; i < 10; i ++){
        re[i] = function () {
            return i;
        }
    }
    return re;
}
console.log(f()[1]()); //10 (var声明的变量是全局变量，即所有的re里存的函数里的都是同一个变量i)

//解决办法1：使用let
function f2() {
    let re = [];
    for (let i = 0; i < 10; i ++){
        re[i] = function () {
            return i;
        }
    }
    return re;
}
console.log(f2()[1]());//1 (let声明的变量不存在全局提升，是局部变量)

//解决办法2：使用立即执行函数（未解决）
function f3() {
    let re = [];
    for (var i = 0; i < 10; i ++){
        re[i] = function () {   //相当于re[i] = i
          return i;
        }();
    }
    return re;
}
console.log(f3()[1]);  //1
// re里存的是返回的i值，不是函数

//解决办法3：使用立即执行函数里再返回一个函数（未解决）
function f4() {
    let re = [];
    for (var i = 0; i < 10; i ++){
        re[i] = function () {
            return function () {
                return i;
            }
        }();
    }
    return re;
}
console.log(f4()[1]()); //10 (和题设情况一样，返回的函数里引用的是全局变量i)

//解决办法4：使用立即执行函数里再返回一个函数,想办法使返回的函数里使用的i变成局部变量
function f5() {
    let re = [];
    for (var i = 0; i < 10; i ++){
        re[i] = function (num) {
            return function () {
                return num;
            }
        }(i);
    }
    return re;
}
console.log(f5()[1]()); //1
//在立即执行函数中传入把i作为参数传递，因为函数参数是按值传递的，所以在re保存的函数里每个num都是局部变量


//关于this对象：匿名函数的指向具有全局性，this通常指向window
//练习1：
var name = 'window';
var obj = {
    name: 'obj',
    getName: function () {
        console.log(this.name);
    },
};
obj.getName(); //obj
let a = obj.getName;  //把a指向函数地址
a(); //window  （相当于在全局环境下调用）
(obj.getName = obj.getName)(); //window
console.log(this.name); // window

//练习2:
var obj2 = {
    name: 'obj',
    getName: function (){
        return function () {
            console.log(this.name);
        }
    },
};
obj2.getName()(); //window(在全局环境下执行匿名函数)

//练习3:
var obj3 = {
    name: 'obj',
    getName: function (){
        let that = this;
        return function () {
            console.log(that.name);
        }
    },
};
obj3.getName()(); //obj(在全局环境下执行匿名函数，但匿名函数引用的that是外部函数的this（obj3）)


//私有变量：任何定义在函数内部的变量，都不能在函数的外部访问，称为私有变量，包括函数的参数、局部变量和函数
//         内部定义的其他函数
//私有作用域（块级作用域）：包含在立即执行函数里的代码块可以看成是私有作用域，外部无法访问到
//特权方法:有权访问私有变量和私有函数的公有方法

//创建特权方法的方式：
//1.在构造函数中定义特权方法：
function Obj(name) {
    let privateValue = 8;
    let privateFunction = function () {
        console.log('private function');
    };
    this.publicFunction = function () {
      privateValue ++;
      console.log(privateValue);
      privateFunction();
    };
    this.setName = function (value) {
        name = value;
    };
    this.getName = function () {
        return name;
    };
}

let o = new Obj('Lily');
o.publicFunction(); //9 private function (可以访问构造函数里的私有变量和私有方法)
o.setName('Ann');
console.log(o.getName());//Ann (可以定义不能被直接修改的数据，只有通过getName和setName方法修改name)

let oo = new Obj('John'); //9 private function  (各个实例的私有变量互不影响)
oo.publicFunction();
console.log(oo.getName());//John
//缺点：每次实例化一个对象都会重新创建特权方法

//2.在私有作用域中定义特权方法：
(function () {
    let privateValue = 8;
    let privateFunction = function () {
        console.log('private function');
    };
    let name = '';
    Obj2 = function (value) {  //初始化未经声明的变量，是全局变量，在私有作用域外也能访问到
        name = value;
    };
    Obj2.prototype.publicFunction = function () { //把特权方法定义在对象原型上，才能让外部实例化
        privateValue ++;                          //的对象使用
        console.log(privateValue);
        privateFunction();
    };
    Obj2.prototype.getName = function () {
         return name;
    };
    Obj2.prototype.setName = function (value) {
        name = value;
    }
})();

let o2 = new Obj2('Lily');
o2.publicFunction(); //9 private function (可以访问构造函数里的私有变量和私有方法)

let o3 = new Obj2('Ann');
console.log(o2.getName()); //Ann (o2的name也变了)
o3.publicFunction();  //10 private function

//缺点:每个实例都能共享特权方法，但是私有变量变成了所有实例所共享的静态私有变量，所以每个实例都没有自己的
//私有变量


//3.模块模式：为单例创建私有变量和特权方法
//单例：只有一个实例的对象
let o4 = function () {
    let privateValue = 8;
    let privateFunction = function () {
        console.log('private function');
    };
    let name = '';
    return {
        publicFunction: function () { //特权方法
            privateValue ++;
            console.log(privateValue);
            privateFunction();
        },
        getName: function() {
            return name;
        },
        setName: function(value) {
            name = value;
        }
    }
}();

o4.publicFunction();  //9 private function (可以访问o4的私有变量和私有方法)
o4.setName('Bob');
console.log(o4.getName());//Bob(可以定义不能被直接修改的数据，只有通过getName和setName方法修改name)
console.log(o4.__proto__); //{}

//缺点：创建的单例都是Object的实例，无法指定对象类型


//4.增强的模块模式：可以为单例指定特定类型
let o5 = function () {
    let privateValue = 8;
    let privateFunction = function () {
        console.log('private function');
    };
    let name = '';

    let o = new Array();  //为单例指定特定类型
    o.publicFunction =  function () { //特权方法
        privateValue ++;
        console.log(privateValue);
        privateFunction();
    };
    o.getName = function (){
        return name;
    };
    o.setName = function(value) {
      name = value;
    };
    return o;
}();

o5.publicFunction();  //9 private function (可以访问o5的私有变量和私有方法)
o5.setName('Bob');
console.log(o5.getName());//Bob(可以定义不能被直接修改的数据，只有通过getName和setName方法修改name)
console.log(o5.__proto__); //[]



