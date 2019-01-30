//第十一章 Symbol
//ES6引入的一种新的原始数据类型，表示独一无二的值，为了防止对象的属性名冲突
//JS七大数据类型：Undefined,Null,Boolean,Number,String,Object,Symbol(前五种为基本数据类型)
let s = Symbol(); //不能使用new命令
let s2 = Symbol('s2'); //可以传入一个描述符作为参数，用作转化为字符串时区分不同symbol
console.log(typeof s); //symbol
console.log(s,s2);  //Symbol() Symbol(s2)
console.log(Symbol('a') === Symbol('a'));
                                        //false(相同描述符的symbol也是不一样的)
//Sumbol作为属性名时，必须放在方括号之内
let o = {
    [s]: 'a'
};
console.log(o[s]);  //a
console.log(o.s); //undefined (symbol属性名不能放在.号后面，会被识别成字符串)

//Symbol.for(key):如果已经登记了以key为描述符的symbol，则返回该symbol，否则新建一个symbol返回
let s3 = Symbol.for('s2');
console.log(s3 === s2);  //false
let s4 = Symbol.for('s2');
console.log(s3 === s4);  //true （只有以Symbol.for(key)的方式创建的symbol才会被登记，且是全局的
                        // Symbol()方式创建的不会被登记,）

//Symbol.keyFor(symbol):返回已经被登记的symbol的key
console.log(Symbol.keyFor(s3));//s2
console.log(Symbol.keyFor(s2));//undefined







