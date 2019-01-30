//第十二章 Set和Map数据结构

//Set:类似数组，不包含重复的值
const s = new Set('a');  //可以接受一个具有iterable接口的数据结构作为参数
s.add('hello');
console.log(s);  //Set { 'a', 'hello' }

let a = [1,2,3,6,1,2];
console.log([...new Set(a)]);  //[ 1, 2, 3, 6 ]（去除数组重复值）

let b = 'sssaefff';
console.log([...new Set(b)].join('')); //saef(去除字符串重复值)

console.log(new Set([NaN, NaN, {}, {}, +0, -0]));//Set { NaN, {}, {}, 0 }
                                        //Set内部，Nan是相等的，{}是不同的地址, +0和-0是相等的
//Set实例的属性：
console.log(s.constructor);  //[Function: Set]
console.log(s.size);  //2

//Set操作数据的方法：
console.log(s.add([1,2]));//Set { 'a', 'hello', [ 1, 2 ] }
console.log(s.delete('a'));  //true(返回删除是否成功)
console.log(s.delete('a'));  //false
console.log(s.has('hello'));  //true (是否包含某个成员)
console.log(Array.from(s));//[ 'hello', [ 1, 2 ] ]  （把Set转化为数组）
s.clear();  //清空Set
console.log(s); //Set {}


//Set遍历数据方法：
let set = new Set(['red', 'green', 'blue']);
console.log(typeof set.keys()); //[Set Iterator] { 'red', 'green', 'blue' }

for (let item of set.keys()) {
  console.log(item);  //red green blue
}
for (let item of set.values()) {
  console.log(item);  //red green blue  (键名和键值一样)
}
for (let item of set.entries()) {
  console.log(item);  //[ 'red', 'red' ] [ 'green', 'green' ] [ 'blue', 'blue' ]
}
for (let value of set) {
    console.log(value);  //red green blue (for...of...循环value)
}
set.forEach((value,key,set) => {
   console.log(value);  //red green blue
});

let z = {a:1,b:2};
for (const value in z) {
    console.log(value);  //a b (for...in..循环key,所以for..of..无法直接循环对象)
}

//数组的map和filter方法运用
let set2 = new Set([4,5,6,1]);
console.log(new Set([...set2].map(item => item + item)));  //Set { 8, 10, 12, 2 }
console.log(new Set([...set2].filter(item => item > 4)));//Set { 5, 6 }

//用set实现数组的并集、交集和差集
let [c1,c2] = [[1,2,3,5],[3,5,6,7]];
console.log([...new Set([...c1, ...c2])]);  //[ 1, 2, 3, 5, 6, 7 ](并集)
let [s1, s2] = [new Set(c1), new Set(c2)];
console.log(c1.filter(item => s2.has(item)));  //[ 3, 5 ](交集)
console.log(c1.filter(item => !s2.has(item))); //[ 1, 2 ](差集)
console.log([...new Set([...c1.filter(item => !s2.has(item)),
    ...c2.filter(item => !s1.has(item))])]); //[ 1, 2, 6, 7 ](对称差集)


//WeakSet:与Set类似，也是不重复的值集合，但是它的成员只能是对象
//WeakSet的对象都是弱引用，垃圾回收机制不考虑对其中对象的引用，也就是说，如果其他对象都不再引用该对象，
// 那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。由于 WeakSet 内部
// 有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是
// 不可预测的，因此 ES6规定 WeakSet 不可遍历。

let d = [1,2];
let f = [[1,2],[3]];
// let g = new WeakSet(d);  //报错，因为d数组的成员不是可迭代的对象
        //注意：是d数组的成员成为 WeakSet 的成员，而不是d数组本身。这意味着，数组的成员只能是对象。
let h = new WeakSet(f);
console.log(h); //WeakSet {Array(1), Array(2)}

//WeakSet的方法：
// h.add('a');  //报错
h.add({a:1});  //add参数只能是对象
h.delete([1,2]);
console.log(h.has([1,2]));  //false

//WeakSet 没有size属性，没有办法遍历它的成员,WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍
// 历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。
console.log(h.size);  //undefined
console.log(h.clear);//undefined
console.log(h.forEach); //undefined


//Map:类似于对象，但是键名不局限于字符串，可以是各种类型，也就是说，Object 结构提供了“字符串—值”的对应，
// Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现
const m = new Map();
const key = {a:1};
m.set(key, 2);
console.log(m);  //Map { { a: 1 } => 2 }
console.log(m.get(key));  //2
m.delete(key);
console.log(m.has(key));  //false
let m6 = new Map([['Lily', 23], ['Bob', 9]]);
console.log(m6.size); //2
m6.clear();


//使用Set新建Map
let j = new Set([['Lily', 23], ['Bob', 9]]);
let m2 = new Map(j);  //任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构,都可以当作
                    // Map构造函数的参数
console.log(m2);  //Map { 'Lily' => 23, 'Bob' => 9 }

//Map的键如果是引用类型，则绑定的是内存地址
let k1 = [1];
let k2 = [2];
let k3 = k1;
m.set(k1, 1);
m.set(k2, 2);
m.set(k3, 3);
console.log(m.get(k1), m.get(k2), m.get(k3));  //3 2 3 (k2和k1值不同，k3和k1值相同)

//Map的键如果是基本数据类型，则严格相等的键才是同一个键
m.set(+0, 2);
console.log(m.get(-0));  //2
m.set(NaN, 9);
console.log(m.get(NaN)); //9

//Map的遍历:
for (const item of m2) {
    console.log(item);  //[ 'Lily', 23 ] [ 'Bob', 9 ]
}

//Map转为数组：
console.log([...m2]);  //[[ 'Lily', 23 ] [ 'Bob', 9 ]]
console.log(m2.keys());  //[Map Iterator] { 'Lily', 'Bob' }
console.log([...m2.keys()]);  //[ 'Lily', 'Bob' ]

//使用数组的map和filter方法：
let m5 = new Map();
m5.set(0,'a');
m5.set(4, 'd');
console.log(new Map([...m5].map((k,v) => [k + 2, v +'c'])));
                                    //Map { '0,a2' => '0c', '4,d2' => '1c' }
                        //map遍历数组里的每一个元素,对map结构要以[k,v]接收
console.log(new Map([...m5].map(([k,v]) => [k + 2, v +'c'])));
                                    //Map { 2 => 'ac', 6 => 'dc' }
console.log(new Map([...m5].filter(([k,v]) => v > 'a')));//Map { 4 => 'd' }

//forEach的第二个参数可以绑定this
let reporter = {
   report: (k,v) => {
       console.log('key is',k,'value is',v);
   }
};
m5.forEach(function(v, k, m5) {  //这里用箭头函数来写，则找不到report方法，因为箭头函数
    this.report(k,v);                      //没有自己的this，所以无法绑定reporter
}, reporter);  //key is 0 value is a    key is 4 value is d

//WeakMap:只接受对象作为键名（null除外),
let m3 = new WeakMap();
// m3.set(null, 2);  //报错

//它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内
let oo = {a:1};
let ol = {c:2};
let m4 = new WeakMap([[oo, ol]]);
console.log(m4);//WeakMap { { a: 1 } => { c: 2 } }
ol = null;
console.log(m4.get(oo));  //{ c: 2 }(弱引用的只是键值，键名是正常引用)

//WeakMap只有set、get、has方法，没有size属性、遍历方法和clear方法,和WeakMap一样






