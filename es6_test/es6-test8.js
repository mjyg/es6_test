//第八章 数组的扩展

//扩展运算符：...,rest参数的逆运算，将数组转化为单个元素序列（...后的变量代表一个数组）
console.log(...[1,2,3]);  //1 2 3
function f1(array,...items) {
    array.push(...items);  //将一个数组添加到另一个数组的尾部
    console.log(array);
}
f1([1],3,4,5);  //[ 1, 3, 4, 5 ]

//克隆数组
let a1 = [1,2,3];
let a2 = a1; //a2并不是a1的克隆，而是指向同一份数据的另一个指针。修改a1，会直接导致a2的变化。
let a3 = [...a1];  //a3是原数组的克隆，再修改a1就不会对a3产生影响。
let [...a4] = a1;  //另一种写法
a1[0] = 2;
console.log(a2,a3,a4);  //[ 2, 2, 3 ] [ 1, 2, 3 ] [ 1, 2, 3 ]

//合并数组
console.log([...a1,...a2,...a3]); //浅拷贝  //[ 2, 2, 3, 2, 2, 3, 1, 2, 3 ]

//将字符串转为真正的数组
console.log([...'hello']);  //[ 'h', 'e', 'l', 'l', 'o' ]

//JavaScript 会将四个字节的 Unicode 字符，识别为 2 个字符，采用扩展运算符就没有这个问题。
let str = 'x\uD83D\uDE80y';
console.log(str.split('').reverse().join('')); // 'y\uDE80\uD83Dx'
console.log([...str].reverse().join(''));// 'y\uD83D\uDE80x'
console.log(str.length);  //4
console.log([...str].length);//3

//扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算
// 符，比如 Map,Set,Generator函数
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};
console.log([...go()]);  //[ 1, 2, 3 ]

//Array.from():用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）
// 的对象
console.log(Array.from([1, 2, 3], (x) => x * x));  //[ 1, 4, 9 ]

//Array.of():将一组值，转换为数组。
console.log(Array.of(3) );  //[ 3 ]
console.log(Array(3));//只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。
                                    // 参数个数只有一个时，实际上是指定数组的长度。
                                    //[ <3 empty items> ]

//数组实例的copyWithin(target, start = 0, end = this.length ):在当前数组内部，将指定位置的成员复制
// 到其他位置（会覆盖原有成员），然后返回当前数组。
// 它接受三个参数:
// target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
// start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
// end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数
let s = [1,2,3,4,5];
console.log(s.copyWithin(0, 4));  //[ 5, 2, 3, 4, 5 ]
console.log(s.copyWithin(1, -3, -2));  //[ 5, 2, 3, 4, 5 ]

//数组实例的 find() 和 findIndex() :用于找出第一个符合条件的数组成员，参数是一个回调函数
let t = [1,4,-5,50];
console.log(t.find(n => {  //-5
    return n < 0;
}));

//find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
//find方法可以接受第二个参数，用来绑定回调函数的this对象(回调函数不能用箭头函数)
let person = {name: 'John', age: 20};
console.log(t.find(function(value, index, arr){
    return value > this.age;
}, person));  //50

//findIndex()和find()类似：找到时返回数组下标，找不到返回-1，find()找不到返回undefined

//数组实例的 fill():使用给定值，填充一个数组。
console.log([1,2,3].fill(2));  //[ 2, 2, 2 ]

//用于空数组初始化
console.log(new Array(4).fill(0));  //[ 0, 0, 0, 0 ]

//还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
console.log(['a', 'b', 'c'].fill(7, 1, 2));  //[ 'a', 7, 'c' ]

//如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
let arr1 = new Array(3).fill({name: "Mike"});
arr1[0].name = "Ben";
console.log(arr1);  //[ { name: 'Ben' }, { name: 'Ben' }, { name: 'Ben' } ]


let arr2 = new Array(3).fill([]);
arr2[0].push(5);
console.log(arr2);  //[ [ 5 ], [ 5 ], [ 5 ] ]

let arr3 = arr2.map(value => {
    return [... value];  //克隆数组
});
arr3[0].push(9);
console.log(arr3);  //[ [ 5, 9 ], [ 5 ], [ 5 ] ]

//数组实例的 entries()，keys() 和 values() ：用for...of循环进行遍历，keys()是对键名的遍历、
// values()是对键值的遍历，
// entries()是对键值对的遍历。
for (let index of ['a', 'b'].keys()) {
  console.log(index);  //0 1
}

for (let elem of ['a', 'b'].values()) {
  console.log(elem); //a b
}

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);  //0 'a'  1 'b'
}

//如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
let le = ['c','d'];
let en = le.entries();
console.log(en.next());  //{ value: [ 0, 'c' ], done: false }
console.log(en.next());  //{ value: [ 1, 'd' ], done: false }
console.log(en.next());  //{ value: undefined, done: true }

//数组实例的 includes():返回一个布尔值，表示某个数组是否包含给定的值.
//可以传入第二个参数，表示搜索的起始位置
console.log([1, 2, 3].includes(3, 3));  //false
console.log([1, 2, 3].includes(3, -1));  //true

//数组实例的 flat():Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数
// 组，对原数据没有影响。
//可传入一个参数，表示想要拉平的层数，默认为1。
// console.log([1, 2, [3, [4, 5]]].flat(2)); //// [1, 2, 3, 4, 5]

//flatMap():对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组
// 执行flat()方法。
// 该方法返回一个新数组，不改变原数组。flatMap()只能展开一层数组。
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
// [2, 3, 4].flatMap((x) => [x, x * 2]); // [2, 4, 3, 6, 4, 8]

// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
// [1, 2, 3, 4].flatMap(x => [[x * 2]]); // [[2], [4], [6], [8]]

//数组的空位：ES6明确将空位转为undefined。
console.log([...['a',,'b']]);  [ 'a', undefined, 'b' ]
