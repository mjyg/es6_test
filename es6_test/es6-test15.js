//第十五章 Promise对象
//Promise是一个对象，可以获取异步操作的消息
//Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
//resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”
//reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”
//Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

const p1 = new Promise((resolve, reject) => {
    setTimeout(resolve('success'), 3000);
});
const p2 = new Promise((resolve, reject) => {
   setTimeout(reject(p1), 1000);
});

p1.then(msg => {
    console.log(msg);  //success
});

p2.then(msg => {
   console.log('1:', msg);
}, err => {
    console.log('2', err);
}).catch(err => {
   console.log('3', err);
});
//2 Promise { 'success' }

//reject方法的作用，等同于抛出错误。
const p3 = new Promise((resolve, reject) => {
    // try {
    //     throw new Error('error');
    // } catch(e) {
    //     reject(e);
    // }
    reject(new Error('error'));//等同于上面那个try...catch...
});
p3.then(null, (err) => {
    console.log(err);  //Error: error
});
p3.catch(e => {
    console.log(e);//Error: error
});

//一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。
p3.then(msg => {
    console.log(msg);
}).catch(e => {
    console.log('2', e);//Error: error
}).finally(() => {
   console.log('finally');  //finally (不管状态如何，finally总会执行)
});

//立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开
// 始时。
setTimeout(function () {
  console.log('three');
}, 0);
Promise.resolve().then(function () {
  console.log('two');
});
console.log('one');
//one two three
// (setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，
// console.log('one')则是立即执行，)
