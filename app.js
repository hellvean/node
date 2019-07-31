// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const bodyParser = require('koa-bodyparser');

//跨域问题
var cors = require('koa-cors');

const controller = require('./controller');

const templating = require('./templating');

const rest = require('./rest');

//配置生产版本||开发版本
const isProduction = process.env.NODE_ENV === 'production';

// 创建一个Koa对象表示web app本身:
const app = new Koa();

//记录URL以及页面执行时间
app.use(async(ctx, next) => {
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//静态资源路径
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

//解决跨域问题
app.use(cors());

//解析POST请求
app.use(bodyParser());

//负责给ctx加上render()来使用Nunjucks
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(rest.restify());

//处理URL路由
app.use(controller());

// 在端口3000监听:
app.listen(3000);

console.log('app started at port 3000...');