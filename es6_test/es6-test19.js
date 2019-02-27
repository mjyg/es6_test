//第十九章 Module

//模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其
// 他模块提供的功能。

//export：一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部
// 的某个变量，就必须使用export关键字输出该变量。
//写法一：
export let a = 1;
export function f() {
    console.log(function);
}
export class c {}

//写法二：
let a2 = 1;
function f2() {
    console.log(function);
}
class c2 {}
export {a2, f2, c2};
export {a2 as a};  //用as取名


//import:使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。
import {a2, f2, c2} from './profile.js';
//整体加载

import * as all from'./profile.js';



//export default:为模块指定默认输出
// export-default.js
export default function () {
  console.log('foo');
}

import customName from './export-default';//加载该文件的默认模块，并指定名字，不需要使用大括号
customName(); // 'foo'

//export default命令用在非匿名函数前，也是可以的。
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成
function foo() {
  console.log('foo');
}
export default foo;
export {foo as default}; //等同于上句

//一个模块只能有一个默认输出，因此export default命令只能使用一次。所以 import命令后面才不用加大括号，
// 因为只可能唯一对应export default命令。
import foo from 'modules';
import { default as foo } from 'modules'; //等同于上句

//如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样。
import _, { each, forEach } from 'lodash';  //_表示默认方法