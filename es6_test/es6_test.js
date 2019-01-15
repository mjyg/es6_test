/**
 * Created by z18630 on 2018/12/3 0003.
 */

// 匿名函数的立即执行
(
  function (x, y) {
    console.log(x + y);
  }(3, 4));


//使用解构赋值，实现两个变量的交换
let a = 3;
let b = 4;
[b, a] = [a, b];
console.log(a, b);

//使用解构赋值，完成函数的参数默认值
function demo({a = 3} = {}) {
  console.log(a);
};
demo({a: 6});

//利用数组推导，计算出数组每一个元素的平方和并返回新的数组
let a1 = [1, 2, 3, 4, 5];
let b1 = a1.map(v => v * v
)
console.log(b1);

//使用模板字符串
let s1 = '我是';
let s2 = 'Lily';
let str = `大家好，${s1}${s2}`;
console.log(str);

//用对象简洁语法改写
let name = 'Lily';
let obj = {
  name,
  say(){
    console.log('hello');
  },
};
console.log(obj);

//symbol 练习
let s = Symbol('ss');
a = {};
a[s] = 'aa';
console.log(a[s]);

//Reflect 遍历key
b = {
  [s]: 'bb',
  a,
};
let k = Reflect.ownKeys(b);
console.log(k);


if (['a', 'b'].includes('a')){
  console.log('a');
}
console.log('---------------------');

/*练习：给定一个仅包含整数，且按照大小顺序排好序的列表，列表内不存在重复的整数。
 实现一个函数，将列表格式化为由`,`(逗号)分隔的字符串；如果相邻的整数(至少3个)是
 连续的(值相差1为连续)，则将这几个相邻的整数格式化为由`-`(减号)分隔、左右分别为
 起始和终止位整数的字符串。

 示例：
 func([-6,-3,-2,-1,0,1,3,4,5,7,8,9,10,11,14,15,17,18,19,20]) --> '-6,-3-1,3-5,7-11,14,15,17-20'
 func([-3,-2,-1,2,10,15,16,18,19,20]) --> '-3--1,2,10,15,16,18-20'

 特殊情况示例：
 func([]) --> ''
 */
(function getNumStr(arr) {
  let lastVal;
  let numStr = [];
  const len = arr.length;
  let neighborArr = [];
  for(let i = 0; i<len; i++){
    let value = arr[i];
    if (i === 0) {
      lastVal = value;
      neighborArr.push(value);
      continue;
    }
    if (value === lastVal + 1) {
      neighborArr.push(value);
    } else {
      handleNeighbor(neighborArr, numStr);
      neighborArr = [value];
    }
    lastVal = value;
  }
  handleNeighbor(neighborArr, numStr);
  console.log(numStr.join(','));
})([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);

function handleNeighbor(neighborArr, numStr) {
  const neiLen = neighborArr.length
  if (neiLen >= 3) {
    const neiLen = neighborArr.length;
    numStr.push(neighborArr[0] + '-' + neighborArr[neiLen - 1]);
  } else {
    for (const nei of neighborArr) {
      numStr.push(nei);
    }
  }
}
console.log('--------------------');

//实现回文：manam
function huiWen(str) {
  return str + str.substring(0, str.length - 1).split('').reverse().join('');
}
console.log(huiWen('man'));

//判断一个字符串是否为回文
function isHuiWen(str) {
  return str === str.split('').reverse().join('');
}
console.log(isHuiWen('123211'));

//去掉一组整数型数组中重复的值
function delRepeate(arr) {
  let obj = {};
  for (const val of arr) {
    obj[val] = '';  //利用对象的key筛选
  }
  return Object.keys(obj);
}
console.log(delRepeate([1,2,3,1,1,3,4]));
console.log('-----------------');

//统计一个字符中出现最多的字母(区分大小写)
function mostLetter(str) {
  let obj = {};
  for (const s of str) {
    if (obj[s]) {
      obj[s] ++;
    } else {
      obj[s] = 1;
    }
  }
  let max = 0;
  let most = '';
  for (const k of Object.keys(obj)) {
    if (obj[k] > max) {
      max = obj[k];
      most = k;
    }
  }
  return most;
}
console.log(mostLetter('a'));
