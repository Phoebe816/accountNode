// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser'); // 处理post请求

// 导入controller middleware:
const controller = require('./controller');

const templating = require('./templating');

//生产环境上必须配置环境变量NODE_ENV = 'production'，而开发环境不需要配置，实际上NODE_ENV可能是undefined，所以判断的时候，不要用NODE_ENV === 'development'。
const isProduction = process.env.NODE_ENV === 'production';

//数据库操作
const Sequelize = require('sequelize');
const config = require('./config');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// log request URL:  记录URL以及页面执行时间
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support: 处理静态文件
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}


// parse request body: 解析POST请求
app.use(bodyParser());

// add nunjucks as view: 给ctx加上render()来使用Nunjucks
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:  处理URL路由
app.use(controller());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');