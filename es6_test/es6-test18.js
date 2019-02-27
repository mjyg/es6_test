//第十八章 类
//类的基本语法
class fruit {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    get firstName(){
        console.log('get');
        return this.name[0];
    }
    set firstName(name){
        console.log('set');
        this.name = name;
    }

    static getName() {
        return 'fruit';
    }
}

let apple = new fruit('apple', 'red');
apple.num = 4;
apple.firstName;  //get
apple.firstName = 'b';  //set
console.log(fruit.getName());  //fruit (通过类直接调用静态方法)

//class 表达式
let c = class {
    constructor(name) {
        console.log(name);
    }
};
let cc = new c('Lily');//Lily

//立即执行的class
let c2 = new class {
    constructor(name) {
        console.log(name);
    }
}('Lily');  //Lily


//类的继承
//ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），
// 然后再用子类的构造函数修改this。

class banana extends fruit {
    constructor(name, color, num) {
        super(name, color);
        this.num = num;
    }

    get firstName() {
        return super.firstName;
    }

    static getName() {
        return super.getName();
    }
}

let b = new banana('banana', 'yellow', 10);
console.log(b.firstName);  //get b
console.log(banana.getName());  //fruit

//子类的__proto__属性，表示构造函数的继承，总是指向父类。
// 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
console.log(banana.__proto__ === fruit);  //true
console.log(banana.prototype === fruit);  //false
console.log(banana.prototype.__proto__ === fruit.prototype);  //true
console.log(banana.prototype.__proto__ === fruit.__proto__);  //false