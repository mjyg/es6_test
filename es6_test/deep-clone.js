// 顾名思义，深拷贝就是完完整整的将一个对象从内存中拷贝一份出来。所以无论用什么办法，必然绕不开开辟一块新
// 的内存空间。
// 通常有下面两种方法实现深拷贝：
// 1.迭代递归法
// 2.序列化反序列化法
// 我们会基于一个测试用例对常用的实现方法进行测试并对比优劣：
let _ = require('lodash');
let test = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: {
        name: '我是一个对象',
        id: 1
    },
    arr: [0, 1, 2],
    func: function() {
        console.log('我是一个函数')
    },
    date: new Date(0),
    reg: new RegExp('/我是一个正则/ig'),
    err: new Error('我是一个错误')
};

let result = deepClone4(test);

console.log(result);
for (let key in result) {
    if (isObject(result[key]))
        console.log(`${key}相同吗？ `, result[key] === test[key]);
}

//判断是否是对象
function isObject(obj) {
    return (typeof obj === 'object' ||typeof obj === 'function') && obj !== null;
}

//一.迭代递归法：就是对对象进行迭代操作，对它的每个值进行递归深拷贝。
//1.for...of...
function deepClone(obj) {
    if (!isObject(obj)) {
        throwError('不是一个对象');
    }
    let re = Array.isArray(obj) ? [] : {};
    for (const key of Object.keys(obj)) {
        re[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
    }
    return re;
} //arr 和 obj 都深拷贝成功了，它们的内存引用已经不同了，但 func、date、reg 和 err 并没有复制成功，
// 因为它们有特殊的构造函数。

//2.Reflect.ownKeys()
function deepClone2(obj) {
    if (!isObject(obj)) {
        throwError('不是一个对象');
    }
    let re = Array.isArray(obj) ? [] : {};
    Reflect.ownKeys(obj).forEach(key => {
        re[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
    });
    return re;
} //结果和前者一样

//3.lodash中的深拷贝
function deepClone3(obj) {
    return _.cloneDeep(obj);
} //arr、obj、date、reg深拷贝成功了，但 func 和 err 内存引用仍然不变。

//二.序列化反序列化法:它先把代码序列化成数据，再反序列化回对象
function  deepClone4(obj) {
    return JSON.parse(JSON.stringify(obj));
}//它也只能深拷贝对象和数组，对于其他种类的对象，会失真。这种方法比较适合平常开发中使用，因为通常不需要考
// 虑对象和数组之外的类型。