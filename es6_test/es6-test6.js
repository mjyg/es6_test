/**
 * Created by z18630 on 2018/12/11 0011.
 */

//第六章 数值的扩展
//二进制(0b)和八进制(0o)表示法
console.log(0b110, Number('0b110')); //Number()把参数转化为数字，无法转换返回NaN //6 6
console.log(0o23);  //19

//Number.isFinite():一个数值是否为有限的
//Number.isNaN():一个数值是否为NaN
//与传统的全局方法isFinite()和isNaN()区别在于,传统方法先调用Number()转化为数字，再进行判断，新方
// 法只对数值有效
console.log(isFinite('25'));  //true
console.log(Number.isFinite('25'));  //false
console.log(isNaN('NaN'));  //true
console.log(Number.isNaN('NaN'));  //false
console.log('------------------');

//Es6把全局方法parseInt(),parseFloat()移植到了Number对象上
console.log(Number.parseInt('110', 2)); //6
console.log(Number.parseFloat('12.3e4'));  //只接受一个参数 //123000

//Number.isInteger():判断是否为一个整数
//在JS整数个浮点数是同样的存储方法，所以3和3.0被视为同一个值
console.log(Number.isInteger(3.0));  //true

//Number.EPSILON:一个极小的常量，为浮点数计算设置误差范围
//误差检查函数
function checkError(num1,num2) {
  return num1 - num2 < Number.EPSILON;
}
console.log(checkError(0.111 + 0.2, 0.3), Number.EPSILON);
                                                  //false 2.220446049250313e-16
console.log('-----------------');

//安全整数：js表示的范围在-2的53次方~2的53次方之间，不包含两个端点
console.log(Math.pow(2, 53));  //9007199254740992
console.log(Math.pow(2, 53) + 1 === Math.pow(2, 53));  //和Math.pow(2, 53)值相等
                                        //true
//Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER表示安全整数的上下限
console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1);  //true
console.log(Number.MIN_SAFE_INTEGER === Math.pow(-2, 53) + 1); //true

//Number.isSafeInteger()：判断一个整数是否落在安全范围内
//判断运算结果是否在安全范围，需要同时验证两个运算数和运算结果
function isSafeRe(num1, num2, re) {
  if (Number.isSafeInteger(num1) && Number.isSafeInteger(num2)
      && Number.isSafeInteger(re)) {
    return re;
  } else {
    return false;
  }
}
console.log(isSafeRe(Math.pow(2,53) + 7, 7,
    Math.pow(2, 53) + 7 - 7));  //false
console.log('------------------');

//Math对象的扩展
//Math.trunc():去除一个数的小数部分
console.log(Math.trunc('12.4'));  //12
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

//Math.sign()：判断一个数是正数(返回1)、负数（返回-1），还是0（返回0或-0）
Math.sign = Math.sign || function (x) {
  x = +x; //转化为数字
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x < 0 ? -1 : 1;
};
console.log(Math.sign(-0));  //-0

//Math.cbrt():计算一个数的立方根
Math.cbrt = Math.cbrt || function (x) {
    return x > 0 ? Math.pow(x, 1/3) : -Math.pow(-x, 1 / 3);  //Math.pow()第一个参数需为
                                                                  // 非负数
  };
console.log(Math.cbrt(-8)); //-2
console.log('-------------');

//Math.clz32():返回一个数的32位无符号整数有多少个前导0
console.log(Math.clz32(1 >> 1));  //32
console.log(Math.clz32('1'));  //31

//Math.imul():返回两个带符号32位整数相乘结果，当结果溢出（超过2的53次方）时，可以返回正确的低位数值
console.log((0x7fffffff * 0x7fffffff)|0);  //0
console.log(Math.imul(0x7fffffff, 0x7fffffff)); //1

//Math.fround():返回一个数的单精度浮点形式
console.log(Math.fround(1.37));//1.3700000047683716

//Math.hypot():返回所有参数的平方和的平方根
console.log(Math.hypot(3,4));  //5

//指数运算符**
// console.log(2 ** 3);
// let sw = 2;
// sw **= 3;
// console.log(sw);

//Integer数据类型
// console.log(typeof 123n);
