/**
 * Created by z18630 on 2018/12/10 0010.
 */

//第五章 正则的扩展
//RegExp构造函数
//使用第二个参数添加修饰符，且覆盖原有的
console.log(new RegExp(/abc/ig, 'i').flags);  //i
console.log('------------------------');

//字符串的正则方法
//match():使用指定的正则表达式进行查找，以数组的形式返回符合要求的字符串
//        定义在字符串上,参数为正则表达式
let s1 = 'aaabbaaaccc1234aaaccc';
console.log(s1.match(/aa/)); //[ 'aa',index: 0,: 'aaabbaaaccc1234aaaccc',groups: undefined ]

console.log(s1.match(/[a-z]{3}/g)); //全局匹配，返回所有匹配字符串
                                // [ 'aaa', 'bba', 'aac', 'aaa', 'ccc' ]

//exec():使用指定的正则表达式进行查找，以数组的形式返回符合要求的字符串
//       返回第一个匹配的字符串，还可返回子字表达式匹配的字符串
//       定义在正则表达式上，参数为字符串
console.log(/ccc([0-9]+)aaa/g.exec(s1));
// [ 'ccc1234aaa',
//   '1234',
//   index: 8,
//   input: 'aaabbaaaccc1234aaaccc',
//   groups: undefined ]

//test():匹配到返回true,未匹配到返回false
console.log(/ccc([0-9]+)aaa/g.test(s1));  //true

//search():返回第一个匹配的字符串的所在位置
// console.log(s1.match(/[b-z]{3}/g));  //[ 'ccc', 'ccc' ]

//replace():替换掉匹配的字符串
console.log(s1.replace(/[b-z]{3}/g, 'zzz')); //aaabbaaazzz1234aaazzz

//split():返回匹配到的字符串作为分隔符的数组
let s2 = 'aa!dd@jj&k,s';
console.log(s2.split(/[!@&,]/, 3)); //第二个参数为返回数组元素的个数 //[ 'aa', 'dd', 'jj' ]
console.log('---------------------');

//U修饰符
console.log(/^\uD83D/u.test('\uD83D\uDC2A')); //加了u修饰符，能识别大于\uFFFF的字符，
                                             //即能识别4个字节的utf-16编码，识别为一个字符
                                                //false
console.log(/^\uD83D/.test('\uD83D\uDC2A')); //true

console.log(/^.$/u.test('\uD83D\uDC2A')); //识别为一个字符 //true
console.log(/^.$/.test('\uD83D\uDC2A'));  //false

console.log(/\u{61}/u.test('a')); //大括号的unicode表示加u才能识别  //true
console.log('---------------------');

//y修饰符：粘连修饰符
//和g修饰符的区别，g修饰符只要剩余位置存在匹配就行，y修饰符会确保匹配必须从剩余位置的第一个字符开始
let s = 'aaa_aa_a';
console.log(s.match(/a+/g));  //[ 'aaa', 'aa', 'a' ]
console.log(s.match(/a+/yg));  //匹配到第一个aaa后，后面的字符第一个位置为_,无法继续匹配 //['aaa']
console.log(s.match(/a+_/g));// [ 'aaa_', 'aa_' ]
console.log(s.match(/a+_/yg)); //[ 'aaa_', 'aa_' ]

//sticky属性：是否设置了y修饰符
console.log(/a+_/yg.sticky);  //true

//source属性：返回表达式的正文
console.log(/a+_/yg.source);  //a+_

//flags属性：返回表达式的修饰符
console.log(/a+_/yg.flags);  //gy
console.log('---------------------');

//断言rorath
//先行断言：x只在y前面才匹配，写成/x(?=y)/
//先行否定断言：x只有不在y前面才匹配，写成/x(?!y)/
console.log(/\d+(?=%)/.exec('1 20%a'));   //括号中的部分不计入返回结果
                            //[ '20', index: 2, input: '1 20%a', groups: undefined ]
console.log(/\d+(?!%)/.exec('1 20%a'));
                    //[ '1', index: 0, input: '1 20%a', groups: undefined ]


//后行断言：x只有在y后面才匹配，/(?<=y)x/
//后行否定断言：x只有不在y后面才匹配，写成/(?<!y)x/
// /(?<!\$)\d+/.exec('$199 ass 23');
// /(?<=\$)\d+/.exec('$199 ass');

//具名组匹配
// const re  = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
// const {groups：{years, month, day}}  = re.exec('1991-12-31');
// console.log(years);
