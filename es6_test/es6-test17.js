//第十七章 Generator 函数
//调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的
// next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达
// 式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

//Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行
// 的函数。yield表达式就是暂停标志。

function* f() {
    console.log('one');
    yield('hello');
     console.log('two');
    yield('world');
    return 'end';
}
let a = f();  //不会立即执行，调用next方法才会执行
console.log(a, a[Symbol.iterator]); //Object [Generator] {}   [Function: [Symbol.iterator]]
console.log(a.next());  // one { value: 'hello', done: false }
console.log(a.next()); //two { value: 'world', done: false }

//可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。
const obj = {};
obj[Symbol.iterator] = f;
console.log([...obj]);  //one two [ 'hello', 'world' ]

//Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。
console.log(a[Symbol.iterator]() === a);  //true

//yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个
// yield表达式的返回值
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y * 3);
  return (x + y + z);
}

let q = foo(5);
console.log(q.next());//{ value: 6, done: false }
console.log(q.next());  //{ value: NaN, done: false }
console.log(q.next());//{ value: NaN, done: true }
console.log(q.next());//{ value: undefined, done: true }

let w = foo(5);
console.log(w.next()); //{ value: 6, done: false }
console.log(w.next(8));  //{ value: 48, done: false }
console.log(w.next(7));//{ value: 28, done: true }

//for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
//实现斐波那契数
function* feibo() {
    let [pre, cur] = [0,1];
    while(true) {
        yield cur;
        [pre, cur] = [cur, pre + cur];
    }
}

for (const i of feibo()) {
    if (i > 1000) {
        break;
    }
    console.log(i);
}

//为原生的对象添加遍历接口，使用for...of...循环
function* loop(obj) {
    const keys = Reflect.ownKeys(obj);
    for (const key of keys) {
        yield[key, obj[key]];
    }
}
let obj2 = {
    name: 'Lily',
    age: 8,
    sex: '女',
};

for (const [key, value] of loop(obj2)) {
    console.log(key, value);  //name Lily  age 8  sex 女
}

//或者把遍历方法添加到对象的[Symbol.iterator]上
function* loop2() {
    const keys = Reflect.ownKeys(this);
    for (const key of keys) {
        yield[key, this[key]];
    }
}
let obj3 = {
    name: 'Lily',
    age: 8,
    sex: '女',
};
obj3[Symbol.iterator] = loop2;
for (const [key, value] of obj3) {
    console.log(key, value);
    //name Lily  age 8  sex 女  Symbol(Symbol.iterator) [GeneratorFunction: loop2]
}

console.log(obj3[Symbol.iterator]().next());//{ value: [ 'name', 'Lily' ], done: false }

//Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }  （先执行finally语句，再执行return）
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }


//yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数
function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

console.log([...logReturned(genFuncWithReturn())]);  //The result  [ 'a', 'b' ]


//多个异步操作形成了强耦合，只要有一个操作需要修改，它的上层回调函数和下层回调函数，可能都要跟着修改。
// 这种情况就称为"回调函数地狱"（callback hell）

//Promise 对象就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，
// 改成链式调用(依次写在then方法里)

//整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield
// 语句注明
function* gen(x) {
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true