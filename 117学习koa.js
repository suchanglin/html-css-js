一. 什么是koa.js?

koa.js是一个基于nodejs的web框架，主要利用了ES6里面的generator的新特性。

koa的作用：

利用一个个中间件对HTTP请求进行处理。例如：生成缓存／指定代理／请求重定向等。

总之，一个koa应用是一个对象，这个对象中包含一个中间件的数组，数组是由一系列Generator函数组成的。

koa.js和express的对比

Express是在ES6之前的，中间件的原理还是基于callback方式；
koa是基于ES6中的generator特性和co框架（co会把所有generator的返回封装成为Promise对象）
express让请求逐个通过中间件，实现处理网络请求，是串联的；而koa加上了中间件的回溯，即先逐个通过中间件再反穿回来。

Express自身封装来很多功能：比如路由，视图处理等等。
koa框架自身没有集成太多功能，大部分需要用户自己去require中间件去解决，这样使用起来反而更灵活。
二. koa实例的几种方法

var koa = require('koa');
var app = koa();

app.use()：使用中间件
app.listen()：监听某一个端口
app.on()：可以用来监听事件，例如：app.on(‘error’, function)
app.callback()
app.keys = ：用来设置签名cookie密钥
三. koa的中间件

1. 什么是中间件？

koa的中间件：

koa的中间件是一个generator函数，这些函数是用来处理http请求。

generator函数最大的特点是：函数可以在运行的时候跳出然后再跳回来。

可以自己写中间件，也可以用已经封装好了的中间件。

2. 如何使用中间件？

使用.use()函数

eg.

var koa = require('koa');

var app = koa();

app.use(function* (next) {

​ //函数内容

});

3. 中间件的执行顺序

中间件之间是级联式的结构。

koa中间件的参数只有一个next，用于指向下一个中间件。

使用yield next；执行下一个中间件，执行完毕之后，又返回该中间件继续执行。

举例：

var koa = require('koa');
var app = koa();

app.use(function* f1(next) {
   	console.log('f1: pre next');
   	yield next;
   	console.log('f1: post next');
});

app.use(function* f2(next) {
   	console.log('  f2: pre next');
   	yield next;
   	console.log('  f2: post next');
});

app.use(function* f3(next) {
   	console.log('    f3: pre next');
   	this.body = 'hello world';
   	console.log('    f3: post next');
});

app.listen(4000);

控制台输出：
f1: pre next
 		f2: pre next
   		f3: pre next
   		f3: post next
 		f2: post next
f1: post next
4. 合并中间件

使用.call(this,next)将多个中间件进行合并。

eg.

function* a(next) {

​ yield next;

}

function* b(next) {

​ yield next;

}

function* AandB(next) {

​ yield a.call(this, b.call(this, next));

}

四. koa中的context／请求／响应对象

1. koa的context对象

context对象可通过this标识符来引用。

context对象的全局属性：

ctx.request：Request对象

ctx.response：Response对象

ctx.req：指向Node的request对象

ctx.res：指向Node的reponse对象（和reponse有啥区别）

ctx.app：指向App对象

context对象的全局方法：

throw()：抛出错误

assert(‘value’, 状态码, 提示信息)：

2. koa中的请求（request）对象

Koa Request 对象是对 node 的 Request 进一步抽象和封装

3. koa中的请求（response）对象

Koa Response 对象是对 node 的 Response 进一步抽象和封装

五 . koa的使用——实现路由功能

收到客户端的请求，服务器需要通过识别请求的方法（HTTP Method: GET, POST, PUT…）和请求的具体路径(path)来进行不同的处理。
这部分功能就是路由（Route）需要做的事情，说白了就是请求的分发，分发到不同的回调方法去处理。

用this.path属性来判断用户请求的路径

var koa = require('koa');
var app = koa();

app.use(function* (next) {
	if(this.path == '/') {
		this.body = 'hello world';
	}
});
koa-router中间件
如何使用koa-router中间件

首先，安装koa-router

npm install koa-router --save-dev

使用中间件


var koa = require('koa');
var Router = require('koa-router');
var app = koa();
var router = Router();

router.get('/', function* (){
	//请求‘／’这个路径的回调函数
});

app.use(router.routes())；
koa-router提供的方法有：

router.routes(): 返回一个符合这个请求路径的中间件

router.get()

router.post()

router.use()

今天使用koa的一个大坑！！！
通过页面发起ajax请求，在koa-router的post方法里面对请求进行处理，一直都获取不到post请求里面的data数据

原因是：缺少一个对请求体进行解析的中间件！！！koa-bodyparser
