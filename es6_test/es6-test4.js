/**
 * Created by z18630 on 2018/12/5 0005.
 */

//第四章 字符串的扩展
//字符的unicode表示法
console.log('\u20BB7'); //error:识别成\u20BB+7
console.log('\u{20BB7}'); //把码点放入大括号，能正确解读超过0xFFFF的字符（不加{}，默认识别4位）

//用6种方法表示一个字符
let a1 = '\z' === 'z';
let a2 = '\172' === 'z';  //8进制,z的ASCII码为122
let a3 = '\x7A' === 'z';  //16进制
let a4 = '\u007A' === 'z'; //unicode表示
let a5 = '\u{7A}' === 'z';  //unicode表示
console.log(a1,a2,a3,a4,a5);  //true true true true true
console.log('---------------------');

//codePointAt()：正确处理四个字节存储的字符，返回该字符的码点，定义在字符串的实例对象上
//              （charAt()和charCodeAt()无法识别四个字节存储的字符）
/*
Unicode编码：仅仅只是一个字符集，为每个字符规定了一个数字来表示该字符，对该数字如何存储没有任何规定。
ASCII码：一共定义了128个英文字符，从0000 0000 到0111 1111，用一个字节表示。
utf-8编码：可变长度编码，使用1-4字节表示一个字符，根据字符的不同变换长度，对于ASCII码表示的英文字符，
       编码与ASCII码完全相同（解码：如果第一位是0，表示 该字符占一个字节，如果是1，则连续有n个1，
       表示该字符占n个字节）。
utf-16编码：基本平面的字符占2个字节，辅助平面的字符占4个字节（识别某个字符占2位还是4位：开始的两个
       字节码点在U+D800到U+DBFF之间，后面两个字节必在U+DC00到U+DFFF之间，则这四个字节为一个字符，
       U+D800到U+DFFF为基本平面的一个空段）。
utf-32编码：统一使用四个字节编码。
*/
//js内部，字符以utf-16格式存储，每个字符固定两个字节，对于需要四个字节存储的字符，js会认为是两个字符
//正确识别四个字节的字符
let s = 'x你y';
for(let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
} //78 4f60 79


//测试一个字符由两个字节还是4个字节组成
function is32Bit(s) {
  return s.codePointAt(0) > 0xffff;
}
console.log(is32Bit('x你y'));  //false
console.log('----------------');

//String.fromCodePoint():正确识别四个字节存储的字符，和codePointAt相反，定义在String对象上
//                       (String.fromCharCode()无法识别32位的字符)
console.log(String.fromCodePoint(0x20BB7));
console.log(String.fromCodePoint(0x78,0x4f60,0x79)); //参数有多个，会被合并成一个字符
                                                                // 串返回
                                                                //x你y
console.log('-----------------');

//字符串的遍历器接口:for..of循环遍历可以识别大于0xffff的码点，普通的for循环无法识别
let text = String.fromCodePoint(0x20BB7);
for(let i = 0;i < text.length;i ++) {  //普通for循环识别成两个字符
  console.log(text[i]);
}
console.log('4---------------');
for(const i of text) {  // for...of循环正确识别出字符
  console.log(i);
}
console.log('5---------------');

//at()：返回字符串给定位置的字符，可以识别32位字符（charAt()无法识别）
console.log(text.charAt(0).codePointAt().toString(16));  //d842
// console.log(text.at(0));
console.log('6---------------');

//normalize():将字符的不同表示方法统一为同样的形式、
console.log('\u01d1' === '\u004f\u030c');  //包含语调符号和重音符号的字符js无法识别
                                            //false
console.log('\u01d1'.normalize() === '\u004f\u030c'.normalize());//true
//参数：NFC(默认)：标准等价合成，NFD:标准等价分解，NFKC：兼容等价合成，NFKD:兼容等价分解
console.log('7---------------');

// includes():是否找到参数字符串，返回布尔值
// startsWith()：参数字符串是否在源字符串头部，返回布尔值
// endsWith()：参数字符串是否在源字符串尾部，返回布尔值
//indexOf()：找到返回位置，未找到返回-1
//都支持第二个参数，表示搜索的起始位置
let str = 'Hello';
console.log(str.includes('H', 2));  //false
console.log(str.endsWith('o'));  //true
console.log('8---------------');

//repeat():返回个新字符串，表示将于字符串重复n次
console.log('as'.repeat('3')); //参数是字符串则转化为数字，如果为小数，则往小取整
                                      //asasas
//padStart(),padEnd():字符串补全
// console.log('101'.padStart(8, '0'));//为数值补全指定位数
// console.log('09-12'.padStart(10,'YY-MM-DD')); //提示字符串格式

//模板字符串
//调用函数
function f() {
  return 'hello';
}
console.log(`${f()} world`); //hello world

let str1 = 'console.log( `hello ${ name }`)';
let func = new Function('name', str1); //new Function(arg1,arg2,...,function_body)
func('John');  //hello John
eval('console.log("a")'); //eval()执行一段js代码  //a
console.log('9---------------');




