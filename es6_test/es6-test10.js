//第十章 对象的新增方法

//Object.is():它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。不同之处只有两个：
// 一是+0不等于-0，二是NaN等于自身。
//ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会
// 自动转换数据类型，后者的NaN不等
// 于自身，以及+0等于-0。
console.log(NaN === NaN);  //false
console.log(+0 === -0);  //true
console.log('65' == 65);  //  true
console.log(Object.is(NaN, NaN));  //true
console.log(Object.is({}, {}));  //false
console.log({} === {});  //false
console.log(+0 !== 0); //false
console.log(1/+0 === 1/-0); //false
console.log(NaN !== NaN);  //true

//ES5部署Object.is()
Object.defineProperty(Object, 'is2',{
    value: function (x, y) {
        if (x === y) {  //处理+0等于-0
           return x !== 0 || 1/x === 1/y;
        }
        return x !== x && y !== y;  //处理NaN不等于NaN
    },
    configurable: true,
    enumerable: false,
    writable: true,
});

console.log(Object.is2(NaN, NaN));  //true
console.log(Object.is2(+0, -0));  //false
console.log(Reflect.ownKeys(Object));  //[...,'is2']

//Object.assign(target, source1, ...sourcen):将源对象（source）的所有可枚举属性，复制到目标对象
// （target）。
//Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性
// （enumerable: false）。
console.log(Object.assign({},'abc'));  //{ '0': 'a', '1': 'b', '2': 'c' }

//Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象
// 拷贝得到的是这个对象的引用。
// (和扩展运算符一样)
console.log({...{a:1},...{b:2}});  //{ a: 1, b: 2 }

//Object.assign可以用来处理数组，但是会把数组视为对象。
console.log(Object.assign([1,2,3],[4,5])); //[ 4, 5, 3 ]

//Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
const source = {
  get foo() { return 1 }
};
const target = {};
console.log(Object.assign(target, source));  //{ foo: 1 }

//Object.create(proto, propertiesObject):是使用指定的原型proto对象及其属性propertiesObject去创建
// 一个新的对象
//proto 是必填参数，就是新创建出来的对象的原型 （新对象的 __proto__属性指向的对象），值得注意的是当
//proto为null的时候创建的新对象完全是一个空对象，没有原型，也就是没有继承Object.prototype上的方法。
// （如hasOwnProperty() toString()等）
// propertiesObject是可选参数，作用就是给新对象添加新属性以及描述器(图2)，具体可参考
// Object.defineProperties() - mdn 的第二个参数。需要注意的是新添加的属性是新对象自身具有的属性也就
// 是通过hasOwnProperty() 方法可以获取到的属性，而不是添加在原型对象里
// 具体三个步骤就是：
// 1.创建一个对象
// 2.继承指定父对象
// 3.为新对象扩展新属性

var c2 = Object.create(Object);
console.log(c2.__proto__ === Object); //true
var c3 = Object.create(Object.prototype);
console.log(c3.__proto__ === Object.prototype);  //true

//自己实现一个Object.create() ：
Object.myCreate = function (obj, proterties) {
    let f = function () {};
    f.prototype = obj;
    if(proterties) {
        f.defineProperties(f, proterties);
    }
    return new f();
};


//new运算符：创建一个自定义对象或者具有构造函数的内置对象的实例
// 使用new运算符会创建一个新的对象，它继承自构造函数的prototype,也就是说它的__proto__属性会指向构造函
// 数的prototype
// new Object() 也就是具有构造函数的内置Object的实例，新创建的对象的__proto__属性会指向Object的
// prototype

//扩展：实例复现new的构造过程：
var objectFactory = function ()  {
   var obj = new Object();              // 从Object.prototype上克隆一个空对象 此时 __proto__
                                        // 指向Object.prototype
   var Constructor = [].shift.call(arguments);  //取得构造器
   obj.__proto__ = Constructor.prototype; // 指向构造器的prototype
   var ret = Constructor.apply(obj, arguments);
   return typeof ret === 'object' ? ret : obj
};

function Person (name) {
   this.name = name
}

Person.prototype.getName = function () {
   return this.name
};

var a = objectFactory(Person, 'nancy');
console.log(a.name);  // nancy
console.log(a.getName); //nancy
console.log(Object.getPrototypeOf(a)  === Person.protoType); //true
// new constructor[([arguments])]参数：
// constructor ：一个指定对象实例的类型的类或函数。
// arguments一个用来被constructor 调用的参数列表。
// 当代码 new Foo(...) 执行时，会发生以下事情：
// 1.一个继承自 Foo.prototype 的新对象被创建。
// 2.使用指定的参数调用构造函数 Foo ，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是
// 没有指定参数列表，Foo 不带任何参数调用的情况。
// 3.由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象
// （一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）

//总结区别:
// 1.Object.cerate() 必须接收一个对象参数，创建的新对象的原型指向接收的参数对象，new Object() 创建的
// 新对象的原型指向的是Object.prototype. （表述有点啰嗦，简洁点说就是前者继承指定对象， 后者继承内置对
// 象Object）
// 2.可以通过Object.create(null) 创建一个干净的对象，也就是没有原型，而 new Object() 创建的对象是
// Object的实例，原型永远指向Object.prototype.


//例1：
var test1 = {x:1};

var test2 = new Object(test1);

var test3 = Object.create(test1);
console.log(test3);//{}
//test3等价于test5
var test4 = function(){
　　
};
test4.prototype = test1;
var test5 = new test4();
console.log(test5); //{}
console.log(test5.__proto__ === test3.__proto__);//true
console.log(test2);//{x:1}
console.log('-------------------');

//例2
var test = Object.create({x:123,y:345});  //使用Object.create()是将对象继承到__proto__属性上,即
                                            // test.__proto__ = {x:123,y:345}
console.log(test);//{}
console.log(test.x);//123
console.log(test.__proto__);  //{ x: 123, y: 345 }
console.log(test.__proto__.x);//123
console.log(test.__proto__.x === test.x);//true

var test1 = new Object({x:123,y:345});
console.log(test1);//{x:123,y:345}
console.log(test1.x);//123
console.log(test1.__proto__);  //{}
console.log(test1.__proto__.x);//undefined
console.log(test1.__proto__.x === test1.x);//false

var test2 = {x:123,y:345};
console.log(test2);//{x:123,y:345};
console.log(test2.x);//123
console.log(test2.__proto__);  //{}
console.log(test2.__proto__.x);//undefined
console.log(test2.__proto__.x === test2.x);//false

//__proto__和prototype
var A = function () {};
var B ={};
console.log(A.__proto__);  //[Function]
console.log(B.__proto__); //{}
console.log(A.__proto__.__proto__ === __proto__);//false
console.log(A.prototype);  //A {}
console.log(B.prototype);  //undefined
let C = new A();
console.log(C.__proto__ === A.prototype); //true  C的隐式原型指向C的构造函数（A）的原型对象
console.log(C.prototype);  //undefined
//总结：
//1.所有的对象都有属性__proto__,指向该对象的构造函数的原型对象
//2.方法除了有属性__proto__,还有属性prototype,指向该方法的原型对象

//Object.getOwnPropertyDescriptors(obj):，返回指定对象所有自身属性（非继承属性）的描述对象,弥补
// Object.assign()无法正确拷贝get属性和set属性的问题。
//部署此方法：
function getOwnPropertyDescrpitors(obj) {
    let result = {};
    for (const key of Reflect.ownKeys(obj)) {
        result[key] = getOwnPropertyDescrpitor(obj, key);
    }
    return result;
}

let n = {
    name: {
       first:'a',
    },
    get getName() {
        return this.name;
    },
    set setName(name) {
        this.name = name;
    },
    read() {
      console.log('read book');
    },
};
 //Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
let o1 = Object.assign({}, n);
console.log(o1);
//{ name: { first: 'a'},getName: { first: 'a'}, setName:undefined, read:[Function: read]}
let o2 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(n));
console.log(o2);
// { name: { first: 'a'},getName: [Getter],setName:[Setter],read:[Function: read]}
let o3 = Object.create(Object.getPrototypeOf(n), Object.getOwnPropertyDescriptors(n));
console.log(o3);
//{ name: { first: 'a'},getName: [Getter],setName: [Setter],read: [Function: read] }
n.name.first = 'c';
// console.log(o1,o2,o3);  // { name: { first: 'c'},这三个拷贝都是浅拷贝

//__proto__属性:如果一个对象本身部署了__proto__属性，该属性的值就是对象的原型。
//_proto__调用的是Object.prototype.__proto__
//只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，
// 无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的操作代替
// 1.Object.setPrototypeOf()（写操作）：用来设置一个对象的prototype对象，返回参数对象本身
// 2.Object.getPrototypeOf()（读操作）:用于读取一个对象的原型对象
// 3.Object.create()（生成操作）:创建的新对象的原型指向接收的参数对象
const cc = Object.setPrototypeOf({}, {a:1});
console.log(cc.__proto__);  //{ a: 1 }
//等同于下面的函数
function setPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
console.log(Object.getPrototypeOf(cc));

console.log(Object.getPrototypeOf(1) === Number.prototype); // true
console.log(Object.getPrototypeOf('foo') === String.prototype); // true
console.log(Object.getPrototypeOf(true) === Boolean.prototype); // true

//Object.keys():返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
//Object.values():返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值。
//Object.entries():返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组。
let {keys, values, entries} = Object;
let ob = {c:'3', a:'1', 0:'2'};
for (const value of values(ob)){
    console.log(value);
} // 2
// 3 1
console.log(entries(ob)); //[ [ '0', '2' ], [ 'c', '3' ], [ 'a', '1' ] ]
for (const [key,value] of entries(ob)) {
    console.log(key, value);
} //0 2 c 3 a 1

//Object.fromEntries():Object.entries()的逆操作，用于将一个键值对数组转为对象,特别适合将 Map 结构
// 转为对象。
const map = new Map().set(0,1).set(1,3);
console.log(map); // { 0 => 1, 1 => 3 }
// console.log(Object.fromEntries(map));  //{ foo: true, bar: false }
