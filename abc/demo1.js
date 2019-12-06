// 1，call()、apply()、bind() 都是用来重定义 this 这个对象的！
var name='小王',age=17;
var obj={
    name:'小红',
    objAge:this.age,
    myFun:function(){
        console.log(this.name+'年龄'+this.age);
    }
};
console.log(obj.objAge);//17
console.log(obj.myFun());//小红年龄 undefined
/*
* 第二个this.age的指向就无法到window对象，而是obj对象，所以输出undefined
* */
var obj2={
    name:'赵四',
    age:99
};

obj.myFun.call(obj2);   //赵四年龄 99
obj.myFun.apply(obj2);  //赵四年龄 99
obj.myFun.bind(obj2)(); //赵四年龄 99
/*
* 以上出了 bind 方法后面多了个 () 外 ，结果返回都一致！
* 由此得出结论，bind 返回的是一个新的函数，你必须调用它才会被执行。
* */


