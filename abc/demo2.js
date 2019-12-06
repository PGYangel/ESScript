// 对比call 、bind 、 apply 传参情况下
var name='小王',age=17;
var obj={
    name:'小红',
    objAge:this.age,
    myFun:function(fm,t){
        console.log(this.name+' 年龄 '+this.age+' 来自'+fm+' 去往'+t);
    }
};
var obj2={
    name:'赵四',
    age:99
};

obj.myFun.call(obj2,'深圳','北京');     // 赵四 年龄 99 来自深圳 去往北京
obj.myFun.apply(obj2,['深圳','北京']);  // 赵四 年龄 99 来自深圳 去往北京
obj.myFun.bind(obj2,'深圳','北京')();   // 赵四 年龄 99 来自深圳 去往北京
obj.myFun.bind(obj2,['深圳','北京'])(); // 赵四 年龄 99 来自深圳 去往北京

/*
微妙的差距！
从上面四个结果不难看出:
call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面 obj.myFun.call(db,'成都', ... ,'string' )。
apply 的所有参数都必须放在一个数组里面传进去 obj.myFun.apply(db,['成都', ..., 'string' ])。
bind 除了返回是函数以外，它 的参数和 call 一样。

当然，三者的参数不限定是 string 类型，允许是各种类型，包括函数 、 object 等等！
* */

