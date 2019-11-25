/*
* 基本用法
* 创造了一个Promise实例
* Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
* 它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
*
* resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），
* 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
*
* reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），
* 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
* */
var promise1=new Promise(function(resolve,reject){
    /* 异步操作成功 */
    if (true){
        resolve(value);
    } else {
        reject(error);
    }
});
// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
// 第二个函数是可选的
promise1.then(function(value){
    //成功
},function(error){
    //失败
});
/**********************************************************************************************/
/*
* 下面是一个Promise对象的简单例子。
* */
function timeout(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms,'done');
    });
}
timeout(1000).then((value)=>{
    console.log(value);
});
/**********************************************************************************************/
/*
* Promise 新建后就会立即执行。
* */
var promise2 =new Promise(function(resolve,reject){
    console.log('Promise');
    resolve();
});

promise2.then(function(){
    console.log('resolved');
});
console.log('end');

//因为Promise 新建后就会立即执行所以先出现'Promise'，然后出现end，最后出现resolved。
/**********************************************************************************************/
/*
* 下面是异步加载图片的例子。
* */
function loadImageAsync(url){
    return new Promise(function(resolve,reject){
        var image=new Image();
        image.src=url;
        image.onload=function(){
            resolve(image);
        };
        image.onerror=function(){
            reject(new Error('此路径找不到图片：'+ url));
        }
    });
}
loadImageAsync('http://baidu.com').then(res=>{
    console.log(res)
}).catch(ex=>{
    console.log(ex)
});
loadImageAsync('https://img.ssl.q1.com/ws/images/index_181221/logo.png?v=1').then(res=>{
    console.log(res)
}).catch(ex=>{
    console.log(ex)
});
//上面代码中，使用Promise包装了一个图片加载的异步操作。如果加载成功，就调用resolve方法，否则就调用reject方法。

/**********************************************************************************************/
/*
* 下面是一个用Promise对象实现的 Ajax 操作的例子。
* */
var getJSON=function(url){
    var promise=new Promise(function(resolve,reject){
        var handler=function(){
            if(this.readyState!==4){
                return;
            }
            if(this.status===200){
                resolve(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        };
        const client=new XMLHttpRequest();
        client.open('GET',url);
        client.onreadystatechange =handler();
        client.responseType='json';
        client.setRequestHeader('Accept','application/json');
        client.send();
    });
    return promise;
};

getJSON("/posts.json").then(json =>{
    console.log('Contents: ' + json);
}).catch(ex=>{
    console.error('出错了', ex);
});
/**********************************************************************************************/
/*
* 调用resolve或reject并不会终结 Promise 的参数函数的执行。
* */
new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
}).then(r => {
    console.log(r);
});
/*
* 一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，
* 而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。
* */
/**********************************************************************************************/
/*
* 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，
* Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
* */
/**********************************************************************************************/
// finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
/*
* promise
    .then(result => {···})
    .catch(error => {···})
    .finally(() => {···});
* */
/**********************************************************************************************/
/*
* Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
* */
/*
//const p = Promise.all([p1, p2, p3]);
* 上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，
* 如果不是，就会先调用下面讲到的Promise.resolve方法，
* 将参数转为 Promise 实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，
* 但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

p的状态由p1、p2、p3决定，分成两种情况。
（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，
此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，
此时第一个被reject的实例的返回值，会传递给p的回调函数。
*
* 综上所述，promise.all是所有成功才成功，有一个失败即为失败。
* */
/**********************************************************************************************/
/*
* Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
* */
/*
* //const p = Promise.race([p1, p2, p3]);
* 上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
* 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
* */
/**********************************************************************************************/
/*
* Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
* 只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。该方法由 ES2020 引入。
*
* 有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。
* 这时，Promise.allSettled()方法就很有用。
* 如果没有这个方法，想要确保所有操作都结束，就很麻烦。Promise.all()方法无法做到这一点。
* */
/**********************************************************************************************/
/*
* Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
* 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，
* 包装实例就会变成rejected状态。该方法目前是一个第三阶段的提案 。
* */
/**********************************************************************************************/
/*
* Promise.resolve()：有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
* */
/**********************************************************************************************/
/*
* Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
* Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。
* */
